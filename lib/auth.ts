import { auth } from "@/auth";

// Récupère l'utilisateur actuellement connecté
export const currentUser = async () => {
  const session = await auth();
  return session?.user;
};

// Récupère le rôle de l'utilisateur actuellement connecté
export const currentRole = async () => {
  const session = await auth();
  return session?.user.role;
};
