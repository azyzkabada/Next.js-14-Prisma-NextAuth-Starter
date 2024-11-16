'use client'

import { sendMail } from '@/actions/send-email'
import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import DOMPurify from 'dompurify'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

const contactFormSchema = z.object({
    name: z.string().min(2, { message: 'Please enter your name' }),
    sendTo: z
        .string()
        .email({ message: 'Please enter a valid recipient email' }),
    subject: z
        .string()
        .min(5, { message: 'Subject must be at least 5 characters long' }),
    text: z.string().min(10, {
        message: 'Please enter a message with at least 10 characters',
    }),
    html: z.string().optional(),
})

type ContactFormValues = z.infer<typeof contactFormSchema>

export default function ContactForm() {
    const form = useForm<ContactFormValues>({
        resolver: zodResolver(contactFormSchema),
        defaultValues: {
            name: '',
            sendTo: '',
            subject: '',
            text: '',
            html: '',
        },
    })

    const isLoading = form.formState.isSubmitting

    const onSubmit = async (values: ContactFormValues) => {
        const mailText = `Name: ${values.name}\nMessage: ${values.text}`
        const sanitizedHtml = values.html ? DOMPurify.sanitize(values.html) : ''

        try {
            const response = await sendMail({
                sendTo: values.sendTo,
                subject: values.subject,
                text: mailText,
                html: sanitizedHtml,
            })

            if (response?.messageId) {
                toast.success('Message sent successfully.')
                form.reset()
            } else {
                throw new Error('Failed to send message')
            }
        } catch (error) {
            console.error('Error:', error)
            toast.error('Failed to send message. Please try again later.')
        }
    }

    return (
        <Form {...form}>
            <form
                className="space-y-6 max-w-2xl mx-auto p-6 bg-card rounded-lg shadow-md"
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <h1 className="text-2xl font-bold text-center mb-6">
                    Contact Us
                </h1>

                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Your Name</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="John Doe"
                                    {...field}
                                    aria-label="Your name"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="sendTo"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Recipient's Email</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="recipient@example.com"
                                    {...field}
                                    type="email"
                                    aria-label="Recipient's email"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Subject</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter the subject"
                                    {...field}
                                    aria-label="Subject"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="text"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Message</FormLabel>
                            <FormControl>
                                <Textarea
                                    {...field}
                                    placeholder="Write your message here..."
                                    className="min-h-[100px]"
                                    aria-label="Message"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="html"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Optional HTML</FormLabel>
                            <FormControl>
                                <Textarea
                                    {...field}
                                    placeholder="<p>Your HTML content here</p>"
                                    className="min-h-[100px]"
                                    aria-label="Optional HTML content"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button
                    type="submit"
                    className="w-full"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Sending...
                        </>
                    ) : (
                        'Send Message'
                    )}
                </Button>
            </form>
        </Form>
    )
}
