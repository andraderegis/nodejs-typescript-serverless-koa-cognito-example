export type User = {
  id: string;
  username: string;
  email: string;
  password: string;
  group: string;
};

export class UsersRespository {
  private users: [User];

  constructor() {
    this.users = [
      {
        email: 'reginaldo.neves@mutual.club',
        password: 'regis123',
        id: '6a34a5b9-3264-4b83-b9b2-78baf52d6531',
        username: 'reginaldo.neves',
        group: 'borrower'
      }
    ];
  }

  findByUsername(username: string): User {
    return this.users.find(user => user.username === username);
  }
}
