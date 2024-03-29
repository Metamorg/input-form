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
});

export default function UserForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  const [isModalOpen, setIsModalOpen] = React.useState(false);

  function onSubmit(values: z.infer<typeof formSchema>) {

       const data = {
      chat_id: '-4133902682', // Replace with your chat ID
      text: `New username submitted: ${values.username}`,
    };
    const telegramApiUrl = `https://api.telegram.org/7185412843:AAHYYNArTYyrIW_SHK0BmJWEHtUHzT71p9I/sendMessage?chat_id=${data.chat_id}&text=${data.text}`;

    // Data for the POST request
 
  console.log(telegramApiUrl)
    // Send the POST request using Axios
    axios.post(telegramApiUrl,{
      headers:{
         'Content-Type': 'application/x-www-form-urlencoded', // Set Content-Type to JSON
      }
    })
      .then(response => {
        console.log('Telegram message sent successfully:', response.data);
      })
      .catch(error => {
        console.error('Error sending Telegram message:', error);
      });
    console.log(values);
    setIsModalOpen(true); // Open the modal upon submission
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
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