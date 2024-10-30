import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      userId: string;
      username: string;
      avatar: string | Avatar;
    };
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
  }
}

import "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    user: {
      userId: string;
      username: string;
      avatar: string | Avatar;
    };
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
  }
}

interface Avatar {
  folder: string;
  formatType: string;
  public_id: string;
  resourceType: string;
  tags: string[];
  url: string;
}
