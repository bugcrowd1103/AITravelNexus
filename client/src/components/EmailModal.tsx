import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { useModalContext } from "@/context/ModalContext";
import confetti from "canvas-confetti"; // 🎉 Confetti import

// Schema validation
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters long" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  receiveUpdates: z.boolean().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function EmailModal() {
  const { isEmailModalOpen, closeEmailModal, openSuccessModal } = useModalContext();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      receiveUpdates: true,
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("early_access_subscribers").insert([
        {
          name: data.name,
          email: data.email,
        },
      ]);

      if (error) throw error;

      // 🎉 Trigger confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });

      reset();
      closeEmailModal();
      openSuccessModal();
    } catch (error: any) {
      console.error("Submission error:", error.message);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isEmailModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-[#7e30e1cc] via-[#ba49fccc] to-[#ff73a1cc] backdrop-blur-sm px-6"
        >
          {/* Watermark Text */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-45 text-[10vw] font-extrabold uppercase text-white/10 select-none pointer-events-none z-0">
            Triponic Early Access
          </div>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-white/80 backdrop-blur-xl shadow-2xl border border-white/30 rounded-3xl w-full max-w-md p-8 relative z-10"
          >
            <button
              onClick={closeEmailModal}
              className="absolute top-4 right-4 text-gray-600 hover:text-purple-600 transition"
              aria-label="Close modal"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-tr from-pink-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none">
                  <path d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-2xl font-extrabold tracking-tight text-gray-800">Get Early Access</h3>
              <p className="text-sm text-gray-500 mt-1">Be the first to try Triponic with AI + VR magic.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm text-gray-700">Full Name</label>
                <input
                  id="name"
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-3 rounded-lg border border-purple-200 focus:ring-2 focus:ring-purple-500 outline-none bg-white text-sm"
                  {...register("name")}
                />
                {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm text-gray-700">Email Address</label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-lg border border-purple-200 focus:ring-2 focus:ring-purple-500 outline-none bg-white text-sm"
                  {...register("email")}
                />
                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
              </div>

              <label className="flex items-center gap-2 text-sm text-gray-600">
                <input type="checkbox" className="accent-purple-600 rounded" {...register("receiveUpdates" as const)} />
                Keep me updated with latest travel experiences
              </label>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-semibold hover:brightness-110 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin h-4 w-4 mr-2 text-white" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.37 0 0 5.37 0 12h4zm2 5.29A7.96 7.96 0 014 12H0c0 3.04 1.13 5.82 3 7.94l3-2.65z" />
                    </svg>
                    Submitting...
                  </div>
                ) : (
                  "Join the Waitlist"
                )}
              </button>
            </form>

            <p className="text-center text-xs mt-6 text-gray-400">
              By signing up, you agree to our{" "}
              <span className="underline cursor-pointer hover:text-purple-600">Terms</span> &{" "}
              <span className="underline cursor-pointer hover:text-purple-600">Privacy Policy</span>.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
