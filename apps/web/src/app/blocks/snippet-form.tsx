"use client";

import { Card, CardContent } from "@repo/web/components/ui/card";

import { Input } from "@repo/web/components/ui/input";
import { Label } from "@repo/web/components/ui/label";
import { Skeleton } from "@repo/web/components/ui/skeleton";
import { SnippetDTO } from "@repo/web/server/data/snippet/snippet.mapper";
import { useForm } from "@tanstack/react-form";
import { PlusIcon } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/web/components/ui/select";

import { FieldInfo } from "@repo/web/components/form/field-info";
import { Textarea } from "@repo/web/components/ui/textarea";
import { BlockDTO } from "@repo/web/server/data/block/block.mapper";
import { useEffect, useRef } from "react";
import { api } from "@repo/web/trpc/react";

const LANGUAGES = [
  { value: "typescript", label: "TypeScript" },
  { value: "go", label: "Go" },
  { value: "bash", label: "Bash" },
];

export function SnippetFormSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Skeleton className="h-[15px] w-[100px]" />
                <Skeleton className="h-[30px] w-full" />
              </div>

              <div className="space-y-2">
                <Skeleton className="h-[15px] w-[100px]" />
                <Skeleton className="h-[30px] w-full" />
              </div>

              <div className="space-y-2">
                <Skeleton className="h-[15px] w-[100px]" />
                <Skeleton className="h-[250px] w-full" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function SnippetForm({ block }: { block: BlockDTO | null }) {
  const autoSubmitTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { mutateAsync: saveSnippets } = api.snippet.save.useMutation();

  const form = useForm({
    defaultValues: {
      snippets: block?.snippets ?? [
        {
          id: 0,
          blockId: block?.id ?? 0,
          name: "",
          content: "",
          language: "typescript",
        },
      ],
    },
    onSubmit: async ({ value }) => {
      const existingSnippets = block?.snippets ?? [];

      // TODO: delete snippet

      const snippets = value.snippets.filter((snippet) => {
        const existingSnippet = existingSnippets.find(
          (s) => s.id === snippet.id,
        );

        if (existingSnippet) {
          return (
            existingSnippet?.name !== snippet.name ||
            existingSnippet?.content !== snippet.content ||
            existingSnippet?.language !== snippet.language
          );
        }

        return snippet.name.length > 0;
      });

      if (snippets.length === 0) {
        return;
      }

      await saveSnippets({
        blockId: block?.id ?? 0,
        snippets,
      });
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

  return (
    <form
      onSubmit={form.handleSubmit}
      className="flex flex-col gap-4 lg:col-span-2"
    >
      <form.Field
        name="snippets"
        children={(field) => (
          <div className="flex flex-col gap-4">
            {field.state.value.map((_, i) => (
              <Card key={i}>
                <CardContent className="text-foreground space-y-4">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <form.Field
                        name={`snippets[${i}].name`}
                        children={(field) => (
                          <div className="space-y-2">
                            <Label htmlFor="title">Snippet name</Label>
                            <Input
                              id="title"
                              placeholder="Snippet name"
                              value={field.state.value}
                              onBlur={() => {
                                field.handleBlur();
                                handleFieldBlur();
                              }}
                              onChange={(e) =>
                                field.handleChange(e.target.value)
                              }
                            />
                            <FieldInfo field={field} />
                          </div>
                        )}
                      />

                      <form.Field
                        name={`snippets[${i}].language`}
                        children={(languageField) => (
                          <div className="space-y-2">
                            <Label htmlFor="language">Language</Label>

                            <Select
                              defaultValue={languageField.state.value}
                              value={languageField.state.value}
                              onValueChange={(value) => {
                                if (value) {
                                  languageField.handleChange(value);
                                  handleFieldBlur();
                                }
                              }}
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select language" />
                              </SelectTrigger>
                              <SelectContent>
                                {LANGUAGES.map((lang) => (
                                  <SelectItem
                                    key={lang.value}
                                    value={lang.value}
                                  >
                                    {lang.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FieldInfo field={languageField} />
                          </div>
                        )}
                      />
                    </div>

                    <form.Field
                      name={`snippets[${i}].content`}
                      children={(field) => (
                        <div className="space-y-2">
                          <Label htmlFor="content">Code</Label>

                          <Textarea
                            id="content"
                            placeholder="Enter your code here..."
                            value={field.state.value}
                            onBlur={() => {
                              field.handleBlur();
                              handleFieldBlur();
                            }}
                            onChange={(e) => field.handleChange(e.target.value)}
                            className="min-h-[250px] bg-purple-950 font-mono text-sm"
                          />

                          <FieldInfo field={field} />
                        </div>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}

            <button
              type="button"
              onClick={() =>
                field.pushValue({
                  id: 0,
                  blockId: block?.id ?? 0,
                  name: "",
                  content: "",
                  language: "typescript",
                })
              }
              className="flex cursor-pointer items-center justify-center hover:bg-transparent"
            >
              <PlusIcon className="h-6 w-6" />
            </button>
          </div>
        )}
      />
    </form>
  );
}
