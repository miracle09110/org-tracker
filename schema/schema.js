//Libraries
const graphql = require('graphql');
const crypto = require('crypto');
const _ = require('lodash');
const mongoose = require('mongoose');
//Model
const User = require('../model/UserModel');
const Member = require('../model/MemberModel');
const Cluster = require('../model/ClusterModel');
const Role = require('../model/RoleModel');
const CONST = require('../constant');
// const {Users, Members, Clusters, Roles} =  require('./offlineData');

const mockActivityData = [
    {
      "imagePath": "SomeimagePath1",
      "title": "sometitle1",
      "date":  "2019-11-21"
    },
    {
      "imagePath": "SomeimagePath2",
      "title": "sometitle2",
      "date":  "2019-11-23"
    },
    {
      "imagePath": "SomeimagePath3",
      "title": "sometitle3",
      "date":  "2019-11-24"
    },
    {
      "imagePath": "SomeimagePath4",
      "title": "sometitle4",
      "date":  "2019-11-30"
    },
    {
      "imagePath": "SomeimagePath5",
      "title": "sometitle5",
      "date":  "2019-12-21"
    },
    {
      "imagePath": "SomeimagePath6",
      "title": "sometitle6",
      "date":  "2019-11-21"
    },
    {
      "imagePath": "SomeimagePath7",
      "title": "sometitle7",
      "date":  "2019-11-21"
    },
    {
      "imagePath": "SomeimagePath8",
      "title": "sometitle8",
      "date":  "2019-11-21"
    },
    {
      "imagePath": "SomeimagePath9",
      "title": "sometitle9",
      "date":  "2019-11-21"
    },
    {
      "imagePath": "SomeimagePath10",
      "title": "sometitle10",
      "date":  "2019-11-21"
    },

    ];


const {
    GraphQLObjectType,
    GraphQLInputObjectType,
    GraphQLSchema,
    GraphQLID,
    GraphQLString,
    GraphQLBoolean,
    GraphQLNonNull,
    GraphQLInt,
    GraphQLList
} =  graphql;

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: ()=>({
        _id : {type: GraphQLID} , 
        password : {type: GraphQLString},
        role_id:{type: GraphQLID},
        info: {
            type: MemberType,
            resolve(parent,args){
                return Member.findOne({login_id: parent._id});
            }
        }
    })
});


const RoleType = new GraphQLObjectType({
    name: 'Role',
    fields: ()=>({
        _id : {type: GraphQLID} , 
        name : {type: GraphQLString}
    })
});

const ProfessionInputType = new GraphQLInputObjectType({
    name: 'InputProfession',
    fields:{
        job_title: {type: GraphQLString},
        employer: {type: GraphQLString},
        field: {type: GraphQLString}
    }
});

const ProfessionOutputType = new GraphQLObjectType({
    name: 'OutputProfession',
    fields: ()=>({
        job_title: {type: GraphQLString},
        employer: {type: GraphQLString},
        field: {type: GraphQLString}
    })
});

const AuthType = new GraphQLObjectType({
    name: 'UserAuth',
    fields: ()=>({
        success: {type: GraphQLBoolean},
        role: { type: RoleType }
    })
});
 
const ActivityType = new GraphQLObjectType({
    name: 'Activity',
    fields: ()=>({
        imagePath: {type: GraphQLString},
        title: {type: GraphQLString},
        date: {type: GraphQLString},
    })
});

const ContactInfoInputType = new GraphQLInputObjectType({
    name: 'InputContactInfo',
    fields: {
        email: {type: GraphQLString},
        phone_number: {type: GraphQLString},
    }
});

const ContactInfoOutputType = new GraphQLObjectType({
    name: 'OutputContactInfo',
    fields: ()=>({
        email: {type: GraphQLString},
        phone_number: {type: GraphQLString},
    })
});

const NameInputType = new GraphQLInputObjectType({
    name: 'InputName',
    fields: {
        first_name: {type: GraphQLString},
        last_name: {type: GraphQLString},
        middle_initial: {type: GraphQLString}, 
        nickname: {type: GraphQLString}
    }
});

const NameOutputType = new GraphQLObjectType({
    name: 'OutputName',
    fields: ()=>({
        first_name: {type: GraphQLString},
        last_name: {type: GraphQLString},
        middle_initial: {type: GraphQLString}, 
        nickname: {type: GraphQLString}
    })
});


const MemberType = new GraphQLObjectType({
    name: 'Member',
    fields: ()=> ({
        _id : {type: GraphQLID},
        name :{type: NameOutputType},
        contact_info : { type: ContactInfoOutputType},
        profession: { type: ProfessionOutputType},
        date_of_birth: {type: GraphQLString},
        batch: {type: GraphQLString},
        status: {type: GraphQLString},
        cluster_id: {type: GraphQLID},
        login_id: {type: GraphQLID}
    })
});

const ClusterType = new GraphQLObjectType({
    name: 'Cluster',
    fields: ()=>({
        _id: {type: GraphQLID},
        name: {type: GraphQLString},
        parent_cluster_id: {type: GraphQLInt},
        type: {type: GraphQLString},
        sub_clusters: {
            type: new GraphQLList(ClusterType),
            resolve(parent, args){
                return Cluster.find({ parent_cluster_id: parent._id });
            }
        },
        members: {
            type: new GraphQLList(MemberType),
            resolve(parent, args){
                return Member.find({ cluster_id: parent._id });
            }
        }
    })
});


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: AuthType,
            args: {
                _id: {type: GraphQLID},
                password: {type: GraphQLString}
            },
            resolve(parent,args){
                return login(args._id,args.password);
            }
        },
        users: {
            type: new GraphQLList(UserType),
            resolve(parent,args){
                return User.find({});
            }
        },
        member: {
            type: MemberType,
            args: {_id: {type: GraphQLID}},
            resolve(parent,args){
                return Member.findById(args._id);
            }
        },
        members: {
            type: new GraphQLList(MemberType),
            resolve(parent,args){
                return Member.find({});
            }
        },
        cluster: {
            type: ClusterType,
            args: {_id: {type:GraphQLID}},
            resolve(parent,args){
                return Cluster.findById(args._id);
            }
        },
        clusters: {
            type: new GraphQLList(ClusterType),
            resolve(parent,args){
                return Cluster.find({ parent_cluster_id: 0 });
            }
        },
        activities: {
            type: new GraphQLList(ActivityType),
            resolve(parent, args){
                return mockActivityData;
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addMember: {
            type: MemberType,
            args: {
                name :{ type:  new GraphQLNonNull(NameInputType)},
                contact_info : {type: new GraphQLNonNull(ContactInfoInputType)},
                profession: { type: new GraphQLNonNull(ProfessionInputType)},
                date_of_birth: {type: new GraphQLNonNull(GraphQLString)},
                batch: {type: new GraphQLNonNull(GraphQLString)},
                status: {type: new GraphQLNonNull(GraphQLString)},
                cluster_id: {type: new GraphQLNonNull(GraphQLID)},
                login_id: {type: GraphQLID}
            },
            resolve(parent,args){
                let member = new Member({
                    _id: mongoose.Types.ObjectId(),
                    name :{
                        first_name: args.name.first_name,
                        last_name: args.name.last_name,
                        middle_initial: args.name.middle_initial, 
                        nickname: args.name.nickname
                    },
                    contact_info : {
                        email: args.contact_info.email,
                        phone_number: args.contact_info.phone_number
                    },
                    profession: { 
                        job_title: args.profession.job_title,
                        employer: args.profession.employer,
                        field: args.profession.field
                    },
                    date_of_birth: args.date_of_birth,
                    batch: args.batch,
                    status: args.status,
                    cluster_id: args.cluster_id,
                    login_id: args.login_id
                });

                return member.save();
            }
        },
        addUser: {
            type: UserType,
            args: {
                _id: {type: new GraphQLNonNull(GraphQLString)},
                password: {type: new GraphQLNonNull(GraphQLString)},
                role_id: {type: GraphQLID}
            },
            resolve(parent,args){
                let user = new User({
                    _id: args._id,
                    password: generateSHA1(args.password),
                    role_id: args.role_id
                });
                return user.save();
            }
        },
        addRole: {
            type: RoleType,
            args: {
                _id : {type: GraphQLID},
                name: {type: GraphQLString}
            },
            resolve(parent,args){
                let role = new Role({
                    _id: args._id,
                    name: args.name
                });
                return role.save();
            }
        },
        addCluster:{
            type: ClusterType,
            args: {
                _id: {type: GraphQLID},
                name: {type: GraphQLString},
                parent_cluster_id: {type: GraphQLID},
                type: {type: GraphQLString}
            },
            resolve(parent,args){
                let cluster = new Cluster({
                    _id: args._id,
                    name: args.name,
                    parent_cluster_id: args.parent_cluster_id,
                    type: args.type
                });
                return cluster.save();
            }
        },
        updateMemberInfo: {
            type: MemberType,
            args: {
                _id: {type: GraphQLID},
                contact_info : {type: ContactInfoInputType},
                profession: { type: ProfessionInputType},
                batch: {type: GraphQLString},
                status: {type:GraphQLString},
                cluster_id: {type: GraphQLID},
                login_id: {type: GraphQLID}
            },
            resolve(parent,args){
               return updateMemberInfo(args);
            }
        },
        updateRoleOfUser:{
            type: UserType,
            args: {
                _id: {type: new GraphQLNonNull(GraphQLID)},
                role_id: {type: new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent,args){
                return User.findByIdAndUpdate({_id: args._id},{role_id: args.role_id},{upsert: true});
            }
        },
        updatePasswordOfUser:{ //use with cause,very insecure implementation
            type: UserType,
            args: {
                _id: {type: new GraphQLNonNull(GraphQLID)},
                password: {type: new GraphQLNonNull(GraphQLString)}
            },
            resolve(parent,args){
                return User.findByIdAndUpdate({_id: args._id},{password: generateSHA1(args.password)},{upsert: true});
            }
        }
    }
});

function generateSHA1(arg){
    const shasum = crypto.createHash('sha1');
    shasum.update(arg+CONST.SALT);
    return shasum.digest('hex');
}

async function login(user,password){
    let creds = await User.findById(user);
    if(creds._id){
        const found = (creds.password === generateSHA1(password));
        let role = await Role.findById(creds.role_id);
        return { success: found, role: found? role:{}};
    }else {
        return { success: false};
    }
}

async function updateMemberInfo(args){
    let member = await Member.findById(args._id);
    if(member){
        if(args.contact_info){
            member.contact_info = args.contact_info;
        }

        if(args.profession){
            member.profession =args.profession;
        }

        if(args.status){
            member.status = args.status;
        }

        if(args.cluster_id){
            member.cluster_id = args.cluster_id;
        }

        if(args.login_id){
            member.login_id = args.login_id;
        }

        return member.save();
    }else {
        return {}
    }
}

module.exports= new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});