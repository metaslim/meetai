"use client";

import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function Home() {

  const { 
    data: session, 
  } = authClient.useSession()

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async () => {
    await authClient.signUp.email({
      email,
      password,
      name,
    },
    {
      onRequest: (ctx) => {
        console.log(ctx);
          //show loading
      },
      onSuccess: (ctx) => {
        console.log(ctx);
        alert("User created successfully");
      },
      onError: (ctx) => {
        console.log(ctx);
        alert("Something went wrong");
      },
    });
  }

  const onLogin = async () => {
    await authClient.signIn.email({
      email,
      password,
    },
    {
      onRequest: (ctx) => {
        console.log(ctx);
          //show loading
      },
      onSuccess: (ctx) => {
        console.log(ctx);
      },
      onError: (ctx) => {
        console.log(ctx);
        alert("Something went wrong");
      },
    });
  }

  if (session) {
    return (
      <div className="p-4 flex flex-col gap-y-4">
        <p>Welcome {session.user.name}</p>
        <Button onClick={() => authClient.signOut()}>
          Sign Out
        </Button>
      </div>
    )
  }
  

  return (
    <div className="flex flex-col gap-y-10">
      <div className="p-4 flex flex-col gap-y-4">
        <Input 
          placeholder="Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
        />
        <Input 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <Input 
          placeholder="Password" 
          value={password} 
          type="password"
          onChange={(e) => setPassword(e.target.value)} 
        />
        
        <Button onClick={onSubmit}>
          Create User
        </Button>
      </div>

      <div className="p-4 flex flex-col gap-y-4">
        <Input 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <Input 
          placeholder="Password" 
          value={password} 
          type="password"
          onChange={(e) => setPassword(e.target.value)} 
        />
        
        <Button onClick={onLogin}>
          Login
        </Button>
      </div>
    </div>
  )
}