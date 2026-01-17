"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { CheckCircle } from "lucide-react"

export function ContactForm() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Missing fields",
        description: "Please fill out all required fields.",
        variant: "destructive"
      })
      return
    }

    setIsSubmitting(true)
    setIsSuccess(false)
    
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "7dfea26b-8d06-4988-b7e2-577ce7ce21ae", // Replace with your actual Web3Forms access key
          name: formData.name,
          email: formData.email,
          subject: formData.subject || "New Contact Form Submission",
          message: formData.message,
          from_website: window.location.hostname,
          form_subject: formData.subject || "Contact Form Submission"
        }),
      });
      
      const result = await response.json();
      
      if (result.success) {
        // Show toast notification
        toast({
          title: "Message Sent!",
          description: "Thank you for your message. I'll respond soon!",
          variant: "default",
          duration: 5000,
        });
        
        // Set success state
        setIsSuccess(true);
        
        // Reset form
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: ""
        });
      } else {
        throw new Error(result.message || 'Something went wrong');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong sending your message. Please try again.",
        variant: "destructive"
      })
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // If form was successfully submitted, show success message
  if (isSuccess) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4 sm:p-6 md:p-8 text-center space-y-2 sm:space-y-3 md:space-y-4"
      >
        <div className="flex justify-center">
          <CheckCircle className="h-10 w-10 sm:h-12 sm:w-12 md:h-16 md:w-16 text-green-500" />
        </div>
        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-green-700 dark:text-green-400">Message Sent!</h3>
        <p className="text-xs sm:text-sm md:text-base text-green-600 dark:text-green-300">
          Thank you for reaching out! I'll get back to you as soon as possible.
        </p>
        <Button 
          onClick={() => setIsSuccess(false)} 
          variant="outline"
          className="mt-2 sm:mt-4 text-xs sm:text-sm border-green-300 dark:border-green-700 hover:bg-green-100 dark:hover:bg-green-800/30"
        >
          Send Another Message
        </Button>
      </motion.div>
    );
  }

  return (
    <div className="relative z-10">
      <div className="bg-card/80 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl border border-primary/10 glowing-cursor-target">
        <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 sm:mb-6">Send Me Message</h3>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 md:space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
            <div>
              <label htmlFor="name" className="block text-xs font-medium text-muted-foreground mb-1 sm:mb-2">
                Your Name
              </label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Jon Smooth"
                className="h-9 sm:h-10 text-xs sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-xs font-medium text-muted-foreground mb-1 sm:mb-2">
                Your Email
              </label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="John@example.com"
                className="h-9 sm:h-10 text-xs sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label htmlFor="subject" className="block text-xs font-medium text-muted-foreground mb-1 sm:mb-2">
              Subject
            </label>
            <Input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Project Title"
              className="h-9 sm:h-10 text-xs sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-xs font-medium text-muted-foreground mb-1 sm:mb-2">
              Message
            </label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={4}
              placeholder="Hello, I'd like to talk about..."
              className="text-xs sm:text-sm min-h-[80px] sm:min-h-[100px] md:min-h-[120px]"
            />
          </div>

          <Button 
            type="submit" 
            variant="gradient" 
            disabled={isSubmitting} 
            className="w-full rounded-lg h-9 sm:h-10 text-xs sm:text-sm mt-2 sm:mt-0"
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-3 w-3 sm:h-3.5 sm:w-3.5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending...
              </span>
            ) : (
              "Send Message"
            )}
          </Button>
        </form>
      </div>
    </div>
  )
}

