"use client";
import { useForm } from "react-hook-form";
import { ZodType, z } from "zod";
import { Resolver, zodResolver } from "@hookform/resolvers/zod";

interface Iformprops {
  firstName: string;
  lastName: string;
  age: number;
  password: string;
  confirmPassword: string;
}

export default function Home() {
  const formSchema: ZodType<Iformprops> = z
    .object({
      firstName: z.string().min(3).max(30),
      lastName: z.string().min(4).max(30),
      age: z.number().min(18),
      password: z.string().min(5).max(50),
      confirmPassword: z.string().min(5).max(50),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "password do not match",
      path: ["confirmPassword"],
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Iformprops>({
    resolver: zodResolver(formSchema),
  });

  function submitData(data: Iformprops) {
    /* Techniquement si on fait un form c'est dans cette partie qu'on stoque bien dans la base de données */
    console.log("data retrieved from form", data);
  }

  return (
    <main className="items-center justify-center max-w-4xl px-4 mx-auto">
      <div className="mt-10 text-center underline ">
        <h1 className="text-4xl ">Test validation with zod w/ Zod library </h1>
      </div>
      <div className="p-2 py-36">
        <form onSubmit={handleSubmit(submitData)} className="form-control">
          <div className="flex flex-col h-full gap-4 border border-red-200">
            <label htmlFor="firstname">Firstname : </label>
            <input type="text" {...register("firstName")} />
            <label htmlFor="lastname">Lastname :</label>
            <input type="text" {...register("lastName")} />
            <label htmlFor="age">Age :</label>
            <input
              type="number"
              {...register("age", { valueAsNumber: true })}
            />
            <label htmlFor="password">Password :</label>
            <input type="password" {...register("password")} />
            <label htmlFor="confirmPassword">Confirm Password :</label>
            <input type="password" {...register("confirmPassword")} />
            <input
              className="items-center justify-center h-8 rounded-md mx-96 btn-primary"
              type="submit"
              value={"Send"}
            />
          </div>
        </form>
      </div>
    </main>
  );
}
