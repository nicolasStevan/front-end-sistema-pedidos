"use client";

import { createContext, ReactNode, useState } from "react";
import { destroyCookie, setCookie } from "nookies";
import { useRouter } from "next/navigation";
import { api } from "../services/apiClient";

import { toast } from "react-toastify";

type AuthContextType = {
  user: UserProps | null;
  isAuthenticated: boolean;
  signIn: (credentials: SignInProps) => Promise<void>;
  signUp: (data: SignUpProps) => Promise<void>;
  signOut: () => void;
};

type UserProps = {
  id: string;
  name: string;
  email: string;
};

type SignInProps = {
  email: string;
  password: string;
};

type SignUpProps = {
  name: string;
  email: string;
  password: string;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps | null>(null);
  const isAuthenticated = !!user;
  const router = useRouter();

  async function signIn({ email, password }: SignInProps) {
  try {
    const response = await api.post("/login", { email, password });
    const { user: userData } = response.data;
    const token = userData.token;

    if (!token) {
      toast.error("Token não recebido. Tente novamente.");
      return;
    }

    setCookie(undefined, "nextauth.token", token, {
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    setUser({
      id: userData.id,
      name: userData.name,
      email: userData.email,
    });

    api.defaults.headers["Authorization"] = `Bearer ${token}`;

    toast.success("Login realizado com sucesso!", {
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

    console.log("Antes do push para dashboard");
    await router.push("/dashboard");
    console.log("Depois do push para dashboard");
  } catch (error: any) {
    toast.error("Erro ao fazer login. Verifique suas credenciais.", {
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    console.error("Error during sign in:", error);
  }
}

  async function signUp({ name, email, password }: SignUpProps) {
    try {
      const response = await api.post("/users", { name, email, password });
      console.log("User created:", response.data);

      toast.success("Cadastro realizado com sucesso!", {
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      router.push("/");
    } catch (error: any) {
      console.error("Error during sign up:", error);
      toast.error(
        error.response?.data?.message || "Erro ao cadastrar. Verifique seus dados.",
        {
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        }
      );
    }
  }

  function signOut() {
    try {
      destroyCookie(undefined, "nextauth.token", { path: "/" });
      destroyCookie(undefined, "nextauth.refreshToken", { path: "/" });
      setUser(null);
      router.push("/");
    } catch (error) {
      console.error("Error during sign out:", error);
      alert("Error during sign out. Please try again.");
    }
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, signIn, signUp, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}
