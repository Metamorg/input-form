import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Alert from "./Alert";
import React from "react";
import axios from "axios";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  description:z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

export default function UserForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      description: ""
    },
  });
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  function onSubmit(values: z.infer<typeof formSchema>) {
      const data = {
         user: `${values.username}`,
         description: `${values.description}`
    };
    const telegramApiUrl = `http://localhost:4200/telegram/send-message`;
    axios.post(telegramApiUrl, data)
      .then(response => {
        console.log('Telegram message sent successfully:', response.data);
      })
      .catch(error => {
        console.error('Error sending Telegram message:', error);
      });
    setIsModalOpen(true); 
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="description" {...field} />
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
           <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="username" {...field} />
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
      {isModalOpen && <Alert onClose={() => setIsModalOpen(false)} />}
    </Form>
  );
}