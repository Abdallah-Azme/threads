"use server";

import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";

type Params = {
  userId: string;
  username: string;
  name: string;
  bio: string;
  image: string;
  path: string;
};

export async function updateUser({
  userId,
  username,
  name,
  bio,
  image,
  path,
}: Params) {
  connectToDB();
  try {
    await User.findOneAndUpdate(
      { id: userId },
      {
        username: username.toLocaleLowerCase(),
        name,
        bio,
        image,
        onboard: true,
      },
      { upsert: true }
    );

    if (path === "/profile/edit") {
      revalidatePath(path);
    }
  } catch (error: any) {
    throw new Error("Failed to update user", error);
  }
}

export async function fetchUser(userId: string) {
  connectToDB();
  try {
    return await User.findOne({ id: userId });
    // .populate({
    //   path : 'communities',
    //   model: Community
    // });
  } catch (error: any) {
    throw new Error("Failed to fetch user", error);
  }
}
