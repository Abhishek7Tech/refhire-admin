"use server";
import {z} from "zod";

const ResumeSchema = z.object({
name: z.string().trim().min(2, {message: "Name should be longer than 2 characters."}),
email: z.string().trim().email({message: "Please enter a valid email address."}),
location: z.string()

})