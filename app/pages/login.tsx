"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useFormStatus } from "react-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CardWrapper from "../sore/cardwrapper";
import { LoginSchema } from "../schema";
import { FaKey } from "react-icons/fa";
import { ReloadIcon } from "@radix-ui/react-icons";
import { startRegistration } from "@simplewebauthn/browser";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: z.infer<typeof LoginSchema>) => {
    setLoading(true);
    console.log(data);
  };

  const { pending } = useFormStatus();
  return (
    <CardWrapper
      label="Login to your account"
      title="Login"
      backButtonHref="/auth/register"
      backButtonLabel="Don't have an account? Register here."
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="alex@quadropic.com"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-center">
            <Button
              type="submit"
              className="w-fit px-4"
              disabled={pending || loading}
              onClick={() => {
                setLoading(true);
              }}
            >
              {loading ? (
                <div className="flex-row flex">
                  Getting it Ready
                  <ReloadIcon className="ml-2 h-4 w-4 animate-spin" />
                </div>
              ) : (
                <div className="flex-row flex">
                  Use Passkeys <FaKey className="ml-2" />
                </div>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default LoginForm;
