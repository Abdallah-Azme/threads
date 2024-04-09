"use server";

import { revalidatePath } from "next/cache";
import Thread from "../models/thread.model";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";

type Params = {
  text: string;
  author: string;
  communityId: string | null;
  path: string;
};

export async function createThread({
  author,
  communityId,
  path,
  text,
}: Params) {
  try {
    connectToDB();
    const createdThread = await Thread.create({
      text,
      author,
      community: null,
    });

    await User.findByIdAndUpdate(author, {
      $push: { threads: createdThread._id },
    });
  } catch (error: any) {
    console.error({error});
    throw new Error("Error creating thread ");
  }
  revalidatePath(path);
}
