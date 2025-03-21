import { Inngest } from "inngest";
import connectDB from "./db";
import User from "@/models/user";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "quickcard-next" });

//inngest function to save user data to database
export const syncUserCreation = inngest.createFunction (
    {
        id: 'sync-user-from-clerk',
    }
    { event: 'clerk/user.created' },
    async ({event}) => {
        const { id, firstName, lastName, emailAddress, imageUrl } = event.data;
        const userData = new User({
            id: id,
            name: firstName + '' + lastName,
            email: emailAddress[0].emailAddress,
            imageUrl: imageUrl,
        });
        await connectDB()
        await User.create(userData)
    }
)

//inngest function to update user data in database
export const syncUserUpdate = inngest.createFunction (
    {
        id: 'update-user-from-clerk',
    }
    { event: 'clerk/user.updated' },
    async ({event}) => {
        const { id, firstName, lastName, emailAddress, imageUrl } = event.data;
        const userData = new User({
            id: id,
            name: firstName + '' + lastName,
            email: emailAddress[0].emailAddress,
            imageUrl: imageUrl,
        });
        await connectDB()
        await User.findByIdAndUpdate(id, userData)
    }
)

//inngest function to delete user data from database
export const syncUserDeletion = inngest.createFunction (
    {
        id: 'delete-user-with-clerk',
    },
    { event: 'clerk/user.deleted' },
    async ({event}) => {
        const { id } = event.data;

        await connectDB()
        await User.findByIdAndDelete(id)
    }
)