"use client";

import { FieldInfo } from "@repo/web/components/form/field-info";
import { Button } from "@repo/web/components/ui/button";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@repo/web/components/ui/card";

import { Input } from "@repo/web/components/ui/input";
import { Label } from "@repo/web/components/ui/label";
import { BlockDTO } from "@repo/web/server/data/block/block.mapper";
import { api } from "@repo/web/trpc/react";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "node_modules/@tanstack/react-form/dist/esm/useForm";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

export function BlockForm({ block }: { block: BlockDTO | null }) {
  const router = useRouter();
  const autoSubmitTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const utils = api.useUtils();

  const { mutateAsync: createBlock } = api.block.create.useMutation();
  const { mutateAsync: updateBlock } = api.block.update.useMutation();

  const form = useForm({
    defaultValues: {
      id: block?.id ?? null,
      name: block?.name ?? "",
    },
    onSubmit: async ({ value }) => {
      if (!value.name.length) {
        return;
      }

      if (value.id) {
        await updateBlock({ id: value.id, name: value.name });
      } else {
        const createdBlockId = await createBlock({ name: value.name });

        if (!createdBlockId) {
          toast.error("Failed to create block");
          return;
        }

        router.push(`/blocks/${createdBlockId}`);
      }

      utils.block.list.invalidate();
    },
  });

  /**
   * Auto Submit
   */
  const handleFieldBlur = () => {
    if (autoSubmitTimeoutRef.current) {
      clearTimeout(autoSubmitTimeoutRef.current);
    }

    autoSubmitTimeoutRef.current = setTimeout(() => {
      form.handleSubmit();
    }, 2000);
  };

  useEffect(() => {
    return () => {
      if (autoSubmitTimeoutRef.current) {
        clearTimeout(autoSubmitTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (block) {
      form.setFieldValue("id", block.id);
      form.setFieldValue("name", block.name);
    }
  }, [block]);

  return (
    <form
      onSubmit={form.handleSubmit}
      className="flex flex-col gap-4 lg:col-span-2"
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-foreground flex items-center justify-between">
            {block?.id ? "Edit Block" : "New Block"}

            {block?.id && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  router.push("/blocks");
                }}
              >
                <Plus className="mr-2 h-4 w-4" />
                New
              </Button>
            )}
          </CardTitle>

          <CardDescription className="text-muted-foreground">
            {block?.id ? "Modify your existing block" : "Create a new block"}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4 text-slate-200">
          <form.Field
            name="name"
            children={(field) => (
              <div className="space-y-2">
                <Label htmlFor="title">Block name</Label>

                <Input
                  id="name"
                  placeholder="Block name"
                  value={field.state.value}
                  onBlur={() => {
                    field.handleBlur();
                    handleFieldBlur();
                  }}
                  onChange={(e) => field.handleChange(e.target.value)}
                />

                <FieldInfo field={field} />
              </div>
            )}
          />
        </CardContent>
      </Card>
    </form>
  );
}
