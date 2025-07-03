import { Account, Avatars, Client, Databases, ID, Query } from 'react-native-appwrite';

export const config = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.rncourse.aora',
    projectId: '680b4864002f0c1a24df',
    databaseId: '680b4a90003294db62a1',
    userCollectionId: '680b4d2f0037a27e3f08',
    videoCollectonId: '680b4d5c001c1f75dfe4',
    storageId: '680b4fba003b3184a24f'
}

// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(config.endpoint) // Your Appwrite Endpoint
    .setProject(config.projectId) // Your project ID
    .setPlatform(config.platform) // Your application ID or bundle ID.
    ;



// Register User
const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (email, password, username) => {
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        )

        if (!newAccount) throw Error;

        const avatarUrl = avatars.getInitials(username);
        await signIn(email, password);

        const newUser = await databases.createDocument(
            config.databaseId,
            config.userCollectionId,
            ID.unique(), //create a unique id
            {
                accountId: newAccount.$id,
                email,
                username,
                avatar: avatarUrl
            }
        );

        return newUser;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

export const signIn = async (email, password) => {
    try {
        // Check for an existing session
        try {
            const currentSession = await account.getSession('current');
            if (currentSession) {
                await account.deleteSession('current');
            }
        } catch (sessionError) {
            // No session exists, continue
        }

        // Now create a new session
        const session = await account.createEmailPasswordSession(email, password);
        return session;
    } catch (error) {
        throw new Error(error);
    }
}

export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get();

        if (!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(
            config.databaseId, //db id
            config.userCollectionId, //collection name
            [Query.equal('accountId', currentAccount.$id)]
        )

        if (!currentUser) throw Error;

        return currentUser.documents[0];
    } catch (error) {
        console.log(error)
    }
}

export const logout = async () => {
    try {
        await account.deleteSession('current'); // Deletes the current session
        //   router.replace('/sign-in'); // Redirect to the sign-in page
    } catch (error) {
        //   Alert.alert('Error', error.message || 'Failed to log out');
    }
};