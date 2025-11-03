"use client";

import { ServerToastSchema } from "@/lib/schemas/config.schemas";
import { useEffect, useRef } from "react";
import { z } from "zod";
import { toast } from "./toaster";

type ServerNotificationConfig = z.infer<typeof ServerToastSchema>;

export default function ServerNotification(
  serverNotificationConfig: ServerNotificationConfig
) {
  const lastRendered = useRef<ServerNotificationConfig>(null);

  useEffect(() => {
    const { id, variant, position, description, message } =
      serverNotificationConfig;

    if (id !== lastRendered.current?.id) {
      toast[variant](message, { position, description });
    }
  }, [serverNotificationConfig]);

  return null;
}
