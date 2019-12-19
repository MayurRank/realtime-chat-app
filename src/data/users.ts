export const users: any = [
  {
    "_id": {
        "$oid": "5d31cc22966e1937bc8b121a"
    },
    "first_name": "Pratik",
    "last_name": "V",
    "profile_url": "https://randomuser.me/api/portraits/men/1.jpg",
    "followers": [],
    "following": ["5d81de74368fde047657c20a"],
    "role": "user",
    "createdAt": {
        "$date": {
            "$numberLong": "1563544610574"
        }
    },
    "updatedAt": {
        "$date": {
            "$numberLong": "1573816806515"
        }
    },
    "activated": true
  },
  {
    "_id": {
        "$oid": "5d81de74368fde047657c20a"
    },
    "first_name": "Nilesh",
    "last_name": "A",
    "profile_url": "https://randomuser.me/api/portraits/men/2.jpg",
    "followers": ["5d31cc22966e1937bc8b121a"],
    "following": ["5d42ec2f6cf47883cad49a20"],
    "role": "user",
    "createdAt": {
        "$date": {
            "$numberLong": "1563544610574"
        }
    },
    "updatedAt": {
        "$date": {
            "$numberLong": "1573816806515"
        }
    },
    "activated": true
  },
  {
    "_id": {
        "$oid": "5d42ec2f6cf47883cad49a20"
    },
    "first_name": "Chandresh",
    "last_name": "D",
    "profile_url": "https://randomuser.me/api/portraits/men/3.jpg",
    "followers": ["5d81de74368fde047657c20a"],
    "following": [],
    "role": "user",
    "createdAt": {
        "$date": {
            "$numberLong": "1563544610574"
        }
    },
    "updatedAt": {
        "$date": {
            "$numberLong": "1573816806515"
        }
    },
    "activated": true
  },
  {
    "_id": {
        "$oid": "5d42ec2d3cf47883cad49a20"
    },
    "first_name": "Sawan",
    "last_name": "N",
    "profile_url": "https://randomuser.me/api/portraits/men/4.jpg",
    "followers": [],
    "following": [],
    "role": "user",
    "createdAt": {
        "$date": {
            "$numberLong": "1563544610574"
        }
    },
    "updatedAt": {
        "$date": {
            "$numberLong": "1573816806515"
        }
    },
    "activated": true
  },
  {
    "_id": {
        "$oid": "5d4c1ebf917e380c530fb33a"
    },
    "first_name": "Mayur",
    "last_name": "Rank",
    "profile_url": "https://randomuser.me/api/portraits/men/5.jpg",
    "followers": [],
    "following": [],
    "role": "admin",
    "createdAt": {
        "$date": {
            "$numberLong": "1563544610574"
        }
    },
    "updatedAt": {
        "$date": {
            "$numberLong": "1573816806515"
        }
    },
    "activated": true
  }
]