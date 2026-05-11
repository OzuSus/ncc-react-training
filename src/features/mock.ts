export type MockUser = {
  id: number;
  name: string;
  surname: string;
  userName: string;
  emailAddress: string;
  password: string;
};

export const mockUsers: MockUser[] = [
  {
    id: 1,
    name: 'Duoc',
    surname: 'Phung Van',
    userName: 'phungvanduoc',
    emailAddress: 'duoc.phungvan@ncc.asia',
    password: 'Duoc@1234',
  },
];

export function getUserByAuth(email: string, password: string) {
  return mockUsers.find(
    (user) =>
      user.emailAddress.toLowerCase() === email.toLowerCase() &&
      user.password === password,
  );
}
