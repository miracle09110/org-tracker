const SampleMember1 = {
    _id : 1,
    name :{
        first_name: "Name1",
        last_name: "LastName2",
        middle_initial: "T", 
        nickname: "Nickname1"
    },
    contact_info : {
        email: "Email1",
        phone_number: "Email2",
    },
    profession: { 
        job_title: "Title1",
        employer: "Employer1",
        field: "Field1"
    },
    date_of_birth: 123232424241,
    batch: "Batch",
    status: "Active",
    cluster_id: 4,
    login_id: "something"
}


const SampleMember2 = {
    _id : 2,
    name :{
        first_name: "Name2",
        last_name: "LastName2",
        middle_initial: "T", 
        nickname: "Nickname2"
    },
    contact_info : {
        email: "Email2",
        phone_number: "Email2",
    },
    profession: { 
        job_title: "Title2",
        employer: "Employer2",
        field: "Field2"
    },
    date_of_birth: 123232424241,
    batch: "Batch2",
    status: "Active2",
    cluster_id: 5,
    login_id: "trial@example.com"
}

const Members = [SampleMember1, SampleMember2];

const SampleUser1 = {
    _id: "something",
    password: "somehash",
    role_id: 1
}

const Users = [SampleUser1]

const SampleCluster1 = {
    _id: 1,
    name: "Cluster 1",
    parent_cluster_id: 0,
    type: "Main Cluster"

}

const SampleCluster2 = {
    _id: 2,
    name: "Cluster 2",
    parent_cluster_id: 0,
    type: "Main Cluster"
}

const SampleCluster3 = {
    _id: 3,
    name: "Cluster 3",
    parent_cluster_id: 1,
    type: "Sub Cluster"
}

const SampleCluster4 = {
    _id: 4,
    name: "Cluster 4",
    parent_cluster_id: 1,
    type: "Sub Cluster"
}

const SampleCluster5 = {
    _id: 5,
    name: "Cluster 4",
    parent_cluster_id: 2,
    type: "Sub Cluster"
}

const Clusters = [
    SampleCluster1,
    SampleCluster2,
    SampleCluster3,
    SampleCluster4,
    SampleCluster5
]

const Role1 = {
    _id: 1,
    name: 'Admin'
}

const Role2 = {
    _id: 2,
    name: 'User'
}

const Roles = [
    Role1,
    Role2
]

module.exports ={
    Users,
    Members,
    Clusters,
    Roles
}