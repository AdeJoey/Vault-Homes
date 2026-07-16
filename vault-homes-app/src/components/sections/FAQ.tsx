"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { cn } from "@/lib/utils";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("border-b border-[#C8CBD4]", className)}
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between py-7 text-[18px] font-medium text-[#363631] transition-all text-left [&[data-state=open]>svg]:rotate-45",
        className
      )}
      {...props}
    >
      {children}
      {/* Plus icon — yellow, stays as + rotates to × when open */}
      <svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-1000 ease-in-out text-[#E5ED64] ml-4"
      >
        <path
          d="M11 2V20M2 11H20"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-[16px] text-gray-600 transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn("pb-6 pt-0", className)}>{children}</div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

const faqs = [
  {
    question: "How does Vault Homes work?",
    answer: "We connect discreet sellers with verified buyers through our private network. Properties are not publicly listed, ensuring total privacy."
  },
  {
    question: "Is my information kept private?",
    answer: "Absolutely. Discretion is our core value. We only share details with qualified, matched investors after initial vetting."
  },
  {
    question: "Do you work with homeowners and investors?",
    answer: "Yes, we facilitate transactions between both parties, ensuring mutually beneficial matches for high-value properties."
  },
  {
    question: "Is there a fee to submit a property?",
    answer: "No, submitting your property for review is entirely free. Fees are only discussed if we proceed with a transaction."
  },
  {
    question: "What areas in Lagos do you cover?",
    answer: "We focus on premium real estate locations across Lagos, specifically targeting high-demand, secure neighborhoods."
  },
  {
    question: "How quickly do you respond?",
    answer: "Our team typically reviews and responds to submissions within 24 to 48 hours."
  }
];

export function FAQSection() {
  return (
    <section className="bg-[#E0E3EA] min-h-screen w-full flex flex-col py-16 px-6 md:px-16">
      {/* FAQs pill — top-left */}
      <div className="mb-16">
        <div className="inline-flex px-6 py-2 rounded-full border border-gray-400 bg-[#E0E3EA]">
          <span className="text-[14px] font-medium text-gray-700 tracking-wide">FAQs</span>
        </div>
      </div>

      {/* Accordion — centred with generous left indent matching the design */}
      <div className="w-full max-w-[80%] mx-auto md:ml-[180px] flex flex-col gap-6">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
