// TODO: return below line
// module.exports = [];

module.exports = {
  users: [
    {
      // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU5NzA1NTQ1LWMwZjEtNDQyNC05NmExLWJjZTRmZTY3MGFjZSIsImlhdCI6MTYyMDU3Nzk2OX0.vfUmfCTZ9pW9Y3H2S3y0pOULfLLE-DoVNo-7KxjSKlg
      id: '59705545-c0f1-4424-96a1-bce4fe670ace',
      username: 'username1',
      password: 'password1',
      type: 'consumer',
    },
    {
      // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImUwZDViYmQ1LTY0NTItNGRjOS05MjNmLTQ0Mjc3OTgwMDM0OSIsImlhdCI6MTYyMDU3Nzk5OX0.4n1giGMGvUK0OKbvoeYz_KDliekBZ2s58RhY6ZJvOvI
      id: 'e0d5bbd5-6452-4dc9-923f-442779800349',
      username: 'username2',
      password: 'password2',
      type: 'consumer',
    },
  ],
  rooms: [
    {
      id: 'f1cb25cb-daac-41d3-9f9d-3b91b0fa96da',
      userIds: [
        'e0d5bbd5-6452-4dc9-923f-442779800349',
      ],
      messages: [],
      type: 'consumer-to-consumer',
      chatInitiator: '59705545-c0f1-4424-96a1-bce4fe670ace',
    },
  ],
};
