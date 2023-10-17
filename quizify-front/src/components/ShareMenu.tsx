import React, { useCallback } from "react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ClipboardCheck,
  Copy,
  Facebook,
  Heart,
  Moon,
  Share2,
  Sun,
  Twitter,
} from "lucide-react";
import { SocialIcon } from "react-social-icons";
import { useToast } from "./ui/use-toast";
import Link from "next/link";

const ShareMenu = () => {
  const { toast } = useToast();

  const copyToClipboard = useCallback(() => {
    toast({
      title: "Success",
      description: (
        <>
          <ClipboardCheck className="h-4 w-4 inline-block" /> Copied to
          clipboard.
        </>
      ),
    });
  }, [toast]);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button>
          <Share2 className="h-4 w-4 inline-block mr-1" />
          <span className="text-sm text-bold">Share</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="py-3">
        <DropdownMenuItem>
          <Link
            href={`https://www.facebook.com/sharer.php?u=${window.location.href}`}
            target="_blank"
            rel="noreferrer"
          >
            <SocialIcon
              as="div"
              network="facebook"
              className="!h-6 !w-6 mr-2"
            />
            Facebook
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link
            href={`https://twitter.com/share?url=${window.location.href}`}
            target="_blank"
            rel="noreferrer"
          >
            <SocialIcon as="div" network="x" className="!h-6 !w-6 mr-2" />
            Twitter
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link
            href={`https://api.whatsapp.com/send?text=${window.location.href}`}
            target="_blank"
            rel="noreferrer"
          >
            <SocialIcon
              as="div"
              network="whatsapp"
              className="!h-6 !w-6 mr-2"
            />
            Whatsapp
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={copyToClipboard}>
          <Copy className="h-5 w-5 mr-2" />
          Copy to clipboard
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ShareMenu;
