import { jsx, jsxs } from "react/jsx-runtime";
import React, { Fragment, forwardRef, createElement, createContext, useContext, useState, useCallback, useRef, useMemo, useEffect, useImperativeHandle  } from "react";
import { useNavigate, useSearchParams, useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useUserProfiles } from "@/hooks/useUserProfiles";
import { useUserProfiles as useUserProfiles2 } from "@/hooks/useUserProfiles";
import { useUserManagement } from "@/hooks/useUserManagement";
import { useUserManagement as useUserManagement2 } from "@/hooks/useUserManagement";
import { useUserRole } from "@/hooks/useUserRole";
import { useUserRole as useUserRole2 } from "@/hooks/useUserRole";
import { useViewPreference } from "@/hooks/useViewPreference";
import { useViewPreference as useViewPreference2 } from "@/hooks/useViewPreference";
import { getCurrentClientId, supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Input } from "@/components/ui/input";
import { DeleteUserDialog } from "@/components/ui/delete-user-dialog";
import { toast as toast$1, useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useUserDepartments, USER_DEPARTMENTS_KEY } from "@/hooks/useUserDepartments";
import { useUserDepartments as useUserDepartments2 } from "@/hooks/useUserDepartments";
import { useUserProfileRoles } from "@/hooks/useUserProfileRoles";
import { useUserProfileRoles as useUserProfileRoles2 } from "@/hooks/useUserProfileRoles";
import { EditableTable } from "@/components/ui/editable-table";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useAuth } from "staysecure-auth";
import { useDropzone } from "react-dropzone";
import Papa from "papaparse";
import { ImportErrorReport as ImportErrorReport$1 } from "@/components/import/ImportErrorReport";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { useManagerPermissions } from "@/hooks/useManagerPermissions";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useReactToPrint } from "react-to-print";
import { Separator } from "@/components/ui/separator";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";
import { toast as toast$2 } from "sonner";
import { cn } from "@/lib/utils";
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import HardwareInventory from "@/components/HardwareInventory";
import SoftwareAccounts from "@/components/SoftwareAccounts";
import { useInventory } from "@/hooks/useInventory";
import { useUserAssets } from "@/hooks/useUserAssets";
import { useUserAssets as useUserAssets2 } from "@/hooks/useUserAssets";
import { Progress } from "@/components/ui/progress";
import { sendNotificationByEvent } from "staysecure-notifications";
import LearningTracksTab from "@/components/LearningTracksTab";
import { useUserRoleById } from "@/hooks/useUserRoleById";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useProfile } from "@/hooks/useProfile";
import { useUserPhysicalLocations } from "@/hooks/useUserPhysicalLocations";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
const mergeClasses = (...classes) => classes.filter((className, index, array) => {
  return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
}).join(" ").trim();
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Icon = forwardRef(
  ({
    color = "currentColor",
    size = 24,
    strokeWidth = 2,
    absoluteStrokeWidth,
    className = "",
    children,
    iconNode,
    ...rest
  }, ref) => {
    return createElement(
      "svg",
      {
        ref,
        ...defaultAttributes,
        width: size,
        height: size,
        stroke: color,
        strokeWidth: absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
        className: mergeClasses("lucide", className),
        ...rest
      },
      [
        ...iconNode.map(([tag, attrs]) => createElement(tag, attrs)),
        ...Array.isArray(children) ? children : [children]
      ]
    );
  }
);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const createLucideIcon = (iconName, iconNode) => {
  const Component = forwardRef(
    ({ className, ...props }, ref) => createElement(Icon, {
      ref,
      iconNode,
      className: mergeClasses(`lucide-${toKebabCase(iconName)}`, className),
      ...props
    })
  );
  Component.displayName = `${iconName}`;
  return Component;
};
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ArrowDown = createLucideIcon("ArrowDown", [
  ["path", { d: "M12 5v14", key: "s699le" }],
  ["path", { d: "m19 12-7 7-7-7", key: "1idqje" }]
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ArrowLeft = createLucideIcon("ArrowLeft", [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ArrowUp = createLucideIcon("ArrowUp", [
  ["path", { d: "m5 12 7-7 7 7", key: "hav0vg" }],
  ["path", { d: "M12 19V5", key: "x0mq9r" }]
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Award = createLucideIcon("Award", [
  [
    "path",
    {
      d: "m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526",
      key: "1yiouv"
    }
  ],
  ["circle", { cx: "12", cy: "8", r: "6", key: "1vp47v" }]
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const BookOpen = createLucideIcon("BookOpen", [
  ["path", { d: "M12 7v14", key: "1akyts" }],
  [
    "path",
    {
      d: "M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",
      key: "ruj8y"
    }
  ]
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Briefcase = createLucideIcon("Briefcase", [
  ["path", { d: "M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16", key: "jecpp" }],
  ["rect", { width: "20", height: "14", x: "2", y: "6", rx: "2", key: "i6l2r4" }]
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Building2 = createLucideIcon("Building2", [
  ["path", { d: "M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z", key: "1b4qmf" }],
  ["path", { d: "M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2", key: "i71pzd" }],
  ["path", { d: "M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2", key: "10jefs" }],
  ["path", { d: "M10 6h4", key: "1itunk" }],
  ["path", { d: "M10 10h4", key: "tcdvrf" }],
  ["path", { d: "M10 14h4", key: "kelpxr" }],
  ["path", { d: "M10 18h4", key: "1ulq68" }]
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Building = createLucideIcon("Building", [
  ["rect", { width: "16", height: "20", x: "4", y: "2", rx: "2", ry: "2", key: "76otgf" }],
  ["path", { d: "M9 22v-4h6v4", key: "r93iot" }],
  ["path", { d: "M8 6h.01", key: "1dz90k" }],
  ["path", { d: "M16 6h.01", key: "1x0f13" }],
  ["path", { d: "M12 6h.01", key: "1vi96p" }],
  ["path", { d: "M12 10h.01", key: "1nrarc" }],
  ["path", { d: "M12 14h.01", key: "1etili" }],
  ["path", { d: "M16 10h.01", key: "1m94wz" }],
  ["path", { d: "M16 14h.01", key: "1gbofw" }],
  ["path", { d: "M8 10h.01", key: "19clt8" }],
  ["path", { d: "M8 14h.01", key: "6423bh" }]
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Calendar = createLucideIcon("Calendar", [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }]
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ChartColumn = createLucideIcon("ChartColumn", [
  ["path", { d: "M3 3v16a2 2 0 0 0 2 2h16", key: "c24i48" }],
  ["path", { d: "M18 17V9", key: "2bz60n" }],
  ["path", { d: "M13 17V5", key: "1frdt8" }],
  ["path", { d: "M8 17v-3", key: "17ska0" }]
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Check = createLucideIcon("Check", [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ChevronRight = createLucideIcon("ChevronRight", [
  ["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ChevronsUpDown = createLucideIcon("ChevronsUpDown", [
  ["path", { d: "m7 15 5 5 5-5", key: "1hf1tw" }],
  ["path", { d: "m7 9 5-5 5 5", key: "sgt6xg" }]
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const CircleAlert = createLucideIcon("CircleAlert", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const CircleCheckBig = createLucideIcon("CircleCheckBig", [
  ["path", { d: "M21.801 10A10 10 0 1 1 17 3.335", key: "yps3ct" }],
  ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }]
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Circle = createLucideIcon("Circle", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Clock = createLucideIcon("Clock", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["polyline", { points: "12 6 12 12 16 14", key: "68esgv" }]
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Download = createLucideIcon("Download", [
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
  ["polyline", { points: "7 10 12 15 17 10", key: "2ggqvy" }],
  ["line", { x1: "12", x2: "12", y1: "15", y2: "3", key: "1vk2je" }]
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ExternalLink = createLucideIcon("ExternalLink", [
  ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
  ["path", { d: "M10 14 21 3", key: "gplh6r" }],
  ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6", key: "a6xqqp" }]
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const EyeOff = createLucideIcon("EyeOff", [
  [
    "path",
    {
      d: "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",
      key: "ct8e1f"
    }
  ],
  ["path", { d: "M14.084 14.158a3 3 0 0 1-4.242-4.242", key: "151rxh" }],
  [
    "path",
    {
      d: "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",
      key: "13bj9a"
    }
  ],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }]
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Eye = createLucideIcon("Eye", [
  [
    "path",
    {
      d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
      key: "1nclc0"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const FileText = createLucideIcon("FileText", [
  ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z", key: "1rqfz7" }],
  ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
  ["path", { d: "M10 9H8", key: "b1mrlr" }],
  ["path", { d: "M16 13H8", key: "t4e002" }],
  ["path", { d: "M16 17H8", key: "z1uh3a" }]
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Globe = createLucideIcon("Globe", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20", key: "13o1zl" }],
  ["path", { d: "M2 12h20", key: "9i4pu4" }]
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const GraduationCap = createLucideIcon("GraduationCap", [
  [
    "path",
    {
      d: "M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z",
      key: "j76jl0"
    }
  ],
  ["path", { d: "M22 10v6", key: "1lu8f3" }],
  ["path", { d: "M6 12.5V16a6 3 0 0 0 12 0v-3.5", key: "1r8lef" }]
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Hash = createLucideIcon("Hash", [
  ["line", { x1: "4", x2: "20", y1: "9", y2: "9", key: "4lhtct" }],
  ["line", { x1: "4", x2: "20", y1: "15", y2: "15", key: "vyu0kd" }],
  ["line", { x1: "10", x2: "8", y1: "3", y2: "21", key: "1ggp8o" }],
  ["line", { x1: "16", x2: "14", y1: "3", y2: "21", key: "weycgp" }]
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const IdCard = createLucideIcon("IdCard", [
  ["path", { d: "M16 10h2", key: "8sgtl7" }],
  ["path", { d: "M16 14h2", key: "epxaof" }],
  ["path", { d: "M6.17 15a3 3 0 0 1 5.66 0", key: "n6f512" }],
  ["circle", { cx: "9", cy: "11", r: "2", key: "yxgjnd" }],
  ["rect", { x: "2", y: "5", width: "20", height: "14", rx: "2", key: "qneu4z" }]
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Image = createLucideIcon("Image", [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2", key: "1m3agn" }],
  ["circle", { cx: "9", cy: "9", r: "2", key: "af1f0g" }],
  ["path", { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21", key: "1xmnt7" }]
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Info = createLucideIcon("Info", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 16v-4", key: "1dtifu" }],
  ["path", { d: "M12 8h.01", key: "e9boi3" }]
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const KeyRound = createLucideIcon("KeyRound", [
  [
    "path",
    {
      d: "M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z",
      key: "1s6t7t"
    }
  ],
  ["circle", { cx: "16.5", cy: "7.5", r: ".5", fill: "currentColor", key: "w0ekpg" }]
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Key = createLucideIcon("Key", [
  ["path", { d: "m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4", key: "g0fldk" }],
  ["path", { d: "m21 2-9.6 9.6", key: "1j0ho8" }],
  ["circle", { cx: "7.5", cy: "15.5", r: "5.5", key: "yqb3hr" }]
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Laptop = createLucideIcon("Laptop", [
  [
    "path",
    {
      d: "M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16",
      key: "tarvll"
    }
  ]
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const LayoutGrid = createLucideIcon("LayoutGrid", [
  ["rect", { width: "7", height: "7", x: "3", y: "3", rx: "1", key: "1g98yp" }],
  ["rect", { width: "7", height: "7", x: "14", y: "3", rx: "1", key: "6d4xhi" }],
  ["rect", { width: "7", height: "7", x: "14", y: "14", rx: "1", key: "nxv5o0" }],
  ["rect", { width: "7", height: "7", x: "3", y: "14", rx: "1", key: "1bb6yr" }]
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Link = createLucideIcon("Link", [
  ["path", { d: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71", key: "1cjeqo" }],
  ["path", { d: "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71", key: "19qd67" }]
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const List = createLucideIcon("List", [
  ["path", { d: "M3 12h.01", key: "nlz23k" }],
  ["path", { d: "M3 18h.01", key: "1tta3j" }],
  ["path", { d: "M3 6h.01", key: "1rqtza" }],
  ["path", { d: "M8 12h13", key: "1za7za" }],
  ["path", { d: "M8 18h13", key: "1lx6n3" }],
  ["path", { d: "M8 6h13", key: "ik3vkj" }]
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const LoaderCircle = createLucideIcon("LoaderCircle", [
  ["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Mail = createLucideIcon("Mail", [
  ["rect", { width: "20", height: "16", x: "2", y: "4", rx: "2", key: "18n3k1" }],
  ["path", { d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7", key: "1ocrg3" }]
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const MapPin = createLucideIcon("MapPin", [
  [
    "path",
    {
      d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",
      key: "1r0f0z"
    }
  ],
  ["circle", { cx: "12", cy: "10", r: "3", key: "ilqhr7" }]
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const MonitorSmartphone = createLucideIcon("MonitorSmartphone", [
  ["path", { d: "M18 8V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h8", key: "10dyio" }],
  ["path", { d: "M10 19v-3.96 3.15", key: "1irgej" }],
  ["path", { d: "M7 19h5", key: "qswx4l" }],
  ["rect", { width: "6", height: "10", x: "16", y: "12", rx: "2", key: "1egngj" }]
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Network = createLucideIcon("Network", [
  ["rect", { x: "16", y: "16", width: "6", height: "6", rx: "1", key: "4q2zg0" }],
  ["rect", { x: "2", y: "16", width: "6", height: "6", rx: "1", key: "8cvhb9" }],
  ["rect", { x: "9", y: "2", width: "6", height: "6", rx: "1", key: "1egb70" }],
  ["path", { d: "M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3", key: "1jsf9p" }],
  ["path", { d: "M12 12V8", key: "2874zd" }]
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Phone = createLucideIcon("Phone", [
  [
    "path",
    {
      d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z",
      key: "foiqr5"
    }
  ]
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Play = createLucideIcon("Play", [
  ["polygon", { points: "6 3 20 12 6 21 6 3", key: "1oa8hb" }]
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Plus = createLucideIcon("Plus", [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Printer = createLucideIcon("Printer", [
  [
    "path",
    {
      d: "M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2",
      key: "143wyd"
    }
  ],
  ["path", { d: "M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6", key: "1itne7" }],
  ["rect", { x: "6", y: "14", width: "12", height: "8", rx: "1", key: "1ue0tg" }]
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const RotateCcw = createLucideIcon("RotateCcw", [
  ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }]
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Save = createLucideIcon("Save", [
  [
    "path",
    {
      d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
      key: "1c8476"
    }
  ],
  ["path", { d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7", key: "1ydtos" }],
  ["path", { d: "M7 3v4a1 1 0 0 0 1 1h7", key: "t51u73" }]
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Search = createLucideIcon("Search", [
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
  ["path", { d: "m21 21-4.3-4.3", key: "1qie3q" }]
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Settings = createLucideIcon("Settings", [
  [
    "path",
    {
      d: "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",
      key: "1qme2f"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ShieldCheck = createLucideIcon("ShieldCheck", [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ShieldOff = createLucideIcon("ShieldOff", [
  ["path", { d: "m2 2 20 20", key: "1ooewy" }],
  [
    "path",
    {
      d: "M5 5a1 1 0 0 0-1 1v7c0 5 3.5 7.5 7.67 8.94a1 1 0 0 0 .67.01c2.35-.82 4.48-1.97 5.9-3.71",
      key: "1jlk70"
    }
  ],
  [
    "path",
    {
      d: "M9.309 3.652A12.252 12.252 0 0 0 11.24 2.28a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1v7a9.784 9.784 0 0 1-.08 1.264",
      key: "18rp1v"
    }
  ]
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Shield = createLucideIcon("Shield", [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ]
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const SquarePen = createLucideIcon("SquarePen", [
  ["path", { d: "M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7", key: "1m0v6g" }],
  [
    "path",
    {
      d: "M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z",
      key: "ohrbg2"
    }
  ]
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Star = createLucideIcon("Star", [
  [
    "path",
    {
      d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
      key: "r04s7s"
    }
  ]
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Trash2 = createLucideIcon("Trash2", [
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6", key: "4alrt4" }],
  ["path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2", key: "v07s0e" }],
  ["line", { x1: "10", x2: "10", y1: "11", y2: "17", key: "1uufr5" }],
  ["line", { x1: "14", x2: "14", y1: "11", y2: "17", key: "xtxkd" }]
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const TrendingUp = createLucideIcon("TrendingUp", [
  ["polyline", { points: "22 7 13.5 15.5 8.5 10.5 2 17", key: "126l90" }],
  ["polyline", { points: "16 7 22 7 22 13", key: "kwv8wd" }]
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const TriangleAlert = createLucideIcon("TriangleAlert", [
  [
    "path",
    {
      d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
      key: "wmoenq"
    }
  ],
  ["path", { d: "M12 9v4", key: "juzpu7" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Upload = createLucideIcon("Upload", [
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
  ["polyline", { points: "17 8 12 3 7 8", key: "t8dd8p" }],
  ["line", { x1: "12", x2: "12", y1: "3", y2: "15", key: "widbto" }]
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const UserCheck = createLucideIcon("UserCheck", [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }],
  ["polyline", { points: "16 11 18 13 22 9", key: "1pwet4" }]
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const User = createLucideIcon("User", [
  ["path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2", key: "975kel" }],
  ["circle", { cx: "12", cy: "7", r: "4", key: "17ys0d" }]
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Users = createLucideIcon("Users", [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }],
  ["path", { d: "M22 21v-2a4 4 0 0 0-3-3.87", key: "kshegd" }],
  ["path", { d: "M16 3.13a4 4 0 0 1 0 7.75", key: "1da9ce" }]
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const X = createLucideIcon("X", [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
]);
const OrganisationContext = createContext(null);
const defaultPermissions = {
  canCreateUsers: true,
  canEditUsers: true,
  canDeleteUsers: true,
  canManageRoles: true,
  canManageDepartments: true,
  canManageLocations: true,
  canManageCertificates: true,
  canManageProfile: true
};
const defaultEnabledTabs = ["users", "roles", "departments", "locations", "certificates", "profile"];
const OrganisationProvider = ({ config, children }) => {
  const isTabEnabled = (tab) => {
    const enabledTabs = config.enabledTabs || defaultEnabledTabs;
    return enabledTabs.includes(tab);
  };
  const hasPermission = (permission) => {
    const permissions = { ...defaultPermissions, ...config.permissions };
    return permissions[permission] ?? true;
  };
  const contextValue = {
    ...config,
    isTabEnabled,
    hasPermission
  };
  return /* @__PURE__ */ jsx(OrganisationContext.Provider, { value: contextValue, children });
};
const useOrganisationContext = () => {
  const context = useContext(OrganisationContext);
  if (!context) {
    throw new Error("useOrganisationContext must be used within OrganisationProvider");
  }
  return context;
};
const isEnabled = () => typeof window !== "undefined" && !!window.__DEBUG__;
const debug = {
  /** Log a debug message (only when debug mode is on) */
  log: (...args) => {
    if (isEnabled()) console.debug("[ORG]", ...args);
  },
  /** Log a warning (only when debug mode is on) */
  warn: (...args) => {
    if (isEnabled()) console.warn("[ORG]", ...args);
  },
  /** Log an error (always logs — errors are always important) */
  error: (...args) => {
    console.error("[ORG]", ...args);
  },
  /** Log a state change (only when debug mode is on) */
  state: (label, value) => {
    if (isEnabled()) console.debug("[ORG:state]", label, value);
  }
};
const handleSaveUser = async (editingUser, updateProfile, onSuccess) => {
  try {
    await updateProfile(editingUser.id, editingUser);
    toast({
      title: "Success",
      description: "User updated successfully"
    });
    onSuccess();
  } catch (error) {
    toast({
      title: "Error",
      description: error.message,
      variant: "destructive"
    });
  }
};
const handleCreateUser = async (supabaseClient, newUser, updateProfile, onSuccess) => {
  var _a;
  try {
    const clientId = getCurrentClientId();
    const clientPath = clientId ? `/${clientId}` : "";
    const { data: sessionData, error: sessionError } = await supabaseClient.auth.getSession();
    if (sessionError || !((_a = sessionData == null ? void 0 : sessionData.session) == null ? void 0 : _a.access_token)) {
      throw new Error("Unable to determine current session. Please refresh and try again.");
    }
    debug.log("[handleCreateUser] Invoking create-user Edge Function", {
      clientId,
      hasAccessToken: !!sessionData.session.access_token
    });
    const { data, error } = await supabaseClient.functions.invoke("create-user", {
      body: {
        email: newUser.email,
        full_name: newUser.full_name,
        first_name: newUser.first_name || "",
        last_name: newUser.last_name || "",
        username: "",
        phone: newUser.phone || "",
        location: newUser.location || "",
        location_id: newUser.location_id || null,
        status: "Pending",
        access_level: newUser.access_level || "User",
        bio: newUser.bio || "",
        employee_id: newUser.employee_id || "",
        clientPath
        // Pass client path explicitly
      }
    });
    if (error) {
      console.error("[handleCreateUser] Edge Function error:", error);
      throw new Error(error.message || "Failed to create user");
    }
    if (data == null ? void 0 : data.error) {
      console.error("[handleCreateUser] Edge Function returned error:", data.error);
      console.error("[handleCreateUser] Full Edge Function response:", data);
      throw new Error(data.error);
    }
    if (!data || !data.user) {
      throw new Error("No user data returned from create-user function");
    }
    const { user } = data;
    if (user == null ? void 0 : user.id) {
      await updateProfile(user.id, {
        full_name: newUser.full_name,
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        username: newUser.email,
        phone: newUser.phone,
        location: newUser.location,
        location_id: newUser.location_id || null,
        // Don't update status - Edge Function sets it to 'Pending' for activation
        language: newUser.language,
        bio: newUser.bio,
        employee_id: newUser.employee_id,
        manager: newUser.manager || null
      });
      if (newUser.location_id) {
        try {
          const locationData = {
            user_id: user.id,
            location_id: newUser.location_id,
            full_name: newUser.full_name,
            access_purpose: "General Access",
            status: "Active",
            date_access_created: (/* @__PURE__ */ new Date()).toISOString()
          };
          const { error: locationError } = await supabaseClient.from("physical_location_access").insert(locationData).select();
          if (locationError) {
            console.error("❌ Error assigning physical location access:", locationError);
          }
        } catch (locationError) {
          console.error("❌ Exception assigning physical location access:", locationError);
        }
      }
    }
    toast({
      title: "Success",
      description: "User created successfully"
    });
    onSuccess();
  } catch (error) {
    console.error("Error creating user:", error);
    toast({
      title: "Error",
      description: error.message || "Failed to create user",
      variant: "destructive"
    });
  }
};
const handleDeleteUser = async (supabaseClient, userId, userName, reason) => {
  try {
    const { data, error } = await supabaseClient.functions.invoke("delete-user", {
      body: {
        userId,
        reason: reason || void 0
      }
    });
    if (error) {
      console.error("[handleDeleteUser] Edge Function invocation error:", error);
      const errorMessage = error.message || "Failed to delete user";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      });
      return { success: false, error: errorMessage };
    }
    if (!data || !data.success) {
      const errorMessage = (data == null ? void 0 : data.error) || "Failed to delete user";
      console.error("[handleDeleteUser] Edge Function returned error:", errorMessage);
      console.error("[handleDeleteUser] Full Edge Function response:", data);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      });
      return { success: false, error: errorMessage };
    }
    return { success: true, deletedUser: data.deletedUser };
  } catch (error) {
    console.error("[handleDeleteUser] Exception:", error);
    const errorMessage = (error == null ? void 0 : error.message) || "Failed to delete user";
    toast({
      title: "Error",
      description: errorMessage,
      variant: "destructive"
    });
    return { success: false, error: errorMessage };
  }
};
const DepartmentRolePairsDisplay = ({ userId }) => {
  const { userDepartments, isLoading: deptLoading } = useUserDepartments(userId);
  const { userRoles, isLoading: rolesLoading } = useUserProfileRoles(userId);
  const isLoading = deptLoading || rolesLoading;
  const primaryDepartment = (userDepartments || []).find((d) => d.is_primary);
  const primaryRole = (userRoles || []).find((r) => r.is_primary);
  const displayText = React.useMemo(() => {
    const parts = [];
    if (primaryDepartment == null ? void 0 : primaryDepartment.department_name) {
      parts.push(primaryDepartment.department_name);
    }
    if (primaryRole == null ? void 0 : primaryRole.role_name) {
      parts.push(primaryRole.role_name);
    }
    return parts.join(" - ");
  }, [primaryDepartment, primaryRole]);
  if (isLoading && userId) {
    return /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "Loading..." });
  }
  if (!displayText) {
    return /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "No assignments" });
  }
  return /* @__PURE__ */ jsx(Badge, { variant: "secondary", className: "text-xs", children: displayText });
};
const UserCard = ({ user, onDelete }) => {
  var _a;
  const navigate = useNavigate();
  const { basePath } = useOrganisationContext();
  const initials = user.full_name ? user.full_name.split(" ").map((n) => n.charAt(0)).join("").slice(0, 2) : ((_a = user.username) == null ? void 0 : _a.slice(0, 2)) || "U";
  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-500";
      case "Inactive":
        return "bg-red-500";
      case "OnLeave":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };
  const handleViewDetails = () => {
    navigate(`${basePath || ""}/admin/users/${user.id}`);
  };
  return /* @__PURE__ */ jsx(Card, { className: "cursor-pointer hover:shadow-md transition-shadow", onClick: handleViewDetails, children: /* @__PURE__ */ jsxs(CardContent, { className: "p-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between mb-3", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxs(Avatar, { className: "h-10 w-10", children: [
          /* @__PURE__ */ jsx(AvatarImage, { src: user.avatar_url }),
          /* @__PURE__ */ jsx(AvatarFallback, { children: initials })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "font-medium", children: user.full_name || "No name" }),
          /* @__PURE__ */ jsx("div", { className: "text-sm text-muted-foreground", children: /* @__PURE__ */ jsx(DepartmentRolePairsDisplay, { userId: user.id }) })
        ] })
      ] }),
      /* @__PURE__ */ jsx(Badge, { className: `${getStatusColor(user.status || "Active")} text-white`, children: user.status || "Active" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-2 text-sm", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(Mail, { className: "h-3 w-3 text-muted-foreground" }),
        /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: user.email || "No email" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(IdCard, { className: "h-3 w-3 text-muted-foreground" }),
        /* @__PURE__ */ jsxs("span", { className: "text-muted-foreground", children: [
          "ID: ",
          user.employee_id || "Not set"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(Phone, { className: "h-3 w-3 text-muted-foreground" }),
        /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: user.phone || "No phone" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(MapPin, { className: "h-3 w-3 text-muted-foreground" }),
        /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: user.location || "No location" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex gap-2 mt-4", onClick: (e) => e.stopPropagation(), children: [
      /* @__PURE__ */ jsx(Button, { size: "sm", variant: "outline", onClick: handleViewDetails, children: /* @__PURE__ */ jsx(SquarePen, { className: "h-3 w-3" }) }),
      /* @__PURE__ */ jsx(Button, { size: "sm", variant: "outline", onClick: () => onDelete(user.id), children: /* @__PURE__ */ jsx(Trash2, { className: "h-3 w-3" }) })
    ] })
  ] }) });
};
const UserList = ({ profiles, onDelete }) => {
  return /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: profiles.map((user) => /* @__PURE__ */ jsx(
    UserCard,
    {
      user,
      onDelete
    },
    user.id
  )) });
};
const UserTable = ({
  profiles,
  onUpdate,
  onDelete,
  onCreate
}) => {
  const navigate = useNavigate();
  const { basePath } = useOrganisationContext();
  const columns = [
    {
      key: "full_name",
      header: "Full Name",
      type: "text",
      editable: true,
      required: true,
      sortable: true,
      width: "300px"
    },
    {
      key: "username",
      header: "Username",
      type: "text",
      editable: true,
      sortable: true,
      width: "200px"
    },
    {
      key: "phone",
      header: "Phone",
      type: "text",
      editable: true,
      sortable: false,
      width: "150px"
    },
    {
      key: "location",
      header: "Location",
      type: "text",
      editable: true,
      sortable: true,
      width: "150px"
    },
    {
      key: "status",
      header: "Status",
      type: "badge",
      editable: true,
      sortable: true,
      options: ["Active", "Inactive", "OnLeave"],
      width: "120px"
    }
  ];
  const handleDelete = async (id) => {
    return new Promise((resolve) => {
      onDelete(id);
      resolve({ success: true });
    });
  };
  const handleViewUser = (user) => {
    navigate(`${basePath || ""}/admin/users/${user.id}`);
  };
  return /* @__PURE__ */ jsx("div", { className: "w-full", children: /* @__PURE__ */ jsx(
    EditableTable,
    {
      data: profiles,
      columns,
      onUpdate,
      onDelete: handleDelete,
      onCreate,
      onViewUser: handleViewUser,
      allowAdd: true,
      allowDelete: true,
      allowView: true,
      className: "w-full"
    }
  ) });
};
const CreateUserDialog = ({
  isOpen,
  onOpenChange,
  newUser,
  onUserChange,
  onSubmit,
  loading = false
}) => {
  const { supabaseClient } = useOrganisationContext();
  const [isFullNameManuallyEdited, setIsFullNameManuallyEdited] = useState(false);
  const { user } = useAuth();
  const { data: currentUserRole } = useQuery({
    queryKey: ["user-role", user == null ? void 0 : user.id],
    queryFn: async () => {
      if (!(user == null ? void 0 : user.id)) return null;
      const { data } = await supabaseClient.from("user_roles").select("role").eq("user_id", user.id).single();
      return data == null ? void 0 : data.role;
    },
    enabled: !!(user == null ? void 0 : user.id)
  });
  const isSuperAdmin = currentUserRole === "super_admin";
  const isFormValid = () => {
    var _a, _b, _c, _d;
    const requiredFields = [
      (_a = newUser.first_name) == null ? void 0 : _a.trim(),
      (_b = newUser.last_name) == null ? void 0 : _b.trim(),
      (_c = newUser.email) == null ? void 0 : _c.trim(),
      newUser.access_level,
      newUser.location_id
    ];
    const allFieldsFilled = requiredFields.every((field) => field && field.length > 0);
    const emailValid = ((_d = newUser.email) == null ? void 0 : _d.trim()) && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newUser.email.trim());
    return allFieldsFilled && emailValid;
  };
  const { data: locations } = useQuery({
    queryKey: ["locations"],
    queryFn: async () => {
      const { data } = await supabaseClient.from("locations").select("id, name").eq("status", "Active").order("name");
      return data || [];
    }
  });
  const { data: profiles } = useQuery({
    queryKey: ["profiles-for-managers"],
    queryFn: async () => {
      const { data } = await supabaseClient.from("profiles").select("id, full_name, username").eq("status", "Active").order("full_name");
      return (data || []).map((profile) => ({
        ...profile,
        email: profile.username
        // username stores the email
      }));
    },
    enabled: isOpen
    // Only fetch when dialog is open
  });
  const { data: languages } = useQuery({
    queryKey: ["languages"],
    queryFn: async () => {
      const { data } = await supabaseClient.from("languages").select("code, display_name, native_name, flag_emoji").eq("is_active", true).order("sort_order", { ascending: true });
      return data || [];
    }
  });
  const validatePhoneInput = (input) => {
    return input.replace(/[^0-9+\s\-()]/g, "");
  };
  const updateField = (field, value) => {
    if (field === "phone") {
      const validatedValue = validatePhoneInput(value);
      onUserChange({ ...newUser, [field]: validatedValue });
    } else {
      onUserChange({ ...newUser, [field]: value });
    }
  };
  const handleLocationChange = (locationId) => {
    const selectedLocation = locations == null ? void 0 : locations.find((loc) => loc.id === locationId);
    if (selectedLocation) {
      onUserChange({
        ...newUser,
        location_id: locationId,
        location: selectedLocation.name
      });
    }
  };
  const handleNameChange = (field, value) => {
    const updatedUser = { ...newUser, [field]: value };
    if (!isFullNameManuallyEdited) {
      const firstName = field === "first_name" ? value : updatedUser.first_name || "";
      const lastName = field === "last_name" ? value : updatedUser.last_name || "";
      updatedUser.full_name = `${firstName} ${lastName}`.trim();
    }
    onUserChange(updatedUser);
  };
  const handleFullNameChange = (value) => {
    setIsFullNameManuallyEdited(true);
    onUserChange({ ...newUser, full_name: value });
  };
  const handleDialogClose = (open) => {
    if (!open) {
      const resetUser = {
        first_name: "",
        last_name: "",
        full_name: "",
        email: "",
        password: "",
        username: "",
        phone: "",
        employee_id: "",
        status: "Active",
        access_level: "",
        location_id: "",
        location: "",
        language: "English",
        bio: "",
        manager: void 0
      };
      onUserChange(resetUser);
      setIsFullNameManuallyEdited(false);
    }
    onOpenChange(open);
  };
  return /* @__PURE__ */ jsxs(Dialog, { open: isOpen, onOpenChange: handleDialogClose, children: [
    /* @__PURE__ */ jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsx(Button, { children: /* @__PURE__ */ jsx(Plus, { className: "h-4 w-4 mr-2" }) }) }),
    /* @__PURE__ */ jsxs(DialogContent, { className: "max-w-2xl max-h-[90vh] overflow-y-auto", children: [
      /* @__PURE__ */ jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsx(DialogTitle, { children: "Create New User" }),
        /* @__PURE__ */ jsx(DialogDescription, { children: "Add a new user to your organization. The user will receive an activation email to set their password." })
      ] }),
      /* @__PURE__ */ jsxs("form", { onSubmit, className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxs(Label, { htmlFor: "first_name", children: [
              "First Name ",
              /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "*" })
            ] }),
            /* @__PURE__ */ jsx(
              Input,
              {
                id: "first_name",
                value: newUser.first_name,
                onChange: (e) => handleNameChange("first_name", e.target.value),
                placeholder: "Enter first name",
                required: true
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxs(Label, { htmlFor: "last_name", children: [
              "Last Name ",
              /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "*" })
            ] }),
            /* @__PURE__ */ jsx(
              Input,
              {
                id: "last_name",
                value: newUser.last_name,
                onChange: (e) => handleNameChange("last_name", e.target.value),
                placeholder: "Enter last name",
                required: true
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "full_name", children: "Full Name (Auto-generated, editable)" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                id: "full_name",
                value: newUser.full_name || `${newUser.first_name} ${newUser.last_name}`.trim(),
                onChange: (e) => handleFullNameChange(e.target.value),
                placeholder: "Enter full name",
                className: "flex-1",
                required: true
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxs(Label, { htmlFor: "email", children: [
              "Email Address ",
              /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "*" })
            ] }),
            /* @__PURE__ */ jsx(
              Input,
              {
                id: "email",
                type: "email",
                value: newUser.email,
                onChange: (e) => updateField("email", e.target.value),
                placeholder: "Enter email address",
                required: true
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxs(Label, { htmlFor: "access_level", children: [
              "Access Level ",
              /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "*" })
            ] }),
            /* @__PURE__ */ jsxs(
              Select,
              {
                value: newUser.access_level || void 0,
                onValueChange: (value) => {
                  const backendValue = value === "Admin" ? "client_admin" : value.toLowerCase();
                  updateField("access_level", backendValue);
                },
                required: true,
                children: [
                  /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Select access level" }) }),
                  /* @__PURE__ */ jsxs(SelectContent, { children: [
                    /* @__PURE__ */ jsx(SelectItem, { value: "user", children: "User" }),
                    /* @__PURE__ */ jsx(SelectItem, { value: "client_admin", children: "Admin" }),
                    isSuperAdmin && /* @__PURE__ */ jsx(SelectItem, { value: "author", children: "Author" }),
                    isSuperAdmin && /* @__PURE__ */ jsx(SelectItem, { value: "super_admin", children: "Super Admin" })
                  ] })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxs(Label, { htmlFor: "location", children: [
              "Location ",
              /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "*" })
            ] }),
            /* @__PURE__ */ jsxs(Select, { value: newUser.location_id || "", onValueChange: handleLocationChange, required: true, children: [
              /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Select a location" }) }),
              /* @__PURE__ */ jsx(SelectContent, { children: locations == null ? void 0 : locations.map((location) => /* @__PURE__ */ jsx(SelectItem, { value: location.id, children: location.name }, location.id)) })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "phone", children: "Phone" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                id: "phone",
                value: newUser.phone,
                onChange: (e) => updateField("phone", e.target.value),
                placeholder: "Enter phone number"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "employee_id", children: "Employee ID" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                id: "employee_id",
                value: newUser.employee_id,
                onChange: (e) => updateField("employee_id", e.target.value),
                placeholder: "Enter employee ID"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "manager", children: "Manager" }),
            /* @__PURE__ */ jsxs(
              Select,
              {
                value: newUser.manager || "none",
                onValueChange: (value) => updateField("manager", value === "none" ? "" : value),
                children: [
                  /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Select manager (optional)" }) }),
                  /* @__PURE__ */ jsxs(SelectContent, { children: [
                    /* @__PURE__ */ jsx(SelectItem, { value: "none", children: "No manager" }),
                    profiles == null ? void 0 : profiles.map((profile) => /* @__PURE__ */ jsx(SelectItem, { value: profile.id, children: profile.full_name || profile.email || profile.username }, profile.id))
                  ] })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "language", children: "Language" }),
            /* @__PURE__ */ jsxs(
              Select,
              {
                value: newUser.language || "English",
                onValueChange: (value) => updateField("language", value),
                children: [
                  /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Select language" }) }),
                  /* @__PURE__ */ jsx(SelectContent, { children: languages == null ? void 0 : languages.map((language) => /* @__PURE__ */ jsxs(SelectItem, { value: language.display_name || language.code, children: [
                    language.flag_emoji && /* @__PURE__ */ jsx("span", { className: "mr-2", children: language.flag_emoji }),
                    language.native_name || language.display_name || language.code
                  ] }, language.display_name || language.code)) })
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "bio", children: "Bio" }),
          /* @__PURE__ */ jsx(
            Textarea,
            {
              id: "bio",
              value: newUser.bio,
              onChange: (e) => updateField("bio", e.target.value),
              placeholder: "Enter bio (optional)",
              rows: 3,
              className: "w-full"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "*" }),
          " Required fields"
        ] }),
        /* @__PURE__ */ jsxs(DialogFooter, { children: [
          /* @__PURE__ */ jsx(Button, { type: "button", variant: "outline", onClick: () => handleDialogClose(false), disabled: loading, size: "icon", children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsx(Button, { type: "submit", disabled: loading || !isFormValid(), size: "icon", children: loading ? /* @__PURE__ */ jsx("div", { className: "w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" }) : /* @__PURE__ */ jsx(Save, { className: "h-4 w-4" }) })
        ] })
      ] })
    ] })
  ] });
};
const ImportUsersDialog = ({ onImportComplete, onImportError }) => {
  const { supabaseClient: supabase2 } = useOrganisationContext();
  const [isOpen, setIsOpen] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { data: validLocations } = useQuery({
    queryKey: ["locations"],
    queryFn: async () => {
      const { data, error } = await supabase2.from("locations").select("id, name").eq("status", "Active").order("name");
      if (error) throw error;
      return data || [];
    }
  });
  const { data: validDepartments } = useQuery({
    queryKey: ["departments"],
    queryFn: async () => {
      const { data, error } = await supabase2.from("departments").select("id, name").order("name");
      if (error) throw error;
      return data || [];
    }
  });
  const { data: validRoles } = useQuery({
    queryKey: ["roles"],
    queryFn: async () => {
      const { data, error } = await supabase2.from("roles").select("role_id, name, department_id, is_active").eq("is_active", true).order("name");
      if (error) throw error;
      return data || [];
    }
  });
  const { data: existingProfiles } = useQuery({
    queryKey: ["profiles-for-manager-validation"],
    queryFn: async () => {
      const { data, error } = await supabase2.from("profiles").select("id, full_name, username").order("full_name");
      if (error) throw error;
      return (data || []).map((profile) => ({
        ...profile,
        email: profile.username
        // username stores the email
      }));
    }
  });
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      if (!file.name.endsWith(".csv") && file.type !== "text/csv") {
        toast$1({
          title: "Invalid file type",
          description: "Please upload a CSV file (.csv)",
          variant: "destructive"
        });
        return;
      }
      setUploadedFile(file);
      toast$1({
        title: "File uploaded",
        description: `${file.name} is ready for import`
      });
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "text/csv": [".csv"]
    },
    multiple: false
  });
  const generateSampleCSV = () => {
    const csvContent = `"Email","Full Name","First Name","Last Name","Phone","Employee ID","Access Level","Location","Department","Role","Manager"
"john.doe@company.com","John Doe","John","Doe","+65-555-0123","EMP-2024-001","User","Main Office","Engineering","Software Engineer","jane.smith@company.com"
"jane.smith@company.com","Jane Smith","Jane","Smith","+65-555-0124","EMP-2024-002","Admin","Branch Office","Human Resources","HR Manager",""`;
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "user_import_template.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const validateLocation = (locationName) => {
    if (!locationName || !validLocations) {
      debug.log("Location validation: No location name or validLocations not loaded", { locationName, validLocations });
      return { isValid: false };
    }
    const trimmedLocation = locationName.trim();
    debug.log("Location validation: Checking location", {
      providedLocation: trimmedLocation,
      availableLocations: validLocations.map((l) => l.name)
    });
    const validLocation = validLocations.find(
      (loc) => loc.name.toLowerCase() === trimmedLocation.toLowerCase()
    );
    debug.log("Location validation result:", {
      location: trimmedLocation,
      found: !!validLocation,
      validLocation
    });
    return {
      isValid: !!validLocation,
      locationId: validLocation == null ? void 0 : validLocation.id
    };
  };
  const validateDepartment = (departmentName) => {
    if (!departmentName || !validDepartments) {
      return { isValid: false };
    }
    const trimmedName = departmentName.trim().toLowerCase();
    const department = validDepartments.find(
      (dept) => dept.name.toLowerCase() === trimmedName
    );
    return {
      isValid: !!department,
      departmentId: department == null ? void 0 : department.id
    };
  };
  const validateRole = (roleName) => {
    if (!roleName || !validRoles) {
      return { isValid: false };
    }
    const trimmedName = roleName.trim().toLowerCase();
    const role = validRoles.find(
      (r) => r.name.toLowerCase() === trimmedName
    );
    return {
      isValid: !!role,
      roleId: role == null ? void 0 : role.role_id,
      departmentId: (role == null ? void 0 : role.department_id) || null
    };
  };
  const validateDepartmentRolePair = (departmentName, roleName) => {
    const deptValidation = validateDepartment(departmentName);
    if (!deptValidation.isValid) {
      return { isValid: false, error: `Department "${departmentName}" does not exist` };
    }
    const roleValidation = validateRole(roleName);
    if (!roleValidation.isValid) {
      return { isValid: false, error: `Role "${roleName}" does not exist or is not active` };
    }
    if (roleValidation.departmentId === null) {
      return {
        isValid: true,
        departmentId: deptValidation.departmentId,
        roleId: roleValidation.roleId
      };
    }
    if (roleValidation.departmentId !== deptValidation.departmentId) {
      return {
        isValid: false,
        error: `Role "${roleName}" does not belong to department "${departmentName}"`
      };
    }
    return {
      isValid: true,
      departmentId: deptValidation.departmentId,
      roleId: roleValidation.roleId
    };
  };
  const validateAccessLevel = (accessLevel) => {
    if (!accessLevel) {
      return { isValid: false };
    }
    const trimmedLevel = accessLevel.trim().toLowerCase();
    const validLevels = ["user", "client_admin"];
    const levelMapping = {
      "admin": "client_admin",
      "client admin": "client_admin"
    };
    const backendValue = levelMapping[trimmedLevel] || trimmedLevel;
    const isValid2 = validLevels.includes(backendValue);
    return {
      isValid: isValid2,
      value: isValid2 ? backendValue : void 0
    };
  };
  const translateError = (error) => {
    const errorMessage = (error == null ? void 0 : error.message) || (error == null ? void 0 : error.error) || "Unknown error";
    debug.log("Translating error:", { originalError: error, errorMessage });
    if (errorMessage.includes("Edge Function returned a non-2xx status code")) {
      return "Server error occurred while creating user. Please try again or contact support.";
    }
    if (errorMessage.includes("already registered") || errorMessage.includes("User already registered") || errorMessage.includes("has already been registered")) {
      return "A user with this email address already exists.";
    }
    if (errorMessage.includes("Failed to create user:")) {
      if (errorMessage.includes("User already registered") || errorMessage.includes("already registered")) {
        return "A user with this email address already exists.";
      }
      if (errorMessage.includes("Invalid email")) {
        return "The email address format is invalid.";
      }
      if (errorMessage.includes("Password should be at least")) {
        return "Password does not meet security requirements.";
      }
      return "Failed to create user account. Please check the email address and try again.";
    }
    const fullErrorMessage = JSON.stringify(error);
    if (fullErrorMessage.includes("already registered") || fullErrorMessage.includes("User already registered") || fullErrorMessage.includes("has already been registered")) {
      return "A user with this email address already exists.";
    }
    if (fullErrorMessage.includes("Invalid email") || fullErrorMessage.includes("invalid email") || errorMessage.includes("Invalid email") || errorMessage.includes("invalid email")) {
      return "The email address format is invalid.";
    }
    if (errorMessage.includes("Profile creation failed")) {
      return "User account was created but profile setup failed. Please contact support.";
    }
    if (errorMessage.includes("Database error")) {
      return "Database error occurred. Please try again or contact support.";
    }
    if (errorMessage.includes("Missing email")) {
      return "Email address is required for all users.";
    }
    if (errorMessage.includes("fetch")) {
      return "Network error occurred. Please check your connection and try again.";
    }
    if (errorMessage.includes("timeout")) {
      return "Request timed out. Please try again.";
    }
    if (errorMessage === "Unknown error" && fullErrorMessage.includes("FunctionsHttpError")) {
      if ((error == null ? void 0 : error.context) || (error == null ? void 0 : error.hint)) {
        const context = error.context || "";
        const hint = error.hint || "";
        if (context.includes("already") || hint.includes("already")) {
          return "A user with this email address already exists.";
        }
      }
      return "Server error occurred while creating user. Please try again or contact support.";
    }
    return errorMessage.length > 100 ? "An unexpected error occurred while creating the user. Please try again." : errorMessage;
  };
  const processUserImport = async (row) => {
    var _a;
    const email = row["Email"] || row["email"];
    if (!email) {
      console.error("Missing email for row:", row);
      throw new Error("Email address is required for all users.");
    }
    const fullName = row["Full Name"] || row["full_name"] || "";
    const firstName = row["First Name"] || row["first_name"] || "";
    const lastName = row["Last Name"] || row["last_name"] || "";
    if (!fullName || !fullName.trim()) {
      throw new Error("Full Name is required for all users.");
    }
    if (!firstName || !firstName.trim()) {
      throw new Error("First Name is required for all users.");
    }
    if (!lastName || !lastName.trim()) {
      throw new Error("Last Name is required for all users.");
    }
    debug.log("Processing user:", email);
    const accessLevelValue = row["Access Level"] || row["access_level"] || "";
    const accessLevelValidation = validateAccessLevel(accessLevelValue);
    if (!accessLevelValidation.isValid) {
      throw new Error(`Access Level "${accessLevelValue}" is invalid. Only "user" and "admin" are allowed.`);
    }
    const locationName = row["Location"] || row["location"] || "";
    const departmentName = row["Department"] || row["department"] || "";
    const roleName = row["Role"] || row["role"] || "";
    if (locationName) {
      const locationValidation = validateLocation(locationName);
      if (!locationValidation.isValid) {
        throw new Error(`Location "${locationName}" does not exist`);
      }
    }
    let departmentId;
    if (departmentName) {
      const deptValidation = validateDepartment(departmentName);
      if (!deptValidation.isValid) {
        throw new Error(`Department "${departmentName}" does not exist`);
      }
      departmentId = deptValidation.departmentId;
    }
    let roleId;
    let roleDepartmentId;
    if (roleName) {
      const roleValidation = validateRole(roleName);
      if (!roleValidation.isValid) {
        throw new Error(`Role "${roleName}" does not exist or is not active`);
      }
      roleId = roleValidation.roleId;
      roleDepartmentId = roleValidation.departmentId;
    }
    if (departmentName && roleName) {
      const pairValidation = validateDepartmentRolePair(departmentName, roleName);
      if (!pairValidation.isValid) {
        throw new Error(pairValidation.error || "Invalid department-role pair");
      }
      departmentId = pairValidation.departmentId;
      roleId = pairValidation.roleId;
    } else if (roleName && roleDepartmentId !== null) {
      throw new Error(`Role "${roleName}" belongs to a department. Please specify the department or use a general role.`);
    }
    const managerEmail = (row["Manager"] || row["manager"] || "").trim() || void 0;
    const clientId = getCurrentClientId();
    const clientPath = clientId ? `/${clientId}` : "";
    const { data: authData, error: authError } = await supabase2.functions.invoke("create-user", {
      body: {
        email,
        full_name: fullName.trim(),
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        username: row["Username"] || row["username"] || "",
        phone: row["Phone"] || row["phone"] || "",
        status: "Pending",
        employee_id: row["Employee ID"] || row["employee_id"] || "",
        access_level: accessLevelValidation.value,
        // Already validated above, so safe to use !
        manager: null,
        // Manager assigned in pass 2 after all users exist
        clientPath
        // Pass client path explicitly
      }
    });
    if (authError) {
      console.error("Auth error for user:", email, authError);
      const friendlyError = translateError(authError);
      throw new Error(friendlyError);
    }
    if (authData && authData.user) {
      debug.log("User created successfully:", email);
    } else if (authData && authData.error) {
      console.error("Create user error:", authData.error);
      const friendlyError = translateError(authData.error);
      throw new Error(friendlyError);
    }
    const userId = (_a = authData == null ? void 0 : authData.user) == null ? void 0 : _a.id;
    if (!userId) {
      throw new Error("User created but user ID not returned");
    }
    const warnings = [];
    if (locationName) {
      const locationValidation = validateLocation(locationName);
      if (locationValidation.isValid && locationValidation.locationId) {
        try {
          const locationData = {
            user_id: userId,
            location_id: locationValidation.locationId,
            full_name: fullName.trim(),
            access_purpose: "General Access",
            status: "Active",
            date_access_created: (/* @__PURE__ */ new Date()).toISOString()
          };
          const { error: locationError } = await supabase2.from("physical_location_access").insert(locationData);
          if (locationError) {
            console.error("Error assigning location to physical_location_access:", locationError);
            warnings.push({
              field: "Location",
              value: locationName,
              message: `Location "${locationName}" could not be assigned: ${locationError.message}`
            });
          } else {
            const { error: profileError } = await supabase2.from("profiles").update({
              location: locationName,
              location_id: locationValidation.locationId
            }).eq("id", userId);
            if (profileError) {
              console.error("Error updating profile location:", profileError);
              warnings.push({
                field: "Location",
                value: locationName,
                message: `Location "${locationName}" was assigned but could not be saved to profile: ${profileError.message}`
              });
            }
          }
        } catch (locationError) {
          console.error("Exception assigning location:", locationError);
          warnings.push({
            field: "Location",
            value: locationName,
            message: `Location "${locationName}" could not be assigned: ${locationError.message}`
          });
        }
      }
    }
    if (departmentName || roleName) {
      try {
        const pairingId = departmentId && roleId ? crypto.randomUUID() : void 0;
        if (departmentId) {
          const { error: deptError } = await supabase2.from("user_departments").insert({
            user_id: userId,
            department_id: departmentId,
            is_primary: false,
            // Will be set to true if this is the first department
            pairing_id: pairingId,
            assigned_by: userId
            // In production, this should be the current admin user ID
          });
          if (deptError) {
            console.error("Error assigning department:", deptError);
            warnings.push({
              field: "Department",
              value: departmentName,
              message: `Department "${departmentName}" could not be assigned: ${deptError.message}`
            });
          } else {
            const { data: existingDepts } = await supabase2.from("user_departments").select("id").eq("user_id", userId);
            if (existingDepts && existingDepts.length === 1) {
              await supabase2.from("user_departments").update({ is_primary: true }).eq("user_id", userId).eq("department_id", departmentId);
            }
          }
        }
        if (roleId) {
          const { error: roleError } = await supabase2.from("user_profile_roles").insert({
            user_id: userId,
            role_id: roleId,
            is_primary: false,
            // Will be set to true if this is the first role
            pairing_id: pairingId,
            assigned_by: userId
            // In production, this should be the current admin user ID
          });
          if (roleError) {
            console.error("Error assigning role:", roleError);
            warnings.push({
              field: "Role",
              value: roleName,
              message: `Role "${roleName}" could not be assigned: ${roleError.message}`
            });
          } else {
            const { data: existingRoles } = await supabase2.from("user_profile_roles").select("id").eq("user_id", userId);
            if (existingRoles && existingRoles.length === 1) {
              await supabase2.from("user_profile_roles").update({ is_primary: true }).eq("user_id", userId).eq("role_id", roleId);
            }
          }
        }
      } catch (assignmentError) {
        console.error("Exception assigning department/role:", assignmentError);
        warnings.push({
          field: "Department/Role",
          value: `${departmentName || ""} / ${roleName || ""}`,
          message: `Could not assign department/role: ${assignmentError.message}`
        });
      }
    }
    return {
      email,
      success: true,
      userId,
      managerEmail,
      warnings: warnings.length > 0 ? warnings : null
    };
  };
  const handleImport = async () => {
    if (!uploadedFile) {
      toast$1({
        title: "No file selected",
        description: "Please upload a file first",
        variant: "destructive"
      });
      return;
    }
    setIsProcessing(true);
    try {
      const text = await uploadedFile.text();
      Papa.parse(text, {
        header: true,
        complete: async (results) => {
          const data = results.data;
          if (data.length === 0) {
            toast$1({
              title: "Empty file",
              description: "The uploaded file contains no data",
              variant: "destructive"
            });
            setIsProcessing(false);
            return;
          }
          debug.log("Processing", data.length, "rows");
          let successCount = 0;
          const errors = [];
          const warnings = [];
          const createdUsers = [];
          for (let i = 0; i < data.length; i++) {
            const row = data[i];
            if (!row["Email"] && !row["email"] && !row["Full Name"] && !row["full_name"]) {
              debug.log("Skipping empty row at index", i);
              continue;
            }
            const email = row["Email"] || row["email"] || "Unknown";
            const rowNumber = i + 2;
            try {
              debug.log(`Processing user ${i + 1} of ${data.length}:`, email);
              const result = await processUserImport(row);
              successCount++;
              debug.log(`Successfully processed user ${i + 1}`);
              createdUsers.push({
                rowNumber,
                email,
                userId: result.userId,
                managerEmail: result.managerEmail,
                row
              });
              if (result.warnings) {
                result.warnings.forEach((warning) => {
                  warnings.push({
                    rowNumber,
                    identifier: email,
                    field: warning.field,
                    error: warning.message,
                    rawData: row
                  });
                });
              }
            } catch (error) {
              console.error(`Error importing user ${i + 1}:`, error);
              const friendlyError = translateError(error);
              errors.push({
                rowNumber,
                identifier: email,
                field: !row["Email"] && !row["email"] ? "Email" : void 0,
                error: friendlyError,
                rawData: row
              });
            }
            if (i < data.length - 1) {
              await new Promise((resolve) => setTimeout(resolve, 500));
            }
          }
          const emailToId = /* @__PURE__ */ new Map();
          (existingProfiles || []).forEach((p) => {
            const e = (p.email ?? p.username ?? "").trim().toLowerCase();
            if (e) emailToId.set(e, p.id);
          });
          createdUsers.forEach((u) => {
            const e = u.email.trim().toLowerCase();
            if (e) emailToId.set(e, u.userId);
          });
          for (const u of createdUsers) {
            if (!u.managerEmail) continue;
            const managerId = emailToId.get(u.managerEmail.trim().toLowerCase());
            if (managerId) {
              try {
                const { error: managerUpdateError } = await supabase2.from("profiles").update({ manager: managerId }).eq("id", u.userId);
                if (managerUpdateError) {
                  warnings.push({
                    rowNumber: u.rowNumber,
                    identifier: u.email,
                    field: "Manager",
                    error: `Manager could not be assigned: ${managerUpdateError.message}`,
                    rawData: u.row
                  });
                } else {
                  debug.log(`Assigned manager ${u.managerEmail} for user ${u.email}`);
                }
              } catch (err) {
                warnings.push({
                  rowNumber: u.rowNumber,
                  identifier: u.email,
                  field: "Manager",
                  error: `Manager could not be assigned: ${(err == null ? void 0 : err.message) ?? err}`,
                  rawData: u.row
                });
              }
            } else {
              warnings.push({
                rowNumber: u.rowNumber,
                identifier: u.email,
                field: "Manager",
                error: `Manager email "${u.managerEmail}" does not exist in the system - user created without manager assignment`,
                rawData: u.row
              });
            }
          }
          debug.log("Import completed. Success:", successCount, "Errors:", errors.length, "Warnings:", warnings.length);
          setUploadedFile(null);
          setIsProcessing(false);
          setIsOpen(false);
          if ((errors.length > 0 || warnings.length > 0) && onImportError) {
            setTimeout(() => {
              onImportError(errors, warnings, { success: successCount, total: data.length });
            }, 300);
            if (errors.length > 0 && warnings.length > 0) {
              toast$1({
                title: "Import completed with errors and warnings",
                description: `${successCount} users imported successfully. ${errors.length} failed, ${warnings.length} have validation warnings.`,
                variant: "destructive"
              });
            } else if (errors.length > 0) {
              toast$1({
                title: "Import completed with errors",
                description: `${successCount} users imported successfully. ${errors.length} failed. Opening error report...`,
                variant: "destructive"
              });
            } else if (warnings.length > 0) {
              toast$1({
                title: "Import completed with warnings",
                description: `${successCount} users imported successfully. ${warnings.length} users have validation warnings. Opening warning report...`,
                variant: "default"
              });
            }
          } else {
            toast$1({
              title: "Import completed successfully",
              description: `All ${successCount} users imported successfully. Users will need to activate their accounts via email.`
            });
          }
          if (onImportComplete) {
            await onImportComplete();
          }
        },
        error: (error) => {
          console.error("Parse error:", error);
          toast$1({
            title: "Parse error",
            description: "Failed to parse the CSV file",
            variant: "destructive"
          });
          setIsProcessing(false);
        }
      });
    } catch (error) {
      console.error("Import error:", error);
      toast$1({
        title: "Import failed",
        description: "An error occurred while importing the file",
        variant: "destructive"
      });
      setIsProcessing(false);
    }
  };
  const handleDialogClose = (open) => {
    if (!open && !isProcessing) {
      setUploadedFile(null);
    }
    setIsOpen(open);
  };
  return /* @__PURE__ */ jsxs(Dialog, { open: isOpen, onOpenChange: handleDialogClose, children: [
    /* @__PURE__ */ jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsx(Button, { variant: "outline", children: /* @__PURE__ */ jsx(Upload, { className: "h-4 w-4 mr-2" }) }) }),
    /* @__PURE__ */ jsxs(DialogContent, { className: "max-w-3xl max-h-[90vh] overflow-y-auto", children: [
      /* @__PURE__ */ jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsx(DialogTitle, { children: "Import Users" }),
        /* @__PURE__ */ jsx(DialogDescription, { children: "Upload a CSV file to import users in bulk. Users will be created with authentication accounts and will receive an activation link via email. Departments, roles, and locations can be assigned during import." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs(
            "div",
            {
              ...getRootProps(),
              className: `border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${isDragActive ? "border-blue-400 bg-blue-50" : uploadedFile ? "border-green-400 bg-green-50" : "border-gray-300 hover:border-gray-400"}`,
              children: [
                /* @__PURE__ */ jsx("input", { ...getInputProps() }),
                /* @__PURE__ */ jsx(Upload, { className: "h-12 w-12 mx-auto mb-4 text-gray-400" }),
                uploadedFile ? /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("p", { className: "text-lg font-medium text-green-700", children: "File Ready for Import" }),
                  /* @__PURE__ */ jsx("p", { className: "text-sm text-green-600 mt-1", children: uploadedFile.name }),
                  /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mt-2", children: "Click to select a different file or drop a new one here" })
                ] }) : isDragActive ? /* @__PURE__ */ jsx("p", { className: "text-lg font-medium text-blue-700", children: "Drop your user file here" }) : /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("p", { className: "text-lg font-medium", children: "Drag and drop your user file here, or browse" }),
                  /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 mt-1", children: "Supports CSV files (.csv)" })
                ] })
              ]
            }
          ),
          uploadedFile && /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
            /* @__PURE__ */ jsx(
              Button,
              {
                onClick: handleImport,
                disabled: isProcessing,
                className: "flex items-center gap-2",
                children: isProcessing ? /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "animate-spin rounded-full h-4 w-4 border-b-2 border-white" }) }) : /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(Upload, { className: "h-4 w-4" }) })
              }
            ),
            /* @__PURE__ */ jsx(
              Button,
              {
                variant: "outline",
                onClick: () => setUploadedFile(null),
                disabled: isProcessing,
                children: "X"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-yellow-50 border border-yellow-200 rounded-lg p-4", children: [
          /* @__PURE__ */ jsx("h4", { className: "text-sm font-medium text-yellow-800 mb-2", children: "User Import Template" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-yellow-700 mb-3", children: "Download a template for importing users with sample data." }),
          /* @__PURE__ */ jsx("div", { className: "space-y-2", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between p-2 bg-white rounded border", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(FileText, { className: "h-4 w-4" }),
              /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", children: "Users Template (CSV)" }),
              /* @__PURE__ */ jsx(Badge, { variant: "secondary", className: "text-xs", children: "Ready to use template" })
            ] }),
            /* @__PURE__ */ jsx(Button, { size: "sm", variant: "outline", onClick: generateSampleCSV, className: "gap-2", children: /* @__PURE__ */ jsx(Download, { className: "h-4 w-4" }) })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-blue-50 border border-blue-200 rounded-lg p-4", children: [
          /* @__PURE__ */ jsx("h4", { className: "font-semibold text-blue-900 mb-2", children: "Available Columns" }),
          /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2 mb-4", children: [
            "Email",
            "Full Name",
            "First Name",
            "Last Name",
            "Phone",
            "Employee ID",
            "Access Level",
            "Location",
            "Department",
            "Role",
            "Manager"
          ].map((column) => /* @__PURE__ */ jsx(Badge, { variant: "outline", className: "text-xs", children: column }, column)) }),
          /* @__PURE__ */ jsxs("div", { className: "text-sm text-blue-800 space-y-1", children: [
            /* @__PURE__ */ jsxs("p", { children: [
              "• ",
              /* @__PURE__ */ jsx("strong", { children: "Email" }),
              " is required for each user"
            ] }),
            /* @__PURE__ */ jsxs("p", { children: [
              "• ",
              /* @__PURE__ */ jsx("strong", { children: "Full Name" }),
              " is required for each user"
            ] }),
            /* @__PURE__ */ jsxs("p", { children: [
              "• ",
              /* @__PURE__ */ jsx("strong", { children: "First Name" }),
              " is required for each user"
            ] }),
            /* @__PURE__ */ jsxs("p", { children: [
              "• ",
              /* @__PURE__ */ jsx("strong", { children: "Last Name" }),
              " is required for each user"
            ] }),
            /* @__PURE__ */ jsx("p", { children: "• Users will be created with 'Pending' status and must activate via email" }),
            /* @__PURE__ */ jsxs("p", { children: [
              "• ",
              /* @__PURE__ */ jsx("strong", { children: "Access Level" }),
              ' - must be "User" or "Admin". Other values are not allowed.'
            ] }),
            /* @__PURE__ */ jsxs("p", { children: [
              "• ",
              /* @__PURE__ */ jsx("strong", { children: "Location" }),
              " (optional) - must match an existing active location"
            ] }),
            /* @__PURE__ */ jsxs("p", { children: [
              "• ",
              /* @__PURE__ */ jsx("strong", { children: "Department" }),
              " (optional) - must match an existing department"
            ] }),
            /* @__PURE__ */ jsxs("p", { children: [
              "• ",
              /* @__PURE__ */ jsx("strong", { children: "Role" }),
              " (optional) - must match an existing active role"
            ] }),
            /* @__PURE__ */ jsxs("p", { children: [
              "• If both ",
              /* @__PURE__ */ jsx("strong", { children: "Department" }),
              " and ",
              /* @__PURE__ */ jsx("strong", { children: "Role" }),
              " are provided, the role must belong to that department (or be a general role)"
            ] }),
            /* @__PURE__ */ jsxs("p", { children: [
              "• If only ",
              /* @__PURE__ */ jsx("strong", { children: "Role" }),
              " is provided, it must be a general role (not assigned to any department)"
            ] }),
            /* @__PURE__ */ jsxs("p", { children: [
              "• ",
              /* @__PURE__ */ jsx("strong", { children: "Manager" }),
              " (optional) - must be specified by email address. If manager email doesn't exist, user will be created but a warning will be reported"
            ] }),
            /* @__PURE__ */ jsx("p", { children: "• All other fields (Phone, Employee ID, etc.) are optional and will use default values if not provided" })
          ] })
        ] })
      ] })
    ] })
  ] });
};
const UserManagement = () => {
  const { supabaseClient } = useOrganisationContext();
  const { profiles, loading, updateProfile, refetch } = useUserProfiles();
  const { isSuperAdmin } = useUserRole();
  const { toast: toast2 } = useToast();
  const visibleProfiles = isSuperAdmin ? profiles : profiles.filter((p) => p.access_level !== "super_admin");
  const [viewMode, setViewMode] = useViewPreference("userManagement", "cards");
  const [searchTerm, setSearchTerm] = useState("");
  const filteredProfiles = visibleProfiles.filter((p) => {
    var _a, _b, _c, _d;
    if (!searchTerm) return true;
    const search = searchTerm.toLowerCase();
    return ((_a = p.full_name) == null ? void 0 : _a.toLowerCase().includes(search)) || ((_b = p.username) == null ? void 0 : _b.toLowerCase().includes(search)) || ((_c = p.location) == null ? void 0 : _c.toLowerCase().includes(search)) || ((_d = p.status) == null ? void 0 : _d.toLowerCase().includes(search));
  });
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showImportErrorReport, setShowImportErrorReport] = useState(false);
  const [importErrors, setImportErrors] = useState([]);
  const [importWarnings, setImportWarnings] = useState([]);
  const [importStats, setImportStats] = useState({ success: 0, total: 0 });
  const [isCreatingUser, setIsCreatingUser] = useState(false);
  const {
    isCreateDialogOpen,
    setIsCreateDialogOpen,
    newUser,
    setNewUser,
    resetNewUser
  } = useUserManagement();
  const onCreateUser = async (e) => {
    e.preventDefault();
    setIsCreatingUser(true);
    try {
      await handleCreateUser(supabaseClient, newUser, async (id, updates) => {
        await updateProfile(id, updates);
      }, async () => {
        await refetch();
      });
      setIsCreateDialogOpen(false);
      resetNewUser();
    } catch (error) {
      console.error("Error creating user:", error);
    } finally {
      setIsCreatingUser(false);
    }
  };
  const onDeleteUser = (userId) => {
    const user = visibleProfiles.find((p) => p.id === userId);
    setUserToDelete({ id: userId, name: (user == null ? void 0 : user.full_name) || "Unknown User" });
    setIsDeleteDialogOpen(true);
  };
  const handleDeleteConfirm = async (reason) => {
    var _a;
    if (!userToDelete) return;
    setIsDeleting(true);
    try {
      const result = await handleDeleteUser(supabaseClient, userToDelete.id, userToDelete.name, reason);
      if (result.success) {
        setIsDeleteDialogOpen(false);
        setUserToDelete(null);
        toast2({
          title: "Success",
          description: `User ${((_a = result.deletedUser) == null ? void 0 : _a.name) || userToDelete.name} has been successfully deleted`
        });
        await refetch();
      }
    } finally {
      setIsDeleting(false);
    }
  };
  const onUpdateProfile = async (id, updates) => {
    const result = await updateProfile(id, updates);
    return { success: result.success, error: result.error };
  };
  if (loading) {
    return /* @__PURE__ */ jsx("div", { children: "Loading users..." });
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      ImportErrorReport$1,
      {
        errors: importErrors,
        warnings: importWarnings,
        successCount: importStats.success,
        totalCount: importStats.total,
        isOpen: showImportErrorReport,
        onClose: () => setShowImportErrorReport(false),
        importType: "Users"
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxs(Card, { children: [
        /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(Users, { className: "h-5 w-5" }),
              "User Management"
            ] }),
            /* @__PURE__ */ jsx(CardDescription, { children: "Manage user accounts, roles, and permissions" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsxs(
              ToggleGroup,
              {
                type: "single",
                value: viewMode,
                onValueChange: (value) => value && setViewMode(value),
                children: [
                  /* @__PURE__ */ jsx(ToggleGroupItem, { value: "cards", "aria-label": "Card view", children: /* @__PURE__ */ jsx(LayoutGrid, { className: "h-4 w-4" }) }),
                  /* @__PURE__ */ jsx(ToggleGroupItem, { value: "list", "aria-label": "List view", children: /* @__PURE__ */ jsx(List, { className: "h-4 w-4" }) })
                ]
              }
            ),
            /* @__PURE__ */ jsx(
              ImportUsersDialog,
              {
                onImportComplete: refetch,
                onImportError: (errors, warnings, stats) => {
                  setImportErrors(errors);
                  setImportWarnings(warnings);
                  setImportStats(stats);
                  setShowImportErrorReport(true);
                }
              }
            ),
            /* @__PURE__ */ jsx(
              CreateUserDialog,
              {
                isOpen: isCreateDialogOpen,
                onOpenChange: setIsCreateDialogOpen,
                newUser,
                onUserChange: setNewUser,
                onSubmit: onCreateUser,
                loading: isCreatingUser
              }
            )
          ] })
        ] }) }),
        /* @__PURE__ */ jsxs(CardContent, { children: [
          /* @__PURE__ */ jsxs("div", { className: "relative mb-4", children: [
            /* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                placeholder: "Search users...",
                value: searchTerm,
                onChange: (e) => setSearchTerm(e.target.value),
                className: "pl-10"
              }
            )
          ] }),
          viewMode === "cards" ? /* @__PURE__ */ jsx(
            UserList,
            {
              profiles: filteredProfiles,
              onDelete: onDeleteUser
            }
          ) : /* @__PURE__ */ jsx(
            UserTable,
            {
              profiles: filteredProfiles,
              onDelete: onDeleteUser,
              onUpdate: onUpdateProfile
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsx(
        DeleteUserDialog,
        {
          open: isDeleteDialogOpen,
          onOpenChange: setIsDeleteDialogOpen,
          userName: (userToDelete == null ? void 0 : userToDelete.name) || "",
          onConfirm: handleDeleteConfirm,
          loading: isDeleting
        }
      )
    ] })
  ] });
};
const ImportRolesDialog = ({ onImportComplete, onImportError }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { supabaseClient } = useOrganisationContext();
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      if (!file.name.endsWith(".csv") && file.type !== "text/csv") {
        toast({
          title: "Invalid file type",
          description: "Please upload a CSV file (.csv)",
          variant: "destructive"
        });
        return;
      }
      setUploadedFile(file);
      toast({
        title: "File uploaded",
        description: `${file.name} is ready for import`
      });
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "text/csv": [".csv"]
    },
    multiple: false
  });
  const generateSampleCSV = () => {
    const headers = ["Name", "Description", "Department"];
    const sampleData = [
      ["Senior Developer", "Senior software developer role", "Engineering"],
      ["Sales Manager", "Manages sales team and customer relations", "Sales"],
      ["HR Coordinator", "Human resources coordination", "HR"],
      ["Intern", "Internship role", ""]
    ];
    const csvContent = [headers, ...sampleData].map((row) => row.map((field) => `"${field}"`).join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "role_import_template.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const validateDepartment = async (departmentName) => {
    if (!departmentName || !departmentName.trim()) {
      return { isValid: false };
    }
    const trimmedName = departmentName.trim();
    const { data: department } = await supabaseClient.from("departments").select("id").ilike("name", trimmedName).maybeSingle();
    if (department) {
      return { isValid: true, departmentId: department.id };
    }
    return { isValid: false };
  };
  const processRoleImport = async (row) => {
    const name = row["Name"] || row["name"];
    if (!name || !name.trim()) {
      throw new Error("Role name is required");
    }
    const description = row["Description"] || row["description"] || "";
    const departmentName = row["Department"] || row["department"] || "";
    const warnings = [];
    let departmentId = null;
    if (departmentName) {
      const departmentValidation = await validateDepartment(departmentName);
      if (departmentValidation.isValid) {
        departmentId = departmentValidation.departmentId || null;
      } else {
        warnings.push({
          field: "Department",
          value: departmentName,
          message: `Department "${departmentName}" not found - role created without department`
        });
      }
    }
    const { data: existingRole } = await supabaseClient.from("roles").select("role_id").ilike("name", name.trim()).maybeSingle();
    if (existingRole) {
      throw new Error(`Role "${name}" already exists`);
    }
    const { error } = await supabaseClient.from("roles").insert([{
      name: name.trim(),
      description: description.trim() || null,
      department_id: departmentId,
      is_active: true
    }]);
    if (error) {
      throw new Error(error.message || "Failed to create role");
    }
    return {
      name,
      success: true,
      warnings: warnings.length > 0 ? warnings : null
    };
  };
  const handleImport = async () => {
    if (!uploadedFile) {
      toast({
        title: "No file selected",
        description: "Please upload a file first",
        variant: "destructive"
      });
      return;
    }
    setIsProcessing(true);
    try {
      const text = await uploadedFile.text();
      Papa.parse(text, {
        header: true,
        complete: async (results) => {
          const data = results.data;
          if (data.length === 0) {
            toast({
              title: "Empty file",
              description: "The uploaded file contains no data",
              variant: "destructive"
            });
            setIsProcessing(false);
            return;
          }
          debug.log("Processing", data.length, "roles");
          let successCount = 0;
          const errors = [];
          const warnings = [];
          for (let i = 0; i < data.length; i++) {
            const row = data[i];
            if (!row["Name"] && !row["name"]) {
              debug.log("Skipping empty row at index", i);
              continue;
            }
            const name = row["Name"] || row["name"] || "Unknown";
            try {
              debug.log(`Processing role ${i + 1} of ${data.length}:`, name);
              const result = await processRoleImport(row);
              successCount++;
              debug.log(`Successfully processed role ${i + 1}`);
              if (result.warnings) {
                result.warnings.forEach((warning) => {
                  warnings.push({
                    rowNumber: i + 2,
                    identifier: name,
                    field: warning.field,
                    error: warning.message,
                    rawData: row
                  });
                });
              }
            } catch (error) {
              console.error(`Error importing role ${i + 1}:`, error);
              errors.push({
                rowNumber: i + 2,
                identifier: name,
                field: !row["Name"] && !row["name"] ? "Name" : void 0,
                error: error.message || "Unknown error",
                rawData: row
              });
            }
            if (i < data.length - 1) {
              await new Promise((resolve) => setTimeout(resolve, 300));
            }
          }
          debug.log("Import completed. Success:", successCount, "Errors:", errors.length, "Warnings:", warnings.length);
          setUploadedFile(null);
          setIsProcessing(false);
          setIsOpen(false);
          if ((errors.length > 0 || warnings.length > 0) && onImportError) {
            setTimeout(() => {
              onImportError(errors, warnings, { success: successCount, total: data.length });
            }, 300);
            if (errors.length > 0 && warnings.length > 0) {
              toast({
                title: "Import completed with errors and warnings",
                description: `${successCount} roles imported successfully. ${errors.length} failed, ${warnings.length} have validation warnings.`,
                variant: "destructive"
              });
            } else if (errors.length > 0) {
              toast({
                title: "Import completed with errors",
                description: `${successCount} roles imported successfully. ${errors.length} failed.`,
                variant: "destructive"
              });
            } else if (warnings.length > 0) {
              toast({
                title: "Import completed with warnings",
                description: `${successCount} roles imported successfully. ${warnings.length} have validation warnings.`,
                variant: "default"
              });
            }
          } else {
            toast({
              title: "Import completed successfully",
              description: `All ${successCount} roles imported successfully.`
            });
          }
          if (onImportComplete) {
            await onImportComplete();
          }
        },
        error: (error) => {
          console.error("Parse error:", error);
          toast({
            title: "Parse error",
            description: "Failed to parse the CSV file",
            variant: "destructive"
          });
          setIsProcessing(false);
        }
      });
    } catch (error) {
      console.error("Import error:", error);
      toast({
        title: "Import failed",
        description: "An error occurred while importing the file",
        variant: "destructive"
      });
      setIsProcessing(false);
    }
  };
  const handleDialogClose = (open) => {
    if (!open && !isProcessing) {
      setUploadedFile(null);
    }
    setIsOpen(open);
  };
  return /* @__PURE__ */ jsxs(Dialog, { open: isOpen, onOpenChange: handleDialogClose, children: [
    /* @__PURE__ */ jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsx(Button, { variant: "outline", size: "icon", children: /* @__PURE__ */ jsx(Upload, { className: "h-4 w-4" }) }) }),
    /* @__PURE__ */ jsxs(DialogContent, { className: "max-w-3xl max-h-[90vh] overflow-y-auto", children: [
      /* @__PURE__ */ jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsx(DialogTitle, { children: "Import Roles" }),
        /* @__PURE__ */ jsx(DialogDescription, { children: "Upload a CSV or Excel file to import roles in bulk. Departments can be assigned by name." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs(
            "div",
            {
              ...getRootProps(),
              className: `border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${isDragActive ? "border-blue-400 bg-blue-50" : uploadedFile ? "border-green-400 bg-green-50" : "border-gray-300 hover:border-gray-400"}`,
              children: [
                /* @__PURE__ */ jsx("input", { ...getInputProps() }),
                /* @__PURE__ */ jsx(Upload, { className: "h-12 w-12 mx-auto mb-4 text-gray-400" }),
                uploadedFile ? /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("p", { className: "text-lg font-medium text-green-700", children: "File Ready for Import" }),
                  /* @__PURE__ */ jsx("p", { className: "text-sm text-green-600 mt-1", children: uploadedFile.name }),
                  /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mt-2", children: "Click to select a different file or drop a new one here" })
                ] }) : isDragActive ? /* @__PURE__ */ jsx("p", { className: "text-lg font-medium text-blue-700", children: "Drop your role file here" }) : /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("p", { className: "text-lg font-medium", children: "Drag and drop your role file here, or browse" }),
                  /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 mt-1", children: "Supports CSV files (.csv)" })
                ] })
              ]
            }
          ),
          uploadedFile && /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
            /* @__PURE__ */ jsx(
              Button,
              {
                onClick: handleImport,
                disabled: isProcessing,
                size: "icon",
                children: isProcessing ? /* @__PURE__ */ jsx("div", { className: "animate-spin rounded-full h-4 w-4 border-b-2 border-white" }) : /* @__PURE__ */ jsx(Upload, { className: "h-4 w-4" })
              }
            ),
            /* @__PURE__ */ jsx(
              Button,
              {
                variant: "outline",
                onClick: () => setUploadedFile(null),
                disabled: isProcessing,
                size: "icon",
                children: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4" })
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-yellow-50 border border-yellow-200 rounded-lg p-4", children: [
          /* @__PURE__ */ jsx("h4", { className: "text-sm font-medium text-yellow-800 mb-2", children: "Role Import Template" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-yellow-700 mb-3", children: "Download a template for importing roles with sample data." }),
          /* @__PURE__ */ jsx("div", { className: "space-y-2", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between p-2 bg-white rounded border", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(FileText, { className: "h-4 w-4" }),
              /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", children: "Roles Template (CSV)" }),
              /* @__PURE__ */ jsx(Badge, { variant: "secondary", className: "text-xs", children: "Ready to use template" })
            ] }),
            /* @__PURE__ */ jsx(Button, { size: "sm", variant: "outline", onClick: generateSampleCSV, className: "gap-2", children: /* @__PURE__ */ jsx(Download, { className: "h-4 w-4" }) })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-blue-50 border border-blue-200 rounded-lg p-4", children: [
          /* @__PURE__ */ jsx("h4", { className: "font-semibold text-blue-900 mb-2", children: "Available Columns" }),
          /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2 mb-4", children: ["Name", "Description", "Department"].map((column) => /* @__PURE__ */ jsx(Badge, { variant: "outline", className: "text-xs", children: column }, column)) }),
          /* @__PURE__ */ jsxs("div", { className: "text-sm text-blue-800 space-y-1", children: [
            /* @__PURE__ */ jsxs("p", { children: [
              "• ",
              /* @__PURE__ */ jsx("strong", { children: "Name" }),
              " is required for each role"
            ] }),
            /* @__PURE__ */ jsxs("p", { children: [
              "• ",
              /* @__PURE__ */ jsx("strong", { children: "Description" }),
              " is optional"
            ] }),
            /* @__PURE__ */ jsxs("p", { children: [
              "• ",
              /* @__PURE__ */ jsx("strong", { children: "Department" }),
              " is optional - must match an existing department name"
            ] }),
            /* @__PURE__ */ jsxs("p", { children: [
              "• All imported roles will be created as ",
              /* @__PURE__ */ jsx("strong", { children: "active" }),
              " by default"
            ] }),
            /* @__PURE__ */ jsx("p", { children: "• Duplicate role names will be rejected" })
          ] })
        ] })
      ] })
    ] })
  ] });
};
const RoleMembersDialog = ({
  isOpen,
  onOpenChange,
  roleId,
  roleName
}) => {
  const { supabaseClient } = useOrganisationContext();
  const printRef = useRef(null);
  const { data: members = [], isLoading } = useQuery({
    queryKey: ["role-members", roleId],
    queryFn: async () => {
      debug.log("[RoleMembersDialog] Fetching members, roleId:", roleId);
      let roleQuery = supabaseClient.from("user_profile_roles").select("user_id, role_id, is_primary");
      if (roleId) {
        roleQuery = roleQuery.eq("role_id", roleId);
      }
      const { data: userRoles, error: userRolesError } = await roleQuery;
      debug.log("[RoleMembersDialog] user_profile_roles result:", { count: userRoles == null ? void 0 : userRoles.length, error: userRolesError == null ? void 0 : userRolesError.message });
      if (userRolesError) throw userRolesError;
      const userIds = [...new Set((userRoles || []).map((ur) => ur.user_id))];
      debug.log("[RoleMembersDialog] Unique user IDs:", userIds.length);
      if (userIds.length === 0) {
        debug.log("[RoleMembersDialog] No users found with roles");
        return [];
      }
      const { data: profiles, error: profilesError } = await supabaseClient.from("profiles").select("id, full_name, username, status").in("id", userIds);
      debug.log("[RoleMembersDialog] profiles result:", { count: profiles == null ? void 0 : profiles.length, error: profilesError == null ? void 0 : profilesError.message });
      if (profilesError) throw profilesError;
      const roleIds = [...new Set((userRoles || []).map((ur) => ur.role_id).filter(Boolean))];
      let rolesData = [];
      if (roleIds.length > 0) {
        const { data: roles, error: rolesError } = await supabaseClient.from("roles").select("role_id, name").in("role_id", roleIds);
        debug.log("[RoleMembersDialog] roles result:", { count: roles == null ? void 0 : roles.length, error: rolesError == null ? void 0 : rolesError.message });
        if (rolesError) throw rolesError;
        rolesData = roles || [];
      }
      const { data: userDepts, error: userDeptsError } = await supabaseClient.from("user_departments").select("user_id, department_id, is_primary, departments(name)").in("user_id", userIds);
      debug.log("[RoleMembersDialog] user_departments result:", { count: userDepts == null ? void 0 : userDepts.length, error: userDeptsError == null ? void 0 : userDeptsError.message });
      if (userDeptsError) throw userDeptsError;
      const profileMap = /* @__PURE__ */ new Map();
      (profiles || []).forEach((p) => profileMap.set(p.id, p));
      const roleNameMap = /* @__PURE__ */ new Map();
      rolesData.forEach((r) => roleNameMap.set(r.role_id, r.name));
      const userDeptMap = /* @__PURE__ */ new Map();
      (userDepts || []).forEach((ud) => {
        var _a;
        if (ud.is_primary || !userDeptMap.has(ud.user_id)) {
          userDeptMap.set(ud.user_id, ((_a = ud.departments) == null ? void 0 : _a.name) || "No Department");
        }
      });
      const memberData = (userRoles || []).map((ur) => {
        const profile = profileMap.get(ur.user_id);
        return {
          roleName: roleNameMap.get(ur.role_id) || "Unknown",
          userName: (profile == null ? void 0 : profile.full_name) || "Unknown User",
          departmentName: userDeptMap.get(ur.user_id) || "No Department",
          email: (profile == null ? void 0 : profile.username) || "",
          status: (profile == null ? void 0 : profile.status) || "Unknown"
        };
      });
      memberData.sort((a, b) => {
        const roleCompare = a.roleName.localeCompare(b.roleName);
        if (roleCompare !== 0) return roleCompare;
        return a.userName.localeCompare(b.userName);
      });
      debug.log("[RoleMembersDialog] Processed members:", memberData.length);
      return memberData;
    },
    enabled: isOpen
  });
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: roleName ? `${roleName} Members Report` : "All Role Members Report"
  });
  const handleExportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(members.map((m) => ({
      Role: m.roleName,
      User: m.userName,
      Department: m.departmentName,
      Email: m.email,
      Status: m.status
    })));
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Members");
    XLSX.writeFile(workbook, `${roleName ? roleName.replace(/\s/g, "_") : "All_Roles"}_Members_Report.xlsx`);
  };
  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text(roleName ? `${roleName} Members` : "All Role Members", 14, 15);
    autoTable(doc, {
      head: [["Role", "User", "Department", "Email", "Status"]],
      body: members.map((m) => [m.roleName, m.userName, m.departmentName, m.email, m.status]),
      startY: 20
    });
    doc.save(`${roleName ? roleName.replace(/\s/g, "_") : "All_Roles"}_Members_Report.pdf`);
  };
  return /* @__PURE__ */ jsx(Dialog, { open: isOpen, onOpenChange, children: /* @__PURE__ */ jsxs(DialogContent, { className: "max-w-4xl max-h-[90vh] overflow-y-auto", children: [
    /* @__PURE__ */ jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsxs(DialogTitle, { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(Users, { className: "h-5 w-5" }),
        roleName ? `${roleName} Members` : "All Role Members"
      ] }),
      /* @__PURE__ */ jsx(DialogDescription, { children: roleName ? `Users assigned to the ${roleName} role.` : "All users and their assigned roles." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-2 mb-4", children: [
      /* @__PURE__ */ jsxs(Button, { onClick: handlePrint, variant: "outline", size: "sm", children: [
        /* @__PURE__ */ jsx(Printer, { className: "h-4 w-4 mr-2" }),
        " Print"
      ] }),
      /* @__PURE__ */ jsxs(Button, { onClick: handleExportExcel, variant: "outline", size: "sm", children: [
        /* @__PURE__ */ jsx(Download, { className: "h-4 w-4 mr-2" }),
        " Export Excel"
      ] }),
      /* @__PURE__ */ jsxs(Button, { onClick: handleExportPDF, variant: "outline", size: "sm", children: [
        /* @__PURE__ */ jsx(Download, { className: "h-4 w-4 mr-2" }),
        " Export PDF"
      ] })
    ] }),
    isLoading ? /* @__PURE__ */ jsx("div", { className: "text-center py-8", children: "Loading members..." }) : members.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "text-center py-8 text-muted-foreground", children: [
      "No members found ",
      roleName ? `for ${roleName}` : "",
      "."
    ] }) : /* @__PURE__ */ jsx("div", { ref: printRef, children: /* @__PURE__ */ jsxs(Table, { children: [
      /* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
        /* @__PURE__ */ jsx(TableHead, { children: "Role" }),
        /* @__PURE__ */ jsx(TableHead, { children: "User" }),
        /* @__PURE__ */ jsx(TableHead, { children: "Department" }),
        /* @__PURE__ */ jsx(TableHead, { children: "Email" }),
        /* @__PURE__ */ jsx(TableHead, { children: "Status" })
      ] }) }),
      /* @__PURE__ */ jsx(TableBody, { children: members.map((member, index) => /* @__PURE__ */ jsxs(TableRow, { children: [
        /* @__PURE__ */ jsx(TableCell, { children: member.roleName }),
        /* @__PURE__ */ jsx(TableCell, { children: member.userName }),
        /* @__PURE__ */ jsx(TableCell, { children: member.departmentName }),
        /* @__PURE__ */ jsx(TableCell, { className: "text-muted-foreground", children: member.email }),
        /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(Badge, { variant: member.status === "Active" ? "default" : "secondary", children: member.status }) })
      ] }, index)) })
    ] }) })
  ] }) });
};
const RoleManagement = () => {
  const { supabaseClient, hasPermission } = useOrganisationContext();
  const { hasManagerAccess, hasAdminAccess, managedDepartments } = useManagerPermissions();
  const isManagerOnly = hasManagerAccess && !hasAdminAccess;
  const managedDeptIds = useMemo(() => new Set(managedDepartments.map((d) => d.id)), [managedDepartments]);
  const queryClient = useQueryClient();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingRole, setEditingRole] = useState(null);
  const [showImportErrorReport, setShowImportErrorReport] = useState(false);
  const [importErrors, setImportErrors] = useState([]);
  const [importWarnings, setImportWarnings] = useState([]);
  const [importStats, setImportStats] = useState({ success: 0, total: 0 });
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    department_id: "none",
    is_active: true
  });
  const [sortField, setSortField] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  const [isMembersDialogOpen, setIsMembersDialogOpen] = useState(false);
  const [selectedRoleForMembers, setSelectedRoleForMembers] = useState(null);
  const { data: rolesData, isLoading: rolesLoading } = useQuery({
    queryKey: ["roles"],
    queryFn: async () => {
      const { data, error } = await supabaseClient.from("roles").select("*");
      if (error) throw error;
      return data;
    }
  });
  const { data: departments } = useQuery({
    queryKey: ["departments-for-roles"],
    queryFn: async () => {
      const { data, error } = await supabaseClient.from("departments").select("id, name").order("name");
      if (error) throw error;
      return data;
    }
  });
  const roles = useMemo(() => {
    if (!rolesData) return [];
    let data = rolesData;
    if (isManagerOnly) {
      data = data.filter((role) => role.department_id && managedDeptIds.has(role.department_id));
    }
    return [...data].sort((a, b) => {
      let aValue;
      let bValue;
      if (sortField === "name") {
        aValue = a.name.toLowerCase();
        bValue = b.name.toLowerCase();
      } else if (sortField === "department") {
        const aDept = departments == null ? void 0 : departments.find((d) => d.id === a.department_id);
        const bDept = departments == null ? void 0 : departments.find((d) => d.id === b.department_id);
        aValue = ((aDept == null ? void 0 : aDept.name) || "No department").toLowerCase();
        bValue = ((bDept == null ? void 0 : bDept.name) || "No department").toLowerCase();
      } else if (sortField === "status") {
        aValue = a.is_active ? 1 : 0;
        bValue = b.is_active ? 1 : 0;
      } else {
        aValue = new Date(a.created_at);
        bValue = new Date(b.created_at);
      }
      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }, [rolesData, isManagerOnly, managedDeptIds, sortField, sortDirection, departments]);
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };
  const createRoleMutation = useMutation({
    mutationFn: async (roleData) => {
      const { error } = await supabaseClient.from("roles").insert([{
        name: roleData.name,
        description: roleData.description || null,
        department_id: roleData.department_id === "none" ? null : roleData.department_id || null,
        is_active: roleData.is_active
      }]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
      toast({
        title: "Success",
        description: "Role created successfully"
      });
      setIsCreateDialogOpen(false);
      resetForm();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  });
  const updateRoleMutation = useMutation({
    mutationFn: async ({ role_id, ...roleData }) => {
      const { error } = await supabaseClient.from("roles").update({
        name: roleData.name,
        description: roleData.description || null,
        department_id: roleData.department_id === "none" ? null : roleData.department_id || null,
        is_active: roleData.is_active
      }).eq("role_id", role_id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
      toast({
        title: "Success",
        description: "Role updated successfully"
      });
      setEditingRole(null);
      resetForm();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  });
  const deleteRoleMutation = useMutation({
    mutationFn: async (roleId) => {
      const { error } = await supabaseClient.from("roles").delete().eq("role_id", roleId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
      toast({
        title: "Success",
        description: "Role deleted successfully"
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  });
  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      department_id: "none",
      is_active: true
    });
  };
  const handleEdit = (role) => {
    setEditingRole(role);
    setFormData({
      name: role.name,
      description: role.description || "",
      department_id: role.department_id || "none",
      is_active: role.is_active
    });
  };
  const handleSubmit = () => {
    if (editingRole) {
      updateRoleMutation.mutate({
        ...editingRole,
        ...formData
      });
    } else {
      createRoleMutation.mutate(formData);
    }
  };
  const getDepartmentName = (departmentId) => {
    if (!departmentId || departmentId === "none") return "No department";
    const department = departments == null ? void 0 : departments.find((d) => d.id === departmentId);
    return (department == null ? void 0 : department.name) || "Unknown department";
  };
  if (rolesLoading) {
    return /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center h-64", children: /* @__PURE__ */ jsx("div", { className: "animate-spin rounded-full h-32 w-32 border-b-2 border-primary" }) });
  }
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsx(
      ImportErrorReport$1,
      {
        errors: importErrors,
        warnings: importWarnings,
        successCount: importStats.success,
        totalCount: importStats.total,
        isOpen: showImportErrorReport,
        onClose: () => setShowImportErrorReport(false),
        importType: "Roles"
      }
    ),
    /* @__PURE__ */ jsxs(Card, { children: [
      /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(UserCheck, { className: "h-5 w-5" }),
            "Roles"
          ] }),
          /* @__PURE__ */ jsx(CardDescription, { children: "Manage organizational roles and their department associations" })
        ] }),
        hasPermission("canManageRoles") && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(
            ImportRolesDialog,
            {
              onImportComplete: async () => {
                await queryClient.invalidateQueries({ queryKey: ["roles"] });
              },
              onImportError: (errors, warnings, stats) => {
                setImportErrors(errors);
                setImportWarnings(warnings);
                setImportStats(stats);
                setShowImportErrorReport(true);
              }
            }
          ),
          /* @__PURE__ */ jsx(
            Button,
            {
              onClick: () => {
                setSelectedRoleForMembers(null);
                setIsMembersDialogOpen(true);
              },
              size: "icon",
              variant: "outline",
              title: "View All Members",
              children: /* @__PURE__ */ jsx(Users, { className: "h-4 w-4" })
            }
          ),
          /* @__PURE__ */ jsxs(Dialog, { open: isCreateDialogOpen, onOpenChange: setIsCreateDialogOpen, children: [
            /* @__PURE__ */ jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsx(Button, { size: "icon", children: /* @__PURE__ */ jsx(Plus, { className: "h-4 w-4" }) }) }),
            /* @__PURE__ */ jsxs(DialogContent, { children: [
              /* @__PURE__ */ jsxs(DialogHeader, { children: [
                /* @__PURE__ */ jsx(DialogTitle, { children: "Create Role" }),
                /* @__PURE__ */ jsx(DialogDescription, { children: "Add a new role to your organization" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "grid gap-4 py-4", children: [
                /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
                  /* @__PURE__ */ jsx(Label, { htmlFor: "name", children: "Role Name" }),
                  /* @__PURE__ */ jsx(
                    Input,
                    {
                      id: "name",
                      value: formData.name,
                      onChange: (e) => setFormData((prev) => ({ ...prev, name: e.target.value })),
                      placeholder: "Enter role name"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
                  /* @__PURE__ */ jsx(Label, { htmlFor: "description", children: "Description" }),
                  /* @__PURE__ */ jsx(
                    Textarea,
                    {
                      id: "description",
                      value: formData.description,
                      onChange: (e) => setFormData((prev) => ({ ...prev, description: e.target.value })),
                      placeholder: "Enter role description (optional)"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
                  /* @__PURE__ */ jsx(Label, { htmlFor: "department", children: "Department" }),
                  /* @__PURE__ */ jsxs(
                    Select,
                    {
                      value: formData.department_id,
                      onValueChange: (value) => setFormData((prev) => ({ ...prev, department_id: value })),
                      children: [
                        /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Select department (optional)" }) }),
                        /* @__PURE__ */ jsxs(SelectContent, { children: [
                          /* @__PURE__ */ jsx(SelectItem, { value: "none", children: "No department" }),
                          departments == null ? void 0 : departments.map((department) => /* @__PURE__ */ jsx(SelectItem, { value: department.id, children: department.name }, department.id))
                        ] })
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
                  /* @__PURE__ */ jsx(
                    Switch,
                    {
                      id: "is_active",
                      checked: formData.is_active,
                      onCheckedChange: (checked) => setFormData((prev) => ({ ...prev, is_active: checked }))
                    }
                  ),
                  /* @__PURE__ */ jsx(Label, { htmlFor: "is_active", children: "Active Role" })
                ] })
              ] }),
              /* @__PURE__ */ jsxs(DialogFooter, { children: [
                /* @__PURE__ */ jsx(Button, { variant: "outline", onClick: () => setIsCreateDialogOpen(false), size: "icon", children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }) }),
                /* @__PURE__ */ jsx(Button, { onClick: handleSubmit, disabled: !formData.name.trim(), size: "icon", children: /* @__PURE__ */ jsx(Save, { className: "h-4 w-4" }) })
              ] })
            ] })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs(CardContent, { children: [
        /* @__PURE__ */ jsxs(Table, { children: [
          /* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { className: "bg-muted/50", children: [
            /* @__PURE__ */ jsx(
              TableHead,
              {
                className: "cursor-pointer hover:bg-muted/70 transition-colors",
                onClick: () => handleSort("name"),
                children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                  "Name",
                  sortField === "name" && (sortDirection === "asc" ? /* @__PURE__ */ jsx(ArrowUp, { className: "h-4 w-4" }) : /* @__PURE__ */ jsx(ArrowDown, { className: "h-4 w-4" }))
                ] })
              }
            ),
            /* @__PURE__ */ jsx(TableHead, { children: "Description" }),
            /* @__PURE__ */ jsx(
              TableHead,
              {
                className: "cursor-pointer hover:bg-muted/70 transition-colors",
                onClick: () => handleSort("department"),
                children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                  "Department",
                  sortField === "department" && (sortDirection === "asc" ? /* @__PURE__ */ jsx(ArrowUp, { className: "h-4 w-4" }) : /* @__PURE__ */ jsx(ArrowDown, { className: "h-4 w-4" }))
                ] })
              }
            ),
            /* @__PURE__ */ jsx(
              TableHead,
              {
                className: "cursor-pointer hover:bg-muted/70 transition-colors",
                onClick: () => handleSort("status"),
                children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                  "Status",
                  sortField === "status" && (sortDirection === "asc" ? /* @__PURE__ */ jsx(ArrowUp, { className: "h-4 w-4" }) : /* @__PURE__ */ jsx(ArrowDown, { className: "h-4 w-4" }))
                ] })
              }
            ),
            /* @__PURE__ */ jsx(
              TableHead,
              {
                className: "cursor-pointer hover:bg-muted/70 transition-colors",
                onClick: () => handleSort("created_at"),
                children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                  "Created",
                  sortField === "created_at" && (sortDirection === "asc" ? /* @__PURE__ */ jsx(ArrowUp, { className: "h-4 w-4" }) : /* @__PURE__ */ jsx(ArrowDown, { className: "h-4 w-4" }))
                ] })
              }
            ),
            hasPermission("canManageRoles") && /* @__PURE__ */ jsx(TableHead, { className: "text-right", children: "Actions" })
          ] }) }),
          /* @__PURE__ */ jsx(TableBody, { children: roles == null ? void 0 : roles.map((role) => /* @__PURE__ */ jsxs(TableRow, { children: [
            /* @__PURE__ */ jsx(TableCell, { className: "font-medium", children: role.name }),
            /* @__PURE__ */ jsx(TableCell, { children: role.description || /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "No description" }) }),
            /* @__PURE__ */ jsx(TableCell, { children: getDepartmentName(role.department_id) }),
            /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(Badge, { variant: role.is_active ? "default" : "secondary", children: role.is_active ? "Active" : "Inactive" }) }),
            /* @__PURE__ */ jsx(TableCell, { children: new Date(role.created_at).toLocaleDateString() }),
            hasPermission("canManageRoles") && /* @__PURE__ */ jsx(TableCell, { className: "text-right", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-2", children: [
              /* @__PURE__ */ jsx(
                Button,
                {
                  variant: "outline",
                  size: "icon",
                  onClick: () => {
                    setSelectedRoleForMembers({ id: role.role_id, name: role.name });
                    setIsMembersDialogOpen(true);
                  },
                  title: `View members with ${role.name} role`,
                  children: /* @__PURE__ */ jsx(Users, { className: "h-4 w-4" })
                }
              ),
              /* @__PURE__ */ jsx(
                Button,
                {
                  variant: "outline",
                  size: "sm",
                  onClick: () => handleEdit(role),
                  children: /* @__PURE__ */ jsx(SquarePen, { className: "h-4 w-4" })
                }
              ),
              /* @__PURE__ */ jsx(
                Button,
                {
                  variant: "outline",
                  size: "sm",
                  onClick: () => deleteRoleMutation.mutate(role.role_id),
                  children: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4" })
                }
              )
            ] }) })
          ] }, role.role_id)) })
        ] }),
        (roles == null ? void 0 : roles.length) === 0 && /* @__PURE__ */ jsxs("div", { className: "text-center py-8", children: [
          /* @__PURE__ */ jsx(UserCheck, { className: "h-12 w-12 mx-auto text-muted-foreground mb-4" }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "No roles found" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Create your first role to get started" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx(
      RoleMembersDialog,
      {
        isOpen: isMembersDialogOpen,
        onOpenChange: setIsMembersDialogOpen,
        roleId: selectedRoleForMembers == null ? void 0 : selectedRoleForMembers.id,
        roleName: selectedRoleForMembers == null ? void 0 : selectedRoleForMembers.name
      }
    ),
    hasPermission("canManageRoles") && /* @__PURE__ */ jsx(Dialog, { open: !!editingRole, onOpenChange: (open) => !open && setEditingRole(null), children: /* @__PURE__ */ jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsx(DialogTitle, { children: "Edit Role" }),
        /* @__PURE__ */ jsx(DialogDescription, { children: "Update role information" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid gap-4 py-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "edit-name", children: "Role Name" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "edit-name",
              value: formData.name,
              onChange: (e) => setFormData((prev) => ({ ...prev, name: e.target.value })),
              placeholder: "Enter role name"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "edit-description", children: "Description" }),
          /* @__PURE__ */ jsx(
            Textarea,
            {
              id: "edit-description",
              value: formData.description,
              onChange: (e) => setFormData((prev) => ({ ...prev, description: e.target.value })),
              placeholder: "Enter role description (optional)"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "edit-department", children: "Department" }),
          /* @__PURE__ */ jsxs(
            Select,
            {
              value: formData.department_id,
              onValueChange: (value) => setFormData((prev) => ({ ...prev, department_id: value })),
              children: [
                /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Select department (optional)" }) }),
                /* @__PURE__ */ jsxs(SelectContent, { children: [
                  /* @__PURE__ */ jsx(SelectItem, { value: "none", children: "No department" }),
                  departments == null ? void 0 : departments.map((department) => /* @__PURE__ */ jsx(SelectItem, { value: department.id, children: department.name }, department.id))
                ] })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
          /* @__PURE__ */ jsx(
            Switch,
            {
              id: "edit-is_active",
              checked: formData.is_active,
              onCheckedChange: (checked) => setFormData((prev) => ({ ...prev, is_active: checked }))
            }
          ),
          /* @__PURE__ */ jsx(Label, { htmlFor: "edit-is_active", children: "Active Role" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsx(Button, { variant: "outline", onClick: () => setEditingRole(null), size: "icon", children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }) }),
        /* @__PURE__ */ jsx(Button, { onClick: handleSubmit, disabled: !formData.name.trim(), size: "icon", children: /* @__PURE__ */ jsx(Save, { className: "h-4 w-4" }) })
      ] })
    ] }) })
  ] });
};
const ImportDepartmentsDialog = ({ onImportComplete, onImportError }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { supabaseClient } = useOrganisationContext();
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      if (!file.name.endsWith(".csv") && file.type !== "text/csv") {
        toast({
          title: "Invalid file type",
          description: "Please upload a CSV file (.csv)",
          variant: "destructive"
        });
        return;
      }
      setUploadedFile(file);
      toast({
        title: "File uploaded",
        description: `${file.name} is ready for import`
      });
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "text/csv": [".csv"]
    },
    multiple: false
  });
  const generateSampleCSV = () => {
    const headers = ["Name", "Description", "Manager"];
    const sampleData = [
      ["Engineering", "Software development and technical operations", "John Lim"],
      ["Sales", "Sales and customer relations", "Jane Tan"],
      ["HR", "Human resources and recruitment", ""]
    ];
    const csvContent = [headers, ...sampleData].map((row) => row.map((field) => `"${field}"`).join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "department_import_template.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const validateManager = async (managerName) => {
    if (!managerName || !managerName.trim()) {
      return { isValid: false };
    }
    const trimmedName = managerName.trim();
    const { data: profileByName } = await supabaseClient.from("profiles").select("id").ilike("full_name", trimmedName).maybeSingle();
    if (profileByName) {
      return { isValid: true, managerId: profileByName.id };
    }
    const { data: profileByEmail } = await supabaseClient.from("profiles").select("id").ilike("email", trimmedName).maybeSingle();
    if (profileByEmail) {
      return { isValid: true, managerId: profileByEmail.id };
    }
    return { isValid: false };
  };
  const processDepartmentImport = async (row) => {
    const name = row["Name"] || row["name"];
    if (!name || !name.trim()) {
      throw new Error("Department name is required");
    }
    const description = row["Description"] || row["description"] || "";
    const managerName = row["Manager"] || row["manager"] || "";
    const warnings = [];
    let managerId = null;
    if (managerName) {
      const managerValidation = await validateManager(managerName);
      if (managerValidation.isValid) {
        managerId = managerValidation.managerId || null;
      } else {
        warnings.push({
          field: "Manager",
          value: managerName,
          message: `Manager "${managerName}" not found - department created without manager`
        });
      }
    }
    const { data: existingDept } = await supabaseClient.from("departments").select("id").ilike("name", name.trim()).maybeSingle();
    if (existingDept) {
      throw new Error(`Department "${name}" already exists`);
    }
    const { error } = await supabaseClient.from("departments").insert([{
      name: name.trim(),
      description: description.trim() || null,
      manager_id: managerId
    }]);
    if (error) {
      throw new Error(error.message || "Failed to create department");
    }
    return {
      name,
      success: true,
      warnings: warnings.length > 0 ? warnings : null
    };
  };
  const handleImport = async () => {
    if (!uploadedFile) {
      toast({
        title: "No file selected",
        description: "Please upload a file first",
        variant: "destructive"
      });
      return;
    }
    setIsProcessing(true);
    try {
      const text = await uploadedFile.text();
      Papa.parse(text, {
        header: true,
        complete: async (results) => {
          const data = results.data;
          if (data.length === 0) {
            toast({
              title: "Empty file",
              description: "The uploaded file contains no data",
              variant: "destructive"
            });
            setIsProcessing(false);
            return;
          }
          debug.log("Processing", data.length, "departments");
          let successCount = 0;
          const errors = [];
          const warnings = [];
          for (let i = 0; i < data.length; i++) {
            const row = data[i];
            if (!row["Name"] && !row["name"]) {
              debug.log("Skipping empty row at index", i);
              continue;
            }
            const name = row["Name"] || row["name"] || "Unknown";
            try {
              debug.log(`Processing department ${i + 1} of ${data.length}:`, name);
              const result = await processDepartmentImport(row);
              successCount++;
              debug.log(`Successfully processed department ${i + 1}`);
              if (result.warnings) {
                result.warnings.forEach((warning) => {
                  warnings.push({
                    rowNumber: i + 2,
                    identifier: name,
                    field: warning.field,
                    error: warning.message,
                    rawData: row
                  });
                });
              }
            } catch (error) {
              console.error(`Error importing department ${i + 1}:`, error);
              errors.push({
                rowNumber: i + 2,
                identifier: name,
                field: !row["Name"] && !row["name"] ? "Name" : void 0,
                error: error.message || "Unknown error",
                rawData: row
              });
            }
            if (i < data.length - 1) {
              await new Promise((resolve) => setTimeout(resolve, 300));
            }
          }
          debug.log("Import completed. Success:", successCount, "Errors:", errors.length, "Warnings:", warnings.length);
          setUploadedFile(null);
          setIsProcessing(false);
          setIsOpen(false);
          if ((errors.length > 0 || warnings.length > 0) && onImportError) {
            setTimeout(() => {
              onImportError(errors, warnings, { success: successCount, total: data.length });
            }, 300);
            if (errors.length > 0 && warnings.length > 0) {
              toast({
                title: "Import completed with errors and warnings",
                description: `${successCount} departments imported successfully. ${errors.length} failed, ${warnings.length} have validation warnings.`,
                variant: "destructive"
              });
            } else if (errors.length > 0) {
              toast({
                title: "Import completed with errors",
                description: `${successCount} departments imported successfully. ${errors.length} failed.`,
                variant: "destructive"
              });
            } else if (warnings.length > 0) {
              toast({
                title: "Import completed with warnings",
                description: `${successCount} departments imported successfully. ${warnings.length} have validation warnings.`,
                variant: "default"
              });
            }
          } else {
            toast({
              title: "Import completed successfully",
              description: `All ${successCount} departments imported successfully.`
            });
          }
          if (onImportComplete) {
            await onImportComplete();
          }
        },
        error: (error) => {
          console.error("Parse error:", error);
          toast({
            title: "Parse error",
            description: "Failed to parse the CSV file",
            variant: "destructive"
          });
          setIsProcessing(false);
        }
      });
    } catch (error) {
      console.error("Import error:", error);
      toast({
        title: "Import failed",
        description: "An error occurred while importing the file",
        variant: "destructive"
      });
      setIsProcessing(false);
    }
  };
  const handleDialogClose = (open) => {
    if (!open && !isProcessing) {
      setUploadedFile(null);
    }
    setIsOpen(open);
  };
  return /* @__PURE__ */ jsxs(Dialog, { open: isOpen, onOpenChange: handleDialogClose, children: [
    /* @__PURE__ */ jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsx(Button, { variant: "outline", size: "icon", children: /* @__PURE__ */ jsx(Upload, { className: "h-4 w-4" }) }) }),
    /* @__PURE__ */ jsxs(DialogContent, { className: "max-w-3xl max-h-[90vh] overflow-y-auto", children: [
      /* @__PURE__ */ jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsx(DialogTitle, { children: "Import Departments" }),
        /* @__PURE__ */ jsx(DialogDescription, { children: "Upload a CSV or Excel file to import departments in bulk. Managers can be assigned by name or email." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs(
            "div",
            {
              ...getRootProps(),
              className: `border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${isDragActive ? "border-blue-400 bg-blue-50" : uploadedFile ? "border-green-400 bg-green-50" : "border-gray-300 hover:border-gray-400"}`,
              children: [
                /* @__PURE__ */ jsx("input", { ...getInputProps() }),
                /* @__PURE__ */ jsx(Upload, { className: "h-12 w-12 mx-auto mb-4 text-gray-400" }),
                uploadedFile ? /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("p", { className: "text-lg font-medium text-green-700", children: "File Ready for Import" }),
                  /* @__PURE__ */ jsx("p", { className: "text-sm text-green-600 mt-1", children: uploadedFile.name }),
                  /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mt-2", children: "Click to select a different file or drop a new one here" })
                ] }) : isDragActive ? /* @__PURE__ */ jsx("p", { className: "text-lg font-medium text-blue-700", children: "Drop your department file here" }) : /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("p", { className: "text-lg font-medium", children: "Drag and drop your department file here, or browse" }),
                  /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 mt-1", children: "Supports CSV files (.csv)" })
                ] })
              ]
            }
          ),
          uploadedFile && /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
            /* @__PURE__ */ jsx(
              Button,
              {
                onClick: handleImport,
                disabled: isProcessing,
                size: "icon",
                children: isProcessing ? /* @__PURE__ */ jsx("div", { className: "animate-spin rounded-full h-4 w-4 border-b-2 border-white" }) : /* @__PURE__ */ jsx(Upload, { className: "h-4 w-4" })
              }
            ),
            /* @__PURE__ */ jsx(
              Button,
              {
                variant: "outline",
                onClick: () => setUploadedFile(null),
                disabled: isProcessing,
                size: "icon",
                children: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4" })
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-yellow-50 border border-yellow-200 rounded-lg p-4", children: [
          /* @__PURE__ */ jsx("h4", { className: "text-sm font-medium text-yellow-800 mb-2", children: "Department Import Template" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-yellow-700 mb-3", children: "Download a template for importing departments with sample data." }),
          /* @__PURE__ */ jsx("div", { className: "space-y-2", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between p-2 bg-white rounded border", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(FileText, { className: "h-4 w-4" }),
              /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", children: "Departments Template (CSV)" }),
              /* @__PURE__ */ jsx(Badge, { variant: "secondary", className: "text-xs", children: "Ready to use template" })
            ] }),
            /* @__PURE__ */ jsx(Button, { size: "sm", variant: "outline", onClick: generateSampleCSV, className: "gap-2", children: /* @__PURE__ */ jsx(Download, { className: "h-4 w-4" }) })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-blue-50 border border-blue-200 rounded-lg p-4", children: [
          /* @__PURE__ */ jsx("h4", { className: "font-semibold text-blue-900 mb-2", children: "Available Columns" }),
          /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2 mb-4", children: ["Name", "Description", "Manager"].map((column) => /* @__PURE__ */ jsx(Badge, { variant: "outline", className: "text-xs", children: column }, column)) }),
          /* @__PURE__ */ jsxs("div", { className: "text-sm text-blue-800 space-y-1", children: [
            /* @__PURE__ */ jsxs("p", { children: [
              "• ",
              /* @__PURE__ */ jsx("strong", { children: "Name" }),
              " is required for each department"
            ] }),
            /* @__PURE__ */ jsxs("p", { children: [
              "• ",
              /* @__PURE__ */ jsx("strong", { children: "Description" }),
              " is optional"
            ] }),
            /* @__PURE__ */ jsxs("p", { children: [
              "• ",
              /* @__PURE__ */ jsx("strong", { children: "Manager" }),
              " is optional - can be full name or email (must exist in system)"
            ] }),
            /* @__PURE__ */ jsx("p", { children: "• Duplicate department names will be rejected" })
          ] })
        ] })
      ] })
    ] })
  ] });
};
const DepartmentMembersDialog = ({
  isOpen,
  onOpenChange,
  departmentId,
  departmentName
}) => {
  const { supabaseClient } = useOrganisationContext();
  const printRef = useRef(null);
  const { data: members = [], isLoading } = useQuery({
    queryKey: ["department-members", departmentId],
    queryFn: async () => {
      debug.log("[DepartmentMembersDialog] Fetching members, departmentId:", departmentId);
      let deptQuery = supabaseClient.from("user_departments").select(`
          user_id,
          department_id,
          is_primary,
          departments(name)
        `);
      if (departmentId) {
        deptQuery = deptQuery.eq("department_id", departmentId);
      }
      const { data: userDepts, error: userDeptsError } = await deptQuery;
      debug.log("[DepartmentMembersDialog] user_departments result:", { count: userDepts == null ? void 0 : userDepts.length, error: userDeptsError == null ? void 0 : userDeptsError.message });
      if (userDeptsError) throw userDeptsError;
      const userIds = [...new Set((userDepts || []).map((ud) => ud.user_id))];
      debug.log("[DepartmentMembersDialog] Unique user IDs:", userIds.length);
      if (userIds.length === 0) {
        debug.log("[DepartmentMembersDialog] No users found in departments");
        return [];
      }
      const { data: profiles, error: profilesError } = await supabaseClient.from("profiles").select("id, full_name, username, status").in("id", userIds);
      debug.log("[DepartmentMembersDialog] profiles result:", { count: profiles == null ? void 0 : profiles.length, error: profilesError == null ? void 0 : profilesError.message });
      if (profilesError) throw profilesError;
      const { data: userProfileRoles, error: uprError } = await supabaseClient.from("user_profile_roles").select("user_id, is_primary, role_id").in("user_id", userIds);
      debug.log("[DepartmentMembersDialog] user_profile_roles result:", { count: userProfileRoles == null ? void 0 : userProfileRoles.length, error: uprError == null ? void 0 : uprError.message });
      if (uprError) throw uprError;
      const roleIds = [...new Set((userProfileRoles || []).map((upr) => upr.role_id).filter(Boolean))];
      let rolesData = [];
      if (roleIds.length > 0) {
        const { data: roles, error: rolesError } = await supabaseClient.from("roles").select("role_id, name").in("role_id", roleIds);
        debug.log("[DepartmentMembersDialog] roles result:", { count: roles == null ? void 0 : roles.length, error: rolesError == null ? void 0 : rolesError.message });
        if (rolesError) throw rolesError;
        rolesData = roles || [];
      }
      const profileMap = /* @__PURE__ */ new Map();
      (profiles || []).forEach((p) => profileMap.set(p.id, p));
      const roleNameMap = /* @__PURE__ */ new Map();
      rolesData.forEach((r) => roleNameMap.set(r.role_id, r.name));
      const userRoleMap = /* @__PURE__ */ new Map();
      (userProfileRoles || []).forEach((upr) => {
        const roleName = roleNameMap.get(upr.role_id) || "No Role";
        if (upr.is_primary || !userRoleMap.has(upr.user_id)) {
          userRoleMap.set(upr.user_id, roleName);
        }
      });
      const memberData = (userDepts || []).map((ud) => {
        var _a;
        const profile = profileMap.get(ud.user_id);
        return {
          departmentName: ((_a = ud.departments) == null ? void 0 : _a.name) || "Unknown",
          userName: (profile == null ? void 0 : profile.full_name) || "Unknown User",
          roleName: userRoleMap.get(ud.user_id) || "No Role",
          email: (profile == null ? void 0 : profile.username) || "",
          // username is the email in this schema
          status: (profile == null ? void 0 : profile.status) || "Unknown"
        };
      });
      memberData.sort((a, b) => {
        const deptCompare = a.departmentName.localeCompare(b.departmentName);
        if (deptCompare !== 0) return deptCompare;
        return a.userName.localeCompare(b.userName);
      });
      debug.log("[DepartmentMembersDialog] Final member data:", memberData.length, "members");
      return memberData;
    },
    enabled: isOpen
  });
  const handlePrint = () => {
    window.print();
  };
  const handleExportExcel = () => {
    if (members.length === 0) return;
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(members.map((m) => ({
      "Department": m.departmentName,
      "User": m.userName,
      "Role": m.roleName,
      "Email": m.email,
      "Status": m.status
    })));
    XLSX.utils.book_append_sheet(workbook, worksheet, "Department Members");
    const fileName = departmentName ? `${departmentName.replace(/\s+/g, "_")}_members.xlsx` : "all_department_members.xlsx";
    XLSX.writeFile(workbook, fileName);
  };
  const handleExportPDF = () => {
    if (members.length === 0) return;
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text(departmentName ? `${departmentName} Members` : "Department Members Report", 14, 20);
    doc.setFontSize(10);
    doc.text(`Generated: ${(/* @__PURE__ */ new Date()).toLocaleDateString()}`, 14, 28);
    doc.text(`Total Members: ${members.length}`, 14, 34);
    autoTable(doc, {
      head: [["Department", "User", "Role", "Email", "Status"]],
      body: members.map((m) => [
        m.departmentName,
        m.userName,
        m.roleName,
        m.email,
        m.status
      ]),
      startY: 40,
      styles: { fontSize: 9 },
      headStyles: { fillColor: [41, 128, 185] }
    });
    const fileName = departmentName ? `${departmentName.replace(/\s+/g, "_")}_members.pdf` : "all_department_members.pdf";
    doc.save(fileName);
  };
  const title = departmentName ? `${departmentName} Members` : "All Department Members";
  return /* @__PURE__ */ jsx(Dialog, { open: isOpen, onOpenChange, children: /* @__PURE__ */ jsxs(DialogContent, { className: "max-w-4xl max-h-[80vh] overflow-hidden flex flex-col", children: [
    /* @__PURE__ */ jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsxs(DialogTitle, { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(Users, { className: "h-5 w-5" }),
        title
      ] }),
      /* @__PURE__ */ jsx(DialogDescription, { children: departmentName ? `Users assigned to ${departmentName}` : "All users grouped by department" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex gap-2 py-2", children: [
      /* @__PURE__ */ jsxs(Button, { onClick: handlePrint, variant: "outline", size: "sm", children: [
        /* @__PURE__ */ jsx(Printer, { className: "h-4 w-4 mr-2" }),
        "Print"
      ] }),
      /* @__PURE__ */ jsxs(Button, { onClick: handleExportExcel, variant: "outline", size: "sm", children: [
        /* @__PURE__ */ jsx(Download, { className: "h-4 w-4 mr-2" }),
        "Excel"
      ] }),
      /* @__PURE__ */ jsxs(Button, { onClick: handleExportPDF, variant: "outline", size: "sm", children: [
        /* @__PURE__ */ jsx(FileText, { className: "h-4 w-4 mr-2" }),
        "PDF"
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { ref: printRef, className: "flex-1 overflow-auto", children: isLoading ? /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center h-32", children: /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "Loading members..." }) }) : members.length === 0 ? /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center h-32", children: /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "No members found" }) }) : /* @__PURE__ */ jsxs(Table, { children: [
      /* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
        !departmentId && /* @__PURE__ */ jsx(TableHead, { children: "Department" }),
        /* @__PURE__ */ jsx(TableHead, { children: "User" }),
        /* @__PURE__ */ jsx(TableHead, { children: "Role" }),
        /* @__PURE__ */ jsx(TableHead, { children: "Email" }),
        /* @__PURE__ */ jsx(TableHead, { children: "Status" })
      ] }) }),
      /* @__PURE__ */ jsx(TableBody, { children: members.map((member, index) => /* @__PURE__ */ jsxs(TableRow, { children: [
        !departmentId && /* @__PURE__ */ jsx(TableCell, { children: member.departmentName }),
        /* @__PURE__ */ jsx(TableCell, { className: "font-medium", children: member.userName }),
        /* @__PURE__ */ jsx(TableCell, { children: member.roleName }),
        /* @__PURE__ */ jsx(TableCell, { className: "text-muted-foreground", children: member.email }),
        /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(Badge, { variant: member.status === "Active" ? "default" : "secondary", children: member.status }) })
      ] }, index)) })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "pt-2 border-t text-sm text-muted-foreground", children: [
      "Total: ",
      members.length,
      " member",
      members.length !== 1 ? "s" : ""
    ] })
  ] }) });
};
const DepartmentManagement = () => {
  const { supabaseClient, hasPermission } = useOrganisationContext();
  const { hasManagerAccess, hasAdminAccess, managedDepartments: managedDeptList } = useManagerPermissions();
  const isManagerOnly = hasManagerAccess && !hasAdminAccess;
  const queryClient = useQueryClient();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState(null);
  const [showImportErrorReport, setShowImportErrorReport] = useState(false);
  const [importErrors, setImportErrors] = useState([]);
  const [importWarnings, setImportWarnings] = useState([]);
  const [importStats, setImportStats] = useState({ success: 0, total: 0 });
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    manager_id: "none"
  });
  const [sortField, setSortField] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  const [isMembersDialogOpen, setIsMembersDialogOpen] = useState(false);
  const [selectedDepartmentForMembers, setSelectedDepartmentForMembers] = useState(null);
  const { data: departmentsData, isLoading: departmentsLoading } = useQuery({
    queryKey: ["departments"],
    queryFn: async () => {
      const { data, error } = await supabaseClient.from("departments").select("*");
      if (error) throw error;
      return data;
    }
  });
  const departments = useMemo(() => {
    if (!departmentsData) return [];
    let data = departmentsData;
    if (isManagerOnly) {
      const managedIds = new Set(managedDeptList.map((d) => d.id));
      data = data.filter((dept) => managedIds.has(dept.id));
    }
    return [...data].sort((a, b) => {
      let aValue;
      let bValue;
      if (sortField === "name") {
        aValue = a.name.toLowerCase();
        bValue = b.name.toLowerCase();
      } else {
        aValue = new Date(a.created_at);
        bValue = new Date(b.created_at);
      }
      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }, [departmentsData, isManagerOnly, managedDeptList, sortField, sortDirection]);
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };
  const { data: profiles } = useQuery({
    queryKey: ["profiles-for-managers"],
    queryFn: async () => {
      const { data, error } = await supabaseClient.from("profiles").select("id, full_name").not("full_name", "is", null).order("full_name");
      if (error) throw error;
      return data;
    }
  });
  const createDepartmentMutation = useMutation({
    mutationFn: async (departmentData) => {
      const { error } = await supabaseClient.from("departments").insert([{
        name: departmentData.name,
        description: departmentData.description || null,
        manager_id: departmentData.manager_id === "none" ? null : departmentData.manager_id || null
      }]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["departments"] });
      toast({
        title: "Success",
        description: "Department created successfully"
      });
      setIsCreateDialogOpen(false);
      resetForm();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  });
  const updateDepartmentMutation = useMutation({
    mutationFn: async ({ id, ...departmentData }) => {
      const { error } = await supabaseClient.from("departments").update({
        name: departmentData.name,
        description: departmentData.description || null,
        manager_id: departmentData.manager_id === "none" ? null : departmentData.manager_id || null
      }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["departments"] });
      toast({
        title: "Success",
        description: "Department updated successfully"
      });
      setEditingDepartment(null);
      resetForm();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  });
  const deleteDepartmentMutation = useMutation({
    mutationFn: async (id) => {
      const { error } = await supabaseClient.from("departments").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["departments"] });
      toast({
        title: "Success",
        description: "Department deleted successfully"
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  });
  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      manager_id: "none"
    });
  };
  const handleEdit = (department) => {
    setEditingDepartment(department);
    setFormData({
      name: department.name,
      description: department.description || "",
      manager_id: department.manager_id || "none"
    });
  };
  const handleSubmit = () => {
    if (editingDepartment) {
      updateDepartmentMutation.mutate({
        ...editingDepartment,
        ...formData
      });
    } else {
      createDepartmentMutation.mutate(formData);
    }
  };
  const getManagerName = (managerId) => {
    if (!managerId || managerId === "none") return "No manager assigned";
    const manager = profiles == null ? void 0 : profiles.find((p) => p.id === managerId);
    return (manager == null ? void 0 : manager.full_name) || "Unknown manager";
  };
  if (departmentsLoading) {
    return /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center h-64", children: /* @__PURE__ */ jsx("div", { className: "animate-spin rounded-full h-32 w-32 border-b-2 border-primary" }) });
  }
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsx(
      ImportErrorReport$1,
      {
        errors: importErrors,
        warnings: importWarnings,
        successCount: importStats.success,
        totalCount: importStats.total,
        isOpen: showImportErrorReport,
        onClose: () => setShowImportErrorReport(false),
        importType: "Departments"
      }
    ),
    /* @__PURE__ */ jsxs(Card, { children: [
      /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Building2, { className: "h-5 w-5" }),
            "Departments"
          ] }),
          /* @__PURE__ */ jsx(CardDescription, { children: "Manage organizational departments and assign managers" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(
            Button,
            {
              variant: "outline",
              size: "icon",
              onClick: () => {
                setSelectedDepartmentForMembers(null);
                setIsMembersDialogOpen(true);
              },
              title: "View all members",
              children: /* @__PURE__ */ jsx(Users, { className: "h-4 w-4" })
            }
          ),
          hasPermission("canManageDepartments") && /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(
              ImportDepartmentsDialog,
              {
                onImportComplete: async () => {
                  await queryClient.invalidateQueries({ queryKey: ["departments"] });
                },
                onImportError: (errors, warnings, stats) => {
                  setImportErrors(errors);
                  setImportWarnings(warnings);
                  setImportStats(stats);
                  setShowImportErrorReport(true);
                }
              }
            ),
            /* @__PURE__ */ jsxs(Dialog, { open: isCreateDialogOpen, onOpenChange: setIsCreateDialogOpen, children: [
              /* @__PURE__ */ jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsx(Button, { size: "icon", children: /* @__PURE__ */ jsx(Plus, { className: "h-4 w-4" }) }) }),
              /* @__PURE__ */ jsxs(DialogContent, { children: [
                /* @__PURE__ */ jsxs(DialogHeader, { children: [
                  /* @__PURE__ */ jsx(DialogTitle, { children: "Create Department" }),
                  /* @__PURE__ */ jsx(DialogDescription, { children: "Add a new department to your organization" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "grid gap-4 py-4", children: [
                  /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
                    /* @__PURE__ */ jsx(Label, { htmlFor: "name", children: "Department Name" }),
                    /* @__PURE__ */ jsx(
                      Input,
                      {
                        id: "name",
                        value: formData.name,
                        onChange: (e) => setFormData((prev) => ({ ...prev, name: e.target.value })),
                        placeholder: "Enter department name"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
                    /* @__PURE__ */ jsx(Label, { htmlFor: "description", children: "Description" }),
                    /* @__PURE__ */ jsx(
                      Textarea,
                      {
                        id: "description",
                        value: formData.description,
                        onChange: (e) => setFormData((prev) => ({ ...prev, description: e.target.value })),
                        placeholder: "Enter department description (optional)"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
                    /* @__PURE__ */ jsx(Label, { htmlFor: "manager", children: "Manager" }),
                    /* @__PURE__ */ jsxs(
                      Select,
                      {
                        value: formData.manager_id,
                        onValueChange: (value) => setFormData((prev) => ({ ...prev, manager_id: value })),
                        children: [
                          /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Select manager (optional)" }) }),
                          /* @__PURE__ */ jsxs(SelectContent, { children: [
                            /* @__PURE__ */ jsx(SelectItem, { value: "none", children: "No manager" }),
                            profiles == null ? void 0 : profiles.map((profile) => /* @__PURE__ */ jsx(SelectItem, { value: profile.id, children: profile.full_name }, profile.id))
                          ] })
                        ]
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs(DialogFooter, { children: [
                  /* @__PURE__ */ jsx(Button, { variant: "outline", onClick: () => setIsCreateDialogOpen(false), size: "icon", children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }) }),
                  /* @__PURE__ */ jsx(Button, { onClick: handleSubmit, disabled: !formData.name.trim(), size: "icon", children: /* @__PURE__ */ jsx(Save, { className: "h-4 w-4" }) })
                ] })
              ] })
            ] })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs(CardContent, { children: [
        /* @__PURE__ */ jsxs(Table, { children: [
          /* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { className: "bg-muted/50", children: [
            /* @__PURE__ */ jsx(
              TableHead,
              {
                className: "cursor-pointer hover:bg-muted/70 transition-colors",
                onClick: () => handleSort("name"),
                children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                  "Name",
                  sortField === "name" && (sortDirection === "asc" ? /* @__PURE__ */ jsx(ArrowUp, { className: "h-4 w-4" }) : /* @__PURE__ */ jsx(ArrowDown, { className: "h-4 w-4" }))
                ] })
              }
            ),
            /* @__PURE__ */ jsx(TableHead, { children: "Description" }),
            /* @__PURE__ */ jsx(TableHead, { children: "Manager" }),
            /* @__PURE__ */ jsx(
              TableHead,
              {
                className: "cursor-pointer hover:bg-muted/70 transition-colors",
                onClick: () => handleSort("created_at"),
                children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                  "Created",
                  sortField === "created_at" && (sortDirection === "asc" ? /* @__PURE__ */ jsx(ArrowUp, { className: "h-4 w-4" }) : /* @__PURE__ */ jsx(ArrowDown, { className: "h-4 w-4" }))
                ] })
              }
            ),
            hasPermission("canManageDepartments") && /* @__PURE__ */ jsx(TableHead, { className: "text-right", children: "Actions" })
          ] }) }),
          /* @__PURE__ */ jsx(TableBody, { children: departments == null ? void 0 : departments.map((department) => /* @__PURE__ */ jsxs(TableRow, { children: [
            /* @__PURE__ */ jsx(TableCell, { className: "font-medium", children: department.name }),
            /* @__PURE__ */ jsx(TableCell, { children: department.description || /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "No description" }) }),
            /* @__PURE__ */ jsx(TableCell, { children: getManagerName(department.manager_id) }),
            /* @__PURE__ */ jsx(TableCell, { children: new Date(department.created_at).toLocaleDateString() }),
            hasPermission("canManageDepartments") && /* @__PURE__ */ jsx(TableCell, { className: "text-right", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-2", children: [
              /* @__PURE__ */ jsx(
                Button,
                {
                  variant: "outline",
                  size: "sm",
                  onClick: () => {
                    setSelectedDepartmentForMembers(department);
                    setIsMembersDialogOpen(true);
                  },
                  title: "View members",
                  children: /* @__PURE__ */ jsx(Users, { className: "h-4 w-4" })
                }
              ),
              /* @__PURE__ */ jsx(
                Button,
                {
                  variant: "outline",
                  size: "sm",
                  onClick: () => handleEdit(department),
                  children: /* @__PURE__ */ jsx(SquarePen, { className: "h-4 w-4" })
                }
              ),
              /* @__PURE__ */ jsx(
                Button,
                {
                  variant: "outline",
                  size: "sm",
                  onClick: () => deleteDepartmentMutation.mutate(department.id),
                  children: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4" })
                }
              )
            ] }) })
          ] }, department.id)) })
        ] }),
        (departments == null ? void 0 : departments.length) === 0 && /* @__PURE__ */ jsxs("div", { className: "text-center py-8", children: [
          /* @__PURE__ */ jsx(Building2, { className: "h-12 w-12 mx-auto text-muted-foreground mb-4" }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "No departments found" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Create your first department to get started" })
        ] })
      ] })
    ] }),
    hasPermission("canManageDepartments") && /* @__PURE__ */ jsx(Dialog, { open: !!editingDepartment, onOpenChange: (open) => !open && setEditingDepartment(null), children: /* @__PURE__ */ jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsx(DialogTitle, { children: "Edit Department" }),
        /* @__PURE__ */ jsx(DialogDescription, { children: "Update department information" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid gap-4 py-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "edit-name", children: "Department Name" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "edit-name",
              value: formData.name,
              onChange: (e) => setFormData((prev) => ({ ...prev, name: e.target.value })),
              placeholder: "Enter department name"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "edit-description", children: "Description" }),
          /* @__PURE__ */ jsx(
            Textarea,
            {
              id: "edit-description",
              value: formData.description,
              onChange: (e) => setFormData((prev) => ({ ...prev, description: e.target.value })),
              placeholder: "Enter department description (optional)"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "edit-manager", children: "Manager" }),
          /* @__PURE__ */ jsxs(
            Select,
            {
              value: formData.manager_id,
              onValueChange: (value) => setFormData((prev) => ({ ...prev, manager_id: value })),
              children: [
                /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Select manager (optional)" }) }),
                /* @__PURE__ */ jsxs(SelectContent, { children: [
                  /* @__PURE__ */ jsx(SelectItem, { value: "none", children: "No manager" }),
                  profiles == null ? void 0 : profiles.map((profile) => /* @__PURE__ */ jsx(SelectItem, { value: profile.id, children: profile.full_name }, profile.id))
                ] })
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsx(Button, { variant: "outline", onClick: () => setEditingDepartment(null), size: "icon", children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }) }),
        /* @__PURE__ */ jsx(Button, { onClick: handleSubmit, disabled: !formData.name.trim(), size: "icon", children: /* @__PURE__ */ jsx(Save, { className: "h-4 w-4" }) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(
      DepartmentMembersDialog,
      {
        isOpen: isMembersDialogOpen,
        onOpenChange: setIsMembersDialogOpen,
        departmentId: selectedDepartmentForMembers == null ? void 0 : selectedDepartmentForMembers.id,
        departmentName: selectedDepartmentForMembers == null ? void 0 : selectedDepartmentForMembers.name
      }
    )
  ] });
};
const LocationManagement = () => {
  const { supabaseClient, hasPermission } = useOrganisationContext();
  const queryClient = useQueryClient();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingLocation, setEditingLocation] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    building: "",
    floor: "",
    room: "",
    status: "Active"
  });
  const [sortField, setSortField] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  const { data: locationsData, isLoading: locationsLoading } = useQuery({
    queryKey: ["locations"],
    queryFn: async () => {
      const { data, error } = await supabaseClient.from("locations").select("*");
      if (error) throw error;
      return data;
    }
  });
  const locations = useMemo(() => {
    if (!locationsData) return [];
    return [...locationsData].sort((a, b) => {
      let aValue;
      let bValue;
      if (sortField === "name") {
        aValue = a.name.toLowerCase();
        bValue = b.name.toLowerCase();
      } else if (sortField === "building") {
        aValue = (a.building || "").toLowerCase();
        bValue = (b.building || "").toLowerCase();
      } else if (sortField === "status") {
        aValue = a.status.toLowerCase();
        bValue = b.status.toLowerCase();
      } else {
        aValue = new Date(a.created_at);
        bValue = new Date(b.created_at);
      }
      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }, [locationsData, sortField, sortDirection]);
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };
  const createLocationMutation = useMutation({
    mutationFn: async (locationData) => {
      const { error } = await supabaseClient.from("locations").insert([{
        name: locationData.name,
        description: locationData.description || null,
        building: locationData.building || null,
        floor: locationData.floor || null,
        room: locationData.room || null,
        status: locationData.status
      }]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["locations"] });
      toast({
        title: "Success",
        description: "Location created successfully"
      });
      setIsCreateDialogOpen(false);
      resetForm();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  });
  const updateLocationMutation = useMutation({
    mutationFn: async ({ id, ...locationData }) => {
      const { error } = await supabaseClient.from("locations").update({
        name: locationData.name,
        description: locationData.description || null,
        building: locationData.building || null,
        floor: locationData.floor || null,
        room: locationData.room || null,
        status: locationData.status
      }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["locations"] });
      toast({
        title: "Success",
        description: "Location updated successfully"
      });
      setEditingLocation(null);
      resetForm();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  });
  const deleteLocationMutation = useMutation({
    mutationFn: async (id) => {
      const { error } = await supabaseClient.from("locations").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["locations"] });
      toast({
        title: "Success",
        description: "Location deleted successfully"
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  });
  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      building: "",
      floor: "",
      room: "",
      status: "Active"
    });
  };
  const handleEdit = (location) => {
    setEditingLocation(location);
    setFormData({
      name: location.name,
      description: location.description || "",
      building: location.building || "",
      floor: location.floor || "",
      room: location.room || "",
      status: location.status
    });
  };
  const handleSubmit = () => {
    if (editingLocation) {
      updateLocationMutation.mutate({
        ...editingLocation,
        ...formData
      });
    } else {
      createLocationMutation.mutate(formData);
    }
  };
  if (locationsLoading) {
    return /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center h-64", children: /* @__PURE__ */ jsx("div", { className: "animate-spin rounded-full h-32 w-32 border-b-2 border-primary" }) });
  }
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs(Card, { children: [
      /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(MapPin, { className: "h-5 w-5" }),
            "Locations"
          ] }),
          /* @__PURE__ */ jsx(CardDescription, { children: "Manage organizational locations and facilities" })
        ] }),
        hasPermission("canManageLocations") && /* @__PURE__ */ jsxs(Dialog, { open: isCreateDialogOpen, onOpenChange: setIsCreateDialogOpen, children: [
          /* @__PURE__ */ jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsx(Button, { size: "icon", children: /* @__PURE__ */ jsx(Plus, { className: "h-4 w-4" }) }) }),
          /* @__PURE__ */ jsxs(DialogContent, { children: [
            /* @__PURE__ */ jsxs(DialogHeader, { children: [
              /* @__PURE__ */ jsx(DialogTitle, { children: "Create Location" }),
              /* @__PURE__ */ jsx(DialogDescription, { children: "Add a new location to your organization" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid gap-4 py-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
                /* @__PURE__ */ jsx(Label, { htmlFor: "name", children: "Location Name" }),
                /* @__PURE__ */ jsx(
                  Input,
                  {
                    id: "name",
                    value: formData.name,
                    onChange: (e) => setFormData((prev) => ({ ...prev, name: e.target.value })),
                    placeholder: "Enter location name"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
                /* @__PURE__ */ jsx(Label, { htmlFor: "description", children: "Description" }),
                /* @__PURE__ */ jsx(
                  Textarea,
                  {
                    id: "description",
                    value: formData.description,
                    onChange: (e) => setFormData((prev) => ({ ...prev, description: e.target.value })),
                    placeholder: "Enter location description (optional)"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
                  /* @__PURE__ */ jsx(Label, { htmlFor: "building", children: "Building" }),
                  /* @__PURE__ */ jsx(
                    Input,
                    {
                      id: "building",
                      value: formData.building,
                      onChange: (e) => setFormData((prev) => ({ ...prev, building: e.target.value })),
                      placeholder: "Building name"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
                  /* @__PURE__ */ jsx(Label, { htmlFor: "floor", children: "Floor" }),
                  /* @__PURE__ */ jsx(
                    Input,
                    {
                      id: "floor",
                      value: formData.floor,
                      onChange: (e) => setFormData((prev) => ({ ...prev, floor: e.target.value })),
                      placeholder: "Floor number"
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
                /* @__PURE__ */ jsx(Label, { htmlFor: "room", children: "Room" }),
                /* @__PURE__ */ jsx(
                  Input,
                  {
                    id: "room",
                    value: formData.room,
                    onChange: (e) => setFormData((prev) => ({ ...prev, room: e.target.value })),
                    placeholder: "Room number/name"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
                /* @__PURE__ */ jsx(
                  Switch,
                  {
                    id: "status",
                    checked: formData.status === "Active",
                    onCheckedChange: (checked) => setFormData((prev) => ({ ...prev, status: checked ? "Active" : "Inactive" }))
                  }
                ),
                /* @__PURE__ */ jsx(Label, { htmlFor: "status", children: "Active Location" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs(DialogFooter, { children: [
              /* @__PURE__ */ jsx(Button, { variant: "outline", onClick: () => setIsCreateDialogOpen(false), size: "icon", children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }) }),
              /* @__PURE__ */ jsx(Button, { onClick: handleSubmit, disabled: !formData.name.trim(), size: "icon", children: /* @__PURE__ */ jsx(Save, { className: "h-4 w-4" }) })
            ] })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs(CardContent, { children: [
        /* @__PURE__ */ jsxs(Table, { children: [
          /* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { className: "bg-muted/50", children: [
            /* @__PURE__ */ jsx(
              TableHead,
              {
                className: "cursor-pointer hover:bg-muted/70 transition-colors",
                onClick: () => handleSort("name"),
                children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                  "Name",
                  sortField === "name" && (sortDirection === "asc" ? /* @__PURE__ */ jsx(ArrowUp, { className: "h-4 w-4" }) : /* @__PURE__ */ jsx(ArrowDown, { className: "h-4 w-4" }))
                ] })
              }
            ),
            /* @__PURE__ */ jsx(
              TableHead,
              {
                className: "cursor-pointer hover:bg-muted/70 transition-colors",
                onClick: () => handleSort("building"),
                children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                  "Building",
                  sortField === "building" && (sortDirection === "asc" ? /* @__PURE__ */ jsx(ArrowUp, { className: "h-4 w-4" }) : /* @__PURE__ */ jsx(ArrowDown, { className: "h-4 w-4" }))
                ] })
              }
            ),
            /* @__PURE__ */ jsx(TableHead, { children: "Floor" }),
            /* @__PURE__ */ jsx(TableHead, { children: "Room" }),
            /* @__PURE__ */ jsx(
              TableHead,
              {
                className: "cursor-pointer hover:bg-muted/70 transition-colors",
                onClick: () => handleSort("status"),
                children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                  "Status",
                  sortField === "status" && (sortDirection === "asc" ? /* @__PURE__ */ jsx(ArrowUp, { className: "h-4 w-4" }) : /* @__PURE__ */ jsx(ArrowDown, { className: "h-4 w-4" }))
                ] })
              }
            ),
            /* @__PURE__ */ jsx(
              TableHead,
              {
                className: "cursor-pointer hover:bg-muted/70 transition-colors",
                onClick: () => handleSort("created_at"),
                children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                  "Created",
                  sortField === "created_at" && (sortDirection === "asc" ? /* @__PURE__ */ jsx(ArrowUp, { className: "h-4 w-4" }) : /* @__PURE__ */ jsx(ArrowDown, { className: "h-4 w-4" }))
                ] })
              }
            ),
            hasPermission("canManageLocations") && /* @__PURE__ */ jsx(TableHead, { className: "text-right", children: "Actions" })
          ] }) }),
          /* @__PURE__ */ jsx(TableBody, { children: locations == null ? void 0 : locations.map((location) => /* @__PURE__ */ jsxs(TableRow, { children: [
            /* @__PURE__ */ jsx(TableCell, { className: "font-medium", children: /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("div", { children: location.name }),
              location.description && /* @__PURE__ */ jsx("div", { className: "text-sm text-muted-foreground", children: location.description })
            ] }) }),
            /* @__PURE__ */ jsx(TableCell, { children: location.building || "-" }),
            /* @__PURE__ */ jsx(TableCell, { children: location.floor || "-" }),
            /* @__PURE__ */ jsx(TableCell, { children: location.room || "-" }),
            /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx("span", { className: `px-2 py-1 rounded text-xs ${location.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`, children: location.status }) }),
            /* @__PURE__ */ jsx(TableCell, { children: new Date(location.created_at).toLocaleDateString() }),
            hasPermission("canManageLocations") && /* @__PURE__ */ jsx(TableCell, { className: "text-right", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-2", children: [
              /* @__PURE__ */ jsx(
                Button,
                {
                  variant: "outline",
                  size: "sm",
                  onClick: () => handleEdit(location),
                  children: /* @__PURE__ */ jsx(SquarePen, { className: "h-4 w-4" })
                }
              ),
              /* @__PURE__ */ jsx(
                Button,
                {
                  variant: "outline",
                  size: "sm",
                  onClick: () => deleteLocationMutation.mutate(location.id),
                  children: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4" })
                }
              )
            ] }) })
          ] }, location.id)) })
        ] }),
        (locations == null ? void 0 : locations.length) === 0 && /* @__PURE__ */ jsxs("div", { className: "text-center py-8", children: [
          /* @__PURE__ */ jsx(MapPin, { className: "h-12 w-12 mx-auto text-muted-foreground mb-4" }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "No locations found" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Create your first location to get started" })
        ] })
      ] })
    ] }),
    hasPermission("canManageLocations") && /* @__PURE__ */ jsx(Dialog, { open: !!editingLocation, onOpenChange: (open) => !open && setEditingLocation(null), children: /* @__PURE__ */ jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsx(DialogTitle, { children: "Edit Location" }),
        /* @__PURE__ */ jsx(DialogDescription, { children: "Update location information" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid gap-4 py-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "edit-name", children: "Location Name" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "edit-name",
              value: formData.name,
              onChange: (e) => setFormData((prev) => ({ ...prev, name: e.target.value })),
              placeholder: "Enter location name"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "edit-description", children: "Description" }),
          /* @__PURE__ */ jsx(
            Textarea,
            {
              id: "edit-description",
              value: formData.description,
              onChange: (e) => setFormData((prev) => ({ ...prev, description: e.target.value })),
              placeholder: "Enter location description (optional)"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "edit-building", children: "Building" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                id: "edit-building",
                value: formData.building,
                onChange: (e) => setFormData((prev) => ({ ...prev, building: e.target.value })),
                placeholder: "Building name"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "edit-floor", children: "Floor" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                id: "edit-floor",
                value: formData.floor,
                onChange: (e) => setFormData((prev) => ({ ...prev, floor: e.target.value })),
                placeholder: "Floor number"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "edit-room", children: "Room" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "edit-room",
              value: formData.room,
              onChange: (e) => setFormData((prev) => ({ ...prev, room: e.target.value })),
              placeholder: "Room number/name"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
          /* @__PURE__ */ jsx(
            Switch,
            {
              id: "edit-status",
              checked: formData.status === "Active",
              onCheckedChange: (checked) => setFormData((prev) => ({ ...prev, status: checked ? "Active" : "Inactive" }))
            }
          ),
          /* @__PURE__ */ jsx(Label, { htmlFor: "edit-status", children: "Active Location" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsx(Button, { variant: "outline", onClick: () => setEditingLocation(null), size: "icon", children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }) }),
        /* @__PURE__ */ jsx(Button, { onClick: handleSubmit, disabled: !formData.name.trim(), size: "icon", children: /* @__PURE__ */ jsx(Save, { className: "h-4 w-4" }) })
      ] })
    ] }) })
  ] });
};
const AddOrganisationCertificateDialog = ({
  isOpen,
  onOpenChange,
  onSuccess
}) => {
  const { supabaseClient } = useOrganisationContext();
  const [loading, setLoading] = useState(false);
  const [certFile, setCertFile] = useState(null);
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    type: "Certificate",
    name: "",
    issued_by: "",
    date_acquired: "",
    expiry_date: "",
    credential_id: "",
    status: "Valid"
  });
  const resetForm = () => {
    setFormData({
      type: "Certificate",
      name: "",
      issued_by: "",
      date_acquired: "",
      expiry_date: "",
      credential_id: "",
      status: "Valid"
    });
    setCertFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data: { user }, error: userError } = await supabaseClient.auth.getUser();
      if (userError || !user) throw new Error("User not authenticated");
      const { data: newCert, error: insertError } = await supabaseClient.from("certificates").insert([{
        user_id: user.id,
        type: formData.type,
        name: formData.name,
        issued_by: formData.issued_by,
        date_acquired: formData.date_acquired,
        expiry_date: formData.expiry_date || null,
        credential_id: formData.credential_id || null,
        status: formData.status,
        org_cert: true
      }]).select("id").single();
      if (insertError) throw insertError;
      if (certFile && (newCert == null ? void 0 : newCert.id)) {
        const ext = certFile.name.split(".").pop();
        const safeName = formData.name.replace(/[^a-zA-Z0-9]/g, "_").slice(0, 40);
        const storagePath = `org-certs/${newCert.id}_${safeName}.${ext}`;
        const { error: uploadError } = await supabaseClient.storage.from("certificates").upload(storagePath, certFile, { upsert: true });
        if (uploadError) {
          console.error("Error uploading org certificate file:", uploadError);
          toast({
            title: "Certificate added",
            description: "Record saved but file upload failed. You can try uploading the file again later.",
            variant: "destructive"
          });
        } else {
          await supabaseClient.from("certificates").update({ certificate_url: storagePath }).eq("id", newCert.id);
        }
      }
      toast({
        title: "Organisation certificate added",
        description: "Certificate has been successfully added to the organisation."
      });
      onOpenChange(false);
      resetForm();
      onSuccess == null ? void 0 : onSuccess();
    } catch (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsx(Dialog, { open: isOpen, onOpenChange, children: /* @__PURE__ */ jsxs(DialogContent, { children: [
    /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(DialogTitle, { children: "Add Organisation Certificate" }) }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "type", children: "Type *" }),
        /* @__PURE__ */ jsxs(Select, { value: formData.type, onValueChange: (value) => setFormData({ ...formData, type: value }), children: [
          /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, {}) }),
          /* @__PURE__ */ jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsx(SelectItem, { value: "Certificate", children: "Certificate" }),
            /* @__PURE__ */ jsx(SelectItem, { value: "Document", children: "Document" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "name", children: "Name *" }),
        /* @__PURE__ */ jsx(
          Input,
          {
            id: "name",
            value: formData.name,
            onChange: (e) => setFormData({ ...formData, name: e.target.value }),
            placeholder: "e.g., ISO 27001, SOC 2, GDPR Compliance",
            required: true
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "issued_by", children: "Issued By *" }),
        /* @__PURE__ */ jsx(
          Input,
          {
            id: "issued_by",
            value: formData.issued_by,
            onChange: (e) => setFormData({ ...formData, issued_by: e.target.value }),
            placeholder: "e.g., BSI, AICPA, TÜV SÜD",
            required: true
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "date_acquired", children: "Date Acquired *" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "date_acquired",
              type: "date",
              value: formData.date_acquired,
              onChange: (e) => setFormData({ ...formData, date_acquired: e.target.value }),
              required: true
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "expiry_date", children: "Expiry Date" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "expiry_date",
              type: "date",
              value: formData.expiry_date,
              onChange: (e) => setFormData({ ...formData, expiry_date: e.target.value })
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "credential_id", children: "Credential ID" }),
        /* @__PURE__ */ jsx(
          Input,
          {
            id: "credential_id",
            value: formData.credential_id,
            onChange: (e) => setFormData({ ...formData, credential_id: e.target.value }),
            placeholder: "Certificate or credential identifier"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "status", children: "Status" }),
        /* @__PURE__ */ jsxs(Select, { value: formData.status, onValueChange: (value) => setFormData({ ...formData, status: value }), children: [
          /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, {}) }),
          /* @__PURE__ */ jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsx(SelectItem, { value: "Valid", children: "Valid" }),
            /* @__PURE__ */ jsx(SelectItem, { value: "Expired", children: "Expired" }),
            /* @__PURE__ */ jsx(SelectItem, { value: "Pending", children: "Pending" }),
            /* @__PURE__ */ jsx(SelectItem, { value: "Revoked", children: "Revoked" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(Label, { children: "Certificate File (optional)" }),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "mt-1 flex items-center gap-3 rounded-md border border-dashed border-muted-foreground/40 px-4 py-3 cursor-pointer hover:bg-muted/40 transition-colors",
            onClick: () => {
              var _a;
              return (_a = fileInputRef.current) == null ? void 0 : _a.click();
            },
            children: certFile ? /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(FileText, { className: "h-4 w-4 text-muted-foreground shrink-0" }),
              /* @__PURE__ */ jsx("span", { className: "text-sm truncate", children: certFile.name }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  className: "ml-auto text-muted-foreground hover:text-destructive",
                  onClick: (e) => {
                    e.stopPropagation();
                    setCertFile(null);
                    if (fileInputRef.current) fileInputRef.current.value = "";
                  },
                  children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" })
                }
              )
            ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(Upload, { className: "h-4 w-4 text-muted-foreground shrink-0" }),
              /* @__PURE__ */ jsx("span", { className: "text-sm text-muted-foreground", children: "Upload PDF, JPG, or PNG" })
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          "input",
          {
            ref: fileInputRef,
            type: "file",
            accept: ".pdf,.jpg,.jpeg,.png",
            className: "hidden",
            onChange: (e) => {
              var _a;
              return setCertFile(((_a = e.target.files) == null ? void 0 : _a[0]) ?? null);
            }
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-2 justify-end", children: [
        /* @__PURE__ */ jsx(Button, { type: "button", variant: "outline", onClick: () => onOpenChange(false), size: "icon", children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }) }),
        /* @__PURE__ */ jsx(Button, { type: "submit", disabled: loading || !formData.name || !formData.issued_by || !formData.date_acquired, size: "icon", children: loading ? /* @__PURE__ */ jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsx(Plus, { className: "h-4 w-4" }) })
      ] })
    ] })
  ] }) });
};
const OrganisationCertificates = () => {
  const { supabaseClient } = useOrganisationContext();
  const [certificates, setCertificates] = useState([]);
  const [userProfiles, setUserProfiles] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const formatDate = (dateString) => {
    if (!dateString) return "No expiry";
    return new Date(dateString).toLocaleDateString();
  };
  const getTypeIcon = (type) => {
    return type === "Document" ? /* @__PURE__ */ jsx(FileText, { className: "h-5 w-5 text-primary flex-shrink-0" }) : /* @__PURE__ */ jsx(Award, { className: "h-5 w-5 text-primary flex-shrink-0" });
  };
  const getTypeColor = (type) => {
    return type === "Document" ? "bg-blue-500" : "bg-purple-500";
  };
  const getValidityStatus = (expiryDate) => {
    if (!expiryDate) return "Valid";
    const expiry = new Date(expiryDate);
    const today = /* @__PURE__ */ new Date();
    today.setHours(0, 0, 0, 0);
    if (expiry < today) {
      return "Expired";
    } else if (expiry <= new Date(today.getTime() + 30 * 24 * 60 * 60 * 1e3)) {
      return "Expiring Soon";
    } else {
      return "Valid";
    }
  };
  const getValidityStatusColor = (status) => {
    switch (status) {
      case "Valid":
        return "bg-green-500";
      case "Expired":
        return "bg-red-500";
      case "Expiring Soon":
        return "bg-yellow-500";
      default:
        return "bg-blue-500";
    }
  };
  const getUserDisplayName = (userId) => {
    const profile = userProfiles[userId];
    return (profile == null ? void 0 : profile.full_name) || (profile == null ? void 0 : profile.username) || "Unknown User";
  };
  const fetchOrganisationCertificates = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data: certificatesData, error: certificatesError } = await supabaseClient.from("certificates").select("*").eq("org_cert", true).order("created_at", { ascending: false });
      if (certificatesError) throw certificatesError;
      const userIds = [...new Set((certificatesData == null ? void 0 : certificatesData.map((cert) => cert.user_id)) || [])];
      if (userIds.length > 0) {
        const { data: profilesData, error: profilesError } = await supabaseClient.from("profiles").select("id, full_name, username").in("id", userIds);
        if (profilesError) throw profilesError;
        const profilesMap = (profilesData || []).reduce((acc, profile) => {
          acc[profile.id] = profile;
          return acc;
        }, {});
        setUserProfiles(profilesMap);
      }
      setCertificates(certificatesData || []);
    } catch (error2) {
      setError(error2.message);
      console.error("Error fetching organisation certificates:", error2);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchOrganisationCertificates();
  }, [supabaseClient]);
  if (loading) {
    return /* @__PURE__ */ jsxs(Card, { children: [
      /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(Award, { className: "h-5 w-5" }),
        "Certificates"
      ] }) }),
      /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center py-8", children: /* @__PURE__ */ jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-primary" }) }) })
    ] });
  }
  if (error) {
    return /* @__PURE__ */ jsxs(Card, { children: [
      /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(Award, { className: "h-5 w-5" }),
        "Certificates"
      ] }) }),
      /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("p", { className: "text-red-500", children: [
        "Error loading certificates: ",
        error
      ] }) })
    ] });
  }
  return /* @__PURE__ */ jsxs(Card, { children: [
    /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(Award, { className: "h-5 w-5" }),
          "Certificates"
        ] }),
        /* @__PURE__ */ jsx(CardDescription, { children: "Manage organisation certificates" })
      ] }),
      /* @__PURE__ */ jsx(Button, { onClick: () => setIsAddDialogOpen(true), size: "icon", children: /* @__PURE__ */ jsx(Plus, { className: "h-4 w-4" }) })
    ] }) }),
    /* @__PURE__ */ jsxs(CardContent, { children: [
      /* @__PURE__ */ jsx("div", { className: "space-y-4", children: certificates.length === 0 ? /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-center py-8", children: "No organisation certificates found" }) : certificates.map((cert) => {
        const validityStatus = getValidityStatus(cert.expiry_date);
        return /* @__PURE__ */ jsxs("div", { className: "border rounded-lg p-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-3", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 min-w-0 flex-1", children: [
              getTypeIcon(cert.type),
              /* @__PURE__ */ jsx("h3", { className: "font-semibold text-lg truncate", children: cert.name })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "flex items-center flex-shrink-0", children: /* @__PURE__ */ jsx(Badge, { className: `${getTypeColor(cert.type)} text-white text-sm px-2 py-1`, children: cert.type || "Certificate" }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-4 gap-4 text-sm ml-8", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(Building, { className: "h-4 w-4 text-muted-foreground" }),
              /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "Issuer:" }),
              /* @__PURE__ */ jsx("span", { className: "font-medium text-foreground", children: cert.issued_by })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "ID:" }),
              /* @__PURE__ */ jsx("span", { className: "font-medium", children: cert.credential_id || "N/A" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(Calendar, { className: "h-4 w-4 text-muted-foreground" }),
              /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "Issued:" }),
              /* @__PURE__ */ jsx("span", { className: "font-medium", children: formatDate(cert.date_acquired) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(Calendar, { className: "h-4 w-4 text-muted-foreground" }),
              /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "Expires:" }),
              /* @__PURE__ */ jsx("span", { className: "font-medium", children: formatDate(cert.expiry_date) })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between ml-8 mt-2", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
              /* @__PURE__ */ jsx(User, { className: "h-4 w-4 text-muted-foreground" }),
              /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "Added by:" }),
              /* @__PURE__ */ jsx("span", { className: "font-medium", children: getUserDisplayName(cert.user_id) })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "flex items-center", children: /* @__PURE__ */ jsx(Badge, { className: `${getValidityStatusColor(validityStatus)} text-white`, children: validityStatus }) })
          ] })
        ] }, cert.id);
      }) }),
      /* @__PURE__ */ jsx(
        AddOrganisationCertificateDialog,
        {
          isOpen: isAddDialogOpen,
          onOpenChange: setIsAddDialogOpen,
          onSuccess: () => {
            fetchOrganisationCertificates();
          }
        }
      )
    ] })
  ] });
};
const SearchableProfileField = ({
  value,
  onSelect,
  placeholder = "Select profile...",
  disabled = false
}) => {
  const [open, setOpen] = useState(false);
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    fetchProfiles();
  }, []);
  const fetchProfiles = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from("profiles").select("id, full_name, username").not("full_name", "is", null).order("full_name");
      if (error) throw error;
      setProfiles(data || []);
    } catch (error) {
      console.error("Error fetching profiles:", error);
    } finally {
      setLoading(false);
    }
  };
  const filteredProfiles = profiles.filter(
    (profile) => {
      var _a, _b;
      return ((_a = profile.full_name) == null ? void 0 : _a.toLowerCase().includes(searchTerm.toLowerCase())) || ((_b = profile.username) == null ? void 0 : _b.toLowerCase().includes(searchTerm.toLowerCase()));
    }
  );
  profiles.find((profile) => profile.full_name === value);
  return /* @__PURE__ */ jsxs(Popover, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(
      Button,
      {
        variant: "outline",
        role: "combobox",
        "aria-expanded": open,
        className: "w-full justify-between",
        disabled,
        children: [
          value ? /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(User, { className: "h-4 w-4" }),
            value
          ] }) : placeholder,
          /* @__PURE__ */ jsx(ChevronsUpDown, { className: "ml-2 h-4 w-4 shrink-0 opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ jsx(PopoverContent, { className: "w-full p-0", children: /* @__PURE__ */ jsxs(Command, { children: [
      /* @__PURE__ */ jsx(
        CommandInput,
        {
          placeholder: "Search profiles...",
          value: searchTerm,
          onValueChange: setSearchTerm
        }
      ),
      /* @__PURE__ */ jsxs(CommandList, { children: [
        /* @__PURE__ */ jsx(CommandEmpty, { children: loading ? "Loading..." : "No profiles found." }),
        /* @__PURE__ */ jsxs(CommandGroup, { children: [
          value && /* @__PURE__ */ jsxs(
            CommandItem,
            {
              value: "",
              onSelect: () => {
                onSelect(null);
                setOpen(false);
              },
              children: [
                /* @__PURE__ */ jsx(
                  Check,
                  {
                    className: cn(
                      "mr-2 h-4 w-4",
                      !value ? "opacity-100" : "opacity-0"
                    )
                  }
                ),
                "Clear selection"
              ]
            }
          ),
          filteredProfiles.map((profile) => /* @__PURE__ */ jsxs(
            CommandItem,
            {
              value: profile.full_name,
              onSelect: (currentValue) => {
                const selected = profiles.find((p) => p.full_name === currentValue);
                onSelect(selected || null);
                setOpen(false);
              },
              children: [
                /* @__PURE__ */ jsx(
                  Check,
                  {
                    className: cn(
                      "mr-2 h-4 w-4",
                      value === profile.full_name ? "opacity-100" : "opacity-0"
                    )
                  }
                ),
                /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
                  /* @__PURE__ */ jsx("span", { children: profile.full_name }),
                  profile.username && /* @__PURE__ */ jsxs("span", { className: "text-sm text-muted-foreground", children: [
                    "@",
                    profile.username
                  ] })
                ] })
              ]
            },
            profile.id
          ))
        ] })
      ] })
    ] }) })
  ] });
};
const OrganisationProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [organisationData, setOrganisationData] = useState({});
  const [signatoryData, setSignatoryData] = useState({});
  const logoFileInputRef = useRef(null);
  const { isSuperAdmin, hasAdminAccess } = useUserRole();
  const { supabaseClient } = useOrganisationContext();
  const [requireMfa, setRequireMfa] = useState(false);
  const [mfaSaving, setMfaSaving] = useState(false);
  const [showDisableMfaConfirm, setShowDisableMfaConfirm] = useState(false);
  const validatePhoneInput = (input) => {
    return input.replace(/[^0-9+\s\-()]/g, "");
  };
  const handleTelephoneChange = (e) => {
    const validatedValue = validatePhoneInput(e.target.value);
    setOrganisationData((prev) => ({ ...prev, telephone: validatedValue }));
  };
  const handleLogoUpload = async (e) => {
    var _a;
    const file = (_a = e.target.files) == null ? void 0 : _a[0];
    if (!file) return;
    const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp", "image/svg+xml"];
    if (!validTypes.includes(file.type)) {
      toast$2.error("Please upload an image (JPEG, PNG, GIF, WebP, or SVG)");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      toast$2.error("Logo must be smaller than 2 MB");
      return;
    }
    setUploadingLogo(true);
    try {
      const ext = file.name.split(".").pop();
      const storagePath = `org-logo/logo-${Date.now()}.${ext}`;
      const { error: uploadError } = await supabaseClient.storage.from("logos").upload(storagePath, file, { contentType: file.type, upsert: true });
      if (uploadError) throw uploadError;
      const { data: urlData } = supabaseClient.storage.from("logos").getPublicUrl(storagePath);
      setOrganisationData((prev) => ({ ...prev, org_logo_url: urlData.publicUrl }));
      toast$2.success("Logo uploaded — click Save to apply");
    } catch (err) {
      console.error("Logo upload error:", err);
      toast$2.error("Failed to upload logo: " + (err.message ?? "unknown error"));
    } finally {
      setUploadingLogo(false);
      if (logoFileInputRef.current) logoFileInputRef.current.value = "";
    }
  };
  useEffect(() => {
    fetchOrganisationData();
  }, [supabaseClient]);
  const fetchOrganisationData = async () => {
    try {
      setLoading(true);
      const { data: orgProfile, error: orgError } = await supabaseClient.from("org_profile").select("*").maybeSingle();
      if (orgError) {
        throw orgError;
      }
      if (orgProfile) {
        setOrganisationData(orgProfile);
        setRequireMfa(orgProfile.require_mfa ?? false);
      }
      const { data: sigRoles, error: sigError } = await supabaseClient.from("org_sig_roles").select("*");
      if (sigError) {
        throw sigError;
      }
      if (sigRoles && sigRoles.length > 0) {
        const sigData = {};
        sigRoles.forEach((role) => {
          switch (role.role_type) {
            case "cem":
              sigData.name_signatory_cem = role.signatory_name;
              sigData.title_signatory_cem = role.signatory_title;
              sigData.email_signatory_cem = role.signatory_email;
              break;
            case "hib":
              sigData.name_signatory_hib = role.signatory_name;
              sigData.title_signatory_hib = role.signatory_title;
              sigData.email_signatory_hib = role.signatory_email;
              break;
            case "dpe":
              sigData.name_signatory_dpe = role.signatory_name;
              sigData.title_signatory_dpe = role.signatory_title;
              sigData.email_signatory_dpe = role.signatory_email;
              break;
            case "dpo":
              sigData.dpo_name = role.signatory_name;
              sigData.dpo_email = role.signatory_email;
              break;
            case "iso":
              sigData.iso_name = role.signatory_name;
              sigData.iso_email = role.signatory_email;
              break;
            case "head_it":
              sigData.head_it_name = role.signatory_name;
              sigData.head_it_email = role.signatory_email;
              break;
            case "it_manager":
              sigData.it_manager_name = role.signatory_name;
              sigData.it_manager_email = role.signatory_email;
              break;
          }
        });
        setSignatoryData(sigData);
      }
    } catch (error) {
      console.error("Error fetching organisation data:", error);
      toast$2.error("Failed to load organisation data");
    } finally {
      setLoading(false);
    }
  };
  const handleSave = async () => {
    try {
      setSaving(true);
      const { error: orgError } = await supabaseClient.from("org_profile").upsert(organisationData);
      if (orgError) throw orgError;
      const updates = [
        { role_type: "cem", signatory_name: signatoryData.name_signatory_cem, signatory_title: signatoryData.title_signatory_cem, signatory_email: signatoryData.email_signatory_cem },
        { role_type: "hib", signatory_name: signatoryData.name_signatory_hib, signatory_title: signatoryData.title_signatory_hib, signatory_email: signatoryData.email_signatory_hib },
        { role_type: "dpe", signatory_name: signatoryData.name_signatory_dpe, signatory_title: signatoryData.title_signatory_dpe, signatory_email: signatoryData.email_signatory_dpe },
        { role_type: "dpo", signatory_name: signatoryData.dpo_name, signatory_title: "", signatory_email: signatoryData.dpo_email },
        { role_type: "iso", signatory_name: signatoryData.iso_name, signatory_title: "", signatory_email: signatoryData.iso_email },
        { role_type: "head_it", signatory_name: signatoryData.head_it_name, signatory_title: "", signatory_email: signatoryData.head_it_email },
        { role_type: "it_manager", signatory_name: signatoryData.it_manager_name, signatory_title: "", signatory_email: signatoryData.it_manager_email }
      ];
      for (const update of updates) {
        const { error: sigError } = await supabaseClient.from("org_sig_roles").upsert(update, { onConflict: "role_type" });
        if (sigError) throw sigError;
      }
      toast$2.success("Organisation profile updated successfully");
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving organisation data:", error);
      toast$2.error("Failed to save organisation data");
    } finally {
      setSaving(false);
    }
  };
  const fetchUserEmailAndRole = async (userId) => {
    var _a;
    try {
      const { data: emailData, error: emailError } = await supabaseClient.rpc("get_user_email_by_id", { user_id: userId });
      if (emailError) {
        console.error("Error fetching user email:", emailError);
        return { email: "", title: "" };
      }
      const { data: roleData, error: roleError } = await supabaseClient.from("user_profile_roles").select(`
          roles(name)
        `).eq("user_id", userId).eq("is_primary", true).maybeSingle();
      if (roleError) {
        console.error("Error fetching user role:", roleError);
        return { email: emailData || "", title: "" };
      }
      return {
        email: emailData || "",
        title: ((_a = roleData == null ? void 0 : roleData.roles) == null ? void 0 : _a.name) || ""
      };
    } catch (error) {
      console.error("Error in fetchUserEmailAndRole:", error);
      return { email: "", title: "" };
    }
  };
  const handleProfileSelect = async (role, profile) => {
    if (!profile) {
      switch (role) {
        case "cem":
          setSignatoryData((prev) => ({
            ...prev,
            name_signatory_cem: "",
            title_signatory_cem: "",
            email_signatory_cem: ""
          }));
          break;
        case "hib":
          setSignatoryData((prev) => ({
            ...prev,
            name_signatory_hib: "",
            title_signatory_hib: "",
            email_signatory_hib: ""
          }));
          break;
        case "dpe":
          setSignatoryData((prev) => ({
            ...prev,
            name_signatory_dpe: "",
            title_signatory_dpe: "",
            email_signatory_dpe: ""
          }));
          break;
        case "dpo":
          setSignatoryData((prev) => ({
            ...prev,
            dpo_name: "",
            dpo_email: ""
          }));
          break;
        case "iso":
          setSignatoryData((prev) => ({
            ...prev,
            iso_name: "",
            iso_email: ""
          }));
          break;
        case "head_it":
          setSignatoryData((prev) => ({
            ...prev,
            head_it_name: "",
            head_it_email: ""
          }));
          break;
        case "it_manager":
          setSignatoryData((prev) => ({
            ...prev,
            it_manager_name: "",
            it_manager_email: ""
          }));
          break;
      }
      return;
    }
    const { email, title } = await fetchUserEmailAndRole(profile.id);
    switch (role) {
      case "cem":
        setSignatoryData((prev) => ({
          ...prev,
          name_signatory_cem: profile.full_name,
          title_signatory_cem: title,
          email_signatory_cem: email
        }));
        break;
      case "hib":
        setSignatoryData((prev) => ({
          ...prev,
          name_signatory_hib: profile.full_name,
          title_signatory_hib: title,
          email_signatory_hib: email
        }));
        break;
      case "dpe":
        setSignatoryData((prev) => ({
          ...prev,
          name_signatory_dpe: profile.full_name,
          title_signatory_dpe: title,
          email_signatory_dpe: email
        }));
        break;
      case "dpo":
        setSignatoryData((prev) => ({
          ...prev,
          dpo_name: profile.full_name,
          dpo_email: email
        }));
        break;
      case "iso":
        setSignatoryData((prev) => ({
          ...prev,
          iso_name: profile.full_name,
          iso_email: email
        }));
        break;
      case "head_it":
        setSignatoryData((prev) => ({
          ...prev,
          head_it_name: profile.full_name,
          head_it_email: email
        }));
        break;
      case "it_manager":
        setSignatoryData((prev) => ({
          ...prev,
          it_manager_name: profile.full_name,
          it_manager_email: email
        }));
        break;
    }
  };
  const handleMfaToggle = (enabled) => {
    if (!enabled) {
      setShowDisableMfaConfirm(true);
      return;
    }
    applyMfaChange(true);
  };
  const applyMfaChange = async (enabled) => {
    var _a, _b;
    setShowDisableMfaConfirm(false);
    setMfaSaving(true);
    try {
      const orgId = organisationData.id;
      let error;
      if (orgId) {
        ({ error } = await supabaseClient.from("org_profile").update({ require_mfa: enabled }).eq("id", orgId));
      } else {
        const { data: inserted, error: insertError } = await supabaseClient.from("org_profile").insert({ require_mfa: enabled }).select("id").single();
        error = insertError;
        if (inserted) setOrganisationData((prev) => ({ ...prev, id: inserted.id }));
      }
      if (error) throw error;
      setRequireMfa(enabled);
      if (!enabled) {
        try {
          const { data: { session } } = await supabaseClient.auth.getSession();
          const res = await supabaseClient.functions.invoke("reset-user-mfa", {
            body: {},
            headers: (session == null ? void 0 : session.access_token) ? { Authorization: `Bearer ${session.access_token}` } : void 0
          });
          if (res.error || !((_a = res.data) == null ? void 0 : _a.success)) {
            console.error("Bulk MFA reset warning:", res.error ?? ((_b = res.data) == null ? void 0 : _b.error));
            toast$2.warning("MFA requirement disabled, but some enrolled users may still be challenged until they log out.");
          } else {
            toast$2.success(res.data.message);
          }
        } catch (fnErr) {
          console.error("Bulk MFA reset error:", fnErr);
          toast$2.warning("MFA requirement disabled. Note: existing enrolled users may need a manual reset.");
        }
      } else {
        toast$2.success("MFA required for all users. They will be prompted on next login.");
      }
    } catch (err) {
      console.error("MFA toggle error:", err);
      toast$2.error("Failed to update MFA setting: " + (err.message ?? "unknown error"));
    } finally {
      setMfaSaving(false);
    }
  };
  const handleCancel = () => {
    setIsEditing(false);
    fetchOrganisationData();
  };
  if (loading) {
    return /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center p-8", children: /* @__PURE__ */ jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-primary" }) });
  }
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6 text-left", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold", children: "Organisation Profile" }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Manage organisation details and signatory information" })
      ] }),
      !isEditing ? /* @__PURE__ */ jsx(Button, { onClick: () => setIsEditing(true), variant: "outline", size: "icon", children: /* @__PURE__ */ jsx(SquarePen, { className: "h-4 w-4" }) }) : /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsx(Button, { onClick: handleSave, disabled: saving, size: "icon", children: /* @__PURE__ */ jsx(Save, { className: "h-4 w-4" }) }),
        /* @__PURE__ */ jsx(Button, { onClick: handleCancel, variant: "outline", disabled: saving, size: "icon", children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(Card, { children: [
      /* @__PURE__ */ jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0", children: [
        /* @__PURE__ */ jsx(CardTitle, { children: "General Information" }),
        hasAdminAccess && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          requireMfa ? /* @__PURE__ */ jsx(ShieldCheck, { className: "h-4 w-4 text-primary" }) : /* @__PURE__ */ jsx(Shield, { className: "h-4 w-4 text-muted-foreground" }),
          /* @__PURE__ */ jsx(Label, { htmlFor: "require-mfa-toggle", className: "text-sm font-normal text-muted-foreground cursor-pointer select-none", children: "Require MFA" }),
          /* @__PURE__ */ jsx(
            Switch,
            {
              id: "require-mfa-toggle",
              checked: requireMfa,
              onCheckedChange: handleMfaToggle,
              disabled: mfaSaving,
              "aria-label": "Require MFA for all users"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs(CardContent, { className: "space-y-4 text-left", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "org-name", children: "Organisation Name" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                id: "org-name",
                value: organisationData.org_name || "",
                onChange: (e) => setOrganisationData((prev) => ({ ...prev, org_name: e.target.value })),
                disabled: !isEditing
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "org-name-short", children: "Organisation Name (Short)" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                id: "org-name-short",
                value: organisationData.org_short_name || "",
                onChange: (e) => setOrganisationData((prev) => ({ ...prev, org_short_name: e.target.value })),
                disabled: !isEditing || !isSuperAdmin
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "acra-uen", children: "ACRA Number/Unique Entity Number (UEN)" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                id: "acra-uen",
                value: organisationData.acra_uen_number || "",
                onChange: (e) => setOrganisationData((prev) => ({ ...prev, acra_uen_number: e.target.value })),
                disabled: !isEditing
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "charity-reg", children: "Charity Registration Number" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                id: "charity-reg",
                value: organisationData.charity_registration_number || "",
                onChange: (e) => setOrganisationData((prev) => ({ ...prev, charity_registration_number: e.target.value })),
                disabled: !isEditing
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "address", children: "Address" }),
          /* @__PURE__ */ jsx(
            Textarea,
            {
              id: "address",
              value: organisationData.address || "",
              onChange: (e) => setOrganisationData((prev) => ({ ...prev, address: e.target.value })),
              disabled: !isEditing,
              rows: 3
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "telephone", children: "Telephone" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                id: "telephone",
                value: organisationData.telephone || "",
                onChange: handleTelephoneChange,
                disabled: !isEditing
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "annual-turnover", children: "Annual Turnover" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                id: "annual-turnover",
                value: organisationData.annual_turnover || "",
                onChange: (e) => setOrganisationData((prev) => ({ ...prev, annual_turnover: e.target.value })),
                disabled: !isEditing
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "num-employees", children: "Number of Employees" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                id: "num-employees",
                type: "number",
                value: organisationData.number_of_employees || "",
                onChange: (e) => setOrganisationData((prev) => ({ ...prev, number_of_employees: parseInt(e.target.value) || 0 })),
                disabled: !isEditing
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "num-executives", children: "Number of Executives" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                id: "num-executives",
                type: "number",
                value: organisationData.number_of_executives || "",
                onChange: (e) => setOrganisationData((prev) => ({ ...prev, number_of_executives: parseInt(e.target.value) || 0 })),
                disabled: !isEditing
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "cert-body", children: "Appointed Certification Body" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "cert-body",
              value: organisationData.appointed_certification_body || "",
              onChange: (e) => setOrganisationData((prev) => ({ ...prev, appointed_certification_body: e.target.value })),
              disabled: !isEditing
            }
          )
        ] }),
        /* @__PURE__ */ jsx(Separator, {}),
        /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsx(Label, { children: "Organisation Logo" }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "Used on generated certificates alongside the RAYN logo. Recommended: transparent PNG or SVG, max 2 MB." }),
          organisationData.org_logo_url && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: organisationData.org_logo_url,
                alt: "Organisation logo",
                className: "h-14 max-w-[160px] object-contain border rounded p-1 bg-muted"
              }
            ),
            isEditing && /* @__PURE__ */ jsxs(
              Button,
              {
                type: "button",
                variant: "ghost",
                size: "sm",
                onClick: () => setOrganisationData((prev) => ({ ...prev, org_logo_url: "" })),
                children: [
                  /* @__PURE__ */ jsx(X, { className: "h-4 w-4 mr-1" }),
                  " Remove"
                ]
              }
            )
          ] }),
          isEditing && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx("div", { className: "space-y-1 flex-1", children: /* @__PURE__ */ jsx(
              Input,
              {
                placeholder: "https://... (paste a URL, or upload a file below)",
                value: organisationData.org_logo_url || "",
                onChange: (e) => setOrganisationData((prev) => ({ ...prev, org_logo_url: e.target.value }))
              }
            ) }),
            /* @__PURE__ */ jsx("span", { className: "text-xs text-muted-foreground", children: "or" }),
            /* @__PURE__ */ jsxs(
              Button,
              {
                type: "button",
                variant: "outline",
                size: "sm",
                disabled: uploadingLogo,
                onClick: () => {
                  var _a;
                  return (_a = logoFileInputRef.current) == null ? void 0 : _a.click();
                },
                children: [
                  uploadingLogo ? /* @__PURE__ */ jsx(LoaderCircle, { className: "h-4 w-4 animate-spin mr-1" }) : /* @__PURE__ */ jsx(Upload, { className: "h-4 w-4 mr-1" }),
                  "Upload"
                ]
              }
            ),
            /* @__PURE__ */ jsx(
              "input",
              {
                ref: logoFileInputRef,
                type: "file",
                accept: "image/jpeg,image/png,image/gif,image/webp,image/svg+xml",
                className: "hidden",
                onChange: handleLogoUpload
              }
            )
          ] }),
          !organisationData.org_logo_url && !isEditing && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-muted-foreground text-sm", children: [
            /* @__PURE__ */ jsx(Image, { className: "h-4 w-4" }),
            /* @__PURE__ */ jsx("span", { children: "No logo uploaded" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(Card, { children: [
      /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { children: "Signatory Information" }) }),
      /* @__PURE__ */ jsxs(CardContent, { className: "space-y-6 text-left", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsx("h4", { className: "font-semibold text-sm text-muted-foreground uppercase tracking-wide", children: "CEM Declaration" }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "cem-name", children: "Name of Signatory to CEM Declaration" }),
              /* @__PURE__ */ jsx(
                SearchableProfileField,
                {
                  value: signatoryData.name_signatory_cem,
                  onSelect: (profile) => handleProfileSelect("cem", profile),
                  placeholder: "Select CEM signatory...",
                  disabled: !isEditing
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "cem-title", children: "Title of Signatory to CEM Declaration" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: "cem-title",
                  value: signatoryData.title_signatory_cem || "",
                  onChange: (e) => setSignatoryData((prev) => ({ ...prev, title_signatory_cem: e.target.value })),
                  disabled: !isEditing
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "cem-email", children: "Email of Signatory to CEM Declaration" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: "cem-email",
                  type: "email",
                  value: signatoryData.email_signatory_cem || "",
                  onChange: (e) => setSignatoryData((prev) => ({ ...prev, email_signatory_cem: e.target.value })),
                  disabled: !isEditing
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx(Separator, {}),
        /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsx("h4", { className: "font-semibold text-sm text-muted-foreground uppercase tracking-wide", children: "HIB Pledge" }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "hib-name", children: "Name of Signatory to HIB Pledge" }),
              /* @__PURE__ */ jsx(
                SearchableProfileField,
                {
                  value: signatoryData.name_signatory_hib,
                  onSelect: (profile) => handleProfileSelect("hib", profile),
                  placeholder: "Select HIB signatory...",
                  disabled: !isEditing
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "hib-title", children: "Title of Signatory to HIB Pledge" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: "hib-title",
                  value: signatoryData.title_signatory_hib || "",
                  onChange: (e) => setSignatoryData((prev) => ({ ...prev, title_signatory_hib: e.target.value })),
                  disabled: !isEditing
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "hib-email", children: "Email of Signatory to HIB Pledge" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: "hib-email",
                  type: "email",
                  value: signatoryData.email_signatory_hib || "",
                  onChange: (e) => setSignatoryData((prev) => ({ ...prev, email_signatory_hib: e.target.value })),
                  disabled: !isEditing
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx(Separator, {}),
        /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsx("h4", { className: "font-semibold text-sm text-muted-foreground uppercase tracking-wide", children: "DPE Pledge" }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "dpe-name", children: "Name of Signatory to DPE Pledge" }),
              /* @__PURE__ */ jsx(
                SearchableProfileField,
                {
                  value: signatoryData.name_signatory_dpe,
                  onSelect: (profile) => handleProfileSelect("dpe", profile),
                  placeholder: "Select DPE signatory...",
                  disabled: !isEditing
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "dpe-title", children: "Title of Signatory to DPE Pledge" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: "dpe-title",
                  value: signatoryData.title_signatory_dpe || "",
                  onChange: (e) => setSignatoryData((prev) => ({ ...prev, title_signatory_dpe: e.target.value })),
                  disabled: !isEditing
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "dpe-email", children: "Email of Signatory to DPE Pledge" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: "dpe-email",
                  type: "email",
                  value: signatoryData.email_signatory_dpe || "",
                  onChange: (e) => setSignatoryData((prev) => ({ ...prev, email_signatory_dpe: e.target.value })),
                  disabled: !isEditing
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx(Separator, {}),
        /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsx("h4", { className: "font-semibold text-sm text-muted-foreground uppercase tracking-wide", children: "Key Personnel" }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "dpo-name", children: "DPO Name" }),
              /* @__PURE__ */ jsx(
                SearchableProfileField,
                {
                  value: signatoryData.dpo_name,
                  onSelect: (profile) => handleProfileSelect("dpo", profile),
                  placeholder: "Select DPO...",
                  disabled: !isEditing
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "dpo-email", children: "DPO Email" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: "dpo-email",
                  type: "email",
                  value: signatoryData.dpo_email || "",
                  onChange: (e) => setSignatoryData((prev) => ({ ...prev, dpo_email: e.target.value })),
                  disabled: !isEditing
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "iso-name", children: "ISO Name" }),
              /* @__PURE__ */ jsx(
                SearchableProfileField,
                {
                  value: signatoryData.iso_name,
                  onSelect: (profile) => handleProfileSelect("iso", profile),
                  placeholder: "Select ISO...",
                  disabled: !isEditing
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "iso-email", children: "ISO Email" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: "iso-email",
                  type: "email",
                  value: signatoryData.iso_email || "",
                  onChange: (e) => setSignatoryData((prev) => ({ ...prev, iso_email: e.target.value })),
                  disabled: !isEditing
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "head-it-name", children: "Head of IT Name" }),
              /* @__PURE__ */ jsx(
                SearchableProfileField,
                {
                  value: signatoryData.head_it_name,
                  onSelect: (profile) => handleProfileSelect("head_it", profile),
                  placeholder: "Select Head of IT...",
                  disabled: !isEditing
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "head-it-email", children: "Head of IT Email" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: "head-it-email",
                  type: "email",
                  value: signatoryData.head_it_email || "",
                  onChange: (e) => setSignatoryData((prev) => ({ ...prev, head_it_email: e.target.value })),
                  disabled: !isEditing
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "it-manager-name", children: "IT Manager Name" }),
              /* @__PURE__ */ jsx(
                SearchableProfileField,
                {
                  value: signatoryData.it_manager_name,
                  onSelect: (profile) => handleProfileSelect("it_manager", profile),
                  placeholder: "Select IT Manager...",
                  disabled: !isEditing
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "it-manager-email", children: "IT Manager Email" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: "it-manager-email",
                  type: "email",
                  value: signatoryData.it_manager_email || "",
                  onChange: (e) => setSignatoryData((prev) => ({ ...prev, it_manager_email: e.target.value })),
                  disabled: !isEditing
                }
              )
            ] })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx(AlertDialog, { open: showDisableMfaConfirm, onOpenChange: setShowDisableMfaConfirm, children: /* @__PURE__ */ jsxs(AlertDialogContent, { children: [
      /* @__PURE__ */ jsxs(AlertDialogHeader, { children: [
        /* @__PURE__ */ jsx(AlertDialogTitle, { children: "Disable MFA requirement?" }),
        /* @__PURE__ */ jsx(AlertDialogDescription, { children: "This will remove the MFA requirement for all non-admin users and automatically unenrol anyone who has already set it up. Admin accounts will still require MFA regardless of this setting." })
      ] }),
      /* @__PURE__ */ jsxs(AlertDialogFooter, { children: [
        /* @__PURE__ */ jsx(AlertDialogCancel, { children: "Cancel" }),
        /* @__PURE__ */ jsx(AlertDialogAction, { onClick: () => applyMfaChange(false), children: "Disable & unenrol users" })
      ] })
    ] }) })
  ] });
};
const OrganisationPanel = ({
  title = "Organisation",
  description = "Manage users, roles, departments, and locations",
  showAdminBadge = true,
  className = ""
}) => {
  const { isTabEnabled, onNavigate } = useOrganisationContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const getDefaultTab = () => {
    const defaultTabs = ["users", "roles", "departments", "locations", "certificates", "profile"];
    return defaultTabs.find((tab) => isTabEnabled(tab)) || "users";
  };
  const [activeTab, setActiveTab] = useState(() => {
    const urlTab = searchParams.get("orgTab");
    if (urlTab && isTabEnabled(urlTab)) {
      return urlTab;
    }
    return getDefaultTab();
  });
  useEffect(() => {
    const urlTab = searchParams.get("orgTab");
    const defaultTabs = ["users", "roles", "departments", "locations", "certificates", "profile"];
    const defaultTab = defaultTabs.find((tab) => isTabEnabled(tab)) || "users";
    if (urlTab && isTabEnabled(urlTab) && urlTab !== activeTab) {
      setActiveTab(urlTab);
    } else if (!urlTab && activeTab !== defaultTab) {
      setSearchParams({ orgTab: activeTab }, { replace: true });
    }
  }, [searchParams, activeTab, isTabEnabled, setSearchParams]);
  const handleTabChange = (value) => {
    setActiveTab(value);
    setSearchParams({ orgTab: value }, { replace: true });
    onNavigate == null ? void 0 : onNavigate(value);
  };
  const tabConfig = [
    { id: "users", label: "User Management", icon: Users, component: UserManagement },
    { id: "roles", label: "Roles", icon: UserCheck, component: RoleManagement },
    { id: "departments", label: "Departments", icon: Building2, component: DepartmentManagement },
    { id: "locations", label: "Locations", icon: MapPin, component: LocationManagement },
    { id: "certificates", label: "Certificates", icon: Award, component: OrganisationCertificates },
    { id: "profile", label: "Profile", icon: User, component: OrganisationProfile }
  ];
  const enabledTabs = tabConfig.filter((tab) => isTabEnabled(tab.id));
  return /* @__PURE__ */ jsxs("div", { className: `w-full px-4 space-y-6 ${className}`, children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-left", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold", children: title }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: description })
      ] }),
      showAdminBadge && /* @__PURE__ */ jsxs(Badge, { variant: "secondary", className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(Settings, { className: "h-4 w-4" }),
        "Administrator"
      ] })
    ] }),
    /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsx(CardContent, { className: "p-6", children: /* @__PURE__ */ jsxs(Tabs, { value: activeTab, onValueChange: handleTabChange, className: "w-full", children: [
      /* @__PURE__ */ jsx(TabsList, { className: "grid w-full", style: { gridTemplateColumns: `repeat(${enabledTabs.length}, 1fr)` }, children: enabledTabs.map(({ id, label, icon: Icon2 }) => /* @__PURE__ */ jsxs(TabsTrigger, { value: id, className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(Icon2, { className: "h-4 w-4" }),
        label
      ] }, id)) }),
      enabledTabs.map(({ id, component: Component }) => /* @__PURE__ */ jsx(TabsContent, { value: id, className: "space-y-4", children: /* @__PURE__ */ jsx(Component, {}) }, id))
    ] }) }) })
  ] });
};
const OrganisationWrapper = ({ basePath }) => {
  const { hasAdminAccess, hasManagerAccess } = useUserRole();
  const enabledTabs = hasAdminAccess ? ["users", "roles", "departments", "locations", "certificates", "profile"] : hasManagerAccess ? ["users", "departments", "roles"] : ["users"];
  const organisationConfig = {
    supabaseClient: supabase,
    basePath,
    enabledTabs,
    permissions: {
      canCreateUsers: hasAdminAccess,
      canEditUsers: hasAdminAccess,
      canDeleteUsers: hasAdminAccess,
      canManageRoles: hasAdminAccess,
      canManageDepartments: hasAdminAccess,
      canManageLocations: hasAdminAccess,
      canManageCertificates: hasAdminAccess,
      canManageProfile: hasAdminAccess
    }
  };
  return /* @__PURE__ */ jsx(OrganisationProvider, { config: organisationConfig, children: /* @__PURE__ */ jsx(
    OrganisationPanel,
    {
      title: "Organisation",
      description: "Manage users, roles, departments, and locations",
      showAdminBadge: false
    }
  ) });
};
const EditableCertificates = ({ profile }) => {
  const { certificates } = profile;
  const { supabaseClient } = useOrganisationContext();
  const printRef = useRef(null);
  const [downloadingId, setDownloadingId] = useState(null);
  const handlePrint = useReactToPrint({ contentRef: printRef });
  const handleDownload = async (certId) => {
    var _a;
    setDownloadingId(certId);
    try {
      const { data: sessionData } = await supabaseClient.auth.getSession();
      const jwt = (_a = sessionData == null ? void 0 : sessionData.session) == null ? void 0 : _a.access_token;
      if (!jwt) {
        toast$2.error("Not authenticated");
        return;
      }
      const { data, error } = await supabaseClient.functions.invoke("get-certificate-url", {
        body: { certificate_id: certId },
        headers: { Authorization: `Bearer ${jwt}` }
      });
      if (error || !(data == null ? void 0 : data.url)) {
        console.error("[EditableCertificates] get-certificate-url error:", error);
        toast$2.error("Failed to get download link");
        return;
      }
      window.open(data.url, "_blank");
    } catch (err) {
      console.error("[EditableCertificates] download error:", err);
      toast$2.error("Failed to download certificate");
    } finally {
      setDownloadingId(null);
    }
  };
  const formatDate = (dateString) => {
    if (!dateString) return "No expiry";
    return new Date(dateString).toLocaleDateString();
  };
  const getTypeIcon = (type) => {
    return type === "Document" ? /* @__PURE__ */ jsx(FileText, { className: "h-5 w-5 text-primary flex-shrink-0" }) : /* @__PURE__ */ jsx(Award, { className: "h-5 w-5 text-primary flex-shrink-0" });
  };
  const getTypeColor = (type) => {
    return type === "Document" ? "bg-blue-500" : "bg-purple-500";
  };
  const getValidityStatus = (expiryDate) => {
    if (!expiryDate) return "Valid";
    const expiry = new Date(expiryDate);
    const today = /* @__PURE__ */ new Date();
    today.setHours(0, 0, 0, 0);
    if (expiry < today) {
      return "Expired";
    } else if (expiry <= new Date(today.getTime() + 30 * 24 * 60 * 60 * 1e3)) {
      return "Expiring Soon";
    } else {
      return "Valid";
    }
  };
  const getValidityStatusColor = (status) => {
    switch (status) {
      case "Valid":
        return "bg-green-500";
      case "Expired":
        return "bg-red-500";
      case "Expiring Soon":
        return "bg-yellow-500";
      default:
        return "bg-blue-500";
    }
  };
  const filteredCertificates = certificates.filter(
    (cert) => cert.org_cert === false
  );
  return /* @__PURE__ */ jsx("div", { className: "space-y-4 animate-fade-in", children: filteredCertificates.length === 0 ? /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-center py-8", children: "No certificates yet" }) : /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxs(Button, { variant: "outline", size: "sm", onClick: () => handlePrint(), className: "print:hidden", children: [
      /* @__PURE__ */ jsx(Printer, { className: "h-4 w-4 mr-2" }),
      "Print All"
    ] }) }),
    /* @__PURE__ */ jsx("div", { ref: printRef, className: "space-y-4", children: filteredCertificates.map((cert, index) => {
      const validityStatus = getValidityStatus(cert.expiryDate);
      return /* @__PURE__ */ jsxs("div", { className: "border rounded-lg p-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 min-w-0 flex-1", children: [
            getTypeIcon(cert.type),
            /* @__PURE__ */ jsx("h3", { className: "font-semibold text-lg truncate", children: cert.name })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex items-center flex-shrink-0", children: /* @__PURE__ */ jsx(Badge, { className: `${getTypeColor(cert.type)} text-white text-sm px-2 py-1`, children: cert.type || "Certificate" }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-4 gap-4 text-sm ml-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Building, { className: "h-4 w-4 text-muted-foreground" }),
            /* @__PURE__ */ jsx("span", { className: "font-medium text-foreground", children: cert.issuedBy })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Calendar, { className: "h-4 w-4 text-muted-foreground" }),
            /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "Issued:" }),
            /* @__PURE__ */ jsx("span", { className: "font-medium", children: formatDate(cert.dateAcquired) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Calendar, { className: "h-4 w-4 text-muted-foreground" }),
            /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "Expires:" }),
            /* @__PURE__ */ jsx("span", { className: "font-medium", children: formatDate(cert.expiryDate) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-2", children: [
            /* @__PURE__ */ jsx(Badge, { className: `${getValidityStatusColor(validityStatus)} text-white`, children: validityStatus }),
            cert.certificate_url && cert.id && /* @__PURE__ */ jsx(
              Button,
              {
                variant: "outline",
                size: "sm",
                disabled: downloadingId === cert.id,
                onClick: () => handleDownload(cert.id),
                className: "print:hidden",
                children: downloadingId === cert.id ? /* @__PURE__ */ jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsx(Download, { className: "h-4 w-4" })
              }
            )
          ] })
        ] }),
        cert.credentialId && /* @__PURE__ */ jsxs("div", { className: "text-sm ml-8 mt-2", children: [
          /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "ID: " }),
          /* @__PURE__ */ jsx("span", { className: "font-medium", children: cert.credentialId })
        ] })
      ] }, index);
    }) })
  ] }) });
};
const AssignPhysicalLocationDialog = ({
  isOpen,
  onOpenChange,
  prefilledUser,
  onSuccess
}) => {
  const [loading, setLoading] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState("");
  const { profiles } = useUserProfiles();
  const { data: locations } = useQuery({
    queryKey: ["locations"],
    queryFn: async () => {
      const { data } = await supabase.from("locations").select("id, name").eq("status", "Active").order("name");
      return data || [];
    }
  });
  const [formData, setFormData] = useState({
    full_name: (prefilledUser == null ? void 0 : prefilledUser.full_name) || "",
    email: (prefilledUser == null ? void 0 : prefilledUser.email) || "",
    department: (prefilledUser == null ? void 0 : prefilledUser.department) || "",
    role_account_type: (prefilledUser == null ? void 0 : prefilledUser.role) || "",
    location: "",
    access_purpose: "",
    status: "Active"
  });
  const handleUserSelection = (userId) => {
    setSelectedUserId(userId);
    if (userId === "none") {
      setFormData((prev) => ({
        ...prev,
        full_name: "",
        email: "",
        department: "",
        role_account_type: ""
      }));
    } else {
      const selectedUser = profiles.find((profile) => profile.id === userId);
      if (selectedUser) {
        setFormData((prev) => ({
          ...prev,
          full_name: selectedUser.full_name || "",
          email: selectedUser.email || "",
          department: selectedUser.department || "",
          role_account_type: selectedUser.role || ""
        }));
      }
    }
  };
  const resetForm = () => {
    setSelectedUserId("");
    setFormData({
      full_name: (prefilledUser == null ? void 0 : prefilledUser.full_name) || "",
      email: (prefilledUser == null ? void 0 : prefilledUser.email) || "",
      department: (prefilledUser == null ? void 0 : prefilledUser.department) || "",
      role_account_type: (prefilledUser == null ? void 0 : prefilledUser.role) || "",
      location: "",
      access_purpose: "",
      status: "Active"
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!formData.location || !formData.access_purpose) {
        throw new Error("Location and Access Purpose are required");
      }
      const userId = (prefilledUser == null ? void 0 : prefilledUser.user_id) || selectedUserId;
      if (userId && userId !== "none") {
        const { data: locationData, error: locationError } = await supabase.from("locations").select("id, name").eq("id", formData.location).single();
        if (locationError) {
          throw new Error(`Failed to fetch location: ${locationError.message}`);
        }
        if (locationData) {
          const { error: profileUpdateError } = await supabase.from("profiles").update({
            location: locationData.name,
            location_id: formData.location
          }).eq("id", userId);
          if (profileUpdateError) {
            throw new Error(`Failed to update profile: ${profileUpdateError.message}`);
          }
        }
      }
      const insertData = {
        full_name: formData.full_name || "Unassigned",
        user_id: userId,
        // Use userId
        location_id: formData.location,
        // Assuming this is already a UUID
        access_purpose: formData.access_purpose,
        date_access_created: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
        date_access_revoked: null,
        status: formData.status
      };
      const { error } = await supabase.from("physical_location_access").insert([insertData]);
      if (error) throw error;
      toast({
        title: "Physical location access added",
        description: formData.full_name === "Unassigned" ? "Location access record created without user assignment." : "Physical location access has been successfully added."
      });
      onOpenChange(false);
      resetForm();
      onSuccess == null ? void 0 : onSuccess();
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsx(Dialog, { open: isOpen, onOpenChange, children: /* @__PURE__ */ jsxs(DialogContent, { className: "max-w-2xl max-h-[80vh] overflow-y-auto", children: [
    /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(DialogTitle, { children: "Add Physical Location Access" }) }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
        !prefilledUser && /* @__PURE__ */ jsxs("div", { className: "col-span-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "user_select", children: "Assign to User (Optional)" }),
          /* @__PURE__ */ jsxs(Select, { value: selectedUserId, onValueChange: handleUserSelection, children: [
            /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Select a user or create without assignment" }) }),
            /* @__PURE__ */ jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsx(SelectItem, { value: "none", children: "Create without user assignment" }),
              profiles.map((profile) => /* @__PURE__ */ jsxs(SelectItem, { value: profile.id, children: [
                profile.full_name || "No name",
                " (",
                profile.email || profile.username || "No email",
                ")"
              ] }, profile.id))
            ] })
          ] })
        ] }),
        selectedUserId && selectedUserId !== "none" && /* @__PURE__ */ jsxs("div", { className: "col-span-2 p-3 bg-gray-50 rounded-lg", children: [
          /* @__PURE__ */ jsx("h4", { className: "font-medium mb-2", children: "Selected User Details:" }),
          /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Name:" }),
            " ",
            formData.full_name
          ] }),
          /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Email:" }),
            " ",
            formData.email
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "full_name", children: "Full Name" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "full_name",
              value: formData.full_name,
              onChange: (e) => setFormData({ ...formData, full_name: e.target.value }),
              placeholder: "Leave empty for unassigned",
              disabled: !!prefilledUser || selectedUserId && selectedUserId !== "none"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "email", children: "Email" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "email",
              value: formData.email,
              onChange: (e) => setFormData({ ...formData, email: e.target.value }),
              placeholder: "Leave empty for unassigned",
              disabled: !!prefilledUser || selectedUserId && selectedUserId !== "none"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "location", children: "Location *" }),
          /* @__PURE__ */ jsxs(
            Select,
            {
              value: formData.location,
              onValueChange: (value) => setFormData({ ...formData, location: value }),
              required: true,
              children: [
                /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Select a location" }) }),
                /* @__PURE__ */ jsx(SelectContent, { children: locations == null ? void 0 : locations.map((location) => /* @__PURE__ */ jsx(SelectItem, { value: location.id, children: location.name }, location.id)) })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "access_purpose", children: "Access Purpose *" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "access_purpose",
              value: formData.access_purpose,
              onChange: (e) => setFormData({ ...formData, access_purpose: e.target.value }),
              placeholder: "e.g., Maintenance, Security, Operations",
              required: true
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "col-span-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "status", children: "Status" }),
          /* @__PURE__ */ jsxs(Select, { value: formData.status, onValueChange: (value) => setFormData({ ...formData, status: value }), children: [
            /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsx(SelectItem, { value: "Active", children: "Active" }),
              /* @__PURE__ */ jsx(SelectItem, { value: "Inactive", children: "Inactive" }),
              /* @__PURE__ */ jsx(SelectItem, { value: "Revoked", children: "Revoked" })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-2 justify-end", children: [
        /* @__PURE__ */ jsx(Button, { type: "button", variant: "outline", onClick: () => onOpenChange(false), size: "icon", children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }) }),
        /* @__PURE__ */ jsx(Button, { type: "submit", disabled: loading, size: "icon", children: loading ? /* @__PURE__ */ jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsx(Plus, { className: "h-4 w-4" }) })
      ] })
    ] })
  ] }) });
};
const PhysicalLocationTab = ({ profile, isAdmin = false }) => {
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);
  const { data: locationAccess = [], refetch } = useQuery({
    queryKey: ["user-physical-location-access", profile.email],
    queryFn: async () => {
      const { data, error } = await supabase.from("physical_location_access").select(`
          id,
          access_purpose, 
          status, 
          date_access_created, 
          date_access_revoked,
          location_id,
          locations!inner(name)
        `).eq("user_id", profile.id).order("created_at", { ascending: false });
      if (error) throw error;
      const transformedData = (data == null ? void 0 : data.map((item, index) => {
        var _a;
        return {
          ...item,
          location: ((_a = item.locations) == null ? void 0 : _a.name) || "Unknown Location",
          // Ensure we have a unique key for React
          uniqueKey: item.id || `temp-${index}-${Date.now()}`
        };
      })) || [];
      return transformedData;
    }
  });
  const columns = [
    {
      key: "location",
      header: "Location",
      type: "text",
      editable: false,
      // Not editable as requested
      required: true,
      sortable: true
    },
    {
      key: "access_purpose",
      header: "Access Purpose",
      type: "text",
      editable: false,
      // Not editable as requested
      required: true,
      sortable: true
    },
    {
      key: "date_access_created",
      header: "Date Created",
      type: "date",
      editable: false,
      // Not editable as requested
      required: true,
      sortable: true
    },
    {
      key: "date_access_revoked",
      header: "Date Revoked",
      type: "date",
      editable: isAdmin,
      // Only admins can edit this field
      sortable: true
    },
    {
      key: "status",
      header: "Status",
      type: "select",
      options: ["Active", "Inactive", "Revoked"],
      editable: false,
      // Not editable as requested
      sortable: true
    }
  ];
  const handleUpdate = async (id, updates) => {
    try {
      const { error } = await supabase.from("physical_location_access").update(updates).eq("id", id);
      if (error) throw error;
      toast$1({
        title: "Access updated",
        description: "Physical location access has been successfully updated"
      });
      refetch();
      return { success: true };
    } catch (error) {
      console.error("Error updating physical location access:", error);
      toast$1({
        title: "Update failed",
        description: error.message,
        variant: "destructive"
      });
      return { success: false, error: error.message };
    }
  };
  const handleDelete = async (id) => {
    try {
      const { data: accessRecord, error: fetchError } = await supabase.from("physical_location_access").select("location_id").eq("id", id).single();
      if (fetchError) throw fetchError;
      if (accessRecord == null ? void 0 : accessRecord.location_id) {
        const { data: userProfile } = await supabase.from("profiles").select("location_id").eq("id", profile.id).single();
        if ((userProfile == null ? void 0 : userProfile.location_id) === accessRecord.location_id) {
          const { error: profileUpdateError } = await supabase.from("profiles").update({ location: null, location_id: null }).eq("id", profile.id);
          if (profileUpdateError) {
            throw new Error(`Failed to update profile: ${profileUpdateError.message}`);
          }
        }
      }
      const { error } = await supabase.from("physical_location_access").delete().eq("id", id);
      if (error) throw error;
      toast$1({
        title: "Access removed",
        description: "Physical location access has been successfully removed"
      });
      refetch();
      return { success: true };
    } catch (error) {
      toast$1({
        title: "Delete failed",
        description: error.message,
        variant: "destructive"
      });
      return { success: false, error: error.message };
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
      /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: isAdmin ? `Manage physical location access for ${profile.firstName} ${profile.lastName}` : `Physical location access for ${profile.firstName} ${profile.lastName}` }),
      isAdmin && /* @__PURE__ */ jsx(
        Button,
        {
          onClick: () => setIsAssignDialogOpen(true),
          size: "icon",
          children: /* @__PURE__ */ jsx(Plus, { className: "h-4 w-4" })
        }
      )
    ] }),
    /* @__PURE__ */ jsx(
      EditableTable,
      {
        data: locationAccess,
        columns,
        onUpdate: isAdmin ? handleUpdate : void 0,
        onDelete: isAdmin ? handleDelete : void 0,
        allowAdd: false,
        allowDelete: isAdmin
      }
    ),
    /* @__PURE__ */ jsx(
      AssignPhysicalLocationDialog,
      {
        isOpen: isAssignDialogOpen,
        onOpenChange: setIsAssignDialogOpen,
        prefilledUser: {
          user_id: profile.id,
          full_name: profile.firstName + " " + profile.lastName,
          email: profile.email,
          department: profile.department,
          role: profile.role
        },
        onSuccess: () => {
          refetch();
          setIsAssignDialogOpen(false);
        }
      }
    )
  ] });
};
const AssignHardwareDialog = ({
  isOpen,
  onOpenChange,
  userId,
  onSuccess
}) => {
  const [loading, setLoading] = useState(false);
  const [selectedHardwareId, setSelectedHardwareId] = useState("");
  const { hardwareInventory, refetch } = useInventory();
  const unassignedHardware = hardwareInventory.filter((item) => {
    const hasNoUserId = !item.user_id;
    const isUnassigned = item.status === "Unassigned";
    const hasNoAssignedUser = !item.asset_owner || item.asset_owner.trim() === "" || item.asset_owner === "no-owner" || item.asset_owner === "Unassigned";
    return hasNoUserId && (isUnassigned || hasNoAssignedUser);
  });
  const selectedHardwareItem = selectedHardwareId ? hardwareInventory.find((item) => item.id === selectedHardwareId) : null;
  const { data: userProfile } = useQuery({
    queryKey: ["user-profile-by-id", userId],
    queryFn: async () => {
      const { data, error } = await supabase.from("profiles").select("full_name, username").eq("id", userId).single();
      if (error) throw error;
      return data;
    }
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedHardwareItem || !userProfile) {
      toast$1({
        title: "Error",
        description: "Please select a hardware item to assign.",
        variant: "destructive"
      });
      return;
    }
    setLoading(true);
    try {
      const userName = userProfile.full_name || userProfile.username || "Assigned User";
      const { error: inventoryError } = await supabase.from("hardware_inventory").update({
        user_id: userId,
        asset_owner: userName,
        status: "Assigned"
      }).eq("id", selectedHardwareId);
      if (inventoryError) throw inventoryError;
      toast$1({
        title: "Hardware assigned",
        description: `${selectedHardwareItem.device_name} has been successfully assigned to ${userName}`
      });
      await refetch();
      onOpenChange(false);
      setSelectedHardwareId("");
      onSuccess == null ? void 0 : onSuccess();
    } catch (error) {
      toast$1({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsx(Dialog, { open: isOpen, onOpenChange, children: /* @__PURE__ */ jsxs(DialogContent, { children: [
    /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(DialogTitle, { children: "Assign Hardware to User" }) }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "hardware", children: "Select Hardware" }),
        /* @__PURE__ */ jsxs(
          Select,
          {
            value: selectedHardwareId,
            onValueChange: setSelectedHardwareId,
            disabled: unassignedHardware.length === 0,
            children: [
              /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, { placeholder: unassignedHardware.length === 0 ? "No unassigned hardware available" : "Select unassigned hardware" }) }),
              /* @__PURE__ */ jsx(SelectContent, { children: unassignedHardware.map((item) => /* @__PURE__ */ jsxs(SelectItem, { value: item.id, children: [
                item.device_name,
                " - ",
                item.asset_type,
                " (S/N: ",
                item.serial_number,
                ")"
              ] }, item.id)) })
            ]
          }
        )
      ] }),
      selectedHardwareItem && /* @__PURE__ */ jsxs("div", { className: "p-3 bg-blue-50 rounded-lg border border-blue-200", children: [
        /* @__PURE__ */ jsx("h4", { className: "font-medium mb-2 text-blue-900", children: "Assignment Details:" }),
        /* @__PURE__ */ jsxs("p", { className: "text-sm text-blue-700", children: [
          /* @__PURE__ */ jsx("strong", { children: "Device:" }),
          " ",
          selectedHardwareItem.device_name
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "text-sm text-blue-700", children: [
          /* @__PURE__ */ jsx("strong", { children: "Type:" }),
          " ",
          selectedHardwareItem.asset_type
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "text-sm text-blue-700", children: [
          /* @__PURE__ */ jsx("strong", { children: "Serial Number:" }),
          " ",
          selectedHardwareItem.serial_number
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "text-sm text-blue-700", children: [
          /* @__PURE__ */ jsx("strong", { children: "Location:" }),
          " ",
          selectedHardwareItem.asset_location || "Not specified"
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex gap-2 justify-end", children: /* @__PURE__ */ jsx(Button, { type: "submit", size: "icon", disabled: loading || !selectedHardwareId, children: loading ? /* @__PURE__ */ jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsx(Save, { className: "h-4 w-4" }) }) })
    ] })
  ] }) });
};
const AssignSoftwareDialog = ({
  isOpen,
  onOpenChange,
  userId,
  onSuccess
}) => {
  const [loading, setLoading] = useState(false);
  const [selectedSoftwareId, setSelectedSoftwareId] = useState("");
  const [roleAccountType, setRoleAccountType] = useState("");
  const { softwareInventory } = useInventory();
  const { addSoftware } = useUserAssets();
  const availableSoftware = softwareInventory.filter(
    (item) => item.status === "Active"
  );
  const selectedSoftwareItem = softwareInventory.find((item) => item.id === selectedSoftwareId);
  const { data: userProfile, isLoading: profileLoading, error: profileError } = useQuery({
    queryKey: ["user-profile-by-id", userId],
    queryFn: async () => {
      debug.log("Querying profile for userId:", userId);
      const { data, error } = await supabase.from("profiles").select("id, full_name, username").eq("id", userId).single();
      debug.log("Profile query result:", { data, error });
      if (error) {
        console.error("Error fetching user profile:", error);
        throw error;
      }
      return data;
    },
    enabled: !!userId && isOpen
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedSoftwareId || !roleAccountType) {
      toast$1({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }
    if (!selectedSoftwareItem) {
      toast$1({
        title: "Error",
        description: "Selected software item not found.",
        variant: "destructive"
      });
      return;
    }
    if (!(userProfile == null ? void 0 : userProfile.id)) {
      toast$1({
        title: "Error",
        description: `User profile not found or missing ID. UserId: ${userId}, Profile: ${JSON.stringify(userProfile)}`,
        variant: "destructive"
      });
      return;
    }
    setLoading(true);
    try {
      const softwareData = {
        user_id: userProfile.id,
        full_name: userProfile.full_name,
        username_email: userProfile.username || "",
        software: selectedSoftwareItem.software_name,
        role_account_type: roleAccountType,
        status: "Active"
      };
      await addSoftware(softwareData);
      toast$1({
        title: "Software assigned",
        description: "Software license has been successfully assigned to the user."
      });
      onOpenChange(false);
      setSelectedSoftwareId("");
      setRoleAccountType("");
      onSuccess == null ? void 0 : onSuccess();
    } catch (error) {
      console.error("Error assigning software:", error);
      toast$1({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  if (profileLoading) {
    return /* @__PURE__ */ jsx(Dialog, { open: isOpen, onOpenChange, children: /* @__PURE__ */ jsx(DialogContent, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center p-6", children: [
      /* @__PURE__ */ jsx(LoaderCircle, { className: "h-6 w-6 animate-spin" }),
      /* @__PURE__ */ jsx("span", { className: "ml-2", children: "Loading user profile..." })
    ] }) }) });
  }
  if (profileError) {
    return /* @__PURE__ */ jsx(Dialog, { open: isOpen, onOpenChange, children: /* @__PURE__ */ jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(DialogTitle, { children: "Error Loading User Profile" }) }),
      /* @__PURE__ */ jsxs("div", { className: "p-4", children: [
        /* @__PURE__ */ jsxs("p", { className: "text-red-600", children: [
          "Failed to load user profile: ",
          profileError.message
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-600 mt-2", children: [
          "User ID: ",
          userId
        ] }),
        /* @__PURE__ */ jsx(Button, { onClick: () => onOpenChange(false), className: "mt-4", children: "Close" })
      ] })
    ] }) });
  }
  return /* @__PURE__ */ jsx(Dialog, { open: isOpen, onOpenChange, children: /* @__PURE__ */ jsxs(DialogContent, { children: [
    /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsxs(DialogTitle, { children: [
      "Assign Software License to ",
      (userProfile == null ? void 0 : userProfile.full_name) || "User"
    ] }) }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "software", children: "Select Software" }),
        /* @__PURE__ */ jsxs(
          Select,
          {
            value: selectedSoftwareId,
            onValueChange: setSelectedSoftwareId,
            children: [
              /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Select software from inventory" }) }),
              /* @__PURE__ */ jsx(SelectContent, { children: availableSoftware.length === 0 ? /* @__PURE__ */ jsx(SelectItem, { value: "", disabled: true, children: "No software available in inventory" }) : availableSoftware.map((item) => /* @__PURE__ */ jsxs(SelectItem, { value: item.id, children: [
                item.software_name,
                " ",
                item.software_version ? `v${item.software_version}` : "",
                item.software_publisher ? ` by ${item.software_publisher}` : ""
              ] }, item.id)) })
            ]
          }
        )
      ] }),
      selectedSoftwareItem && /* @__PURE__ */ jsxs("div", { className: "p-3 bg-gray-50 rounded-lg", children: [
        /* @__PURE__ */ jsx("h4", { className: "font-medium mb-2", children: "Selected Software Details:" }),
        /* @__PURE__ */ jsxs("p", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Name:" }),
          " ",
          selectedSoftwareItem.software_name
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Publisher:" }),
          " ",
          selectedSoftwareItem.software_publisher || "Not specified"
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Version:" }),
          " ",
          selectedSoftwareItem.software_version || "Not specified"
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Department:" }),
          " ",
          selectedSoftwareItem.department || "Not specified"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "role_account_type", children: "Access Level" }),
        /* @__PURE__ */ jsxs(Select, { value: roleAccountType, onValueChange: setRoleAccountType, children: [
          /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Select access level" }) }),
          /* @__PURE__ */ jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsx(SelectItem, { value: "Admin", children: "Admin" }),
            /* @__PURE__ */ jsx(SelectItem, { value: "User", children: "User" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex gap-2 justify-end", children: /* @__PURE__ */ jsx(Button, { type: "submit", size: "icon", disabled: loading || !selectedSoftwareId || !roleAccountType, children: loading ? /* @__PURE__ */ jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsx(Save, { className: "h-4 w-4" }) }) })
    ] })
  ] }) });
};
const AddEducationDialog = ({
  isOpen,
  onOpenChange,
  userId,
  onSuccess
}) => {
  const [loading, setLoading] = useState(false);
  const [certFile, setCertFile] = useState(null);
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    type: "Certificate",
    name: "",
    issued_by: "",
    date_acquired: "",
    expiry_date: "",
    credential_id: "",
    status: "Valid"
  });
  const { data: userProfile } = useQuery({
    queryKey: ["user-profile", userId],
    queryFn: async () => {
      const { data, error } = await supabase.from("profiles").select("id").eq("id", userId).single();
      if (error) throw error;
      return data;
    }
  });
  const resetForm = () => {
    setFormData({
      type: "Certificate",
      name: "",
      issued_by: "",
      date_acquired: "",
      expiry_date: "",
      credential_id: "",
      status: "Valid"
    });
    setCertFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userProfile) {
      toast$1({ title: "Error", description: "User profile not found.", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const { data: newCert, error: insertError } = await supabase.from("certificates").insert([{
        user_id: userProfile.id,
        type: formData.type,
        name: formData.name,
        issued_by: formData.issued_by,
        date_acquired: formData.date_acquired,
        expiry_date: formData.expiry_date || null,
        credential_id: formData.credential_id || null,
        status: formData.status
      }]).select("id").single();
      if (insertError) throw insertError;
      if (certFile && (newCert == null ? void 0 : newCert.id)) {
        const ext = certFile.name.split(".").pop();
        const safeName = formData.name.replace(/[^a-zA-Z0-9]/g, "_").slice(0, 40);
        const storagePath = `${userProfile.id}/external/${newCert.id}_${safeName}.${ext}`;
        const { error: uploadError } = await supabase.storage.from("certificates").upload(storagePath, certFile, { upsert: true });
        if (uploadError) {
          console.error("Error uploading certificate file:", uploadError);
          toast$1({
            title: "Certificate added",
            description: "Record saved but file upload failed. You can try uploading the file again later.",
            variant: "destructive"
          });
        } else {
          await supabase.from("certificates").update({ certificate_url: storagePath }).eq("id", newCert.id);
        }
      }
      toast$1({ title: "Certificate added", description: "Certificate has been successfully added." });
      onOpenChange(false);
      resetForm();
      onSuccess == null ? void 0 : onSuccess();
    } catch (error) {
      toast$1({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsx(Dialog, { open: isOpen, onOpenChange, children: /* @__PURE__ */ jsxs(DialogContent, { children: [
    /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(DialogTitle, { children: "Add Certificate" }) }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "type", children: "Type *" }),
        /* @__PURE__ */ jsxs(Select, { value: formData.type, onValueChange: (value) => setFormData({ ...formData, type: value }), children: [
          /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, {}) }),
          /* @__PURE__ */ jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsx(SelectItem, { value: "Certificate", children: "Certificate" }),
            /* @__PURE__ */ jsx(SelectItem, { value: "Document", children: "Document" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "name", children: "Name *" }),
        /* @__PURE__ */ jsx(
          Input,
          {
            id: "name",
            value: formData.name,
            onChange: (e) => setFormData({ ...formData, name: e.target.value }),
            placeholder: "e.g., Cybersecurity Certificate, PDPC e-Learning, ISP, IRP",
            required: true
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "issued_by", children: "Issued By *" }),
        /* @__PURE__ */ jsx(
          Input,
          {
            id: "issued_by",
            value: formData.issued_by,
            onChange: (e) => setFormData({ ...formData, issued_by: e.target.value }),
            placeholder: "e.g., RAYN, PDPC",
            required: true
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "date_acquired", children: "Date Acquired *" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "date_acquired",
              type: "date",
              value: formData.date_acquired,
              onChange: (e) => setFormData({ ...formData, date_acquired: e.target.value }),
              required: true
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "expiry_date", children: "Expiry Date" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "expiry_date",
              type: "date",
              value: formData.expiry_date,
              onChange: (e) => setFormData({ ...formData, expiry_date: e.target.value })
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "credential_id", children: "Credential ID" }),
        /* @__PURE__ */ jsx(
          Input,
          {
            id: "credential_id",
            value: formData.credential_id,
            onChange: (e) => setFormData({ ...formData, credential_id: e.target.value }),
            placeholder: "Certificate or credential identifier"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "status", children: "Status" }),
        /* @__PURE__ */ jsxs(Select, { value: formData.status, onValueChange: (value) => setFormData({ ...formData, status: value }), children: [
          /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, {}) }),
          /* @__PURE__ */ jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsx(SelectItem, { value: "Valid", children: "Valid" }),
            /* @__PURE__ */ jsx(SelectItem, { value: "Expired", children: "Expired" }),
            /* @__PURE__ */ jsx(SelectItem, { value: "Pending", children: "Pending" }),
            /* @__PURE__ */ jsx(SelectItem, { value: "Revoked", children: "Revoked" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(Label, { children: "Certificate File (optional)" }),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "mt-1 flex items-center gap-3 rounded-md border border-dashed border-muted-foreground/40 px-4 py-3 cursor-pointer hover:bg-muted/40 transition-colors",
            onClick: () => {
              var _a;
              return (_a = fileInputRef.current) == null ? void 0 : _a.click();
            },
            children: certFile ? /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(FileText, { className: "h-4 w-4 text-muted-foreground shrink-0" }),
              /* @__PURE__ */ jsx("span", { className: "text-sm truncate", children: certFile.name }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  className: "ml-auto text-muted-foreground hover:text-destructive",
                  onClick: (e) => {
                    e.stopPropagation();
                    setCertFile(null);
                    if (fileInputRef.current) fileInputRef.current.value = "";
                  },
                  children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" })
                }
              )
            ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(Upload, { className: "h-4 w-4 text-muted-foreground shrink-0" }),
              /* @__PURE__ */ jsx("span", { className: "text-sm text-muted-foreground", children: "Upload PDF, JPG, or PNG" })
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          "input",
          {
            ref: fileInputRef,
            type: "file",
            accept: ".pdf,.jpg,.jpeg,.png",
            className: "hidden",
            onChange: (e) => {
              var _a;
              return setCertFile(((_a = e.target.files) == null ? void 0 : _a[0]) ?? null);
            }
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-2 justify-end", children: [
        /* @__PURE__ */ jsx(Button, { type: "button", variant: "outline", onClick: () => onOpenChange(false), size: "icon", children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }) }),
        /* @__PURE__ */ jsx(Button, { type: "submit", disabled: loading || !formData.name || !formData.issued_by || !formData.date_acquired, size: "icon", children: loading ? /* @__PURE__ */ jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsx(Plus, { className: "h-4 w-4" }) })
      ] })
    ] })
  ] }) });
};
const MyDocuments = ({ userId }) => {
  const { supabaseClient: supabase2, basePath } = useOrganisationContext();
  const { user } = useAuth();
  const { hasAdminAccess } = useUserRole();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("assigned");
  const [openingDocId, setOpeningDocId] = useState(null);
  const targetUserId = userId || (user == null ? void 0 : user.id);
  const isOwnDocuments = !userId || userId === (user == null ? void 0 : user.id);
  const { data: assignments, isLoading } = useQuery({
    queryKey: ["document-assignments", targetUserId],
    queryFn: async () => {
      const { data, error } = await supabase2.from("document_assignments").select(`
          *,
          document:documents(*)
        `).eq("user_id", targetUserId).order("assigned_at", { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!targetUserId
  });
  const updateStatusMutation = useMutation({
    mutationFn: async ({
      assignmentId,
      status,
      documentTitle,
      previousStatus
    }) => {
      if (previousStatus === "Completed" && status !== "Completed") {
        throw new Error("Completed documents cannot be changed to another status.");
      }
      const completedAt = status === "Completed" ? (/* @__PURE__ */ new Date()).toISOString() : null;
      const updateData = { status };
      if (status === "Completed") {
        updateData.completed_at = completedAt;
      } else if (status === "Not started" || status === "In progress") {
        updateData.completed_at = null;
      }
      const { error } = await supabase2.from("document_assignments").update(updateData).eq("assignment_id", assignmentId);
      if (error) throw error;
      return { status, documentTitle, completedAt };
    },
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: ["document-assignments"] });
      queryClient.invalidateQueries({ queryKey: ["compliance-stats"] });
      queryClient.invalidateQueries({ queryKey: ["document-compliance-stats"] });
      queryClient.invalidateQueries({ queryKey: ["user-compliance-stats"] });
      queryClient.invalidateQueries({ queryKey: ["department-compliance-stats"] });
      queryClient.invalidateQueries({ queryKey: ["document-assignments-overview"] });
      toast({
        title: "Success",
        description: "Document status updated successfully"
      });
      if ((result == null ? void 0 : result.status) === "Completed") {
        const clientId = basePath ? basePath.replace(/^\//, "") : "default";
        supabase2.from("profiles").select("manager").eq("id", targetUserId).maybeSingle().then(({ data: profile }) => {
          if (profile == null ? void 0 : profile.manager) {
            sendNotificationByEvent(supabase2, "document_completed_manager", {
              user_id: profile.manager,
              employee_user_id: targetUserId,
              document_title: result.documentTitle,
              completed_at: result.completedAt,
              clientId
            }).catch((err) => console.error("[MyDocuments] manager notification error:", err));
          }
        });
      }
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  });
  const resetCompletionMutation = useMutation({
    mutationFn: async ({ assignmentId }) => {
      const { error } = await supabase2.from("document_assignments").update({ status: "Not started", completed_at: null }).eq("assignment_id", assignmentId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["document-assignments"] });
      queryClient.invalidateQueries({ queryKey: ["compliance-stats"] });
      queryClient.invalidateQueries({ queryKey: ["document-compliance-stats"] });
      queryClient.invalidateQueries({ queryKey: ["user-compliance-stats"] });
      queryClient.invalidateQueries({ queryKey: ["department-compliance-stats"] });
      queryClient.invalidateQueries({ queryKey: ["document-assignments-overview"] });
      toast({
        title: "Completion reset",
        description: "Status set to Not started and completion cleared. The user must acknowledge again."
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Could not reset completion",
        variant: "destructive"
      });
    }
  });
  const handleStatusChange = (assignmentId, newStatus, documentTitle, previousStatus) => {
    updateStatusMutation.mutate({ assignmentId, status: newStatus, documentTitle, previousStatus });
  };
  const handleAdminResetCompletion = (assignmentId, documentTitle) => {
    if (!window.confirm(
      `Reset completion for "${documentTitle}"?

The assignment will return to Not started and the user will need to acknowledge this document again.`
    )) {
      return;
    }
    resetCompletionMutation.mutate({ assignmentId, documentTitle });
  };
  const handleOpenDocument = async (documentId, url, fileName) => {
    if (!fileName && url) {
      window.open(url, "_blank", "noopener,noreferrer");
      return;
    }
    if (!fileName) return;
    setOpeningDocId(documentId);
    try {
      const { data, error } = await supabase2.functions.invoke("get-document-url", {
        body: { document_id: documentId }
      });
      if (error) throw error;
      window.open(data.url, "_blank", "noopener,noreferrer");
    } catch (err) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setOpeningDocId(null);
    }
  };
  useEffect(() => {
    if (!assignments || assignments.length === 0) return;
    if (typeof sessionStorage === "undefined") return;
    const docId = sessionStorage.getItem("deep_link_document");
    if (!docId) return;
    const assignment = assignments.find((a) => a.document_id === docId);
    if (assignment) {
      console.log("[MyDocuments] deep-link: opening document", docId, assignment.document.title);
      sessionStorage.removeItem("deep_link_document");
      handleOpenDocument(
        assignment.document_id,
        assignment.document.url,
        assignment.document.file_name
      );
    } else {
      console.warn("[MyDocuments] deep-link: document not found in assignments, doc_id=", docId);
    }
  }, [assignments]);
  const filteredAssignments = assignments == null ? void 0 : assignments.filter((assignment) => {
    var _a;
    const matchesSearch = assignment.document.title.toLowerCase().includes(searchTerm.toLowerCase()) || ((_a = assignment.document.description) == null ? void 0 : _a.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === "all" || assignment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });
  const requiredAssignments = filteredAssignments == null ? void 0 : filteredAssignments.filter((a) => a.document.required);
  const optionalAssignments = filteredAssignments == null ? void 0 : filteredAssignments.filter((a) => !a.document.required);
  const completedCount = (assignments == null ? void 0 : assignments.filter((a) => a.status === "Completed").length) || 0;
  const totalCount = (assignments == null ? void 0 : assignments.length) || 0;
  const progressPercentage = totalCount > 0 ? Math.round(completedCount / totalCount * 100) : 0;
  if (isLoading) {
    return /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center h-64", children: /* @__PURE__ */ jsx("div", { className: "animate-spin rounded-full h-32 w-32 border-b-2 border-primary" }) });
  }
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs(Card, { children: [
      /* @__PURE__ */ jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(FileText, { className: "h-5 w-5" }),
          "Document Progress"
        ] }),
        /* @__PURE__ */ jsx(CardDescription, { children: "Your overall document reading progress" })
      ] }),
      /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", children: "Overall Progress" }),
          /* @__PURE__ */ jsxs("span", { className: "text-sm text-muted-foreground", children: [
            completedCount,
            " of ",
            totalCount,
            " documents completed"
          ] })
        ] }),
        /* @__PURE__ */ jsx(Progress, { value: progressPercentage, className: "w-full" }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsxs("span", { children: [
            progressPercentage,
            "% Complete"
          ] }),
          /* @__PURE__ */ jsxs("span", { children: [
            totalCount - completedCount,
            " remaining"
          ] })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "search", children: "Search Documents" }),
        /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-3 h-4 w-4 text-muted-foreground" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "search",
              placeholder: "Search by title or description...",
              value: searchTerm,
              onChange: (e) => setSearchTerm(e.target.value),
              className: "pl-10"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "w-full sm:w-48", children: [
        /* @__PURE__ */ jsx(Label, { children: "Filter by Status" }),
        /* @__PURE__ */ jsxs(Select, { value: statusFilter, onValueChange: setStatusFilter, children: [
          /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "All statuses" }) }),
          /* @__PURE__ */ jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsx(SelectItem, { value: "all", children: "All Statuses" }),
            /* @__PURE__ */ jsx(SelectItem, { value: "Not started", children: "Not Started" }),
            /* @__PURE__ */ jsx(SelectItem, { value: "In progress", children: "In Progress" }),
            /* @__PURE__ */ jsx(SelectItem, { value: "Completed", children: "Completed" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(Tabs, { value: activeTab, onValueChange: setActiveTab, children: [
      /* @__PURE__ */ jsxs(TabsList, { children: [
        /* @__PURE__ */ jsxs(TabsTrigger, { value: "assigned", children: [
          "All Assigned (",
          (filteredAssignments == null ? void 0 : filteredAssignments.length) || 0,
          ")"
        ] }),
        /* @__PURE__ */ jsxs(TabsTrigger, { value: "required", children: [
          "Required (",
          (requiredAssignments == null ? void 0 : requiredAssignments.length) || 0,
          ")"
        ] }),
        /* @__PURE__ */ jsxs(TabsTrigger, { value: "optional", children: [
          "Optional (",
          (optionalAssignments == null ? void 0 : optionalAssignments.length) || 0,
          ")"
        ] })
      ] }),
      /* @__PURE__ */ jsx(TabsContent, { value: "assigned", className: "space-y-4", children: /* @__PURE__ */ jsx(
        DocumentList,
        {
          assignments: filteredAssignments || [],
          onStatusChange: handleStatusChange,
          isReadOnly: !isOwnDocuments,
          onOpenDocument: handleOpenDocument,
          openingDocId,
          canAdminResetCompletion: hasAdminAccess,
          onAdminResetCompletion: handleAdminResetCompletion,
          resetCompletionPending: resetCompletionMutation.isPending
        }
      ) }),
      /* @__PURE__ */ jsx(TabsContent, { value: "required", className: "space-y-4", children: /* @__PURE__ */ jsx(
        DocumentList,
        {
          assignments: requiredAssignments || [],
          onStatusChange: handleStatusChange,
          isReadOnly: !isOwnDocuments,
          onOpenDocument: handleOpenDocument,
          openingDocId,
          canAdminResetCompletion: hasAdminAccess,
          onAdminResetCompletion: handleAdminResetCompletion,
          resetCompletionPending: resetCompletionMutation.isPending
        }
      ) }),
      /* @__PURE__ */ jsx(TabsContent, { value: "optional", className: "space-y-4", children: /* @__PURE__ */ jsx(
        DocumentList,
        {
          assignments: optionalAssignments || [],
          onStatusChange: handleStatusChange,
          isReadOnly: !isOwnDocuments,
          onOpenDocument: handleOpenDocument,
          openingDocId,
          canAdminResetCompletion: hasAdminAccess,
          onAdminResetCompletion: handleAdminResetCompletion,
          resetCompletionPending: resetCompletionMutation.isPending
        }
      ) })
    ] })
  ] });
};
const DocumentList = ({
  assignments,
  onStatusChange,
  onOpenDocument,
  openingDocId,
  isReadOnly = false,
  canAdminResetCompletion = false,
  onAdminResetCompletion,
  resetCompletionPending = false
}) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case "Completed":
        return /* @__PURE__ */ jsx(CircleCheckBig, { className: "h-4 w-4 text-green-500" });
      case "In progress":
        return /* @__PURE__ */ jsx(Clock, { className: "h-4 w-4 text-blue-500" });
      default:
        return /* @__PURE__ */ jsx(Circle, { className: "h-4 w-4 text-muted-foreground" });
    }
  };
  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800";
      case "In progress":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-orange-100 text-orange-800";
    }
  };
  const isOverdue = (dueDate, status) => {
    return new Date(dueDate) < /* @__PURE__ */ new Date() && status !== "Completed";
  };
  if (assignments.length === 0) {
    return /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(CardContent, { className: "py-8 text-center", children: [
      /* @__PURE__ */ jsx(FileText, { className: "h-12 w-12 mx-auto text-muted-foreground mb-4" }),
      /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "No documents found" })
    ] }) });
  }
  return /* @__PURE__ */ jsx("div", { className: "space-y-4", children: assignments.map((assignment) => /* @__PURE__ */ jsxs(Card, { className: isOverdue(assignment.due_date, assignment.status) ? "border-red-200" : "", children: [
    /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx(CardTitle, { className: "text-lg", children: assignment.document.title }),
          assignment.document.required && /* @__PURE__ */ jsx(Badge, { variant: "destructive", className: "text-xs", children: "Required" }),
          isOverdue(assignment.due_date, assignment.status) && /* @__PURE__ */ jsx(Badge, { variant: "destructive", className: "text-xs", children: "Overdue" })
        ] }),
        assignment.document.description && /* @__PURE__ */ jsx(CardDescription, { className: "mt-2", children: assignment.document.description })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2", children: getStatusIcon(assignment.status) })
    ] }) }),
    /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between flex-wrap gap-3", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-4 text-sm text-muted-foreground", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ jsx(Calendar, { className: "h-4 w-4 shrink-0" }),
          "Due: ",
          new Date(assignment.due_date).toLocaleDateString()
        ] }),
        assignment.status === "Completed" && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ jsx(CircleCheckBig, { className: "h-4 w-4 shrink-0 text-green-600" }),
          /* @__PURE__ */ jsxs("span", { className: "text-foreground", children: [
            "Completed:",
            " ",
            assignment.completed_at ? new Date(assignment.completed_at).toLocaleDateString() : "—"
          ] })
        ] }),
        assignment.document.category && /* @__PURE__ */ jsx(Badge, { variant: "outline", className: "text-xs", children: assignment.document.category })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        (assignment.document.url || assignment.document.file_name) && /* @__PURE__ */ jsxs(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: () => onOpenDocument(
              assignment.document_id,
              assignment.document.url,
              assignment.document.file_name
            ),
            disabled: openingDocId === assignment.document_id,
            children: [
              openingDocId === assignment.document_id ? /* @__PURE__ */ jsx(LoaderCircle, { className: "h-4 w-4 mr-1 animate-spin" }) : /* @__PURE__ */ jsx(ExternalLink, { className: "h-4 w-4 mr-1" }),
              "View"
            ]
          }
        ),
        isReadOnly ? /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center justify-end gap-2", children: [
          /* @__PURE__ */ jsx(Badge, { className: getStatusColor(assignment.status), children: assignment.status }),
          canAdminResetCompletion && assignment.status === "Completed" && onAdminResetCompletion && /* @__PURE__ */ jsxs(
            Button,
            {
              type: "button",
              variant: "outline",
              size: "sm",
              className: "text-muted-foreground",
              onClick: () => onAdminResetCompletion(assignment.assignment_id, assignment.document.title),
              disabled: resetCompletionPending,
              children: [
                /* @__PURE__ */ jsx(RotateCcw, { className: "h-3.5 w-3.5 mr-1" }),
                "Reset completion"
              ]
            }
          )
        ] }) : assignment.status === "Completed" ? /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center justify-end gap-2", children: [
          /* @__PURE__ */ jsx(Badge, { className: getStatusColor("Completed"), children: "Completed" }),
          canAdminResetCompletion && onAdminResetCompletion && /* @__PURE__ */ jsxs(
            Button,
            {
              type: "button",
              variant: "outline",
              size: "sm",
              className: "text-muted-foreground",
              onClick: () => onAdminResetCompletion(assignment.assignment_id, assignment.document.title),
              disabled: resetCompletionPending,
              children: [
                /* @__PURE__ */ jsx(RotateCcw, { className: "h-3.5 w-3.5 mr-1" }),
                "Reset completion"
              ]
            }
          )
        ] }) : /* @__PURE__ */ jsxs(
          Select,
          {
            value: assignment.status,
            onValueChange: (value) => onStatusChange(assignment.assignment_id, value, assignment.document.title, assignment.status),
            children: [
              /* @__PURE__ */ jsx(SelectTrigger, { className: "w-[140px]", children: /* @__PURE__ */ jsx(SelectValue, {}) }),
              /* @__PURE__ */ jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsx(SelectItem, { value: "Not started", children: "Not Started" }),
                /* @__PURE__ */ jsx(SelectItem, { value: "In progress", children: "In Progress" }),
                /* @__PURE__ */ jsx(SelectItem, { value: "Completed", children: "Completed" })
              ] })
            ]
          }
        )
      ] })
    ] }) })
  ] }, assignment.assignment_id)) });
};
const UserDepartmentsRolesTable = forwardRef(({ userId }, ref) => {
  const [newRows, setNewRows] = useState([]);
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const {
    userDepartments,
    addDepartment,
    removeDepartment
  } = useUserDepartments(userId);
  const { data: allDepartments = [] } = useQuery({
    queryKey: ["departments"],
    queryFn: async () => {
      const { data, error } = await supabase.from("departments").select("id, name").order("name");
      if (error) throw error;
      return data;
    }
  });
  const { data: userRoles = [] } = useQuery({
    queryKey: ["user-roles", userId],
    queryFn: async () => {
      if (!userId) return [];
      debug.log("UserDepartmentsRolesTable: Fetching roles for user:", userId);
      const { data, error } = await supabase.from("user_profile_roles").select(`
          *,
          roles (
            name
          )
        `).eq("user_id", userId).order("is_primary", { ascending: false });
      debug.log("UserDepartmentsRolesTable: Raw roles data:", data);
      debug.log("UserDepartmentsRolesTable: Roles query error:", error);
      if (error) throw error;
      const transformedData = (data || []).map((item) => {
        var _a;
        return {
          id: item.id,
          user_id: item.user_id,
          role_id: item.role_id,
          role_name: ((_a = item.roles) == null ? void 0 : _a.name) || "",
          is_primary: item.is_primary,
          assigned_at: item.assigned_at,
          assigned_by: item.assigned_by,
          pairing_id: item.pairing_id
        };
      });
      transformedData.sort((a, b) => {
        if (a.is_primary && !b.is_primary) return -1;
        if (!a.is_primary && b.is_primary) return 1;
        return (a.role_name || "").localeCompare(b.role_name || "");
      });
      debug.log("UserDepartmentsRolesTable: Transformed roles data:", transformedData);
      return transformedData;
    },
    enabled: !!userId
  });
  const { data: allRoles = [] } = useQuery({
    queryKey: ["all-roles"],
    queryFn: async () => {
      const { data, error } = await supabase.from("roles").select("role_id, name, department_id, departments(name)").eq("is_active", true).order("name");
      if (error) throw error;
      return data;
    }
  });
  const addRoleMutation = useMutation({
    mutationFn: async ({ roleId, pairingId }) => {
      debug.log("UserDepartmentsRolesTable: addRoleMutation called with roleId:", roleId, "pairingId:", pairingId);
      const role = allRoles.find((r) => r.role_id === roleId);
      debug.log("UserDepartmentsRolesTable: Found role:", role);
      if (!role) throw new Error("Role not found");
      const isPrimary = userRoles.length === 0;
      debug.log("UserDepartmentsRolesTable: isPrimary:", isPrimary, "userRoles.length:", userRoles.length);
      const insertData = {
        user_id: userId,
        role_id: roleId,
        is_primary: isPrimary,
        assigned_by: user == null ? void 0 : user.id,
        pairing_id: pairingId
      };
      debug.log("UserDepartmentsRolesTable: Inserting role data:", insertData);
      const { data, error } = await supabase.from("user_profile_roles").insert(insertData).select();
      debug.log("UserDepartmentsRolesTable: Insert result:", data);
      debug.log("UserDepartmentsRolesTable: Insert error:", error);
      if (error) throw error;
      return role;
    },
    onSuccess: (data) => {
      debug.log("UserDepartmentsRolesTable: Role assignment successful:", data);
      queryClient.invalidateQueries({ queryKey: ["user-roles", userId] });
      toast$2.success("Role assigned successfully");
    },
    onError: (error) => {
      console.error("UserDepartmentsRolesTable: Role assignment failed:", error);
      toast$2.error("Failed to assign role: " + error.message);
    }
  });
  const removeRoleMutation = useMutation({
    mutationFn: async (roleId) => {
      const { error } = await supabase.from("user_profile_roles").delete().eq("id", roleId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-roles", userId] });
      toast$2.success("Role removed successfully");
    },
    onError: (error) => {
      toast$2.error("Failed to remove role: " + error.message);
    }
  });
  useMutation({
    mutationFn: async (roleId) => {
      await supabase.from("user_profile_roles").update({ is_primary: false }).eq("user_id", userId);
      const { error } = await supabase.from("user_profile_roles").update({ is_primary: true }).eq("id", roleId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-roles", userId] });
      toast$2.success("Primary role updated");
    }
  });
  const createTableData = () => {
    const pairs = [];
    const usedPairingIds = /* @__PURE__ */ new Set();
    userDepartments.forEach((dept) => {
      if (dept.pairing_id) {
        const matchingRole = userRoles.find((role) => role.pairing_id === dept.pairing_id);
        if (matchingRole) {
          pairs.push({
            id: `pair-${dept.pairing_id}`,
            departmentId: dept.department_id,
            departmentName: dept.department_name,
            departmentAssignmentId: dept.id,
            roleName: matchingRole.role_name,
            roleId: matchingRole.id,
            isDepartmentPrimary: dept.is_primary,
            isRolePrimary: matchingRole.is_primary
          });
          usedPairingIds.add(dept.pairing_id);
        }
      }
    });
    userDepartments.forEach((dept) => {
      if (!dept.pairing_id || !usedPairingIds.has(dept.pairing_id)) {
        pairs.push({
          id: `dept-${dept.id}`,
          departmentId: dept.department_id,
          departmentName: dept.department_name,
          departmentAssignmentId: dept.id,
          isDepartmentPrimary: dept.is_primary
        });
      }
    });
    userRoles.forEach((role) => {
      if (!role.pairing_id || !usedPairingIds.has(role.pairing_id)) {
        pairs.push({
          id: `role-${role.id}`,
          roleName: role.role_name,
          roleId: role.id,
          isRolePrimary: role.is_primary
        });
      }
    });
    pairs.sort((a, b) => {
      const aPrimary = a.isDepartmentPrimary || a.isRolePrimary;
      const bPrimary = b.isDepartmentPrimary || b.isRolePrimary;
      if (aPrimary && !bPrimary) return -1;
      if (!aPrimary && bPrimary) return 1;
      return 0;
    });
    pairs.push(...newRows);
    return pairs;
  };
  const getAvailableRoles = (selectedDepartmentId) => {
    debug.log("getAvailableRoles called with:", selectedDepartmentId);
    debug.log("allRoles:", allRoles);
    if (!selectedDepartmentId) {
      const generalRoles = allRoles.filter((role) => !role.department_id);
      debug.log("No department selected, showing general roles:", generalRoles);
      return generalRoles;
    }
    const departmentRoles = allRoles.filter((role) => role.department_id === selectedDepartmentId);
    debug.log(`Department ${selectedDepartmentId} selected, showing ONLY department roles:`, departmentRoles);
    return departmentRoles;
  };
  const handleAddNewRow = () => {
    setNewRows((prev) => [...prev, { isNewRow: true }]);
  };
  useImperativeHandle(ref, () => ({
    handleAddNewRow
  }));
  const handleNewRowDepartmentChange = (index, departmentId) => {
    if (departmentId === "none") {
      departmentId = "";
    }
    const department = allDepartments.find((d) => d.id === departmentId);
    const currentRow = newRows[index];
    const availableRoles = getAvailableRoles(departmentId || void 0);
    const isCurrentRoleStillValid = currentRow.roleId && availableRoles.some((role) => role.role_id === currentRow.roleId);
    const updatedRow = {
      ...currentRow,
      departmentId: departmentId || void 0,
      departmentName: department == null ? void 0 : department.name,
      // Clear role if it's no longer valid for the selected department
      roleId: isCurrentRoleStillValid ? currentRow.roleId : void 0,
      roleName: isCurrentRoleStillValid ? currentRow.roleName : void 0
    };
    setNewRows((prev) => prev.map((row, i) => i === index ? updatedRow : row));
  };
  const handleNewRowRoleChange = (index, roleId) => {
    if (roleId === "none") {
      roleId = "";
    }
    const role = allRoles.find((r) => r.role_id === roleId);
    const updatedRow = {
      ...newRows[index],
      roleId: roleId || void 0,
      roleName: role == null ? void 0 : role.name
    };
    setNewRows((prev) => prev.map((row, i) => i === index ? updatedRow : row));
  };
  const handleSaveNewRow = async (index) => {
    const row = newRows[index];
    debug.log("UserDepartmentsRolesTable: Saving new row:", row);
    debug.log("UserDepartmentsRolesTable: Current userRoles:", userRoles);
    debug.log("UserDepartmentsRolesTable: Current userDepartments:", userDepartments);
    if (!row.departmentId && !row.roleId) {
      toast$2.error("Please select at least a department or role");
      return;
    }
    try {
      const pairingId = row.departmentId && row.roleId ? crypto.randomUUID() : void 0;
      debug.log("UserDepartmentsRolesTable: Generated pairingId:", pairingId);
      if (row.departmentId) {
        const isDepartmentAlreadyAssigned = userDepartments.some((dept) => dept.department_id === row.departmentId);
        debug.log("UserDepartmentsRolesTable: Department already assigned?", isDepartmentAlreadyAssigned);
        debug.log("UserDepartmentsRolesTable: Current userDepartments:", userDepartments);
        debug.log("UserDepartmentsRolesTable: Looking for departmentId:", row.departmentId);
        if (!isDepartmentAlreadyAssigned) {
          const isPrimary = userDepartments.length === 0;
          debug.log("UserDepartmentsRolesTable: Adding department with isPrimary:", isPrimary);
          debug.log("UserDepartmentsRolesTable: Department params:", {
            userId,
            departmentId: row.departmentId,
            isPrimary,
            pairingId,
            assignedBy: user == null ? void 0 : user.id
          });
          await addDepartment({
            userId,
            departmentId: row.departmentId,
            isPrimary,
            pairingId,
            assignedBy: user == null ? void 0 : user.id
          });
          debug.log("UserDepartmentsRolesTable: Department addition completed");
        } else {
          debug.log("UserDepartmentsRolesTable: Department already assigned, skipping");
        }
      }
      if (row.roleId) {
        const isRoleAlreadyAssigned = userRoles.some((role) => role.role_id === row.roleId);
        debug.log("UserDepartmentsRolesTable: Role already assigned?", isRoleAlreadyAssigned);
        debug.log("UserDepartmentsRolesTable: Checking roleId", row.roleId, "against userRoles:", userRoles.map((r) => r.role_id));
        if (!isRoleAlreadyAssigned) {
          debug.log("UserDepartmentsRolesTable: Adding role with roleId:", row.roleId);
          await addRoleMutation.mutateAsync({
            roleId: row.roleId,
            pairingId
          });
        }
      }
      setNewRows((prev) => prev.filter((_, i) => i !== index));
      toast$2.success("Assignment saved successfully");
    } catch (error) {
      console.error("Error saving assignment:", error);
      toast$2.error("Failed to save assignment");
    }
  };
  const handleDeletePair = async (pair) => {
    try {
      if (pair.departmentAssignmentId) {
        removeDepartment(pair.departmentAssignmentId);
      }
      if (pair.roleId) {
        await removeRoleMutation.mutateAsync(pair.roleId);
      }
    } catch {
      toast$2.error("Failed to delete assignment");
    }
  };
  const handleCancelNewRow = (index) => {
    setNewRows((prev) => prev.filter((_, i) => i !== index));
  };
  const setPrimaryPairMutation = useMutation({
    mutationFn: async (pair) => {
      await supabase.from("user_departments").update({ is_primary: false }).eq("user_id", userId);
      await supabase.from("user_profile_roles").update({ is_primary: false }).eq("user_id", userId);
      if (pair.departmentAssignmentId) {
        const { error: deptError } = await supabase.from("user_departments").update({ is_primary: true }).eq("id", pair.departmentAssignmentId);
        if (deptError) throw deptError;
      }
      if (pair.roleId) {
        const { error: roleError } = await supabase.from("user_profile_roles").update({ is_primary: true }).eq("id", pair.roleId);
        if (roleError) throw roleError;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USER_DEPARTMENTS_KEY(userId) });
      queryClient.invalidateQueries({ queryKey: ["user-roles", userId] });
      toast$2.success("Primary assignment updated successfully");
    },
    onError: (error) => {
      toast$2.error("Failed to update primary assignment: " + error.message);
    }
  });
  const tableData = createTableData();
  return /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsx(CardContent, { className: "pt-6", children: /* @__PURE__ */ jsx("div", { className: "space-y-4", children: /* @__PURE__ */ jsxs(Table, { children: [
    /* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
      /* @__PURE__ */ jsx(TableHead, { children: "Department" }),
      /* @__PURE__ */ jsx(TableHead, { children: "Role" }),
      /* @__PURE__ */ jsx(TableHead, { className: "w-[80px]", children: "Actions" })
    ] }) }),
    /* @__PURE__ */ jsxs(TableBody, { children: [
      tableData.map((pair, index) => /* @__PURE__ */ jsxs(TableRow, { children: [
        /* @__PURE__ */ jsx(TableCell, { children: pair.isNewRow ? /* @__PURE__ */ jsxs(
          Select,
          {
            value: pair.departmentId || "",
            onValueChange: (value) => handleNewRowDepartmentChange(index - (tableData.length - newRows.length), value),
            children: [
              /* @__PURE__ */ jsx(SelectTrigger, { className: "w-full", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Select department..." }) }),
              /* @__PURE__ */ jsxs(SelectContent, { className: "bg-background border z-50", children: [
                allDepartments.map((dept) => /* @__PURE__ */ jsx(SelectItem, { value: dept.id, children: dept.name }, dept.id)),
                /* @__PURE__ */ jsx(SelectItem, { value: "none", children: /* @__PURE__ */ jsx("span", { className: "text-muted-foreground italic", children: "Skip department" }) })
              ] })
            ]
          }
        ) : pair.departmentName ? /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(Badge, { variant: pair.isDepartmentPrimary ? "default" : "secondary", children: pair.departmentName }),
          pair.isDepartmentPrimary && /* @__PURE__ */ jsx(Star, { className: "h-3 w-3 fill-current text-yellow-500" })
        ] }) : /* @__PURE__ */ jsx("span", { className: "text-muted-foreground italic", children: "No department" }) }),
        /* @__PURE__ */ jsx(TableCell, { children: pair.isNewRow ? /* @__PURE__ */ jsxs(
          Select,
          {
            value: pair.roleId || "",
            onValueChange: (value) => handleNewRowRoleChange(index - (tableData.length - newRows.length), value),
            children: [
              /* @__PURE__ */ jsx(SelectTrigger, { className: "w-full", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Select role..." }) }),
              /* @__PURE__ */ jsxs(SelectContent, { className: "bg-background border z-50", children: [
                getAvailableRoles(pair.departmentId).map((role) => /* @__PURE__ */ jsxs(SelectItem, { value: role.role_id, children: [
                  role.name,
                  role.department_id && /* @__PURE__ */ jsx("span", { className: "text-xs text-muted-foreground ml-1", children: "(Dept. role)" })
                ] }, role.role_id)),
                /* @__PURE__ */ jsx(SelectItem, { value: "none", children: /* @__PURE__ */ jsx("span", { className: "text-muted-foreground italic", children: "Skip role" }) })
              ] })
            ]
          }
        ) : pair.roleName ? /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(Badge, { variant: pair.isRolePrimary ? "default" : "secondary", children: pair.roleName }),
          pair.isRolePrimary && /* @__PURE__ */ jsx(Star, { className: "h-3 w-3 fill-current text-yellow-500" })
        ] }) : /* @__PURE__ */ jsx("span", { className: "text-muted-foreground italic", children: "No role" }) }),
        /* @__PURE__ */ jsx(TableCell, { children: pair.isNewRow ? /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ jsx(
            Button,
            {
              size: "sm",
              variant: "ghost",
              onClick: () => handleSaveNewRow(index - (tableData.length - newRows.length)),
              className: "h-6 w-6 p-0 hover:bg-primary hover:text-primary-foreground",
              disabled: !pair.departmentId && !pair.roleId,
              children: /* @__PURE__ */ jsx(Check, { className: "h-3 w-3" })
            }
          ),
          /* @__PURE__ */ jsx(
            Button,
            {
              size: "sm",
              variant: "ghost",
              onClick: () => handleCancelNewRow(index - (tableData.length - newRows.length)),
              className: "h-6 w-6 p-0 hover:bg-destructive hover:text-destructive-foreground",
              children: /* @__PURE__ */ jsx(X, { className: "h-3 w-3" })
            }
          )
        ] }) : pair.departmentName || pair.roleName ? /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ jsx(
            Button,
            {
              size: "sm",
              variant: "ghost",
              onClick: () => setPrimaryPairMutation.mutate(pair),
              disabled: setPrimaryPairMutation.isPending || pair.isDepartmentPrimary && pair.isRolePrimary,
              className: "h-6 w-6 p-0 hover:bg-yellow-500 hover:text-white",
              title: "Set as primary",
              children: /* @__PURE__ */ jsx(
                Star,
                {
                  className: `h-3 w-3 ${pair.isDepartmentPrimary || pair.isRolePrimary ? "fill-current text-yellow-500" : "text-muted-foreground"}`
                }
              )
            }
          ),
          /* @__PURE__ */ jsx(
            Button,
            {
              size: "sm",
              variant: "ghost",
              className: "h-6 w-6 p-0 hover:bg-destructive hover:text-destructive-foreground",
              onClick: () => handleDeletePair(pair),
              children: /* @__PURE__ */ jsx(X, { className: "h-3 w-3" })
            }
          )
        ] }) : null })
      ] }, pair.id || `new-${index}`)),
      tableData.length === 0 && /* @__PURE__ */ jsx(TableRow, { children: /* @__PURE__ */ jsx(TableCell, { colSpan: 3, className: "text-center text-muted-foreground", children: "No department or role assignments" }) })
    ] })
  ] }) }) }) });
});
const UserDepartmentsRolesManager = forwardRef(
  ({ userId }, ref) => {
    const tableRef = useRef(null);
    useImperativeHandle(ref, () => ({
      handleAddNewRow: () => {
        var _a, _b;
        return (_b = (_a = tableRef.current) == null ? void 0 : _a.handleAddNewRow) == null ? void 0 : _b.call(_a);
      }
    }));
    return /* @__PURE__ */ jsx(UserDepartmentsRolesTable, { userId, ref: tableRef });
  }
);
const PersonaDetailsTabs = ({ profile, userId, onUpdate }) => {
  const [isAssignHardwareOpen, setIsAssignHardwareOpen] = useState(false);
  const [isAssignSoftwareOpen, setIsAssignSoftwareOpen] = useState(false);
  const [isAddEducationOpen, setIsAddEducationOpen] = useState(false);
  const departmentRolesRef = useRef(null);
  const isLearnMode = typeof window !== "undefined" && (window.location.hostname.includes("learn") || window.location.port.startsWith("80"));
  const { hasAdminAccess } = useUserRole();
  const handleCertificateUpdate = (_certificateId, _updates) => {
  };
  const handleDataChange = () => {
    onUpdate == null ? void 0 : onUpdate();
  };
  const getGridClass = () => {
    if (isLearnMode) {
      return "grid-cols-3";
    }
    if (profile == null ? void 0 : profile.cyber_learner) {
      return "grid-cols-7";
    }
    return "grid-cols-6";
  };
  return /* @__PURE__ */ jsx(Card, { className: "w-full", children: /* @__PURE__ */ jsxs(CardContent, { className: "p-6", children: [
    /* @__PURE__ */ jsxs(Tabs, { defaultValue: "knowledge", className: "w-full", children: [
      /* @__PURE__ */ jsx(TabsList, { className: `grid w-full ${getGridClass()} mb-6`, children: isLearnMode ? /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs(TabsTrigger, { value: "knowledge", className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(BookOpen, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsx("span", { className: "hidden sm:inline", children: "Knowledge" })
        ] }),
        /* @__PURE__ */ jsxs(TabsTrigger, { value: "certification", className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(GraduationCap, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsx("span", { className: "hidden sm:inline", children: "Certificates" })
        ] }),
        /* @__PURE__ */ jsxs(TabsTrigger, { value: "departments", className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(Users, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsx("span", { className: "hidden sm:inline", children: "Departments & Roles" })
        ] })
      ] }) : (
        /* ========== GOVERN MODE TABS ========== */
        /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsxs(TabsTrigger, { value: "knowledge", className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(BookOpen, { className: "h-4 w-4" }),
            /* @__PURE__ */ jsx("span", { className: "hidden sm:inline", children: "Knowledge" })
          ] }),
          /* @__PURE__ */ jsxs(TabsTrigger, { value: "certification", className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(GraduationCap, { className: "h-4 w-4" }),
            /* @__PURE__ */ jsx("span", { className: "hidden sm:inline", children: "Certificates" })
          ] }),
          /* @__PURE__ */ jsxs(TabsTrigger, { value: "departments", className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Users, { className: "h-4 w-4" }),
            /* @__PURE__ */ jsx("span", { className: "hidden sm:inline", children: "Departments & Roles" })
          ] }),
          /* @__PURE__ */ jsxs(TabsTrigger, { value: "accounts", className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(MonitorSmartphone, { className: "h-4 w-4" }),
            /* @__PURE__ */ jsx("span", { className: "hidden sm:inline", children: "Accounts" })
          ] }),
          /* @__PURE__ */ jsxs(TabsTrigger, { value: "hardware", className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Laptop, { className: "h-4 w-4" }),
            /* @__PURE__ */ jsx("span", { className: "hidden sm:inline", children: "Hardware" })
          ] }),
          /* @__PURE__ */ jsxs(TabsTrigger, { value: "location", className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(MapPin, { className: "h-4 w-4" }),
            /* @__PURE__ */ jsx("span", { className: "hidden sm:inline", children: "Physical Location" })
          ] }),
          (profile == null ? void 0 : profile.cyber_learner) && /* @__PURE__ */ jsxs(TabsTrigger, { value: "learn", className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Play, { className: "h-4 w-4" }),
            /* @__PURE__ */ jsx("span", { className: "hidden sm:inline", children: "StaySecure LEARN" })
          ] })
        ] })
      ) }),
      isLearnMode ? /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(TabsContent, { value: "knowledge", className: "space-y-4 animate-fade-in", children: /* @__PURE__ */ jsx(MyDocuments, { userId: typeof profile.id === "string" ? profile.id : userId }) }),
        /* @__PURE__ */ jsxs(TabsContent, { value: "certification", className: "space-y-4 animate-fade-in", children: [
          /* @__PURE__ */ jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsx(
            Button,
            {
              onClick: () => setIsAddEducationOpen(true),
              size: "icon",
              children: /* @__PURE__ */ jsx(Plus, { className: "h-4 w-4" })
            }
          ) }),
          /* @__PURE__ */ jsx(
            EditableCertificates,
            {
              profile,
              onUpdate: handleCertificateUpdate,
              onDataChange: handleDataChange
            }
          )
        ] }),
        /* @__PURE__ */ jsxs(TabsContent, { value: "departments", className: "space-y-4 animate-fade-in", children: [
          hasAdminAccess && /* @__PURE__ */ jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsx(
            Button,
            {
              onClick: () => {
                var _a, _b;
                return (_b = (_a = departmentRolesRef.current) == null ? void 0 : _a.handleAddNewRow) == null ? void 0 : _b.call(_a);
              },
              size: "icon",
              children: /* @__PURE__ */ jsx(Plus, { className: "h-4 w-4" })
            }
          ) }),
          /* @__PURE__ */ jsx(UserDepartmentsRolesManager, { userId, ref: departmentRolesRef })
        ] })
      ] }) : (
        /* ========== GOVERN MODE TAB CONTENT ========== */
        /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(TabsContent, { value: "knowledge", className: "space-y-4 animate-fade-in", children: /* @__PURE__ */ jsx(MyDocuments, { userId: typeof profile.id === "string" ? profile.id : userId }) }),
          /* @__PURE__ */ jsxs(TabsContent, { value: "certification", className: "space-y-4 animate-fade-in", children: [
            /* @__PURE__ */ jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsx(
              Button,
              {
                onClick: () => setIsAddEducationOpen(true),
                size: "icon",
                children: /* @__PURE__ */ jsx(Plus, { className: "h-4 w-4" })
              }
            ) }),
            /* @__PURE__ */ jsx(
              EditableCertificates,
              {
                profile,
                onUpdate: handleCertificateUpdate,
                onDataChange: handleDataChange
              }
            )
          ] }),
          /* @__PURE__ */ jsxs(TabsContent, { value: "departments", className: "space-y-4 animate-fade-in", children: [
            hasAdminAccess && /* @__PURE__ */ jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsx(
              Button,
              {
                onClick: () => {
                  var _a, _b;
                  return (_b = (_a = departmentRolesRef.current) == null ? void 0 : _a.handleAddNewRow) == null ? void 0 : _b.call(_a);
                },
                size: "icon",
                children: /* @__PURE__ */ jsx(Plus, { className: "h-4 w-4" })
              }
            ) }),
            /* @__PURE__ */ jsx(UserDepartmentsRolesManager, { userId, ref: departmentRolesRef })
          ] }),
          /* @__PURE__ */ jsxs(TabsContent, { value: "accounts", className: "space-y-4 animate-fade-in", children: [
            hasAdminAccess && /* @__PURE__ */ jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsx(
              Button,
              {
                onClick: () => setIsAssignSoftwareOpen(true),
                size: "icon",
                children: /* @__PURE__ */ jsx(Plus, { className: "h-4 w-4" })
              }
            ) }),
            /* @__PURE__ */ jsx(SoftwareAccounts, { profile })
          ] }),
          /* @__PURE__ */ jsxs(TabsContent, { value: "hardware", className: "space-y-4 animate-fade-in", children: [
            hasAdminAccess && /* @__PURE__ */ jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsx(
              Button,
              {
                onClick: () => setIsAssignHardwareOpen(true),
                size: "icon",
                children: /* @__PURE__ */ jsx(Plus, { className: "h-4 w-4" })
              }
            ) }),
            /* @__PURE__ */ jsx(HardwareInventory, { profile, onUpdate: handleDataChange })
          ] }),
          /* @__PURE__ */ jsx(TabsContent, { value: "location", className: "space-y-4 animate-fade-in", children: /* @__PURE__ */ jsx(PhysicalLocationTab, { profile, isAdmin: hasAdminAccess }) }),
          (profile == null ? void 0 : profile.cyber_learner) && /* @__PURE__ */ jsx(TabsContent, { value: "learn", className: "space-y-4 animate-fade-in", children: /* @__PURE__ */ jsx(LearningTracksTab, { userId: typeof profile.id === "string" ? profile.id : userId }) })
        ] })
      )
    ] }),
    !isLearnMode && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(
        AssignHardwareDialog,
        {
          isOpen: isAssignHardwareOpen,
          onOpenChange: setIsAssignHardwareOpen,
          userId: typeof profile.id === "string" ? profile.id : userId,
          onSuccess: () => {
            setIsAssignHardwareOpen(false);
            handleDataChange();
          }
        }
      ),
      /* @__PURE__ */ jsx(
        AssignSoftwareDialog,
        {
          isOpen: isAssignSoftwareOpen,
          onOpenChange: setIsAssignSoftwareOpen,
          userId: typeof profile.id === "string" ? profile.id : userId,
          onSuccess: () => {
            setIsAssignSoftwareOpen(false);
            handleDataChange();
          }
        }
      )
    ] }),
    /* @__PURE__ */ jsx(
      AddEducationDialog,
      {
        isOpen: isAddEducationOpen,
        onOpenChange: setIsAddEducationOpen,
        userId: typeof profile.id === "string" ? profile.id : userId,
        onSuccess: () => {
          setIsAddEducationOpen(false);
          handleDataChange();
        }
      }
    )
  ] }) });
};
const ProfileAvatar = ({
  avatarUrl,
  firstName,
  lastName,
  profileId,
  onAvatarUpdate
}) => {
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const initials = firstName && lastName ? firstName.charAt(0) + lastName.charAt(0) : (firstName == null ? void 0 : firstName.slice(0, 2)) || "U";
  const handleAvatarClick = () => {
    var _a;
    (_a = fileInputRef.current) == null ? void 0 : _a.click();
  };
  const handleFileChange = async (event) => {
    var _a;
    debug.log("ProfileAvatar: File selected:", event.target.files);
    const file = (_a = event.target.files) == null ? void 0 : _a[0];
    if (!file) {
      debug.log("ProfileAvatar: No file selected");
      return;
    }
    debug.log("ProfileAvatar: Processing file:", file.name, file.type, file.size);
    const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!validTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image (JPEG, PNG, GIF, or WebP)",
        variant: "destructive"
      });
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload an image smaller than 5MB",
        variant: "destructive"
      });
      return;
    }
    setUploading(true);
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `avatars/${profileId || "user"}-${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      if (avatarUrl && avatarUrl.includes("/storage/v1/object/public/avatars/")) {
        try {
          const urlParts = avatarUrl.split("/storage/v1/object/public/avatars/");
          if (urlParts.length > 1) {
            const oldFilePath = urlParts[1];
            await supabase.storage.from("avatars").remove([oldFilePath]);
          }
        } catch (error2) {
          console.warn("Could not delete old avatar:", error2);
        }
      }
      const { data: _data, error } = await supabase.storage.from("avatars").upload(fileName, file, {
        cacheControl: "3600",
        upsert: false
      });
      if (error) {
        console.error("Storage upload error:", error);
        throw error;
      }
      const { data: urlData } = supabase.storage.from("avatars").getPublicUrl(fileName);
      if (profileId) {
        const { error: updateError } = await supabase.from("profiles").update({ avatar_url: urlData.publicUrl }).eq("id", profileId);
        if (updateError) {
          console.error("Profile update error:", updateError);
          throw updateError;
        }
      }
      if (onAvatarUpdate) {
        onAvatarUpdate(urlData.publicUrl);
      }
      toast({
        title: "Avatar uploaded",
        description: "Your avatar has been updated successfully"
      });
    } catch (error) {
      console.error("Error uploading avatar:", error);
      const errorMessage = (error == null ? void 0 : error.message) || "Failed to upload avatar. Please try again.";
      toast({
        title: "Upload failed",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "relative", children: [
    /* @__PURE__ */ jsxs(Avatar, { className: "h-24 w-24 border-2 border-primary", children: [
      /* @__PURE__ */ jsx(AvatarImage, { src: avatarUrl, alt: `${firstName} ${lastName}` }),
      /* @__PURE__ */ jsx(AvatarFallback, { className: "text-2xl", children: initials })
    ] }),
    /* @__PURE__ */ jsx(
      "input",
      {
        ref: fileInputRef,
        type: "file",
        accept: "image/jpeg,image/png,image/gif,image/webp",
        onChange: handleFileChange,
        className: "hidden"
      }
    ),
    /* @__PURE__ */ jsx(
      Button,
      {
        size: "sm",
        variant: "outline",
        className: "absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0",
        onClick: handleAvatarClick,
        disabled: uploading || !profileId,
        children: uploading ? /* @__PURE__ */ jsx(LoaderCircle, { className: "h-3 w-3 animate-spin" }) : /* @__PURE__ */ jsx(Upload, { className: "h-3 w-3" })
      }
    )
  ] });
};
const UserRoleField = ({ userId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const { role, isLoading, updateRole, isUpdating, getRoleDisplayName, getRoleBadgeVariant } = useUserRoleById(userId);
  const { hasAdminAccess } = useUserRole();
  const { supabaseClient } = useOrganisationContext();
  const { user } = useAuth();
  const { data: currentUserRole } = useQuery({
    queryKey: ["user-role", user == null ? void 0 : user.id],
    queryFn: async () => {
      if (!(user == null ? void 0 : user.id)) return null;
      const { data } = await supabaseClient.from("user_roles").select("role").eq("user_id", user.id).single();
      return data == null ? void 0 : data.role;
    },
    enabled: !!(user == null ? void 0 : user.id)
  });
  const isSuperAdmin = currentUserRole === "super_admin";
  const allRoleOptions = [
    { value: "user", label: "User" },
    { value: "author", label: "Author" },
    { value: "client_admin", label: "Admin" },
    { value: "super_admin", label: "Super Admin" }
  ];
  const roleOptions = allRoleOptions.filter((option) => {
    if (option.value === "super_admin" || option.value === "author") {
      return isSuperAdmin;
    }
    return true;
  });
  if (isLoading) {
    return /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
      /* @__PURE__ */ jsx("span", { className: "text-sm text-muted-foreground", children: "Loading role..." })
    ] });
  }
  const handleRoleChange = async (newRole) => {
    await updateRole(newRole);
    setIsEditing(false);
  };
  if (!isEditing) {
    return /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsx(Key, { className: "h-4 w-4 text-muted-foreground" }),
      /* @__PURE__ */ jsx(
        Badge,
        {
          variant: getRoleBadgeVariant(role),
          className: `text-sm ${hasAdminAccess ? "cursor-pointer hover:bg-muted/50 px-2 py-1 rounded transition-colors" : ""}`,
          onClick: () => hasAdminAccess && setIsEditing(true),
          children: getRoleDisplayName(role)
        }
      )
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
    /* @__PURE__ */ jsx(Key, { className: "h-4 w-4 text-muted-foreground" }),
    /* @__PURE__ */ jsxs(
      Select,
      {
        value: role || "user",
        onValueChange: (value) => handleRoleChange(value),
        disabled: isUpdating,
        open: isEditing,
        onOpenChange: setIsEditing,
        children: [
          /* @__PURE__ */ jsx(SelectTrigger, { className: "w-48 h-8 text-sm", children: /* @__PURE__ */ jsx(SelectValue, {}) }),
          /* @__PURE__ */ jsx(SelectContent, { className: "z-50", children: roleOptions.map((option) => /* @__PURE__ */ jsx(SelectItem, { value: option.value, children: option.label }, option.value)) })
        ]
      }
    ),
    isUpdating && /* @__PURE__ */ jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" })
  ] });
};
const ProfileContactInfo = ({
  startDate,
  userId,
  status,
  accessLevel: _accessLevel,
  lastLogin,
  passwordLastChanged: _passwordLastChanged,
  twoFactorEnabled
}) => {
  const formatDate = (dateString) => {
    if (!dateString) return "Not set";
    return new Date(dateString).toLocaleDateString();
  };
  const formatDateAndTime = (dateString) => {
    if (!dateString) return "Never";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Never";
    return date.toLocaleString("en-GB", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true
    });
  };
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-end space-y-3 ml-auto", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
      /* @__PURE__ */ jsx(Shield, { className: "h-4 w-4 text-muted-foreground" }),
      /* @__PURE__ */ jsx(Badge, { variant: status === "Active" ? "default" : "secondary", children: status || "Active" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex items-center justify-end gap-2 text-sm", children: /* @__PURE__ */ jsx(UserRoleField, { userId }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
      /* @__PURE__ */ jsx(Calendar, { className: "h-4 w-4 text-muted-foreground" }),
      /* @__PURE__ */ jsxs("span", { children: [
        "Started ",
        formatDate(startDate)
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
      /* @__PURE__ */ jsx(Clock, { className: "h-4 w-4 text-muted-foreground" }),
      /* @__PURE__ */ jsxs("span", { children: [
        "Last login: ",
        lastLogin ? formatDateAndTime(lastLogin) : "Never"
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
      /* @__PURE__ */ jsx(ShieldCheck, { className: `h-4 w-4 ${twoFactorEnabled ? "text-green-500" : "text-muted-foreground"}` }),
      /* @__PURE__ */ jsx(Badge, { variant: twoFactorEnabled ? "default" : "secondary", children: twoFactorEnabled ? "2FA enabled" : "2FA not set up" })
    ] })
  ] });
};
const EditableField = ({
  value,
  fieldKey,
  label,
  placeholder,
  className,
  inputClassName,
  locationId,
  isEditing,
  onEdit,
  onSave,
  onCancel,
  type = "text",
  options,
  asyncOptions,
  isLoading,
  onSelectChange
}) => {
  const [editValue, setEditValue] = React.useState(value);
  React.useEffect(() => {
    setEditValue(value);
  }, [value, isEditing]);
  const validatePhoneInput = (input) => {
    return input.replace(/[^0-9+\s\-\(\)]/g, "");
  };
  const handleSave = async () => {
    if (fieldKey) {
      await onSave(fieldKey, editValue);
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      onCancel();
    }
  };
  const handleInputChange = (e) => {
    const newValue = e.target.value;
    if (fieldKey === "phone") {
      const validatedValue = validatePhoneInput(newValue);
      setEditValue(validatedValue);
    } else {
      setEditValue(newValue);
    }
  };
  if (isEditing) {
    if (type === "select" && (options || asyncOptions)) {
      const selectOptions = asyncOptions || (options == null ? void 0 : options.map((opt) => ({ value: opt, label: opt }))) || [];
      return /* @__PURE__ */ jsxs(
        Select,
        {
          value: editValue,
          onValueChange: (newValue) => {
            setEditValue(newValue);
            const selectedOption = selectOptions.find((opt) => opt.value === newValue);
            if (onSelectChange && selectedOption) {
              onSelectChange(newValue, selectedOption);
            } else {
              handleSave();
            }
          },
          disabled: isLoading,
          children: [
            /* @__PURE__ */ jsx(SelectTrigger, { className: inputClassName || "w-48", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: isLoading ? "Loading..." : "Select location" }) }),
            /* @__PURE__ */ jsxs(SelectContent, { children: [
              selectOptions.length === 0 && !isLoading && /* @__PURE__ */ jsx(SelectItem, { value: "none", disabled: true, children: "No locations assigned" }),
              selectOptions.map((option) => /* @__PURE__ */ jsx(SelectItem, { value: option.value, children: option.label }, option.value))
            ] })
          ]
        }
      );
    }
    return /* @__PURE__ */ jsx(
      Input,
      {
        type,
        value: editValue,
        placeholder,
        onChange: handleInputChange,
        onBlur: handleSave,
        onKeyDown: handleKeyDown,
        className: inputClassName || "h-6 text-sm w-32",
        autoFocus: true
      }
    );
  }
  return /* @__PURE__ */ jsxs("div", { className, children: [
    label && /* @__PURE__ */ jsx("span", { className: "text-sm text-muted-foreground mr-2", children: label }),
    /* @__PURE__ */ jsx(
      "span",
      {
        className: "cursor-pointer hover:bg-muted/50 px-2 py-1 rounded transition-colors",
        onClick: () => fieldKey && onEdit(fieldKey),
        children: value || placeholder
      }
    )
  ] });
};
const MIN_PASSWORD_LENGTH = 12;
function getPasswordStrength(password) {
  if (!password) return { score: 0, label: "" };
  let score = 0;
  if (password.length >= MIN_PASSWORD_LENGTH) score += 40;
  if (password.length >= 16) score += 10;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score += 20;
  if (/\d/.test(password)) score += 20;
  if (/[^a-zA-Z0-9]/.test(password)) score += 20;
  const label = score >= 60 ? "Strong" : score >= 40 ? "Fair" : score >= 20 ? "Weak" : "Very weak";
  return { score: Math.min(100, score), label };
}
const ChangePasswordDialog = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const { user, signIn } = useAuth();
  const { supabaseClient } = useOrganisationContext();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const strength = getPasswordStrength(newPassword);
  const resetForm = useCallback(() => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setError(null);
  }, []);
  const handleClose = useCallback(() => {
    resetForm();
    onClose();
  }, [onClose, resetForm]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!(user == null ? void 0 : user.id)) {
      setError("You must be signed in to change your password.");
      return;
    }
    if (newPassword.length < MIN_PASSWORD_LENGTH) {
      setError(`New password must be at least ${MIN_PASSWORD_LENGTH} characters long.`);
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("New password and confirmation do not match.");
      return;
    }
    if (currentPassword === newPassword) {
      setError("New password must be different from your current password.");
      return;
    }
    setLoading(true);
    try {
      const { data, error: fnError } = await supabaseClient.functions.invoke("change-password", {
        body: {
          currentPassword,
          newPassword,
          userId: user.id,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
        }
      });
      if (fnError) {
        let message2 = fnError.message || "Something went wrong. Please try again.";
        const context = fnError.context;
        if (context == null ? void 0 : context.json) {
          try {
            const body = await context.json();
            if ((body == null ? void 0 : body.error) && typeof body.error === "string") message2 = body.error;
          } catch {
          }
        }
        setError(message2);
        return;
      }
      if ((data == null ? void 0 : data.success) === false && (data == null ? void 0 : data.error)) {
        setError(data.error);
        return;
      }
      try {
        if (user == null ? void 0 : user.email) {
          await signIn(user.email, newPassword);
        }
      } catch {
      }
      toast({
        title: "Password changed",
        description: "Your password has been updated. A confirmation email has been sent."
      });
      resetForm();
      onSuccess == null ? void 0 : onSuccess();
      handleClose();
    } catch (err) {
      const message2 = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setError(message2);
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsx(Dialog, { open: isOpen, onOpenChange: (open) => !open && handleClose(), children: /* @__PURE__ */ jsxs(DialogContent, { className: "sm:max-w-md", children: [
    /* @__PURE__ */ jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsx(DialogTitle, { children: "Change password" }),
      /* @__PURE__ */ jsx(DialogDescription, { children: "Enter your current password and choose a new one. You will receive a confirmation email." })
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
      error && /* @__PURE__ */ jsx(Alert, { variant: "destructive", children: /* @__PURE__ */ jsx(AlertDescription, { children: error }) }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "current-password", children: "Current password" }),
        /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "current-password",
              type: showCurrentPassword ? "text" : "password",
              autoComplete: "current-password",
              value: currentPassword,
              onChange: (e) => setCurrentPassword(e.target.value),
              placeholder: "Enter current password",
              required: true,
              disabled: loading,
              className: "pr-10 bg-gray-50"
            }
          ),
          /* @__PURE__ */ jsx(
            Button,
            {
              type: "button",
              variant: "ghost",
              size: "sm",
              className: "absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent",
              onClick: () => setShowCurrentPassword(!showCurrentPassword),
              children: showCurrentPassword ? /* @__PURE__ */ jsx(EyeOff, { className: "h-4 w-4 text-muted-foreground" }) : /* @__PURE__ */ jsx(Eye, { className: "h-4 w-4 text-muted-foreground" })
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "new-password", children: "New password" }),
        /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "new-password",
              type: showNewPassword ? "text" : "password",
              autoComplete: "new-password",
              value: newPassword,
              onChange: (e) => setNewPassword(e.target.value),
              placeholder: "At least 12 characters",
              required: true,
              disabled: loading,
              className: "pr-10 bg-gray-50"
            }
          ),
          /* @__PURE__ */ jsx(
            Button,
            {
              type: "button",
              variant: "ghost",
              size: "sm",
              className: "absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent",
              onClick: () => setShowNewPassword(!showNewPassword),
              children: showNewPassword ? /* @__PURE__ */ jsx(EyeOff, { className: "h-4 w-4 text-muted-foreground" }) : /* @__PURE__ */ jsx(Eye, { className: "h-4 w-4 text-muted-foreground" })
            }
          )
        ] }),
        newPassword && /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsx(Progress, { value: strength.score, className: "h-1.5" }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: strength.label })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "confirm-password", children: "Confirm new password" }),
        /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "confirm-password",
              type: showConfirmPassword ? "text" : "password",
              autoComplete: "new-password",
              value: confirmPassword,
              onChange: (e) => setConfirmPassword(e.target.value),
              placeholder: "Confirm new password",
              required: true,
              disabled: loading,
              className: "pr-10 bg-gray-50"
            }
          ),
          /* @__PURE__ */ jsx(
            Button,
            {
              type: "button",
              variant: "ghost",
              size: "sm",
              className: "absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent",
              onClick: () => setShowConfirmPassword(!showConfirmPassword),
              children: showConfirmPassword ? /* @__PURE__ */ jsx(EyeOff, { className: "h-4 w-4 text-muted-foreground" }) : /* @__PURE__ */ jsx(Eye, { className: "h-4 w-4 text-muted-foreground" })
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsx(DialogFooter, { children: /* @__PURE__ */ jsx(Button, { type: "submit", size: "icon", disabled: loading, children: loading ? /* @__PURE__ */ jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsx(Save, { className: "h-4 w-4" }) }) })
    ] })
  ] }) });
};
const EditableProfileHeader = ({
  profile,
  onProfileUpdate,
  isReadOnly: _isReadOnly = false,
  onOptimisticUpdate
}) => {
  var _a, _b, _c, _d, _e, _f, _g, _h;
  const { user } = useAuth();
  const { profiles, updateProfile } = useUserProfiles();
  const { supabaseClient, hasPermission, basePath } = useOrganisationContext();
  const isAdmin = hasPermission("canEditUsers");
  const [editingField, setEditingField] = useState(null);
  const [saving, setSaving] = useState(false);
  const [savingLanguage, setSavingLanguage] = useState(false);
  const [_managerValue, setManagerValue] = useState(profile.manager || "");
  const [isFullNameManuallyEdited, setIsFullNameManuallyEdited] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [isResetPasswordOpen, setIsResetPasswordOpen] = useState(false);
  const [isSendingReset, setIsSendingReset] = useState(false);
  const isCurrentUserProfile = !!(user == null ? void 0 : user.id) && profile.id === user.id;
  const handleSendPasswordReset = async () => {
    const account = profile.account;
    const email = (account == null ? void 0 : account.username) || profile.username || profile.email;
    if (!email) {
      toast$2.error("No email address found for this user.");
      return;
    }
    try {
      setIsSendingReset(true);
      const redirectUrl = `${window.location.origin}${basePath || ""}/reset-password`;
      debug.log("[EditableProfileHeader.handleSendPasswordReset] basePath:", basePath || "(none)");
      debug.log("[EditableProfileHeader.handleSendPasswordReset] redirectUrl:", redirectUrl);
      debug.log("[EditableProfileHeader.handleSendPasswordReset] email:", email);
      const { error } = await supabaseClient.functions.invoke("send-password-reset", {
        body: { email, redirectUrl }
      });
      if (error) throw error;
      toast$2.success("Password reset sent", { description: `A password reset link has been sent to ${email}.` });
    } catch (err) {
      toast$2.error("Failed to send password reset", { description: err.message });
    } finally {
      setIsSendingReset(false);
      setIsResetPasswordOpen(false);
    }
  };
  useEffect(() => {
    setIsFullNameManuallyEdited(false);
  }, [profile.id]);
  const { data: languages } = useQuery({
    queryKey: ["languages"],
    queryFn: async () => {
      const { data } = await supabaseClient.from("languages").select("code, display_name, native_name, flag_emoji").eq("is_active", true).order("sort_order", { ascending: true });
      return data || [];
    }
  });
  const handleFieldEdit = (field) => {
    setEditingField(field);
  };
  const handleFieldSave = async (field, value) => {
    try {
      setSaving(true);
      const updateData = {};
      if (field === "full_name") {
        updateData.full_name = value;
      } else if (field === "phone") {
        updateData.phone = value;
      } else if (field === "location") {
        updateData.location = value;
      } else if (field === "location_id") {
        updateData.location_id = value;
      } else if (field === "role") {
        updateData.role = value;
      } else if (field === "department") {
        updateData.department = value;
      } else if (field === "manager") {
        updateData.manager = value;
      } else if (field === "language") {
        updateData.language = value;
      }
      if (!profile.id) {
        console.error("Profile ID is undefined. Profile object:", profile);
        toast$2.error("Profile ID is missing. Cannot update profile.");
        return;
      }
      await updateProfile(profile.id, updateData);
      toast$2.success("Profile updated");
      setEditingField(null);
      if (onOptimisticUpdate) {
        onOptimisticUpdate(field, value);
      }
      onProfileUpdate();
    } catch (error) {
      console.error("Save error:", error);
      const errorMessage = error instanceof Error ? error.message : "Failed to update profile";
      toast$2.error(errorMessage);
    } finally {
      setSaving(false);
    }
  };
  const handleFieldCancel = () => {
    setEditingField(null);
  };
  const handleNameChange = async (field, value) => {
    try {
      setSaving(true);
      const updateData = {};
      if (field === "firstName") {
        updateData.first_name = value;
      } else {
        updateData.last_name = value;
      }
      if (!isFullNameManuallyEdited) {
        const firstName = field === "firstName" ? value : profile.firstName || "";
        const lastName = field === "lastName" ? value : profile.lastName || "";
        updateData.full_name = `${firstName} ${lastName}`.trim();
      }
      if (!profile.id) {
        console.error("Profile ID is undefined. Profile object:", profile);
        toast$2.error("Profile ID is missing. Cannot update profile.");
        return;
      }
      await updateProfile(profile.id, updateData);
      toast$2.success("Profile updated");
      setEditingField(null);
      if (onOptimisticUpdate) {
        onOptimisticUpdate(field, value);
        if (updateData.full_name) {
          onOptimisticUpdate("full_name", updateData.full_name);
        }
      }
      onProfileUpdate();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to update profile";
      toast$2.error(errorMessage);
    } finally {
      setSaving(false);
    }
  };
  const handleFullNameChange = async (value) => {
    setIsFullNameManuallyEdited(true);
    await handleFieldSave("full_name", value);
  };
  const { isSuperAdmin } = useUserRole();
  const filteredProfiles = profiles.filter((user2) => {
    if (user2.id === profile.id) return false;
    if (user2.access_level === "super_admin" && !isSuperAdmin) return false;
    return true;
  });
  const managerProfile = profiles.find((u) => u.id === profile.manager);
  const managerName = managerProfile ? managerProfile.full_name || managerProfile.username : "Not assigned";
  const { userDepartments } = useUserDepartments(profile.id);
  const { primaryRole } = useUserProfileRoles(profile.id);
  const { data: physicalLocations, isLoading: locationsLoading } = useQuery({
    queryKey: ["all-locations"],
    queryFn: async () => {
      const { data, error } = await supabaseClient.from("locations").select("id, name").eq("status", "Active").order("name");
      if (error) throw error;
      return (data || []).map((loc) => ({
        id: loc.id,
        name: loc.name,
        value: loc.name,
        label: loc.name
      }));
    }
  });
  const primaryDepartment = userDepartments == null ? void 0 : userDepartments.find((dept) => dept.is_primary);
  const handleManagerChange = async (userId) => {
    setManagerValue(userId);
    await handleFieldSave("manager", userId);
  };
  const handleLocationSelect = async (locationName, selectedOption) => {
    if (selectedOption == null ? void 0 : selectedOption.id) {
      await handleFieldSave("location", locationName);
      await handleFieldSave("location_id", selectedOption.id);
    } else {
      await handleFieldSave("location", locationName);
    }
  };
  return /* @__PURE__ */ jsx(Card, { className: "w-full", children: /* @__PURE__ */ jsx(CardContent, { className: "p-6 lg:p-8", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-6 lg:gap-8", children: [
    /* @__PURE__ */ jsx("div", { className: "flex justify-center md:justify-start", children: /* @__PURE__ */ jsx(
      ProfileAvatar,
      {
        avatarUrl: profile.avatar || profile.avatar_url,
        firstName: profile.firstName || profile.first_name || "",
        lastName: profile.lastName || profile.last_name || "",
        profileId: profile.id,
        onAvatarUpdate: (newAvatarUrl) => {
          if (onOptimisticUpdate) {
            onOptimisticUpdate("avatar_url", newAvatarUrl);
          }
          onProfileUpdate();
        }
      }
    ) }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center sm:text-left space-y-2", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
          /* @__PURE__ */ jsx(
            EditableField,
            {
              value: profile.firstName || "",
              fieldKey: "firstName",
              onSave: (field, value) => handleNameChange("firstName", value),
              isEditing: editingField === "firstName",
              onEdit: handleFieldEdit,
              onCancel: handleFieldCancel,
              saving,
              placeholder: "First Name",
              inputClassName: "text-sm h-8"
            }
          ),
          /* @__PURE__ */ jsx(
            EditableField,
            {
              value: profile.lastName || "",
              fieldKey: "lastName",
              onSave: (field, value) => handleNameChange("lastName", value),
              isEditing: editingField === "lastName",
              onEdit: handleFieldEdit,
              onCancel: handleFieldCancel,
              saving,
              placeholder: "Last Name",
              inputClassName: "text-sm h-8"
            }
          )
        ] }),
        /* @__PURE__ */ jsx(
          EditableField,
          {
            value: profile.full_name || `${profile.firstName} ${profile.lastName}`.trim(),
            fieldKey: "full_name",
            onSave: (field, value) => handleFullNameChange(value),
            isEditing: editingField === "full_name",
            onEdit: handleFieldEdit,
            onCancel: handleFieldCancel,
            saving,
            placeholder: "Full Name (Auto-generated, editable)",
            className: "flex-1",
            inputClassName: "text-2xl font-bold h-10"
          }
        )
      ] }),
      ((_a = profile.account) == null ? void 0 : _a.username) && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
        /* @__PURE__ */ jsx(User, { className: "h-4 w-4 text-muted-foreground" }),
        /* @__PURE__ */ jsx("span", { className: "text-foreground", children: profile.account.username })
      ] }),
      ((_b = profile.account) == null ? void 0 : _b.employeeId) && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
        /* @__PURE__ */ jsx(Hash, { className: "h-4 w-4 text-muted-foreground" }),
        /* @__PURE__ */ jsx("span", { className: "text-foreground", children: profile.account.employeeId })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
        /* @__PURE__ */ jsx(Phone, { className: "h-4 w-4 text-muted-foreground" }),
        /* @__PURE__ */ jsx(
          EditableField,
          {
            value: profile.phone || "Not provided",
            fieldKey: "phone",
            placeholder: "Phone number",
            onSave: handleFieldSave,
            isEditing: editingField === "phone",
            onEdit: handleFieldEdit,
            onCancel: handleFieldCancel,
            saving,
            inputClassName: "h-6 text-sm"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
        /* @__PURE__ */ jsx(Network, { className: "h-4 w-4 text-muted-foreground" }),
        isAdmin ? /* @__PURE__ */ jsxs(
          Select,
          {
            value: profile.manager,
            onValueChange: handleManagerChange,
            children: [
              /* @__PURE__ */ jsx(SelectTrigger, { className: "w-48 h-6 text-sm", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Not assigned", children: managerName !== "Not assigned" ? managerName : void 0 }) }),
              /* @__PURE__ */ jsx(SelectContent, { children: filteredProfiles.map((user2) => /* @__PURE__ */ jsx(SelectItem, { value: user2.id, children: user2.full_name || user2.username || "Unnamed User" }, user2.id)) })
            ]
          }
        ) : /* @__PURE__ */ jsx("span", { className: "text-foreground", children: managerName })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
        /* @__PURE__ */ jsx(MapPin, { className: "h-4 w-4 text-muted-foreground" }),
        isAdmin ? /* @__PURE__ */ jsxs(
          Select,
          {
            value: profile.location,
            onValueChange: async (value) => {
              const selectedOption = physicalLocations == null ? void 0 : physicalLocations.find((loc) => loc.name === value);
              if (selectedOption) {
                await handleLocationSelect(value, selectedOption);
              }
            },
            disabled: locationsLoading,
            children: [
              /* @__PURE__ */ jsx(SelectTrigger, { className: "w-48 h-6 text-sm", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: locationsLoading ? "Loading..." : "Not specified" }) }),
              /* @__PURE__ */ jsx(SelectContent, { children: physicalLocations == null ? void 0 : physicalLocations.map((loc) => /* @__PURE__ */ jsx(SelectItem, { value: loc.name, children: loc.name }, loc.id)) })
            ]
          }
        ) : /* @__PURE__ */ jsx("span", { className: "text-foreground", children: profile.location || "Not specified" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
        /* @__PURE__ */ jsx(Globe, { className: "h-4 w-4 text-muted-foreground" }),
        /* @__PURE__ */ jsxs(
          Select,
          {
            value: profile.language || "English",
            onValueChange: async (value) => {
              debug.log("[EditableProfileHeader] Select onValueChange - value:", value);
              try {
                setSavingLanguage(true);
                await handleFieldSave("language", value);
              } finally {
                setSavingLanguage(false);
              }
            },
            disabled: savingLanguage,
            children: [
              /* @__PURE__ */ jsx(SelectTrigger, { className: "w-48 h-6 text-sm", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Select language" }) }),
              /* @__PURE__ */ jsx(SelectContent, { children: languages == null ? void 0 : languages.map((lang) => {
                const langValue = lang.display_name || lang.code;
                const langLabel = lang.native_name || lang.display_name || lang.code;
                debug.log("[EditableProfileHeader] langValue:", langValue, "langLabel:", langLabel);
                return /* @__PURE__ */ jsx(SelectItem, { value: langValue, children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                  lang.flag_emoji && /* @__PURE__ */ jsx("span", { children: lang.flag_emoji }),
                  /* @__PURE__ */ jsx("span", { children: langLabel })
                ] }) }, langValue);
              }) })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 w-full", children: [
        /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsx(Star, { className: "h-3 w-3 fill-current text-yellow-500" }) }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          primaryDepartment && /* @__PURE__ */ jsxs(
            Badge,
            {
              className: "text-white flex items-center gap-1",
              style: { backgroundColor: "#026473" },
              children: [
                /* @__PURE__ */ jsx(Building2, { className: "h-3 w-3" }),
                primaryDepartment.department_name
              ]
            }
          ),
          primaryRole && /* @__PURE__ */ jsxs(
            Badge,
            {
              className: "text-white flex items-center gap-1",
              style: { backgroundColor: "#359D8A" },
              children: [
                /* @__PURE__ */ jsx(Briefcase, { className: "h-3 w-3" }),
                primaryRole.role_name
              ]
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsx(
        ProfileContactInfo,
        {
          startDate: profile.startDate,
          userId: profile.id,
          status: (_c = profile.account) == null ? void 0 : _c.status,
          accessLevel: (_d = profile.account) == null ? void 0 : _d.accessLevel,
          lastLogin: (_e = profile.account) == null ? void 0 : _e.lastLogin,
          passwordLastChanged: (_f = profile.account) == null ? void 0 : _f.passwordLastChanged,
          twoFactorEnabled: (_g = profile.account) == null ? void 0 : _g.twoFactorEnabled
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "flex items-end justify-end gap-2 pt-2 text-sm", children: [
        isCurrentUserProfile && /* @__PURE__ */ jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            size: "sm",
            onClick: () => setIsChangePasswordOpen(true),
            className: "flex items-center justify-center",
            "aria-label": "Change password",
            title: "Change password",
            children: /* @__PURE__ */ jsx(KeyRound, { className: "h-5 w-5" })
          }
        ),
        !isCurrentUserProfile && isAdmin && /* @__PURE__ */ jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            size: "sm",
            onClick: () => setIsResetPasswordOpen(true),
            disabled: isSendingReset,
            className: "flex items-center justify-center",
            "aria-label": "Send password reset",
            title: "Send password reset email",
            children: isSendingReset ? /* @__PURE__ */ jsx(LoaderCircle, { className: "h-5 w-5 animate-spin" }) : /* @__PURE__ */ jsx(KeyRound, { className: "h-5 w-5" })
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        ChangePasswordDialog,
        {
          isOpen: isChangePasswordOpen,
          onClose: () => setIsChangePasswordOpen(false),
          onSuccess: () => setIsChangePasswordOpen(false)
        }
      ),
      /* @__PURE__ */ jsx(AlertDialog, { open: isResetPasswordOpen, onOpenChange: setIsResetPasswordOpen, children: /* @__PURE__ */ jsxs(AlertDialogContent, { children: [
        /* @__PURE__ */ jsxs(AlertDialogHeader, { children: [
          /* @__PURE__ */ jsx(AlertDialogTitle, { children: "Send password reset?" }),
          /* @__PURE__ */ jsxs(AlertDialogDescription, { children: [
            "A password reset link will be emailed to ",
            /* @__PURE__ */ jsx("strong", { children: ((_h = profile.account) == null ? void 0 : _h.username) || profile.username || profile.email || "this user" }),
            ". They will be able to set a new password using that link."
          ] })
        ] }),
        /* @__PURE__ */ jsxs(AlertDialogFooter, { children: [
          /* @__PURE__ */ jsx(AlertDialogCancel, { disabled: isSendingReset, children: "Cancel" }),
          /* @__PURE__ */ jsxs(AlertDialogAction, { onClick: handleSendPasswordReset, disabled: isSendingReset, children: [
            isSendingReset ? /* @__PURE__ */ jsx(LoaderCircle, { className: "h-4 w-4 animate-spin mr-2" }) : null,
            "Send reset email"
          ] })
        ] })
      ] }) })
    ] })
  ] }) }) });
};
const PersonaProfile = () => {
  const { user } = useAuth();
  const { hasAdminAccess } = useUserRole();
  const { profile, loading: profileLoading, refetch: refetchProfile } = useProfile();
  const { hardware, software, certificates, loading: assetsLoading, refetch: refetchAssets } = useUserAssets(user == null ? void 0 : user.id);
  const userEmail = user == null ? void 0 : user.email;
  const [optimisticData, setOptimisticData] = useState(null);
  const personaData = useMemo(() => ({
    id: (profile == null ? void 0 : profile.id) || "",
    full_name: (profile == null ? void 0 : profile.full_name) || "",
    firstName: (profile == null ? void 0 : profile.first_name) || "",
    // Use actual first_name from DB
    lastName: (profile == null ? void 0 : profile.last_name) || "",
    // Use actual last_name from DB
    email: userEmail || "",
    phone: (profile == null ? void 0 : profile.phone) || "Not provided",
    location: (profile == null ? void 0 : profile.location) || "Not specified",
    avatar: (profile == null ? void 0 : profile.avatar_url) || "",
    role: (profile == null ? void 0 : profile.role) || "Employee",
    department: (profile == null ? void 0 : profile.department) || "General",
    manager: (profile == null ? void 0 : profile.manager) || "Not assigned",
    startDate: (profile == null ? void 0 : profile.start_date) || (profile == null ? void 0 : profile.created_at) || "",
    language: (profile == null ? void 0 : profile.language) || "English",
    account: {
      username: (profile == null ? void 0 : profile.username) || "Not set",
      employeeId: (profile == null ? void 0 : profile.employee_id) || "Not assigned",
      status: (profile == null ? void 0 : profile.status) || "Active",
      accessLevel: (profile == null ? void 0 : profile.access_level) || "User",
      lastLogin: (user == null ? void 0 : user.last_sign_in_at) || "",
      passwordLastChanged: (profile == null ? void 0 : profile.password_last_changed) || (profile == null ? void 0 : profile.created_at) || "",
      twoFactorEnabled: (profile == null ? void 0 : profile.two_factor_enabled) || false
    },
    hardware: (hardware || []).map((h) => ({
      id: h.id,
      type: h.type,
      model: h.model,
      serialNumber: h.serial_number,
      status: h.status,
      assignedDate: h.assigned_date,
      manufacturer: h.manufacturer || "",
      osEdition: h.os_edition || "",
      osVersion: h.os_version || ""
    })),
    software: (software || []).map((s) => ({
      id: s.id,
      name: s.name,
      role_account_type: s.role_account_type,
      expiryDate: s.expiryDate,
      lastUsed: s.lastUsed
    })),
    certificates: (certificates || []).map((c) => ({
      id: c.id,
      name: c.name,
      issuedBy: c.issued_by,
      dateAcquired: c.date_acquired,
      expiryDate: c.expiry_date,
      credentialId: c.credential_id,
      status: c.status,
      org_cert: c.org_cert !== void 0 ? c.org_cert : false,
      type: c.type,
      certificate_url: c.certificate_url
    }))
  }), [profile, hardware, software, certificates, userEmail, user]);
  const handleProfileUpdate = async () => {
    setOptimisticData(null);
    await refetchProfile();
    refetchAssets();
  };
  if (profileLoading || assetsLoading) {
    return /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center min-h-screen", children: /* @__PURE__ */ jsx(LoaderCircle, { className: "h-8 w-8 animate-spin" }) });
  }
  if (!profile) {
    return /* @__PURE__ */ jsx("div", { className: "text-center py-8", children: /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "No profile found. Please update your profile information." }) });
  }
  const handleOptimisticUpdate = (field, value) => {
    debug.log("PersonaProfile handleOptimisticUpdate - field:", field, "value:", value);
    setOptimisticData((prev) => {
      const baseData = prev || personaData;
      const updated = { ...baseData };
      if (field === "avatar_url") {
        updated.avatar = value;
      } else if (field === "language") {
        debug.log("PersonaProfile - setting language to:", value);
        updated.language = value;
      } else if (field in updated) {
        updated[field] = value;
      } else if (updated.account && field in updated.account) {
        updated.account = { ...updated.account, [field]: value };
      }
      debug.log("PersonaProfile - updated optimisticData language:", updated.language);
      return updated;
    });
  };
  const displayData = optimisticData || personaData;
  debug.log("PersonaProfile render - displayData.language:", displayData.language);
  debug.log("PersonaProfile render - personaData.language:", personaData.language);
  debug.log("PersonaProfile render - optimisticData?.language:", optimisticData == null ? void 0 : optimisticData.language);
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    !hasAdminAccess && /* @__PURE__ */ jsx("div", { className: "flex justify-between items-center", children: /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold", children: "My Profile" }) }),
    /* @__PURE__ */ jsx(EditableProfileHeader, { profile: displayData, onProfileUpdate: refetchProfile, onOptimisticUpdate: handleOptimisticUpdate }),
    /* @__PURE__ */ jsx(PersonaDetailsTabs, { profile: displayData, userId: (user == null ? void 0 : user.id) || "", onUpdate: handleProfileUpdate })
  ] });
};
const UserDetailView = () => {
  var _a;
  const { userId } = useParams();
  const navigate = useNavigate();
  const { supabaseClient, basePath } = useOrganisationContext();
  const { hasAdminAccess } = useUserRole();
  const { toast: toast2 } = useToast();
  const [showResetMfaConfirm, setShowResetMfaConfirm] = useState(false);
  const [resettingMfa, setResettingMfa] = useState(false);
  const { profiles, loading: profilesLoading } = useUserProfiles();
  const { hardware, software, certificates, loading: assetsLoading } = useUserAssets(userId);
  const { data: lastSignIn } = useQuery({
    queryKey: ["user-last-sign-in", userId],
    queryFn: async () => {
      if (!userId) return null;
      const { data, error } = await supabaseClient.rpc("get_user_last_sign_in", { target_user_id: userId });
      if (error) return null;
      return data;
    },
    enabled: !!userId
  });
  const buildPersonaData = (profileObj) => ({
    id: profileObj.id,
    full_name: profileObj.full_name || "",
    // Add this line
    firstName: profileObj.first_name || "",
    // Use actual first_name from DB
    lastName: profileObj.last_name || "",
    // Use actual last_name from DB
    email: profileObj.email || "",
    phone: profileObj.phone || "Not provided",
    location: profileObj.location || "Not specified",
    avatar: profileObj.avatar_url || "",
    role: profileObj.role || "Employee",
    department: profileObj.department || "General",
    manager: profileObj.manager || "Not assigned",
    startDate: profileObj.start_date || profileObj.created_at,
    language: profileObj.language || "English",
    cyber_learner: profileObj.cyber_learner || false,
    account: {
      username: profileObj.username || "Not set",
      employeeId: profileObj.employee_id || "Not assigned",
      status: profileObj.status || "Active",
      accessLevel: profileObj.access_level || "User",
      lastLogin: lastSignIn || profileObj.last_login || "",
      passwordLastChanged: profileObj.password_last_changed || profileObj.created_at,
      twoFactorEnabled: profileObj.two_factor_enabled || false
    },
    hardware: hardware.map((h) => ({
      id: h.id,
      type: h.type,
      model: h.model,
      serialNumber: h.serial_number,
      status: h.status,
      assignedDate: h.assigned_date,
      manufacturer: h.manufacturer || "",
      osEdition: h.os_edition || "",
      osVersion: h.os_version || ""
    })),
    software: software.map((s) => ({
      name: s.name,
      role_account_type: s.role_account_type,
      expiryDate: s.expiryDate,
      lastUsed: s.lastUsed
    })),
    certificates: certificates.map((c) => ({
      id: c.id,
      type: c.type || "Certificate",
      name: c.name,
      issuedBy: c.issued_by,
      dateAcquired: c.date_acquired,
      expiryDate: c.expiry_date,
      credentialId: c.credential_id,
      status: c.status,
      org_cert: c.org_cert,
      certificate_url: c.certificate_url
    }))
  });
  const [personaData, setPersonaData] = React.useState(null);
  React.useEffect(() => {
    const userProfile2 = profiles.find((p) => p.id === userId);
    if (userProfile2) {
      setPersonaData(buildPersonaData(userProfile2));
    }
  }, [profiles, userId, hardware, software, certificates, lastSignIn]);
  const handleOptimisticUpdate = (field, value) => {
    setPersonaData((prev) => {
      const updated = { ...prev };
      if (field === "language") {
        updated.language = value;
      } else if (field in updated) {
        updated[field] = value;
      } else if (updated.account && field in updated.account) {
        updated.account = { ...updated.account, [field]: value };
      }
      return updated;
    });
  };
  const handleProfileUpdate = () => {
  };
  const handleBackToUsers = () => {
    navigate(`${basePath || ""}/admin`, { state: { activeTab: "organisation" } });
  };
  const handleResetMfa = async () => {
    var _a2, _b, _c;
    if (!userId) return;
    setResettingMfa(true);
    setShowResetMfaConfirm(false);
    try {
      const { data: { session } } = await supabaseClient.auth.getSession();
      const res = await supabaseClient.functions.invoke("reset-user-mfa", {
        body: { userId },
        headers: (session == null ? void 0 : session.access_token) ? { Authorization: `Bearer ${session.access_token}` } : void 0
      });
      if (res.error || !((_a2 = res.data) == null ? void 0 : _a2.success)) {
        throw new Error(((_b = res.data) == null ? void 0 : _b.error) ?? ((_c = res.error) == null ? void 0 : _c.message) ?? "Unknown error");
      }
      setPersonaData(
        (prev) => prev ? { ...prev, account: { ...prev.account, twoFactorEnabled: false } } : prev
      );
      toast2({ title: "MFA reset", description: "The user will be able to log in without MFA on their next login." });
    } catch (err) {
      console.error("Reset MFA error:", err);
      toast2({ title: "Failed to reset MFA", description: err == null ? void 0 : err.message, variant: "destructive" });
    }
    setResettingMfa(false);
  };
  if (profilesLoading || assetsLoading) {
    return /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center min-h-screen", children: /* @__PURE__ */ jsx(LoaderCircle, { className: "h-8 w-8 animate-spin" }) });
  }
  const userProfile = profiles.find((p) => p.id === userId);
  if (!userProfile) {
    return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center min-h-screen gap-4", children: [
      /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "User not found" }),
      /* @__PURE__ */ jsxs(Button, { onClick: () => navigate(`${basePath || ""}/admin`), variant: "outline", children: [
        /* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4 mr-2" }),
        "Back to Admin"
      ] })
    ] });
  }
  if (!personaData) {
    return /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center min-h-screen", children: /* @__PURE__ */ jsx(LoaderCircle, { className: "h-8 w-8 animate-spin" }) });
  }
  return /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto py-6 px-4 space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsx(Button, { onClick: handleBackToUsers, variant: "outline", size: "icon", children: /* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4" }) }),
        /* @__PURE__ */ jsxs("h1", { className: "text-2xl font-bold", children: [
          "User Profile: ",
          userProfile.full_name || "Unnamed User"
        ] })
      ] }),
      hasAdminAccess && ((_a = personaData.account) == null ? void 0 : _a.twoFactorEnabled) && /* @__PURE__ */ jsxs(
        Button,
        {
          variant: "outline",
          size: "sm",
          onClick: () => setShowResetMfaConfirm(true),
          disabled: resettingMfa,
          className: "flex items-center gap-2 text-destructive border-destructive hover:bg-destructive/10",
          children: [
            resettingMfa ? /* @__PURE__ */ jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsx(ShieldOff, { className: "h-4 w-4" }),
            "Reset MFA"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsx(
      EditableProfileHeader,
      {
        profile: personaData,
        onProfileUpdate: handleProfileUpdate,
        onOptimisticUpdate: handleOptimisticUpdate
      }
    ),
    /* @__PURE__ */ jsx(PersonaDetailsTabs, { profile: personaData, userId }),
    /* @__PURE__ */ jsx(AlertDialog, { open: showResetMfaConfirm, onOpenChange: setShowResetMfaConfirm, children: /* @__PURE__ */ jsxs(AlertDialogContent, { children: [
      /* @__PURE__ */ jsxs(AlertDialogHeader, { children: [
        /* @__PURE__ */ jsxs(AlertDialogTitle, { children: [
          "Reset MFA for ",
          userProfile.full_name || "this user",
          "?"
        ] }),
        /* @__PURE__ */ jsx(AlertDialogDescription, { children: "This will remove their enrolled authenticator. They will be able to log in without MFA on their next login and will need to re-enrol if MFA is required for their account." })
      ] }),
      /* @__PURE__ */ jsxs(AlertDialogFooter, { children: [
        /* @__PURE__ */ jsx(AlertDialogCancel, { children: "Cancel" }),
        /* @__PURE__ */ jsx(AlertDialogAction, { onClick: handleResetMfa, children: "Reset MFA" })
      ] })
    ] }) })
  ] });
};
const Certificates = ({ profile }) => {
  const { certificates } = profile;
  const { supabaseClient } = useOrganisationContext();
  const printRef = useRef(null);
  const [downloadingId, setDownloadingId] = useState(null);
  const handlePrint = useReactToPrint({ contentRef: printRef });
  const handleDownload = async (certId) => {
    var _a;
    if (!certId) {
      toast$2.error("Certificate ID is missing");
      return;
    }
    setDownloadingId(certId);
    try {
      const { data: sessionData } = await supabaseClient.auth.getSession();
      const jwt = (_a = sessionData == null ? void 0 : sessionData.session) == null ? void 0 : _a.access_token;
      if (!jwt) {
        toast$2.error("Not authenticated");
        return;
      }
      const { data, error } = await supabaseClient.functions.invoke("get-certificate-url", {
        body: { certificate_id: certId },
        headers: { Authorization: `Bearer ${jwt}` }
      });
      if (error || !(data == null ? void 0 : data.url)) {
        console.error("[Certificates] get-certificate-url error:", error);
        toast$2.error("Failed to get download link");
        return;
      }
      window.open(data.url, "_blank");
    } catch (err) {
      console.error("[Certificates] download error:", err);
      toast$2.error("Failed to download certificate");
    } finally {
      setDownloadingId(null);
    }
  };
  const formatDate = (dateString) => {
    if (!dateString) return "No expiry";
    return new Date(dateString).toLocaleDateString();
  };
  const getStatusColor = (status) => {
    switch (status) {
      case "Valid":
        return "bg-green-500";
      case "Expired":
        return "bg-red-500";
      case "Pending":
        return "bg-yellow-500";
      default:
        return "bg-blue-500";
    }
  };
  const getTypeIcon = (type) => {
    return type === "Document" ? /* @__PURE__ */ jsx(FileText, { className: "h-5 w-5 text-primary flex-shrink-0" }) : /* @__PURE__ */ jsx(Award, { className: "h-5 w-5 text-primary flex-shrink-0" });
  };
  const getTypeColor = (type) => {
    return type === "Document" ? "bg-blue-500" : "bg-purple-500";
  };
  const filteredCertificates = certificates.filter(
    (cert) => cert.org_cert === false
  );
  return /* @__PURE__ */ jsx("div", { className: "space-y-4 animate-fade-in", children: filteredCertificates.length === 0 ? /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-center py-8", children: "No certificates yet" }) : /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxs(Button, { variant: "outline", size: "sm", onClick: () => handlePrint(), children: [
      /* @__PURE__ */ jsx(Printer, { className: "h-4 w-4 mr-2" }),
      "Print All"
    ] }) }),
    /* @__PURE__ */ jsx("div", { ref: printRef, className: "space-y-4", children: filteredCertificates.map((cert, index) => /* @__PURE__ */ jsxs("div", { className: "border rounded-lg p-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-3 mb-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 min-w-0 flex-1", children: [
          getTypeIcon(cert.type),
          /* @__PURE__ */ jsx("h3", { className: "font-semibold text-lg truncate", children: cert.name })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsx(Building, { className: "h-4 w-4 text-muted-foreground" }),
            /* @__PURE__ */ jsx("span", { className: "text-base font-medium text-foreground", children: cert.issuedBy })
          ] }),
          cert.credentialId && /* @__PURE__ */ jsxs("span", { className: "text-base font-medium text-muted-foreground", children: [
            "ID: ",
            cert.credentialId
          ] }),
          /* @__PURE__ */ jsx(Badge, { className: `${getTypeColor(cert.type)} text-white text-sm px-2 py-1 flex-shrink-0`, children: cert.type || "Certificate" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 gap-4 text-sm ml-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(Calendar, { className: "h-4 w-4 text-muted-foreground" }),
          /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "Issued:" }),
          /* @__PURE__ */ jsx("span", { className: "font-medium", children: formatDate(cert.dateAcquired) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(Calendar, { className: "h-4 w-4 text-muted-foreground" }),
          /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "Expires:" }),
          /* @__PURE__ */ jsx("span", { className: "font-medium", children: formatDate(cert.expiryDate) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-2", children: [
          /* @__PURE__ */ jsx(Badge, { className: `${getStatusColor(cert.status)} text-white`, children: cert.status }),
          cert.certificate_url && cert.id && /* @__PURE__ */ jsx(
            Button,
            {
              variant: "outline",
              size: "sm",
              disabled: downloadingId === cert.id,
              onClick: () => handleDownload(cert.id),
              className: "print:hidden",
              children: downloadingId === cert.id ? /* @__PURE__ */ jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsx(Download, { className: "h-4 w-4" })
            }
          )
        ] })
      ] })
    ] }, index)) })
  ] }) });
};
const AddPhysicalLocationDialog = ({
  isOpen,
  onOpenChange,
  prefilledUser,
  onSuccess
}) => {
  const [loading, setLoading] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState("");
  const { profiles } = useUserProfiles();
  const [formData, setFormData] = useState({
    full_name: (prefilledUser == null ? void 0 : prefilledUser.full_name) || "",
    email: (prefilledUser == null ? void 0 : prefilledUser.email) || "",
    department: (prefilledUser == null ? void 0 : prefilledUser.department) || "",
    role_account_type: (prefilledUser == null ? void 0 : prefilledUser.role) || "",
    location: "",
    access_purpose: "",
    date_access_created: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
    date_access_revoked: "",
    status: "Active"
  });
  const handleUserSelection = (userId) => {
    setSelectedUserId(userId);
    if (userId === "none") {
      setFormData((prev) => ({
        ...prev,
        full_name: "",
        email: "",
        department: "",
        role_account_type: ""
      }));
    } else {
      const selectedUser = profiles.find((profile) => profile.id === userId);
      if (selectedUser) {
        setFormData((prev) => ({
          ...prev,
          full_name: selectedUser.full_name || "",
          email: selectedUser.email || "",
          department: selectedUser.department || "",
          role_account_type: selectedUser.role || ""
        }));
      }
    }
  };
  const resetForm = () => {
    setSelectedUserId("");
    setFormData({
      full_name: (prefilledUser == null ? void 0 : prefilledUser.full_name) || "",
      email: (prefilledUser == null ? void 0 : prefilledUser.email) || "",
      department: (prefilledUser == null ? void 0 : prefilledUser.department) || "",
      role_account_type: (prefilledUser == null ? void 0 : prefilledUser.role) || "",
      location: "",
      access_purpose: "",
      date_access_created: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      date_access_revoked: "",
      status: "Active"
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!formData.location || !formData.access_purpose) {
        throw new Error("Location and Access Purpose are required");
      }
      const insertData = {
        full_name: formData.full_name || "Unassigned",
        user_id: "ae5c8c73-e0c3-4a86-9c0d-123456789abc",
        // Placeholder user ID - should be dynamic
        location_id: formData.location,
        // Assuming this is already a UUID
        access_purpose: formData.access_purpose,
        date_access_created: formData.date_access_created,
        date_access_revoked: formData.date_access_revoked || null,
        status: formData.status
      };
      const { error } = await supabase.from("physical_location_access").insert([insertData]);
      if (error) throw error;
      toast({
        title: "Physical location access added",
        description: formData.full_name === "Unassigned" ? "Location access record created without user assignment." : "Physical location access has been successfully added."
      });
      onOpenChange(false);
      resetForm();
      onSuccess == null ? void 0 : onSuccess();
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsx(Dialog, { open: isOpen, onOpenChange, children: /* @__PURE__ */ jsxs(DialogContent, { className: "max-w-2xl max-h-[80vh] overflow-y-auto", children: [
    /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(DialogTitle, { children: "Add Physical Location Access" }) }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
        !prefilledUser && /* @__PURE__ */ jsxs("div", { className: "col-span-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "user_select", children: "Assign to User (Optional)" }),
          /* @__PURE__ */ jsxs(Select, { value: selectedUserId, onValueChange: handleUserSelection, children: [
            /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Select a user or create without assignment" }) }),
            /* @__PURE__ */ jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsx(SelectItem, { value: "none", children: "Create without user assignment" }),
              profiles.map((profile) => /* @__PURE__ */ jsxs(SelectItem, { value: profile.id, children: [
                profile.full_name || "No name",
                " (",
                profile.email || profile.username || "No email",
                ")"
              ] }, profile.id))
            ] })
          ] })
        ] }),
        selectedUserId && selectedUserId !== "none" && /* @__PURE__ */ jsxs("div", { className: "col-span-2 p-3 bg-gray-50 rounded-lg", children: [
          /* @__PURE__ */ jsx("h4", { className: "font-medium mb-2", children: "Selected User Details:" }),
          /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Name:" }),
            " ",
            formData.full_name
          ] }),
          /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Email:" }),
            " ",
            formData.email
          ] }),
          /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Department:" }),
            " ",
            formData.department || "Not specified"
          ] }),
          /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Role:" }),
            " ",
            formData.role_account_type || "Not specified"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "full_name", children: "Full Name" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "full_name",
              value: formData.full_name,
              onChange: (e) => setFormData({ ...formData, full_name: e.target.value }),
              placeholder: "Leave empty for unassigned",
              disabled: !!prefilledUser || selectedUserId && selectedUserId !== "none"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "email", children: "Email" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "email",
              value: formData.email,
              onChange: (e) => setFormData({ ...formData, email: e.target.value }),
              placeholder: "Leave empty for unassigned",
              disabled: !!prefilledUser || selectedUserId && selectedUserId !== "none"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "department", children: "Department" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "department",
              value: formData.department,
              onChange: (e) => setFormData({ ...formData, department: e.target.value }),
              disabled: !!prefilledUser || selectedUserId && selectedUserId !== "none"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "role_account_type", children: "Role/Account Type" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "role_account_type",
              value: formData.role_account_type,
              onChange: (e) => setFormData({ ...formData, role_account_type: e.target.value }),
              disabled: !!prefilledUser || selectedUserId && selectedUserId !== "none"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "location", children: "Location *" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "location",
              value: formData.location,
              onChange: (e) => setFormData({ ...formData, location: e.target.value }),
              placeholder: "e.g., Building A - Floor 3, Server Room",
              required: true
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "access_purpose", children: "Access Purpose *" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "access_purpose",
              value: formData.access_purpose,
              onChange: (e) => setFormData({ ...formData, access_purpose: e.target.value }),
              placeholder: "e.g., Maintenance, Security, Operations",
              required: true
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "date_access_created", children: "Date Access Created *" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "date_access_created",
              type: "date",
              value: formData.date_access_created,
              onChange: (e) => setFormData({ ...formData, date_access_created: e.target.value }),
              required: true
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "date_access_revoked", children: "Date Access Revoked" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "date_access_revoked",
              type: "date",
              value: formData.date_access_revoked,
              onChange: (e) => setFormData({ ...formData, date_access_revoked: e.target.value })
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "col-span-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "status", children: "Status" }),
          /* @__PURE__ */ jsxs(Select, { value: formData.status, onValueChange: (value) => setFormData({ ...formData, status: value }), children: [
            /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsx(SelectItem, { value: "Active", children: "Active" }),
              /* @__PURE__ */ jsx(SelectItem, { value: "Inactive", children: "Inactive" }),
              /* @__PURE__ */ jsx(SelectItem, { value: "Revoked", children: "Revoked" })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-2 justify-end", children: [
        /* @__PURE__ */ jsx(Button, { type: "button", variant: "outline", onClick: () => onOpenChange(false), size: "icon", children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }) }),
        /* @__PURE__ */ jsx(Button, { type: "submit", disabled: loading, size: "icon", children: loading ? /* @__PURE__ */ jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsx(Plus, { className: "h-4 w-4" }) })
      ] })
    ] })
  ] }) });
};
const ProfileBasicInfo = ({
  firstName,
  lastName,
  manager,
  phone,
  location,
  locationId,
  username,
  employeeId,
  editingField,
  onEdit,
  onSave,
  onCancel,
  saving,
  profiles,
  currentUserId,
  userId
}) => {
  debug.log("ProfileBasicInfo rendering with userId:", userId, "currentUserId:", currentUserId);
  const { userDepartments } = useUserDepartments(userId);
  const { primaryRole } = useUserProfileRoles(userId);
  const { data: physicalLocations, isLoading: locationsLoading } = useUserPhysicalLocations(userId);
  const primaryDepartment = userDepartments.find((dept) => dept.is_primary);
  const handleNameSave = async (fieldKey, value) => {
    await onSave("full_name", value);
  };
  const [managerValue, setManagerValue] = React.useState(manager);
  React.useEffect(() => {
    setManagerValue(manager);
  }, [manager, editingField]);
  const handleManagerChange = async (userId2) => {
    setManagerValue(userId2);
    await onSave("manager", userId2);
  };
  const handleLocationSelect = async (locationName, selectedOption) => {
    if (selectedOption == null ? void 0 : selectedOption.id) {
      await onSave("location", locationName);
    } else {
      await onSave("location", locationName);
    }
  };
  const filteredProfiles = profiles.filter((user) => user.id !== currentUserId);
  const managerProfile = profiles.find((u) => u.id === manager);
  const managerName = managerProfile ? managerProfile.full_name || managerProfile.username : "Not assigned";
  return /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
    /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2 mb-4", children: /* @__PURE__ */ jsx(
      EditableField,
      {
        value: `${firstName} ${lastName}`,
        fieldKey: "full_name",
        onSave: handleNameSave,
        isEditing: editingField === "full_name",
        onEdit,
        onCancel,
        saving,
        className: "flex-1",
        inputClassName: "text-2xl font-bold h-10"
      }
    ) }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 lg:gap-12 w-full", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-2 w-full", children: [
        username && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
          /* @__PURE__ */ jsx(User, { className: "h-4 w-4 text-muted-foreground" }),
          /* @__PURE__ */ jsx("span", { className: "text-foreground", children: username })
        ] }),
        employeeId && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
          /* @__PURE__ */ jsx(Hash, { className: "h-4 w-4 text-muted-foreground" }),
          /* @__PURE__ */ jsx("span", { className: "text-foreground", children: employeeId })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
          /* @__PURE__ */ jsx(Phone, { className: "h-4 w-4 text-muted-foreground" }),
          /* @__PURE__ */ jsx(
            EditableField,
            {
              value: phone || "Not provided",
              fieldKey: "phone",
              placeholder: "Phone number",
              onSave,
              isEditing: editingField === "phone",
              onEdit,
              onCancel,
              saving,
              inputClassName: "h-6 text-sm"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2 w-full", children: [
        editingField === "manager" ? /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx("span", { className: "text-sm text-muted-foreground", children: "Reports to:" }),
          /* @__PURE__ */ jsxs(
            Select,
            {
              value: managerValue,
              onValueChange: handleManagerChange,
              children: [
                /* @__PURE__ */ jsx(SelectTrigger, { className: "w-full", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Select manager" }) }),
                /* @__PURE__ */ jsx(SelectContent, { children: filteredProfiles.map((user) => /* @__PURE__ */ jsx(SelectItem, { value: user.id, children: user.full_name || user.username || "Unnamed User" }, user.id)) })
              ]
            }
          )
        ] }) : /* @__PURE__ */ jsx(
          EditableField,
          {
            value: managerName,
            fieldKey: "manager",
            label: "Reports to:",
            onSave,
            isEditing: editingField === "manager",
            onEdit,
            onCancel,
            saving,
            inputClassName: "text-sm h-6"
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
          /* @__PURE__ */ jsx(MapPin, { className: "h-4 w-4 text-muted-foreground" }),
          /* @__PURE__ */ jsx(
            EditableField,
            {
              value: location || "Not specified",
              fieldKey: "location",
              placeholder: "Select location",
              onSave,
              onSelectChange: handleLocationSelect,
              isEditing: editingField === "location",
              onEdit,
              onCancel,
              saving,
              type: "select",
              asyncOptions: physicalLocations,
              isLoading: locationsLoading,
              inputClassName: "h-6 text-sm w-48",
              locationId
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
          /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "System Role:" }),
          /* @__PURE__ */ jsx(UserRoleField, { userId })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 w-full", children: [
          primaryDepartment && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsx(Star, { className: "h-3 w-3 fill-current text-yellow-500" }),
            /* @__PURE__ */ jsx(Badge, { variant: "default", children: primaryDepartment.department_name })
          ] }),
          primaryRole && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsx(Star, { className: "h-3 w-3 fill-current text-yellow-500" }),
            /* @__PURE__ */ jsx(Badge, { variant: "default", children: primaryRole.role_name })
          ] })
        ] })
      ] })
    ] })
  ] });
};
const MultipleRolesField = ({
  userId,
  departmentValue,
  isEditing
}) => {
  const [isAddingRole, setIsAddingRole] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const queryClient = useQueryClient();
  const { data: userRoles, isLoading: rolesLoading } = useQuery({
    queryKey: ["user-roles", userId],
    queryFn: async () => {
      const { data, error } = await supabase.from("user_profile_roles").select(`
          *,
          roles (
            name
          )
        `).eq("user_id", userId).order("is_primary", { ascending: false }).order("roles.name");
      if (error) throw error;
      const transformedData = (data || []).map((item) => {
        var _a;
        return {
          id: item.id,
          user_id: item.user_id,
          role_id: item.role_id,
          role_name: ((_a = item.roles) == null ? void 0 : _a.name) || "",
          is_primary: item.is_primary,
          assigned_at: item.assigned_at,
          assigned_by: item.assigned_by,
          pairing_id: item.pairing_id
        };
      });
      return transformedData;
    },
    enabled: !!userId
  });
  const { data: availableRoles } = useQuery({
    queryKey: ["available-roles", departmentValue],
    queryFn: async () => {
      let query = supabase.from("roles").select("role_id, name, department_id, departments(name)").eq("is_active", true);
      if (departmentValue && departmentValue !== "") {
        const { data: department } = await supabase.from("departments").select("id").eq("name", departmentValue).maybeSingle();
        if (department) {
          query = query.or(`department_id.eq.${department.id},department_id.is.null`);
        } else {
          query = query.is("department_id", null);
        }
      }
      const { data, error } = await query.order("name");
      if (error) throw error;
      return data;
    }
  });
  const addRoleMutation = useMutation({
    mutationFn: async ({ roleId, isPrimary }) => {
      const { error } = await supabase.from("user_profile_roles").insert({
        user_id: userId,
        role_id: roleId,
        is_primary: isPrimary,
        assigned_by: userId
        // In a real app, this would be the current admin user
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-roles", userId] });
      setSelectedRole("");
      setIsAddingRole(false);
      toast({
        title: "Role added",
        description: "The role has been successfully added."
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to add role",
        variant: "destructive"
      });
    }
  });
  const removeRoleMutation = useMutation({
    mutationFn: async (roleId) => {
      const { error } = await supabase.from("user_profile_roles").delete().eq("id", roleId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-roles", userId] });
      toast({
        title: "Role removed",
        description: "The role has been successfully removed."
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to remove role",
        variant: "destructive"
      });
    }
  });
  const setPrimaryRoleMutation = useMutation({
    mutationFn: async (roleId) => {
      await supabase.from("user_profile_roles").update({ is_primary: false }).eq("user_id", userId);
      const { error } = await supabase.from("user_profile_roles").update({ is_primary: true }).eq("id", roleId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-roles", userId] });
      toast({
        title: "Primary role updated",
        description: "The primary role has been updated."
      });
    }
  });
  const handleAddRole = () => {
    if (!selectedRole) return;
    const isPrimary = !userRoles || userRoles.length === 0;
    addRoleMutation.mutate({ roleId: selectedRole, isPrimary });
  };
  const handleRemoveRole = (roleId) => {
    removeRoleMutation.mutate(roleId);
  };
  const handleSetPrimary = (roleId) => {
    setPrimaryRoleMutation.mutate(roleId);
  };
  if (rolesLoading) {
    return /* @__PURE__ */ jsx("div", { className: "text-sm text-muted-foreground", children: "Loading roles..." });
  }
  return /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
      userRoles == null ? void 0 : userRoles.map((userRole) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
        /* @__PURE__ */ jsxs(
          Badge,
          {
            variant: userRole.is_primary ? "default" : "secondary",
            className: "flex items-center gap-1",
            children: [
              userRole.role_name,
              userRole.is_primary && /* @__PURE__ */ jsx("span", { className: "text-xs font-normal", children: "(Primary)" }),
              isEditing && /* @__PURE__ */ jsx(
                Button,
                {
                  size: "sm",
                  variant: "ghost",
                  onClick: () => handleRemoveRole(userRole.id),
                  className: "h-4 w-4 p-0 ml-1 hover:bg-destructive hover:text-destructive-foreground",
                  children: /* @__PURE__ */ jsx(X, { className: "h-3 w-3" })
                }
              )
            ]
          }
        ),
        isEditing && !userRole.is_primary && userRoles.length > 1 && /* @__PURE__ */ jsx(
          Button,
          {
            size: "sm",
            variant: "outline",
            onClick: () => handleSetPrimary(userRole.id),
            className: "h-6 px-2 text-xs",
            children: "Set Primary"
          }
        )
      ] }, userRole.id)),
      isEditing && /* @__PURE__ */ jsx(
        Button,
        {
          size: "sm",
          variant: "outline",
          onClick: () => setIsAddingRole(true),
          className: "h-6 w-6 p-0",
          children: /* @__PURE__ */ jsx(Plus, { className: "h-3 w-3" })
        }
      )
    ] }),
    /* @__PURE__ */ jsx(Dialog, { open: isAddingRole, onOpenChange: setIsAddingRole, children: /* @__PURE__ */ jsxs(DialogContent, { className: "sm:max-w-md", children: [
      /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(DialogTitle, { children: "Add Role" }) }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxs(Select, { value: selectedRole, onValueChange: setSelectedRole, children: [
          /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Select a role" }) }),
          /* @__PURE__ */ jsx(SelectContent, { children: availableRoles == null ? void 0 : availableRoles.filter(
            (role) => !(userRoles == null ? void 0 : userRoles.some((userRole) => userRole.role_id === role.role_id))
          ).map((role) => /* @__PURE__ */ jsx(SelectItem, { value: role.role_id, children: role.name }, role.role_id)) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-2", children: [
          /* @__PURE__ */ jsx(Button, { variant: "outline", size: "icon", onClick: () => setIsAddingRole(false), children: /* @__PURE__ */ jsx(X, { className: "w-4 h-4" }) }),
          /* @__PURE__ */ jsx(
            Button,
            {
              size: "icon",
              onClick: handleAddRole,
              disabled: !selectedRole || addRoleMutation.isPending,
              children: /* @__PURE__ */ jsx(Save, { className: "w-4 h-4" })
            }
          )
        ] })
      ] })
    ] }) })
  ] });
};
const ImportErrorReport = ({
  errors,
  warnings = [],
  successCount,
  totalCount,
  isOpen,
  onClose,
  importType
}) => {
  const downloadErrorReport = () => {
    const headers = ["Row Number", "Identifier", "Field", "Type", "Message"];
    const allIssues = [
      ...errors.map((err) => [err.rowNumber, err.identifier, err.field || "N/A", "Error", err.error]),
      ...warnings.map((warn) => [warn.rowNumber, warn.identifier, warn.field || "N/A", "Warning", warn.error])
    ];
    const csvContent = [headers, ...allIssues].map((row) => row.map((field) => `"${field}"`).join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `import_report_${(/* @__PURE__ */ new Date()).toISOString()}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const errorRate = totalCount > 0 ? (errors.length / totalCount * 100).toFixed(1) : "0";
  return /* @__PURE__ */ jsx(Dialog, { open: isOpen, onOpenChange: onClose, children: /* @__PURE__ */ jsxs(DialogContent, { className: "max-w-4xl max-h-[90vh]", children: [
    /* @__PURE__ */ jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsxs(DialogTitle, { className: "flex items-center gap-2", children: [
        errors.length > 0 ? /* @__PURE__ */ jsx(CircleAlert, { className: "h-5 w-5 text-destructive" }) : warnings.length > 0 ? /* @__PURE__ */ jsx(TriangleAlert, { className: "h-5 w-5 text-yellow-600" }) : /* @__PURE__ */ jsx(CircleAlert, { className: "h-5 w-5 text-destructive" }),
        "Import Report: ",
        importType
      ] }),
      /* @__PURE__ */ jsx(DialogDescription, { children: "Review the import results and download detailed error and warning information" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-4 overflow-y-auto", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-4 gap-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "p-4 bg-green-50 border border-green-200 rounded-lg", children: [
          /* @__PURE__ */ jsx("div", { className: "text-2xl font-bold text-green-700", children: successCount }),
          /* @__PURE__ */ jsx("div", { className: "text-sm text-green-600", children: "Successful" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-4 bg-red-50 border border-red-200 rounded-lg", children: [
          /* @__PURE__ */ jsx("div", { className: "text-2xl font-bold text-red-700", children: errors.length }),
          /* @__PURE__ */ jsx("div", { className: "text-sm text-red-600", children: "Failed" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-4 bg-yellow-50 border border-yellow-200 rounded-lg", children: [
          /* @__PURE__ */ jsx("div", { className: "text-2xl font-bold text-yellow-700", children: warnings.length }),
          /* @__PURE__ */ jsx("div", { className: "text-sm text-yellow-600", children: "Warnings" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-4 bg-blue-50 border border-blue-200 rounded-lg", children: [
          /* @__PURE__ */ jsxs("div", { className: "text-2xl font-bold text-blue-700", children: [
            errorRate,
            "%"
          ] }),
          /* @__PURE__ */ jsx("div", { className: "text-sm text-blue-600", children: "Error Rate" })
        ] })
      ] }),
      (errors.length > 0 || warnings.length > 0) && /* @__PURE__ */ jsx("div", { className: "flex gap-2", children: /* @__PURE__ */ jsx(Button, { onClick: downloadErrorReport, variant: "outline", size: "icon", children: /* @__PURE__ */ jsx(Download, { className: "h-4 w-4" }) }) }),
      errors.length > 0 || warnings.length > 0 ? /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxs("h4", { className: "font-semibold text-sm", children: [
          "Issues (",
          errors.length + warnings.length,
          ")"
        ] }),
        /* @__PURE__ */ jsx(ScrollArea, { className: "h-[400px] border rounded-lg p-4", children: /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
          errors.map((error, index) => /* @__PURE__ */ jsxs(
            Alert,
            {
              variant: "destructive",
              className: "relative",
              children: [
                /* @__PURE__ */ jsx(CircleAlert, { className: "h-4 w-4" }),
                /* @__PURE__ */ jsx(AlertDescription, { children: /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                    /* @__PURE__ */ jsx(Badge, { variant: "destructive", className: "text-xs", children: "Error" }),
                    /* @__PURE__ */ jsxs(Badge, { variant: "outline", className: "text-xs", children: [
                      "Row ",
                      error.rowNumber
                    ] }),
                    /* @__PURE__ */ jsx("span", { className: "font-semibold text-sm", children: error.identifier }),
                    error.field && /* @__PURE__ */ jsxs(Badge, { variant: "secondary", className: "text-xs", children: [
                      "Field: ",
                      error.field
                    ] })
                  ] }),
                  /* @__PURE__ */ jsx("p", { className: "text-sm mt-1 text-destructive", children: error.error }),
                  error.rawData && /* @__PURE__ */ jsxs("details", { className: "mt-2", children: [
                    /* @__PURE__ */ jsx("summary", { className: "text-xs cursor-pointer hover:underline", children: "View raw data" }),
                    /* @__PURE__ */ jsx("pre", { className: "mt-1 text-xs bg-muted p-2 rounded overflow-x-auto", children: JSON.stringify(error.rawData, null, 2) })
                  ] })
                ] }) })
              ]
            },
            `error-${index}`
          )),
          warnings.map((warning, index) => /* @__PURE__ */ jsxs(
            Alert,
            {
              variant: "default",
              className: "relative bg-yellow-50 border-yellow-200 text-yellow-900",
              children: [
                /* @__PURE__ */ jsx(TriangleAlert, { className: "h-4 w-4" }),
                /* @__PURE__ */ jsx(AlertDescription, { children: /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                    /* @__PURE__ */ jsx(Badge, { variant: "secondary", className: "text-xs bg-yellow-200 text-yellow-800", children: "Warning" }),
                    /* @__PURE__ */ jsxs(Badge, { variant: "outline", className: "text-xs", children: [
                      "Row ",
                      warning.rowNumber
                    ] }),
                    /* @__PURE__ */ jsx("span", { className: "font-semibold text-sm", children: warning.identifier }),
                    warning.field && /* @__PURE__ */ jsxs(Badge, { variant: "secondary", className: "text-xs", children: [
                      "Field: ",
                      warning.field
                    ] })
                  ] }),
                  /* @__PURE__ */ jsx("p", { className: "text-sm mt-1 text-yellow-800", children: warning.error }),
                  warning.rawData && /* @__PURE__ */ jsxs("details", { className: "mt-2", children: [
                    /* @__PURE__ */ jsx("summary", { className: "text-xs cursor-pointer hover:underline", children: "View raw data" }),
                    /* @__PURE__ */ jsx("pre", { className: "mt-1 text-xs bg-muted p-2 rounded overflow-x-auto", children: JSON.stringify(warning.rawData, null, 2) })
                  ] })
                ] }) })
              ]
            },
            `warning-${index}`
          ))
        ] }) })
      ] }) : /* @__PURE__ */ jsx(Alert, { className: "bg-green-50 border-green-200", children: /* @__PURE__ */ jsx(AlertDescription, { className: "text-green-800", children: "All rows imported successfully! No errors or warnings to report." }) }),
      (errors.length > 0 || warnings.length > 0) && /* @__PURE__ */ jsxs("div", { className: "bg-yellow-50 border border-yellow-200 rounded-lg p-4", children: [
        /* @__PURE__ */ jsx("h4", { className: "font-semibold text-sm text-yellow-900 mb-2", children: "Troubleshooting Tips" }),
        /* @__PURE__ */ jsx("div", { className: "max-h-32 overflow-y-auto", children: /* @__PURE__ */ jsxs("ul", { className: "text-sm text-yellow-800 space-y-1 list-disc list-inside pr-2", children: [
          errors.length > 0 && /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx("li", { children: "Verify that all required fields are present in your CSV" }),
            /* @__PURE__ */ jsx("li", { children: "Check for special characters or formatting issues" }),
            /* @__PURE__ */ jsx("li", { children: "Ensure email addresses are valid and not duplicates" }),
            /* @__PURE__ */ jsx("li", { children: "Review the error messages for specific guidance" })
          ] }),
          warnings.length > 0 && /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx("li", { children: "Users with invalid locations were still created successfully" }),
            /* @__PURE__ */ jsx("li", { children: "You can assign locations manually after import using the user management interface" }),
            /* @__PURE__ */ jsx("li", { children: "Check the locations table to see available valid location names" }),
            /* @__PURE__ */ jsx("li", { children: "Consider updating your import template with correct location names" })
          ] }),
          /* @__PURE__ */ jsx("li", { children: "Download the report to fix issues in bulk" })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsx(Button, { onClick: onClose, variant: "outline", size: "icon", children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }) }) })
  ] }) });
};
const DocumentManagement = ({ onNavigateToAssignments: _onNavigateToAssignments }) => {
  const { supabaseClient: supabase2 } = useOrganisationContext();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingDocument, setEditingDocument] = useState(null);
  const [openingDocId, setOpeningDocId] = useState(null);
  const { data: documents, isLoading } = useQuery({
    queryKey: ["documents"],
    queryFn: async () => {
      const { data, error } = await supabase2.from("documents").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    }
  });
  const createDocumentMutation = useMutation({
    mutationFn: async (documentData) => {
      const { error } = await supabase2.from("documents").insert([documentData]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["documents"] });
      setIsCreateDialogOpen(false);
      toast({ title: "Success", description: "Document created successfully" });
    },
    onError: (error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  });
  const updateDocumentMutation = useMutation({
    mutationFn: async (documentData) => {
      const { error } = await supabase2.from("documents").update(documentData).eq("document_id", documentData.document_id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["documents"] });
      setEditingDocument(null);
      toast({ title: "Success", description: "Document updated successfully" });
    },
    onError: (error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  });
  const deleteDocumentMutation = useMutation({
    mutationFn: async (doc) => {
      if (doc.file_name) {
        await supabase2.storage.from("documents").remove([doc.file_name]);
      }
      const { error } = await supabase2.from("documents").delete().eq("document_id", doc.document_id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["documents"] });
      toast({ title: "Success", description: "Document deleted successfully" });
    },
    onError: (error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  });
  const handleOpenDocument = async (doc) => {
    var _a;
    if (!doc.file_name && doc.url) {
      window.open(doc.url, "_blank", "noopener,noreferrer");
      return;
    }
    if (!doc.file_name) return;
    setOpeningDocId(doc.document_id);
    try {
      const { data: { session } } = await supabase2.auth.getSession();
      debug.log("[DocumentManagement.handleOpenDocument] session present:", !!session);
      debug.log("[DocumentManagement.handleOpenDocument] token prefix:", ((_a = session == null ? void 0 : session.access_token) == null ? void 0 : _a.substring(0, 20)) ?? "none");
      debug.log("[DocumentManagement.handleOpenDocument] supabase.functions available:", !!supabase2.functions);
      debug.log("[DocumentManagement.handleOpenDocument] document_id:", doc.document_id);
      const { data, error } = await supabase2.functions.invoke("get-document-url", {
        body: { document_id: doc.document_id }
      });
      debug.log("[DocumentManagement.handleOpenDocument] invoke result — data:", data, "| error:", error);
      if (error) throw error;
      window.open(data.url, "_blank", "noopener,noreferrer");
    } catch (err) {
      debug.error("[DocumentManagement.handleOpenDocument] error:", err);
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setOpeningDocId(null);
    }
  };
  const filteredDocuments = documents == null ? void 0 : documents.filter((doc) => {
    var _a;
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) || ((_a = doc.description) == null ? void 0 : _a.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = categoryFilter === "all" || doc.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });
  const categories = Array.from(new Set(documents == null ? void 0 : documents.map((doc) => doc.category).filter(Boolean)));
  if (isLoading) {
    return /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center h-64", children: /* @__PURE__ */ jsx("div", { className: "animate-spin rounded-full h-32 w-32 border-b-2 border-primary" }) });
  }
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold", children: "Document Management" }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Create and manage organizational documents" })
      ] }),
      /* @__PURE__ */ jsxs(Dialog, { open: isCreateDialogOpen, onOpenChange: setIsCreateDialogOpen, children: [
        /* @__PURE__ */ jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsx(Button, { size: "icon", className: "flex items-center gap-2", children: /* @__PURE__ */ jsx(Plus, { className: "h-4 w-4 mr-2" }) }) }),
        /* @__PURE__ */ jsxs(DialogContent, { className: "max-w-2xl", children: [
          /* @__PURE__ */ jsxs(DialogHeader, { children: [
            /* @__PURE__ */ jsx(DialogTitle, { children: "Create New Document" }),
            /* @__PURE__ */ jsx(DialogDescription, { children: "Add a new document to the knowledge base" })
          ] }),
          /* @__PURE__ */ jsx(
            DocumentForm,
            {
              supabase: supabase2,
              onSubmit: (data) => createDocumentMutation.mutate(data),
              isSubmitting: createDocumentMutation.isPending
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "search", children: "Search Documents" }),
        /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-3 h-4 w-4 text-muted-foreground" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "search",
              placeholder: "Search by title or description...",
              value: searchTerm,
              onChange: (e) => setSearchTerm(e.target.value),
              className: "pl-10"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "w-full sm:w-48", children: [
        /* @__PURE__ */ jsx(Label, { children: "Filter by Category" }),
        /* @__PURE__ */ jsxs(Select, { value: categoryFilter, onValueChange: setCategoryFilter, children: [
          /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "All categories" }) }),
          /* @__PURE__ */ jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsx(SelectItem, { value: "all", children: "All Categories" }),
            categories.map((category) => /* @__PURE__ */ jsx(SelectItem, { value: category, children: category }, category))
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid gap-4", children: filteredDocuments == null ? void 0 : filteredDocuments.map((document2) => /* @__PURE__ */ jsxs(Card, { children: [
      /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx(CardTitle, { className: "text-lg", children: document2.title }),
            document2.required && /* @__PURE__ */ jsx(Badge, { variant: "destructive", className: "text-xs", children: "Required" }),
            /* @__PURE__ */ jsxs(Badge, { variant: "outline", className: "text-xs", children: [
              "v",
              document2.version
            ] }),
            document2.file_name ? /* @__PURE__ */ jsxs(Badge, { variant: "secondary", className: "text-xs gap-1", children: [
              /* @__PURE__ */ jsx(FileText, { className: "h-3 w-3" }),
              "File"
            ] }) : document2.url ? /* @__PURE__ */ jsxs(Badge, { variant: "secondary", className: "text-xs gap-1", children: [
              /* @__PURE__ */ jsx(Link, { className: "h-3 w-3" }),
              "URL"
            ] }) : null
          ] }),
          document2.description && /* @__PURE__ */ jsx(CardDescription, { className: "mt-2", children: document2.description })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          (document2.url || document2.file_name) && /* @__PURE__ */ jsx(
            Button,
            {
              variant: "outline",
              size: "icon",
              onClick: () => handleOpenDocument(document2),
              disabled: openingDocId === document2.document_id,
              title: "View document",
              children: openingDocId === document2.document_id ? /* @__PURE__ */ jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsx(Eye, { className: "h-4 w-4" })
            }
          ),
          /* @__PURE__ */ jsx(
            Button,
            {
              variant: "outline",
              size: "icon",
              onClick: () => setEditingDocument(document2),
              title: "Edit document",
              children: /* @__PURE__ */ jsx(SquarePen, { className: "h-4 w-4" })
            }
          ),
          /* @__PURE__ */ jsx(
            Button,
            {
              variant: "outline",
              size: "icon",
              onClick: () => {
                if (confirm("Are you sure you want to delete this document?")) {
                  deleteDocumentMutation.mutate(document2);
                }
              },
              title: "Delete document",
              children: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4" })
            }
          )
        ] })
      ] }) }),
      /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 text-sm text-muted-foreground", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ jsx(Calendar, { className: "h-4 w-4" }),
          "Due in ",
          document2.due_days,
          " days"
        ] }),
        document2.category && /* @__PURE__ */ jsx(Badge, { variant: "outline", className: "text-xs", children: document2.category })
      ] }) })
    ] }, document2.document_id)) }),
    editingDocument && /* @__PURE__ */ jsx(Dialog, { open: !!editingDocument, onOpenChange: () => setEditingDocument(null), children: /* @__PURE__ */ jsxs(DialogContent, { className: "max-w-2xl", children: [
      /* @__PURE__ */ jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsx(DialogTitle, { children: "Edit Document" }),
        /* @__PURE__ */ jsx(DialogDescription, { children: "Update document information" })
      ] }),
      /* @__PURE__ */ jsx(
        DocumentForm,
        {
          supabase: supabase2,
          initialData: editingDocument,
          onSubmit: (data) => updateDocumentMutation.mutate({ ...data, document_id: editingDocument.document_id }),
          isSubmitting: updateDocumentMutation.isPending
        }
      )
    ] }) })
  ] });
};
const ACCEPTED_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "text/plain",
  "text/csv",
  "image/png",
  "image/jpeg"
];
const DocumentForm = ({ supabase: supabase2, initialData, onSubmit, isSubmitting }) => {
  const [title, setTitle] = useState((initialData == null ? void 0 : initialData.title) ?? "");
  const [description, setDescription] = useState((initialData == null ? void 0 : initialData.description) ?? "");
  const [category, setCategory] = useState((initialData == null ? void 0 : initialData.category) ?? "");
  const [required, setRequired] = useState((initialData == null ? void 0 : initialData.required) ?? false);
  const [version, setVersion] = useState((initialData == null ? void 0 : initialData.version) ?? 1);
  const [dueDays, setDueDays] = useState((initialData == null ? void 0 : initialData.due_days) ?? 30);
  const [sourceType, setSourceType] = useState(
    (initialData == null ? void 0 : initialData.file_name) ? "file" : "url"
  );
  const [url, setUrl] = useState((initialData == null ? void 0 : initialData.url) ?? "");
  const [selectedFile, setSelectedFile] = useState(null);
  const existingFileName = initialData == null ? void 0 : initialData.file_name;
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);
  const handleFileChange = (e) => {
    var _a;
    const file = ((_a = e.target.files) == null ? void 0 : _a[0]) ?? null;
    setSelectedFile(file);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let file_name = sourceType === "file" ? existingFileName : void 0;
    let file_type = sourceType === "file" ? initialData == null ? void 0 : initialData.file_type : void 0;
    let finalUrl = sourceType === "url" ? url : void 0;
    if (sourceType === "file" && selectedFile) {
      setIsUploading(true);
      try {
        if (existingFileName) {
          await supabase2.storage.from("documents").remove([existingFileName]);
        }
        const ext = selectedFile.name.split(".").pop();
        const storagePath = `${crypto.randomUUID()}.${ext}`;
        debug.log("[DocumentForm] uploading to storage path:", storagePath);
        const { error: uploadError } = await supabase2.storage.from("documents").upload(storagePath, selectedFile, {
          contentType: selectedFile.type,
          upsert: false
        });
        if (uploadError) throw uploadError;
        file_name = storagePath;
        file_type = selectedFile.type;
        finalUrl = void 0;
      } catch (err) {
        debug.error("[DocumentForm] upload error:", err);
        toast({ title: "Upload failed", description: err.message, variant: "destructive" });
        return;
      } finally {
        setIsUploading(false);
      }
    }
    onSubmit({
      title,
      description,
      category,
      required,
      url: finalUrl,
      file_name,
      file_type,
      version,
      due_days: dueDays
    });
  };
  const busy = isUploading || isSubmitting;
  return /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(Label, { htmlFor: "title", children: "Title *" }),
      /* @__PURE__ */ jsx(
        Input,
        {
          id: "title",
          value: title,
          onChange: (e) => setTitle(e.target.value),
          required: true
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(Label, { htmlFor: "description", children: "Description" }),
      /* @__PURE__ */ jsx(
        Textarea,
        {
          id: "description",
          value: description,
          onChange: (e) => setDescription(e.target.value)
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "category", children: "Category" }),
        /* @__PURE__ */ jsx(
          Input,
          {
            id: "category",
            value: category,
            onChange: (e) => setCategory(e.target.value),
            placeholder: "e.g., Policy, Training"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "version", children: "Version" }),
        /* @__PURE__ */ jsx(
          Input,
          {
            id: "version",
            type: "number",
            min: "1",
            value: version,
            onChange: (e) => setVersion(parseInt(e.target.value) || 1)
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(Label, { children: "Document Source" }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-2 mt-1", children: [
        /* @__PURE__ */ jsxs(
          Button,
          {
            type: "button",
            variant: sourceType === "url" ? "default" : "outline",
            size: "sm",
            onClick: () => setSourceType("url"),
            children: [
              /* @__PURE__ */ jsx(Link, { className: "h-4 w-4 mr-1" }),
              "External URL"
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          Button,
          {
            type: "button",
            variant: sourceType === "file" ? "default" : "outline",
            size: "sm",
            onClick: () => setSourceType("file"),
            children: [
              /* @__PURE__ */ jsx(Upload, { className: "h-4 w-4 mr-1" }),
              "Upload File"
            ]
          }
        )
      ] })
    ] }),
    sourceType === "url" ? /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(Label, { htmlFor: "url", children: "Document URL" }),
      /* @__PURE__ */ jsx(
        Input,
        {
          id: "url",
          type: "url",
          value: url,
          onChange: (e) => setUrl(e.target.value),
          placeholder: "https://example.com/document.pdf"
        }
      )
    ] }) : /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(Label, { htmlFor: "file", children: "Upload File" }),
      existingFileName && !selectedFile && /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground mb-1 flex items-center gap-1", children: [
        /* @__PURE__ */ jsx(FileText, { className: "h-4 w-4" }),
        "Current file: ",
        existingFileName.split("/").pop()
      ] }),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:border-primary transition-colors",
          onClick: () => {
            var _a;
            return (_a = fileInputRef.current) == null ? void 0 : _a.click();
          },
          children: selectedFile ? /* @__PURE__ */ jsx("p", { className: "text-sm font-medium", children: selectedFile.name }) : /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsx(Upload, { className: "h-8 w-8 mx-auto text-muted-foreground" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Click to select a file" }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "PDF, Word, Excel, PowerPoint, TXT, CSV (max 50 MB)" })
          ] })
        }
      ),
      /* @__PURE__ */ jsx(
        "input",
        {
          ref: fileInputRef,
          type: "file",
          className: "hidden",
          accept: ACCEPTED_TYPES.join(","),
          onChange: handleFileChange
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(Label, { htmlFor: "due_days", children: "Due Days" }),
      /* @__PURE__ */ jsx(
        Input,
        {
          id: "due_days",
          type: "number",
          min: "1",
          value: dueDays,
          onChange: (e) => setDueDays(parseInt(e.target.value) || 30)
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
      /* @__PURE__ */ jsx(
        Checkbox,
        {
          id: "required",
          checked: required,
          onCheckedChange: (val) => setRequired(!!val)
        }
      ),
      /* @__PURE__ */ jsx(Label, { htmlFor: "required", children: "Required reading" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex justify-end space-x-2 pt-4", children: /* @__PURE__ */ jsxs(Button, { type: "submit", size: "sm", disabled: busy, children: [
      busy ? /* @__PURE__ */ jsx(LoaderCircle, { className: "h-4 w-4 mr-1 animate-spin" }) : /* @__PURE__ */ jsx(Save, { className: "h-4 w-4 mr-1" }),
      isUploading ? "Uploading…" : "Save"
    ] }) })
  ] });
};
const DocumentAssignmentsDrillDown = ({
  documentId,
  documentTitle,
  onBack
}) => {
  const { supabaseClient: supabase2 } = useOrganisationContext();
  const [drillDownPath, setDrillDownPath] = useState([]);
  const { data: profiles = [] } = useQuery({
    queryKey: ["profiles"],
    queryFn: async () => {
      const { data, error } = await supabase2.from("profiles").select("*");
      if (error) throw error;
      return data || [];
    }
  });
  const { data: documentAssignments = [], isLoading: assignmentsLoading } = useQuery({
    queryKey: ["document-assignments", documentId],
    queryFn: async () => {
      if (!documentId) return [];
      const { data, error } = await supabase2.from("document_assignments").select("*").eq("document_id", documentId);
      if (error) throw error;
      return data || [];
    },
    enabled: !!documentId
  });
  const { data: userDepartments = [] } = useQuery({
    queryKey: ["user-departments"],
    queryFn: async () => {
      const { data, error } = await supabase2.from("user_departments").select("*").eq("is_primary", true);
      if (error) throw error;
      return data || [];
    }
  });
  const { data: departmentsList = [] } = useQuery({
    queryKey: ["departments"],
    queryFn: async () => {
      const { data, error } = await supabase2.from("departments").select("*");
      if (error) throw error;
      return data || [];
    }
  });
  const departmentMap = /* @__PURE__ */ new Map();
  departmentsList.forEach((dept) => {
    departmentMap.set(dept.id, dept.name);
  });
  const userDeptMap = /* @__PURE__ */ new Map();
  userDepartments.forEach((ud) => {
    if (!userDeptMap.has(ud.user_id)) {
      userDeptMap.set(ud.user_id, []);
    }
    userDeptMap.get(ud.user_id).push(ud);
  });
  useEffect(() => {
    if (profiles.length > 0 && documentAssignments.length > 0 && !assignmentsLoading) {
      const assignedUserIds = new Set(documentAssignments.map((a) => a.user_id));
      const assignedProfiles = profiles.filter((p) => assignedUserIds.has(p.id));
      setDrillDownPath([{
        level: 0,
        title: "Organization Level",
        data: assignedProfiles,
        type: "org",
        value: assignedProfiles.length
      }]);
    }
  }, [profiles, documentAssignments, assignmentsLoading]);
  const onDrillDown = (data, title, type, value) => {
    setDrillDownPath((prev) => [...prev, { level: prev.length, title, data, type, value }]);
  };
  const onBreadcrumbClick = (index) => {
    setDrillDownPath((prev) => prev.slice(0, index + 1));
  };
  const getAssignmentStatus = (userId) => {
    const assignment = documentAssignments.find((a) => a.user_id === userId);
    if (!assignment) return "Not Assigned";
    return assignment.status || "Not Started";
  };
  const getStatusBadgeProps = (status) => {
    let variant = "secondary";
    let className = "";
    switch (status.toLowerCase()) {
      case "completed":
        variant = "default";
        className = "bg-green-600 text-white border-green-600 hover:bg-green-700";
        break;
      case "in progress":
        variant = "secondary";
        className = "bg-blue-600 text-white border-blue-600 hover:bg-blue-700";
        break;
      case "not started":
      case "not assigned":
        variant = "destructive";
        break;
    }
    return { variant, className };
  };
  const renderBreadcrumb = () => /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2 mb-6", children: drillDownPath.map((level, index) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
    /* @__PURE__ */ jsx(
      Button,
      {
        variant: "ghost",
        size: "sm",
        onClick: () => onBreadcrumbClick(index),
        className: index === drillDownPath.length - 1 ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground",
        children: level.title
      }
    ),
    index < drillDownPath.length - 1 && /* @__PURE__ */ jsx(ChevronRight, { className: "h-4 w-4 text-muted-foreground" })
  ] }, index)) });
  const renderOrganizationLevel = () => {
    const currentLevel = drillDownPath[drillDownPath.length - 1];
    const assignedProfiles = currentLevel.data;
    const locationGroups = /* @__PURE__ */ new Map();
    assignedProfiles.forEach((p) => {
      const loc = p.location || null;
      if (loc) {
        if (!locationGroups.has(loc)) locationGroups.set(loc, []);
        locationGroups.get(loc).push(p);
      }
    });
    const deptGroups = /* @__PURE__ */ new Map();
    assignedProfiles.forEach((p) => {
      const userDepts = userDeptMap.get(p.id) || [];
      const primaryDept = userDepts.find((ud) => ud.is_primary);
      const deptName = primaryDept ? departmentMap.get(primaryDept.department_id) : null;
      const key = deptName || "__no_dept__";
      if (!deptGroups.has(key)) deptGroups.set(key, []);
      deptGroups.get(key).push(p);
    });
    const locationCards = [...locationGroups.entries()].map(([locName, profs]) => /* @__PURE__ */ jsxs(
      Card,
      {
        className: "cursor-pointer hover:shadow-lg transition-shadow",
        onClick: () => onDrillDown(profs, locName, "location", profs.length),
        children: [
          /* @__PURE__ */ jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [
            /* @__PURE__ */ jsx(CardTitle, { className: "text-sm font-medium", children: locName }),
            /* @__PURE__ */ jsx(MapPin, { className: "h-4 w-4 text-muted-foreground" })
          ] }),
          /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsx("div", { className: "text-xl font-bold text-blue-600", children: profs.length }),
            /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground", children: "assigned staff" })
          ] }) })
        ]
      },
      locName
    ));
    const noDeptProfiles = deptGroups.get("__no_dept__") || [];
    const departmentCards = [
      ...[...deptGroups.entries()].filter(([key]) => key !== "__no_dept__").map(([deptName, profs]) => /* @__PURE__ */ jsxs(
        Card,
        {
          className: "cursor-pointer hover:shadow-lg transition-shadow",
          onClick: () => onDrillDown(profs, deptName, "department", profs.length),
          children: [
            /* @__PURE__ */ jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [
              /* @__PURE__ */ jsx(CardTitle, { className: "text-sm font-medium", children: deptName }),
              /* @__PURE__ */ jsx(Building, { className: "h-4 w-4 text-muted-foreground" })
            ] }),
            /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsx("div", { className: "text-xl font-bold text-blue-600", children: profs.length }),
              /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground", children: "assigned staff" })
            ] }) })
          ]
        },
        deptName
      )),
      noDeptProfiles.length > 0 && /* @__PURE__ */ jsxs(
        Card,
        {
          className: "cursor-pointer hover:shadow-lg transition-shadow",
          onClick: () => onDrillDown(noDeptProfiles, "No Department", "department", noDeptProfiles.length),
          children: [
            /* @__PURE__ */ jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [
              /* @__PURE__ */ jsx(CardTitle, { className: "text-sm font-medium text-muted-foreground", children: "No Department" }),
              /* @__PURE__ */ jsx(Building, { className: "h-4 w-4 text-muted-foreground" })
            ] }),
            /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsx("div", { className: "text-xl font-bold text-blue-600", children: noDeptProfiles.length }),
              /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground", children: "assigned staff" })
            ] }) })
          ]
        },
        "no-department"
      )
    ].filter(Boolean);
    return /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxs(Card, { children: [
        /* @__PURE__ */ jsx(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: /* @__PURE__ */ jsxs(CardTitle, { className: "text-sm font-medium flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(Building, { className: "h-4 w-4" }),
          "Organization Overview"
        ] }) }),
        /* @__PURE__ */ jsxs(CardContent, { children: [
          /* @__PURE__ */ jsx("div", { className: "text-xl font-bold text-blue-600", children: currentLevel.value ?? currentLevel.data.length }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "Total assigned staff" })
        ] })
      ] }),
      locationCards.length > 0 && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold", children: "Locations" }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: locationCards })
      ] }),
      /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold", children: "Departments" }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: departmentCards })
    ] });
  };
  const renderLocationLevel = () => {
    const currentLevel = drillDownPath[drillDownPath.length - 1];
    const locationDepartments = [...new Set(
      currentLevel.data.map((p) => {
        const userDepts = userDeptMap.get(p.id) || [];
        const primaryDept = userDepts.find((ud) => ud.is_primary);
        return primaryDept ? departmentMap.get(primaryDept.department_id) : null;
      }).filter(Boolean)
    )];
    const noDeptProfiles = currentLevel.data.filter((p) => {
      const userDepts = userDeptMap.get(p.id) || [];
      return userDepts.length === 0;
    });
    const departmentCards = [
      ...locationDepartments.map((departmentName) => {
        const departmentProfiles = currentLevel.data.filter((p) => {
          const userDepts = userDeptMap.get(p.id) || [];
          return userDepts.some((ud) => departmentMap.get(ud.department_id) === departmentName);
        });
        if (departmentProfiles.length === 0) return null;
        return /* @__PURE__ */ jsxs(
          Card,
          {
            className: "cursor-pointer hover:shadow-lg transition-shadow",
            onClick: () => onDrillDown(departmentProfiles, departmentName, "department", departmentProfiles.length),
            children: [
              /* @__PURE__ */ jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [
                /* @__PURE__ */ jsx(CardTitle, { className: "text-sm font-medium", children: departmentName }),
                /* @__PURE__ */ jsx(Building, { className: "h-4 w-4 text-muted-foreground" })
              ] }),
              /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsx("div", { className: "text-xl font-bold text-blue-600", children: departmentProfiles.length }),
                /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground", children: "assigned staff" })
              ] }) })
            ]
          },
          departmentName
        );
      }).filter(Boolean),
      noDeptProfiles.length > 0 && /* @__PURE__ */ jsxs(
        Card,
        {
          className: "cursor-pointer hover:shadow-lg transition-shadow",
          onClick: () => onDrillDown(noDeptProfiles, "No Department", "department", noDeptProfiles.length),
          children: [
            /* @__PURE__ */ jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [
              /* @__PURE__ */ jsx(CardTitle, { className: "text-sm font-medium text-muted-foreground", children: "No Department" }),
              /* @__PURE__ */ jsx(Building, { className: "h-4 w-4 text-muted-foreground" })
            ] }),
            /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsx("div", { className: "text-xl font-bold text-blue-600", children: noDeptProfiles.length }),
              /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground", children: "assigned staff" })
            ] }) })
          ]
        },
        "no-department"
      )
    ].filter(Boolean);
    return /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxs(Card, { children: [
        /* @__PURE__ */ jsx(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: /* @__PURE__ */ jsxs(CardTitle, { className: "text-sm font-medium flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(MapPin, { className: "h-4 w-4" }),
          currentLevel.title,
          " Overview"
        ] }) }),
        /* @__PURE__ */ jsxs(CardContent, { children: [
          /* @__PURE__ */ jsx("div", { className: "text-xl font-bold text-blue-600", children: currentLevel.value ?? currentLevel.data.length }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "Total assigned staff" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold", children: "Departments" }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: departmentCards })
    ] });
  };
  const renderDepartmentLevel = () => {
    const currentLevel = drillDownPath[drillDownPath.length - 1];
    return /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxs(Card, { children: [
        /* @__PURE__ */ jsx(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: /* @__PURE__ */ jsxs(CardTitle, { className: "text-sm font-medium flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(Building, { className: "h-4 w-4" }),
          currentLevel.title,
          " Overview"
        ] }) }),
        /* @__PURE__ */ jsxs(CardContent, { children: [
          /* @__PURE__ */ jsx("div", { className: "text-xl font-bold text-blue-600", children: currentLevel.value ?? currentLevel.data.length }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "Total assigned staff" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold", children: "Staff" }),
      renderStaffList()
    ] });
  };
  const renderStaffList = () => {
    const currentLevel = drillDownPath[drillDownPath.length - 1];
    const allProfilesInLevel = currentLevel.data;
    return /* @__PURE__ */ jsx("div", { className: "space-y-4", children: /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-3", children: allProfilesInLevel.map((profile) => {
      const status = getAssignmentStatus(profile.id);
      const badgeProps = getStatusBadgeProps(status);
      const userDepts = userDeptMap.get(profile.id) || [];
      const primaryDept = userDepts.find((ud) => ud.is_primary);
      const deptName = primaryDept ? departmentMap.get(primaryDept.department_id) : "No Department";
      return /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsx(CardContent, { className: "p-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx(Users, { className: "h-4 w-4 text-muted-foreground" }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("div", { className: "font-medium", children: profile.full_name || "Unknown Name" }),
            /* @__PURE__ */ jsxs("div", { className: "text-sm text-muted-foreground", children: [
              profile.location,
              " • ",
              deptName,
              " • ",
              profile.primary_role || "No Role"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx(Badge, { variant: badgeProps.variant, className: badgeProps.className, children: status })
      ] }) }) }, profile.id);
    }) }) });
  };
  const renderContent = () => {
    const currentLevel = drillDownPath[drillDownPath.length - 1];
    if (currentLevel.type === "org") return renderOrganizationLevel();
    if (currentLevel.type === "location") return renderLocationLevel();
    if (currentLevel.type === "department") return renderDepartmentLevel();
    return renderStaffList();
  };
  if (assignmentsLoading || drillDownPath.length === 0) {
    return /* @__PURE__ */ jsxs("div", { className: "w-full space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsx(Button, { variant: "outline", size: "icon", onClick: onBack, children: /* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4" }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold", children: documentTitle }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Document assignment breakdown" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center py-8", children: /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Loading assignment data..." }) })
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: "w-full space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
      /* @__PURE__ */ jsx(Button, { variant: "outline", size: "icon", onClick: onBack, children: /* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4" }) }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold", children: documentTitle }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Document assignment breakdown" })
      ] })
    ] }),
    renderBreadcrumb(),
    renderContent()
  ] });
};
const DocumentAssignments = () => {
  const { supabaseClient: supabase2, basePath } = useOrganisationContext();
  const clientId = basePath ? basePath.replace(/^\//, "") : "default";
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [assignmentType, setAssignmentType] = useState("departments");
  const [selectedTargets, setSelectedTargets] = useState([]);
  const [selectedDocumentForDrillDown, setSelectedDocumentForDrillDown] = useState(null);
  const { data: currentUserRoles } = useQuery({
    queryKey: ["current-user-roles-doc", user == null ? void 0 : user.id],
    queryFn: async () => {
      const { data } = await supabase2.from("user_roles").select("role").eq("user_id", user.id);
      return (data == null ? void 0 : data.map((r) => r.role)) || [];
    },
    enabled: !!(user == null ? void 0 : user.id)
  });
  const hasAdminAccess = currentUserRoles ? currentUserRoles.some((r) => ["super_admin", "client_admin"].includes(r)) : true;
  const { data: managedDepartmentIds } = useQuery({
    queryKey: ["manager-dept-ids", user == null ? void 0 : user.id],
    queryFn: async () => {
      const { data } = await supabase2.from("departments").select("id").eq("manager_id", user.id);
      return (data == null ? void 0 : data.map((d) => d.id)) || [];
    },
    enabled: !!(user == null ? void 0 : user.id)
  });
  const { data: managedUserIds } = useQuery({
    queryKey: ["manager-user-ids", user == null ? void 0 : user.id, managedDepartmentIds],
    queryFn: async () => {
      const ids = /* @__PURE__ */ new Set();
      if (user == null ? void 0 : user.id) ids.add(user.id);
      if (managedDepartmentIds && managedDepartmentIds.length > 0) {
        const { data: udData } = await supabase2.from("user_departments").select("user_id").in("department_id", managedDepartmentIds);
        (udData || []).forEach((r) => ids.add(r.user_id));
      }
      const { data: directReports } = await supabase2.from("profiles").select("id").eq("manager", user.id);
      (directReports || []).forEach((r) => ids.add(r.id));
      return [...ids];
    },
    enabled: !!(user == null ? void 0 : user.id)
  });
  const { data: managedRoleIds } = useQuery({
    queryKey: ["manager-role-ids", user == null ? void 0 : user.id, managedDepartmentIds],
    queryFn: async () => {
      if (!managedDepartmentIds || managedDepartmentIds.length === 0) return [];
      const { data } = await supabase2.from("roles").select("role_id").in("department_id", managedDepartmentIds);
      return (data == null ? void 0 : data.map((r) => r.role_id)) || [];
    },
    enabled: !!(user == null ? void 0 : user.id)
  });
  const isManagerOnly = !hasAdminAccess && (((managedDepartmentIds == null ? void 0 : managedDepartmentIds.length) ?? 0) > 0 || ((managedUserIds == null ? void 0 : managedUserIds.length) ?? 0) > 1);
  const { data: documents } = useQuery({
    queryKey: ["documents"],
    queryFn: async () => {
      const { data, error } = await supabase2.from("documents").select("*").order("title");
      if (error) throw error;
      return data;
    }
  });
  const { data: departments } = useQuery({
    queryKey: ["departments"],
    queryFn: async () => {
      const { data, error } = await supabase2.from("departments").select("*").order("name");
      if (error) throw error;
      return data;
    }
  });
  const { data: roles } = useQuery({
    queryKey: ["roles"],
    queryFn: async () => {
      const { data, error } = await supabase2.from("roles").select("*").order("name");
      if (error) throw error;
      return data;
    }
  });
  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data, error } = await supabase2.from("profiles").select("id, full_name").order("full_name");
      if (error) throw error;
      return data;
    }
  });
  const { data: assignments } = useQuery({
    queryKey: ["document-assignments-overview"],
    queryFn: async () => {
      const { data: assignmentsData, error: assignmentsError } = await supabase2.from("document_assignments").select("*").order("assigned_at", { ascending: false });
      if (assignmentsError) {
        console.error("Error fetching assignments:", assignmentsError);
        throw assignmentsError;
      }
      if (!assignmentsData || assignmentsData.length === 0) {
        return [];
      }
      const documentIds = [...new Set(assignmentsData.map((a) => a.document_id))];
      const userIds = [...new Set(assignmentsData.map((a) => a.user_id))];
      const { data: documentsData, error: documentsError } = await supabase2.from("documents").select("document_id, title").in("document_id", documentIds);
      if (documentsError) {
        console.error("Error fetching documents:", documentsError);
        throw documentsError;
      }
      const { data: profilesData, error: profilesError } = await supabase2.from("profiles").select("id, full_name").in("id", userIds);
      if (profilesError) {
        console.error("Error fetching profiles:", profilesError);
        throw profilesError;
      }
      const documentMap = new Map((documentsData == null ? void 0 : documentsData.map((d) => [d.document_id, d])) || []);
      const profileMap = new Map((profilesData == null ? void 0 : profilesData.map((p) => [p.id, p])) || []);
      return assignmentsData.map((assignment) => ({
        ...assignment,
        document: documentMap.get(assignment.document_id),
        user: profileMap.get(assignment.user_id)
      }));
    }
  });
  const createAssignmentMutation = useMutation({
    mutationFn: async () => {
      if (!selectedDocument) return;
      console.log("Creating assignment for document:", selectedDocument.document_id);
      console.log("Assignment type:", assignmentType);
      console.log("Selected targets:", selectedTargets);
      if (assignmentType === "roles") {
        const promises = selectedTargets.map(async (roleId) => {
          console.log("Inserting document_roles:", {
            document_id: selectedDocument.document_id,
            role_id: roleId
          });
          const result = await supabase2.from("document_roles").upsert({
            document_id: selectedDocument.document_id,
            role_id: roleId
          }, { ignoreDuplicates: true });
          console.log("Insert result:", result);
          if (result.error) {
            console.error("Error inserting document_roles:", result.error);
            throw result.error;
          }
          return result;
        });
        await Promise.all(promises);
      } else if (assignmentType === "departments") {
        const promises = selectedTargets.map(async (departmentId) => {
          console.log("Inserting document_departments:", {
            document_id: selectedDocument.document_id,
            department_id: departmentId
          });
          const result = await supabase2.from("document_departments").upsert({
            document_id: selectedDocument.document_id,
            department_id: departmentId
          }, { ignoreDuplicates: true });
          console.log("Insert result:", result);
          if (result.error) {
            console.error("Error inserting document_departments:", result.error);
            throw result.error;
          }
          return result;
        });
        await Promise.all(promises);
      } else if (assignmentType === "users") {
        const promises = selectedTargets.map(async (userId) => {
          console.log("Inserting document_users:", {
            document_id: selectedDocument.document_id,
            user_id: userId
          });
          const result = await supabase2.from("document_users").upsert({
            document_id: selectedDocument.document_id,
            user_id: userId
          }, { ignoreDuplicates: true });
          console.log("Insert result:", result);
          if (result.error) {
            console.error("Error inserting document_users:", result.error);
            throw result.error;
          }
          return result;
        });
        await Promise.all(promises);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["document-assignments-overview"] });
      if (selectedDocument && selectedTargets.length > 0) {
        const docTitle = selectedDocument.title;
        const dueDays = selectedDocument.due_days;
        const targets = [...selectedTargets];
        const type = assignmentType;
        const fireNotifications = async () => {
          let userIds = [];
          if (type === "users") {
            userIds = targets;
          } else if (type === "departments") {
            const { data } = await supabase2.from("user_departments").select("user_id").in("department_id", targets);
            userIds = (data || []).map((r) => r.user_id);
          } else if (type === "roles") {
            const { data } = await supabase2.from("user_departments").select("user_id").in("role_id", targets);
            userIds = (data || []).map((r) => r.user_id);
          }
          await Promise.all(
            [...new Set(userIds)].map(
              (userId) => sendNotificationByEvent(supabase2, "document_assigned", {
                user_id: userId,
                document_title: docTitle,
                due_days: dueDays,
                document_id: selectedDocument.document_id,
                clientId
              })
            )
          );
        };
        fireNotifications().catch(
          (err) => console.error("[DocumentAssignments] notification error:", err)
        );
      }
      setIsAssignDialogOpen(false);
      setSelectedDocument(null);
      setSelectedTargets([]);
      toast({
        title: "Success",
        description: "Document assignments created successfully"
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  });
  const handleAssign = () => {
    if (!selectedDocument || selectedTargets.length === 0) return;
    createAssignmentMutation.mutate();
  };
  const handleTargetToggle = (targetId) => {
    setSelectedTargets(
      (prev) => prev.includes(targetId) ? prev.filter((id) => id !== targetId) : [...prev, targetId]
    );
  };
  const visibleDepartments = useMemo(() => {
    if (isManagerOnly && managedDepartmentIds) {
      return (departments || []).filter((d) => managedDepartmentIds.includes(d.id));
    }
    return departments || [];
  }, [departments, isManagerOnly, managedDepartmentIds]);
  const visibleRoles = useMemo(() => {
    if (isManagerOnly && managedRoleIds) {
      return (roles || []).filter((r) => managedRoleIds.includes(r.role_id));
    }
    return roles || [];
  }, [roles, isManagerOnly, managedRoleIds]);
  const visibleUsers = useMemo(() => {
    if (isManagerOnly && managedUserIds) {
      return (users || []).filter((u) => managedUserIds.includes(u.id));
    }
    return users || [];
  }, [users, isManagerOnly, managedUserIds]);
  const getAssignmentTargets = () => {
    switch (assignmentType) {
      case "roles":
        return visibleRoles;
      case "departments":
        return visibleDepartments;
      case "users":
        return visibleUsers;
      default:
        return [];
    }
  };
  const getTargetLabel = (target) => {
    if (assignmentType === "roles") return target.name;
    if (assignmentType === "departments") return target.name;
    if (assignmentType === "users") return target.full_name;
    return "";
  };
  const getTargetId = (target) => {
    if (assignmentType === "roles") return target.role_id;
    if (assignmentType === "departments") return target.id;
    if (assignmentType === "users") return target.id;
    return "";
  };
  if (selectedDocumentForDrillDown) {
    return /* @__PURE__ */ jsx(
      DocumentAssignmentsDrillDown,
      {
        documentId: selectedDocumentForDrillDown.id,
        documentTitle: selectedDocumentForDrillDown.title,
        onBack: () => setSelectedDocumentForDrillDown(null)
      }
    );
  }
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold", children: "Document Assignments" }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Assign documents to roles, departments, or specific users" })
      ] }),
      /* @__PURE__ */ jsxs(Dialog, { open: isAssignDialogOpen, onOpenChange: setIsAssignDialogOpen, children: [
        /* @__PURE__ */ jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(Button, { children: [
          /* @__PURE__ */ jsx(Plus, { className: "h-4 w-4 mr-2" }),
          "Create Assignment"
        ] }) }),
        /* @__PURE__ */ jsxs(DialogContent, { className: "max-w-2xl", children: [
          /* @__PURE__ */ jsxs(DialogHeader, { children: [
            /* @__PURE__ */ jsx(DialogTitle, { children: "Create Document Assignment" }),
            /* @__PURE__ */ jsx(DialogDescription, { children: "Assign a document to roles, departments, or specific users" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "document", children: "Select Document" }),
              /* @__PURE__ */ jsxs(Select, { onValueChange: (value) => {
                const doc = documents == null ? void 0 : documents.find((d) => d.document_id === value);
                setSelectedDocument(doc || null);
              }, children: [
                /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Choose a document" }) }),
                /* @__PURE__ */ jsx(SelectContent, { children: documents == null ? void 0 : documents.map((doc) => /* @__PURE__ */ jsxs(SelectItem, { value: doc.document_id, children: [
                  doc.title,
                  " (v",
                  doc.version,
                  ")"
                ] }, doc.document_id)) })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 mb-1", children: [
                /* @__PURE__ */ jsx(Label, { children: "Assignment Type" }),
                /* @__PURE__ */ jsxs(Popover, { children: [
                  /* @__PURE__ */ jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsx(Info, { className: "w-3.5 h-3.5 text-muted-foreground cursor-pointer" }) }),
                  /* @__PURE__ */ jsxs(PopoverContent, { className: "w-72 text-sm space-y-1.5", children: [
                    /* @__PURE__ */ jsxs("p", { children: [
                      /* @__PURE__ */ jsx("strong", { children: "Departments" }),
                      " — assigns to all current and future members of the department."
                    ] }),
                    /* @__PURE__ */ jsxs("p", { children: [
                      /* @__PURE__ */ jsx("strong", { children: "Roles" }),
                      " — assigns to all users with that role, across departments."
                    ] }),
                    /* @__PURE__ */ jsxs("p", { children: [
                      /* @__PURE__ */ jsx("strong", { children: "Users" }),
                      " — assigns to specific individuals only."
                    ] })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsx(Tabs, { value: assignmentType, onValueChange: (value) => {
                setAssignmentType(value);
                setSelectedTargets([]);
              }, children: /* @__PURE__ */ jsxs(TabsList, { className: "grid w-full grid-cols-3", children: [
                /* @__PURE__ */ jsxs(TabsTrigger, { value: "departments", children: [
                  /* @__PURE__ */ jsx(Building2, { className: "h-4 w-4 mr-1" }),
                  "Departments"
                ] }),
                /* @__PURE__ */ jsxs(TabsTrigger, { value: "roles", children: [
                  /* @__PURE__ */ jsx(Shield, { className: "h-4 w-4 mr-1" }),
                  "Roles"
                ] }),
                /* @__PURE__ */ jsxs(TabsTrigger, { value: "users", children: [
                  /* @__PURE__ */ jsx(Users, { className: "h-4 w-4 mr-1" }),
                  "Users"
                ] })
              ] }) })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(Label, { children: "Select Targets" }),
              /* @__PURE__ */ jsx("div", { className: "max-h-48 overflow-y-auto border rounded-md p-2 space-y-2", children: getAssignmentTargets().map((target) => /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
                /* @__PURE__ */ jsx(
                  Checkbox,
                  {
                    id: getTargetId(target),
                    checked: selectedTargets.includes(getTargetId(target)),
                    onCheckedChange: () => handleTargetToggle(getTargetId(target))
                  }
                ),
                /* @__PURE__ */ jsx(Label, { htmlFor: getTargetId(target), className: "text-sm", children: getTargetLabel(target) })
              ] }, getTargetId(target))) })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "flex justify-end pt-4", children: /* @__PURE__ */ jsx(
              Button,
              {
                size: "icon",
                onClick: handleAssign,
                disabled: !selectedDocument || selectedTargets.length === 0,
                children: /* @__PURE__ */ jsx(Save, { className: "w-4 h-4" })
              }
            ) })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
      /* @__PURE__ */ jsx(Search, { className: "h-4 w-4 text-muted-foreground" }),
      /* @__PURE__ */ jsx(
        Input,
        {
          placeholder: "Search documents...",
          value: searchTerm,
          onChange: (e) => setSearchTerm(e.target.value),
          className: "max-w-sm"
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid gap-4", children: (() => {
      const groupedAssignments = assignments == null ? void 0 : assignments.reduce((acc, assignment) => {
        const docId = assignment.document_id;
        if (!acc[docId]) {
          acc[docId] = {
            document: assignment.document,
            assignments: []
          };
        }
        acc[docId].assignments.push(assignment);
        return acc;
      }, {});
      return Object.values(groupedAssignments || {}).map((group) => {
        var _a;
        return /* @__PURE__ */ jsxs(Card, { children: [
          /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(CardTitle, { className: "text-lg", children: group.document.title }),
              /* @__PURE__ */ jsxs(CardDescription, { className: "flex items-center gap-2 mt-1", children: [
                /* @__PURE__ */ jsx(Users, { className: "h-4 w-4" }),
                group.assignments.length,
                " staff assigned"
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "flex gap-2", children: /* @__PURE__ */ jsx(
              Button,
              {
                variant: "outline",
                size: "sm",
                onClick: () => setSelectedDocumentForDrillDown({
                  id: group.document.document_id,
                  title: group.document.title
                }),
                className: "flex items-center gap-2",
                children: /* @__PURE__ */ jsx(ChartColumn, { className: "h-4 w-4" })
              }
            ) })
          ] }) }),
          /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex gap-4 text-sm", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsx("div", { className: "w-2 h-2 rounded-full bg-green-500" }),
                /* @__PURE__ */ jsxs("span", { children: [
                  group.assignments.filter((a) => a.status === "Completed").length,
                  " Completed"
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsx("div", { className: "w-2 h-2 rounded-full bg-blue-500" }),
                /* @__PURE__ */ jsxs("span", { children: [
                  group.assignments.filter((a) => a.status === "In progress").length,
                  " In Progress"
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsx("div", { className: "w-2 h-2 rounded-full bg-orange-500" }),
                /* @__PURE__ */ jsxs("span", { children: [
                  group.assignments.filter((a) => a.status === "Not started").length,
                  " Not Started"
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "text-sm text-muted-foreground", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsx(Calendar, { className: "h-4 w-4" }),
              "Due: ",
              new Date((_a = group.assignments[0]) == null ? void 0 : _a.due_date).toLocaleDateString()
            ] }) })
          ] }) })
        ] }, group.document.document_id);
      });
    })() })
  ] });
};
function toDate(argument) {
  const argStr = Object.prototype.toString.call(argument);
  if (argument instanceof Date || typeof argument === "object" && argStr === "[object Date]") {
    return new argument.constructor(+argument);
  } else if (typeof argument === "number" || argStr === "[object Number]" || typeof argument === "string" || argStr === "[object String]") {
    return new Date(argument);
  } else {
    return /* @__PURE__ */ new Date(NaN);
  }
}
function constructFrom(date, value) {
  if (date instanceof Date) {
    return new date.constructor(value);
  } else {
    return new Date(value);
  }
}
const millisecondsInWeek = 6048e5;
const millisecondsInDay = 864e5;
let defaultOptions = {};
function getDefaultOptions() {
  return defaultOptions;
}
function startOfWeek(date, options) {
  var _a, _b, _c, _d;
  const defaultOptions2 = getDefaultOptions();
  const weekStartsOn = (options == null ? void 0 : options.weekStartsOn) ?? ((_b = (_a = options == null ? void 0 : options.locale) == null ? void 0 : _a.options) == null ? void 0 : _b.weekStartsOn) ?? defaultOptions2.weekStartsOn ?? ((_d = (_c = defaultOptions2.locale) == null ? void 0 : _c.options) == null ? void 0 : _d.weekStartsOn) ?? 0;
  const _date = toDate(date);
  const day = _date.getDay();
  const diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
  _date.setDate(_date.getDate() - diff);
  _date.setHours(0, 0, 0, 0);
  return _date;
}
function startOfISOWeek(date) {
  return startOfWeek(date, { weekStartsOn: 1 });
}
function getISOWeekYear(date) {
  const _date = toDate(date);
  const year = _date.getFullYear();
  const fourthOfJanuaryOfNextYear = constructFrom(date, 0);
  fourthOfJanuaryOfNextYear.setFullYear(year + 1, 0, 4);
  fourthOfJanuaryOfNextYear.setHours(0, 0, 0, 0);
  const startOfNextYear = startOfISOWeek(fourthOfJanuaryOfNextYear);
  const fourthOfJanuaryOfThisYear = constructFrom(date, 0);
  fourthOfJanuaryOfThisYear.setFullYear(year, 0, 4);
  fourthOfJanuaryOfThisYear.setHours(0, 0, 0, 0);
  const startOfThisYear = startOfISOWeek(fourthOfJanuaryOfThisYear);
  if (_date.getTime() >= startOfNextYear.getTime()) {
    return year + 1;
  } else if (_date.getTime() >= startOfThisYear.getTime()) {
    return year;
  } else {
    return year - 1;
  }
}
function startOfDay(date) {
  const _date = toDate(date);
  _date.setHours(0, 0, 0, 0);
  return _date;
}
function getTimezoneOffsetInMilliseconds(date) {
  const _date = toDate(date);
  const utcDate = new Date(
    Date.UTC(
      _date.getFullYear(),
      _date.getMonth(),
      _date.getDate(),
      _date.getHours(),
      _date.getMinutes(),
      _date.getSeconds(),
      _date.getMilliseconds()
    )
  );
  utcDate.setUTCFullYear(_date.getFullYear());
  return +date - +utcDate;
}
function differenceInCalendarDays(dateLeft, dateRight) {
  const startOfDayLeft = startOfDay(dateLeft);
  const startOfDayRight = startOfDay(dateRight);
  const timestampLeft = +startOfDayLeft - getTimezoneOffsetInMilliseconds(startOfDayLeft);
  const timestampRight = +startOfDayRight - getTimezoneOffsetInMilliseconds(startOfDayRight);
  return Math.round((timestampLeft - timestampRight) / millisecondsInDay);
}
function startOfISOWeekYear(date) {
  const year = getISOWeekYear(date);
  const fourthOfJanuary = constructFrom(date, 0);
  fourthOfJanuary.setFullYear(year, 0, 4);
  fourthOfJanuary.setHours(0, 0, 0, 0);
  return startOfISOWeek(fourthOfJanuary);
}
function isDate(value) {
  return value instanceof Date || typeof value === "object" && Object.prototype.toString.call(value) === "[object Date]";
}
function isValid(date) {
  if (!isDate(date) && typeof date !== "number") {
    return false;
  }
  const _date = toDate(date);
  return !isNaN(Number(_date));
}
function startOfYear(date) {
  const cleanDate = toDate(date);
  const _date = constructFrom(date, 0);
  _date.setFullYear(cleanDate.getFullYear(), 0, 1);
  _date.setHours(0, 0, 0, 0);
  return _date;
}
const formatDistanceLocale = {
  lessThanXSeconds: {
    one: "less than a second",
    other: "less than {{count}} seconds"
  },
  xSeconds: {
    one: "1 second",
    other: "{{count}} seconds"
  },
  halfAMinute: "half a minute",
  lessThanXMinutes: {
    one: "less than a minute",
    other: "less than {{count}} minutes"
  },
  xMinutes: {
    one: "1 minute",
    other: "{{count}} minutes"
  },
  aboutXHours: {
    one: "about 1 hour",
    other: "about {{count}} hours"
  },
  xHours: {
    one: "1 hour",
    other: "{{count}} hours"
  },
  xDays: {
    one: "1 day",
    other: "{{count}} days"
  },
  aboutXWeeks: {
    one: "about 1 week",
    other: "about {{count}} weeks"
  },
  xWeeks: {
    one: "1 week",
    other: "{{count}} weeks"
  },
  aboutXMonths: {
    one: "about 1 month",
    other: "about {{count}} months"
  },
  xMonths: {
    one: "1 month",
    other: "{{count}} months"
  },
  aboutXYears: {
    one: "about 1 year",
    other: "about {{count}} years"
  },
  xYears: {
    one: "1 year",
    other: "{{count}} years"
  },
  overXYears: {
    one: "over 1 year",
    other: "over {{count}} years"
  },
  almostXYears: {
    one: "almost 1 year",
    other: "almost {{count}} years"
  }
};
const formatDistance = (token, count, options) => {
  let result;
  const tokenValue = formatDistanceLocale[token];
  if (typeof tokenValue === "string") {
    result = tokenValue;
  } else if (count === 1) {
    result = tokenValue.one;
  } else {
    result = tokenValue.other.replace("{{count}}", count.toString());
  }
  if (options == null ? void 0 : options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return "in " + result;
    } else {
      return result + " ago";
    }
  }
  return result;
};
function buildFormatLongFn(args) {
  return (options = {}) => {
    const width = options.width ? String(options.width) : args.defaultWidth;
    const format2 = args.formats[width] || args.formats[args.defaultWidth];
    return format2;
  };
}
const dateFormats = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy"
};
const timeFormats = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
};
const dateTimeFormats = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
};
const formatLong = {
  date: buildFormatLongFn({
    formats: dateFormats,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats,
    defaultWidth: "full"
  })
};
const formatRelativeLocale = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P"
};
const formatRelative = (token, _date, _baseDate, _options) => formatRelativeLocale[token];
function buildLocalizeFn(args) {
  return (value, options) => {
    const context = (options == null ? void 0 : options.context) ? String(options.context) : "standalone";
    let valuesArray;
    if (context === "formatting" && args.formattingValues) {
      const defaultWidth = args.defaultFormattingWidth || args.defaultWidth;
      const width = (options == null ? void 0 : options.width) ? String(options.width) : defaultWidth;
      valuesArray = args.formattingValues[width] || args.formattingValues[defaultWidth];
    } else {
      const defaultWidth = args.defaultWidth;
      const width = (options == null ? void 0 : options.width) ? String(options.width) : args.defaultWidth;
      valuesArray = args.values[width] || args.values[defaultWidth];
    }
    const index = args.argumentCallback ? args.argumentCallback(value) : value;
    return valuesArray[index];
  };
}
const eraValues = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"]
};
const quarterValues = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
};
const monthValues = {
  narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
  abbreviated: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ],
  wide: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ]
};
const dayValues = {
  narrow: ["S", "M", "T", "W", "T", "F", "S"],
  short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  wide: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ]
};
const dayPeriodValues = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  }
};
const formattingDayPeriodValues = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  }
};
const ordinalNumber = (dirtyNumber, _options) => {
  const number = Number(dirtyNumber);
  const rem100 = number % 100;
  if (rem100 > 20 || rem100 < 10) {
    switch (rem100 % 10) {
      case 1:
        return number + "st";
      case 2:
        return number + "nd";
      case 3:
        return number + "rd";
    }
  }
  return number + "th";
};
const localize = {
  ordinalNumber,
  era: buildLocalizeFn({
    values: eraValues,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues,
    defaultWidth: "wide",
    argumentCallback: (quarter) => quarter - 1
  }),
  month: buildLocalizeFn({
    values: monthValues,
    defaultWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues,
    defaultWidth: "wide",
    formattingValues: formattingDayPeriodValues,
    defaultFormattingWidth: "wide"
  })
};
function buildMatchFn(args) {
  return (string, options = {}) => {
    const width = options.width;
    const matchPattern = width && args.matchPatterns[width] || args.matchPatterns[args.defaultMatchWidth];
    const matchResult = string.match(matchPattern);
    if (!matchResult) {
      return null;
    }
    const matchedString = matchResult[0];
    const parsePatterns = width && args.parsePatterns[width] || args.parsePatterns[args.defaultParseWidth];
    const key = Array.isArray(parsePatterns) ? findIndex(parsePatterns, (pattern) => pattern.test(matchedString)) : (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- I challange you to fix the type
      findKey(parsePatterns, (pattern) => pattern.test(matchedString))
    );
    let value;
    value = args.valueCallback ? args.valueCallback(key) : key;
    value = options.valueCallback ? (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- I challange you to fix the type
      options.valueCallback(value)
    ) : value;
    const rest = string.slice(matchedString.length);
    return { value, rest };
  };
}
function findKey(object, predicate) {
  for (const key in object) {
    if (Object.prototype.hasOwnProperty.call(object, key) && predicate(object[key])) {
      return key;
    }
  }
  return void 0;
}
function findIndex(array, predicate) {
  for (let key = 0; key < array.length; key++) {
    if (predicate(array[key])) {
      return key;
    }
  }
  return void 0;
}
function buildMatchPatternFn(args) {
  return (string, options = {}) => {
    const matchResult = string.match(args.matchPattern);
    if (!matchResult) return null;
    const matchedString = matchResult[0];
    const parseResult = string.match(args.parsePattern);
    if (!parseResult) return null;
    let value = args.valueCallback ? args.valueCallback(parseResult[0]) : parseResult[0];
    value = options.valueCallback ? options.valueCallback(value) : value;
    const rest = string.slice(matchedString.length);
    return { value, rest };
  };
}
const matchOrdinalNumberPattern = /^(\d+)(th|st|nd|rd)?/i;
const parseOrdinalNumberPattern = /\d+/i;
const matchEraPatterns = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
};
const parseEraPatterns = {
  any: [/^b/i, /^(a|c)/i]
};
const matchQuarterPatterns = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
};
const parseQuarterPatterns = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
const matchMonthPatterns = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
};
const parseMonthPatterns = {
  narrow: [
    /^j/i,
    /^f/i,
    /^m/i,
    /^a/i,
    /^m/i,
    /^j/i,
    /^j/i,
    /^a/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i
  ],
  any: [
    /^ja/i,
    /^f/i,
    /^mar/i,
    /^ap/i,
    /^may/i,
    /^jun/i,
    /^jul/i,
    /^au/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i
  ]
};
const matchDayPatterns = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
};
const parseDayPatterns = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
};
const matchDayPeriodPatterns = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
};
const parseDayPeriodPatterns = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^mi/i,
    noon: /^no/i,
    morning: /morning/i,
    afternoon: /afternoon/i,
    evening: /evening/i,
    night: /night/i
  }
};
const match = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern,
    parsePattern: parseOrdinalNumberPattern,
    valueCallback: (value) => parseInt(value, 10)
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns,
    defaultParseWidth: "any",
    valueCallback: (index) => index + 1
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns,
    defaultParseWidth: "any"
  })
};
const enUS = {
  code: "en-US",
  formatDistance,
  formatLong,
  formatRelative,
  localize,
  match,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
function getDayOfYear(date) {
  const _date = toDate(date);
  const diff = differenceInCalendarDays(_date, startOfYear(_date));
  const dayOfYear = diff + 1;
  return dayOfYear;
}
function getISOWeek(date) {
  const _date = toDate(date);
  const diff = +startOfISOWeek(_date) - +startOfISOWeekYear(_date);
  return Math.round(diff / millisecondsInWeek) + 1;
}
function getWeekYear(date, options) {
  var _a, _b, _c, _d;
  const _date = toDate(date);
  const year = _date.getFullYear();
  const defaultOptions2 = getDefaultOptions();
  const firstWeekContainsDate = (options == null ? void 0 : options.firstWeekContainsDate) ?? ((_b = (_a = options == null ? void 0 : options.locale) == null ? void 0 : _a.options) == null ? void 0 : _b.firstWeekContainsDate) ?? defaultOptions2.firstWeekContainsDate ?? ((_d = (_c = defaultOptions2.locale) == null ? void 0 : _c.options) == null ? void 0 : _d.firstWeekContainsDate) ?? 1;
  const firstWeekOfNextYear = constructFrom(date, 0);
  firstWeekOfNextYear.setFullYear(year + 1, 0, firstWeekContainsDate);
  firstWeekOfNextYear.setHours(0, 0, 0, 0);
  const startOfNextYear = startOfWeek(firstWeekOfNextYear, options);
  const firstWeekOfThisYear = constructFrom(date, 0);
  firstWeekOfThisYear.setFullYear(year, 0, firstWeekContainsDate);
  firstWeekOfThisYear.setHours(0, 0, 0, 0);
  const startOfThisYear = startOfWeek(firstWeekOfThisYear, options);
  if (_date.getTime() >= startOfNextYear.getTime()) {
    return year + 1;
  } else if (_date.getTime() >= startOfThisYear.getTime()) {
    return year;
  } else {
    return year - 1;
  }
}
function startOfWeekYear(date, options) {
  var _a, _b, _c, _d;
  const defaultOptions2 = getDefaultOptions();
  const firstWeekContainsDate = (options == null ? void 0 : options.firstWeekContainsDate) ?? ((_b = (_a = options == null ? void 0 : options.locale) == null ? void 0 : _a.options) == null ? void 0 : _b.firstWeekContainsDate) ?? defaultOptions2.firstWeekContainsDate ?? ((_d = (_c = defaultOptions2.locale) == null ? void 0 : _c.options) == null ? void 0 : _d.firstWeekContainsDate) ?? 1;
  const year = getWeekYear(date, options);
  const firstWeek = constructFrom(date, 0);
  firstWeek.setFullYear(year, 0, firstWeekContainsDate);
  firstWeek.setHours(0, 0, 0, 0);
  const _date = startOfWeek(firstWeek, options);
  return _date;
}
function getWeek(date, options) {
  const _date = toDate(date);
  const diff = +startOfWeek(_date, options) - +startOfWeekYear(_date, options);
  return Math.round(diff / millisecondsInWeek) + 1;
}
function addLeadingZeros(number, targetLength) {
  const sign = number < 0 ? "-" : "";
  const output = Math.abs(number).toString().padStart(targetLength, "0");
  return sign + output;
}
const lightFormatters = {
  // Year
  y(date, token) {
    const signedYear = date.getFullYear();
    const year = signedYear > 0 ? signedYear : 1 - signedYear;
    return addLeadingZeros(token === "yy" ? year % 100 : year, token.length);
  },
  // Month
  M(date, token) {
    const month = date.getMonth();
    return token === "M" ? String(month + 1) : addLeadingZeros(month + 1, 2);
  },
  // Day of the month
  d(date, token) {
    return addLeadingZeros(date.getDate(), token.length);
  },
  // AM or PM
  a(date, token) {
    const dayPeriodEnumValue = date.getHours() / 12 >= 1 ? "pm" : "am";
    switch (token) {
      case "a":
      case "aa":
        return dayPeriodEnumValue.toUpperCase();
      case "aaa":
        return dayPeriodEnumValue;
      case "aaaaa":
        return dayPeriodEnumValue[0];
      case "aaaa":
      default:
        return dayPeriodEnumValue === "am" ? "a.m." : "p.m.";
    }
  },
  // Hour [1-12]
  h(date, token) {
    return addLeadingZeros(date.getHours() % 12 || 12, token.length);
  },
  // Hour [0-23]
  H(date, token) {
    return addLeadingZeros(date.getHours(), token.length);
  },
  // Minute
  m(date, token) {
    return addLeadingZeros(date.getMinutes(), token.length);
  },
  // Second
  s(date, token) {
    return addLeadingZeros(date.getSeconds(), token.length);
  },
  // Fraction of second
  S(date, token) {
    const numberOfDigits = token.length;
    const milliseconds = date.getMilliseconds();
    const fractionalSeconds = Math.trunc(
      milliseconds * Math.pow(10, numberOfDigits - 3)
    );
    return addLeadingZeros(fractionalSeconds, token.length);
  }
};
const dayPeriodEnum = {
  midnight: "midnight",
  noon: "noon",
  morning: "morning",
  afternoon: "afternoon",
  evening: "evening",
  night: "night"
};
const formatters = {
  // Era
  G: function(date, token, localize2) {
    const era = date.getFullYear() > 0 ? 1 : 0;
    switch (token) {
      case "G":
      case "GG":
      case "GGG":
        return localize2.era(era, { width: "abbreviated" });
      case "GGGGG":
        return localize2.era(era, { width: "narrow" });
      case "GGGG":
      default:
        return localize2.era(era, { width: "wide" });
    }
  },
  // Year
  y: function(date, token, localize2) {
    if (token === "yo") {
      const signedYear = date.getFullYear();
      const year = signedYear > 0 ? signedYear : 1 - signedYear;
      return localize2.ordinalNumber(year, { unit: "year" });
    }
    return lightFormatters.y(date, token);
  },
  // Local week-numbering year
  Y: function(date, token, localize2, options) {
    const signedWeekYear = getWeekYear(date, options);
    const weekYear = signedWeekYear > 0 ? signedWeekYear : 1 - signedWeekYear;
    if (token === "YY") {
      const twoDigitYear = weekYear % 100;
      return addLeadingZeros(twoDigitYear, 2);
    }
    if (token === "Yo") {
      return localize2.ordinalNumber(weekYear, { unit: "year" });
    }
    return addLeadingZeros(weekYear, token.length);
  },
  // ISO week-numbering year
  R: function(date, token) {
    const isoWeekYear = getISOWeekYear(date);
    return addLeadingZeros(isoWeekYear, token.length);
  },
  // Extended year. This is a single number designating the year of this calendar system.
  // The main difference between `y` and `u` localizers are B.C. years:
  // | Year | `y` | `u` |
  // |------|-----|-----|
  // | AC 1 |   1 |   1 |
  // | BC 1 |   1 |   0 |
  // | BC 2 |   2 |  -1 |
  // Also `yy` always returns the last two digits of a year,
  // while `uu` pads single digit years to 2 characters and returns other years unchanged.
  u: function(date, token) {
    const year = date.getFullYear();
    return addLeadingZeros(year, token.length);
  },
  // Quarter
  Q: function(date, token, localize2) {
    const quarter = Math.ceil((date.getMonth() + 1) / 3);
    switch (token) {
      case "Q":
        return String(quarter);
      case "QQ":
        return addLeadingZeros(quarter, 2);
      case "Qo":
        return localize2.ordinalNumber(quarter, { unit: "quarter" });
      case "QQQ":
        return localize2.quarter(quarter, {
          width: "abbreviated",
          context: "formatting"
        });
      case "QQQQQ":
        return localize2.quarter(quarter, {
          width: "narrow",
          context: "formatting"
        });
      case "QQQQ":
      default:
        return localize2.quarter(quarter, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Stand-alone quarter
  q: function(date, token, localize2) {
    const quarter = Math.ceil((date.getMonth() + 1) / 3);
    switch (token) {
      case "q":
        return String(quarter);
      case "qq":
        return addLeadingZeros(quarter, 2);
      case "qo":
        return localize2.ordinalNumber(quarter, { unit: "quarter" });
      case "qqq":
        return localize2.quarter(quarter, {
          width: "abbreviated",
          context: "standalone"
        });
      case "qqqqq":
        return localize2.quarter(quarter, {
          width: "narrow",
          context: "standalone"
        });
      case "qqqq":
      default:
        return localize2.quarter(quarter, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  // Month
  M: function(date, token, localize2) {
    const month = date.getMonth();
    switch (token) {
      case "M":
      case "MM":
        return lightFormatters.M(date, token);
      case "Mo":
        return localize2.ordinalNumber(month + 1, { unit: "month" });
      case "MMM":
        return localize2.month(month, {
          width: "abbreviated",
          context: "formatting"
        });
      case "MMMMM":
        return localize2.month(month, {
          width: "narrow",
          context: "formatting"
        });
      case "MMMM":
      default:
        return localize2.month(month, { width: "wide", context: "formatting" });
    }
  },
  // Stand-alone month
  L: function(date, token, localize2) {
    const month = date.getMonth();
    switch (token) {
      case "L":
        return String(month + 1);
      case "LL":
        return addLeadingZeros(month + 1, 2);
      case "Lo":
        return localize2.ordinalNumber(month + 1, { unit: "month" });
      case "LLL":
        return localize2.month(month, {
          width: "abbreviated",
          context: "standalone"
        });
      case "LLLLL":
        return localize2.month(month, {
          width: "narrow",
          context: "standalone"
        });
      case "LLLL":
      default:
        return localize2.month(month, { width: "wide", context: "standalone" });
    }
  },
  // Local week of year
  w: function(date, token, localize2, options) {
    const week = getWeek(date, options);
    if (token === "wo") {
      return localize2.ordinalNumber(week, { unit: "week" });
    }
    return addLeadingZeros(week, token.length);
  },
  // ISO week of year
  I: function(date, token, localize2) {
    const isoWeek = getISOWeek(date);
    if (token === "Io") {
      return localize2.ordinalNumber(isoWeek, { unit: "week" });
    }
    return addLeadingZeros(isoWeek, token.length);
  },
  // Day of the month
  d: function(date, token, localize2) {
    if (token === "do") {
      return localize2.ordinalNumber(date.getDate(), { unit: "date" });
    }
    return lightFormatters.d(date, token);
  },
  // Day of year
  D: function(date, token, localize2) {
    const dayOfYear = getDayOfYear(date);
    if (token === "Do") {
      return localize2.ordinalNumber(dayOfYear, { unit: "dayOfYear" });
    }
    return addLeadingZeros(dayOfYear, token.length);
  },
  // Day of week
  E: function(date, token, localize2) {
    const dayOfWeek = date.getDay();
    switch (token) {
      case "E":
      case "EE":
      case "EEE":
        return localize2.day(dayOfWeek, {
          width: "abbreviated",
          context: "formatting"
        });
      case "EEEEE":
        return localize2.day(dayOfWeek, {
          width: "narrow",
          context: "formatting"
        });
      case "EEEEEE":
        return localize2.day(dayOfWeek, {
          width: "short",
          context: "formatting"
        });
      case "EEEE":
      default:
        return localize2.day(dayOfWeek, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Local day of week
  e: function(date, token, localize2, options) {
    const dayOfWeek = date.getDay();
    const localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;
    switch (token) {
      case "e":
        return String(localDayOfWeek);
      case "ee":
        return addLeadingZeros(localDayOfWeek, 2);
      case "eo":
        return localize2.ordinalNumber(localDayOfWeek, { unit: "day" });
      case "eee":
        return localize2.day(dayOfWeek, {
          width: "abbreviated",
          context: "formatting"
        });
      case "eeeee":
        return localize2.day(dayOfWeek, {
          width: "narrow",
          context: "formatting"
        });
      case "eeeeee":
        return localize2.day(dayOfWeek, {
          width: "short",
          context: "formatting"
        });
      case "eeee":
      default:
        return localize2.day(dayOfWeek, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Stand-alone local day of week
  c: function(date, token, localize2, options) {
    const dayOfWeek = date.getDay();
    const localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;
    switch (token) {
      case "c":
        return String(localDayOfWeek);
      case "cc":
        return addLeadingZeros(localDayOfWeek, token.length);
      case "co":
        return localize2.ordinalNumber(localDayOfWeek, { unit: "day" });
      case "ccc":
        return localize2.day(dayOfWeek, {
          width: "abbreviated",
          context: "standalone"
        });
      case "ccccc":
        return localize2.day(dayOfWeek, {
          width: "narrow",
          context: "standalone"
        });
      case "cccccc":
        return localize2.day(dayOfWeek, {
          width: "short",
          context: "standalone"
        });
      case "cccc":
      default:
        return localize2.day(dayOfWeek, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  // ISO day of week
  i: function(date, token, localize2) {
    const dayOfWeek = date.getDay();
    const isoDayOfWeek = dayOfWeek === 0 ? 7 : dayOfWeek;
    switch (token) {
      case "i":
        return String(isoDayOfWeek);
      case "ii":
        return addLeadingZeros(isoDayOfWeek, token.length);
      case "io":
        return localize2.ordinalNumber(isoDayOfWeek, { unit: "day" });
      case "iii":
        return localize2.day(dayOfWeek, {
          width: "abbreviated",
          context: "formatting"
        });
      case "iiiii":
        return localize2.day(dayOfWeek, {
          width: "narrow",
          context: "formatting"
        });
      case "iiiiii":
        return localize2.day(dayOfWeek, {
          width: "short",
          context: "formatting"
        });
      case "iiii":
      default:
        return localize2.day(dayOfWeek, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // AM or PM
  a: function(date, token, localize2) {
    const hours = date.getHours();
    const dayPeriodEnumValue = hours / 12 >= 1 ? "pm" : "am";
    switch (token) {
      case "a":
      case "aa":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting"
        });
      case "aaa":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting"
        }).toLowerCase();
      case "aaaaa":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "narrow",
          context: "formatting"
        });
      case "aaaa":
      default:
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // AM, PM, midnight, noon
  b: function(date, token, localize2) {
    const hours = date.getHours();
    let dayPeriodEnumValue;
    if (hours === 12) {
      dayPeriodEnumValue = dayPeriodEnum.noon;
    } else if (hours === 0) {
      dayPeriodEnumValue = dayPeriodEnum.midnight;
    } else {
      dayPeriodEnumValue = hours / 12 >= 1 ? "pm" : "am";
    }
    switch (token) {
      case "b":
      case "bb":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting"
        });
      case "bbb":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting"
        }).toLowerCase();
      case "bbbbb":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "narrow",
          context: "formatting"
        });
      case "bbbb":
      default:
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // in the morning, in the afternoon, in the evening, at night
  B: function(date, token, localize2) {
    const hours = date.getHours();
    let dayPeriodEnumValue;
    if (hours >= 17) {
      dayPeriodEnumValue = dayPeriodEnum.evening;
    } else if (hours >= 12) {
      dayPeriodEnumValue = dayPeriodEnum.afternoon;
    } else if (hours >= 4) {
      dayPeriodEnumValue = dayPeriodEnum.morning;
    } else {
      dayPeriodEnumValue = dayPeriodEnum.night;
    }
    switch (token) {
      case "B":
      case "BB":
      case "BBB":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting"
        });
      case "BBBBB":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "narrow",
          context: "formatting"
        });
      case "BBBB":
      default:
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Hour [1-12]
  h: function(date, token, localize2) {
    if (token === "ho") {
      let hours = date.getHours() % 12;
      if (hours === 0) hours = 12;
      return localize2.ordinalNumber(hours, { unit: "hour" });
    }
    return lightFormatters.h(date, token);
  },
  // Hour [0-23]
  H: function(date, token, localize2) {
    if (token === "Ho") {
      return localize2.ordinalNumber(date.getHours(), { unit: "hour" });
    }
    return lightFormatters.H(date, token);
  },
  // Hour [0-11]
  K: function(date, token, localize2) {
    const hours = date.getHours() % 12;
    if (token === "Ko") {
      return localize2.ordinalNumber(hours, { unit: "hour" });
    }
    return addLeadingZeros(hours, token.length);
  },
  // Hour [1-24]
  k: function(date, token, localize2) {
    let hours = date.getHours();
    if (hours === 0) hours = 24;
    if (token === "ko") {
      return localize2.ordinalNumber(hours, { unit: "hour" });
    }
    return addLeadingZeros(hours, token.length);
  },
  // Minute
  m: function(date, token, localize2) {
    if (token === "mo") {
      return localize2.ordinalNumber(date.getMinutes(), { unit: "minute" });
    }
    return lightFormatters.m(date, token);
  },
  // Second
  s: function(date, token, localize2) {
    if (token === "so") {
      return localize2.ordinalNumber(date.getSeconds(), { unit: "second" });
    }
    return lightFormatters.s(date, token);
  },
  // Fraction of second
  S: function(date, token) {
    return lightFormatters.S(date, token);
  },
  // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
  X: function(date, token, _localize) {
    const timezoneOffset = date.getTimezoneOffset();
    if (timezoneOffset === 0) {
      return "Z";
    }
    switch (token) {
      case "X":
        return formatTimezoneWithOptionalMinutes(timezoneOffset);
      case "XXXX":
      case "XX":
        return formatTimezone(timezoneOffset);
      case "XXXXX":
      case "XXX":
      default:
        return formatTimezone(timezoneOffset, ":");
    }
  },
  // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)
  x: function(date, token, _localize) {
    const timezoneOffset = date.getTimezoneOffset();
    switch (token) {
      case "x":
        return formatTimezoneWithOptionalMinutes(timezoneOffset);
      case "xxxx":
      case "xx":
        return formatTimezone(timezoneOffset);
      case "xxxxx":
      case "xxx":
      default:
        return formatTimezone(timezoneOffset, ":");
    }
  },
  // Timezone (GMT)
  O: function(date, token, _localize) {
    const timezoneOffset = date.getTimezoneOffset();
    switch (token) {
      case "O":
      case "OO":
      case "OOO":
        return "GMT" + formatTimezoneShort(timezoneOffset, ":");
      case "OOOO":
      default:
        return "GMT" + formatTimezone(timezoneOffset, ":");
    }
  },
  // Timezone (specific non-location)
  z: function(date, token, _localize) {
    const timezoneOffset = date.getTimezoneOffset();
    switch (token) {
      case "z":
      case "zz":
      case "zzz":
        return "GMT" + formatTimezoneShort(timezoneOffset, ":");
      case "zzzz":
      default:
        return "GMT" + formatTimezone(timezoneOffset, ":");
    }
  },
  // Seconds timestamp
  t: function(date, token, _localize) {
    const timestamp = Math.trunc(date.getTime() / 1e3);
    return addLeadingZeros(timestamp, token.length);
  },
  // Milliseconds timestamp
  T: function(date, token, _localize) {
    const timestamp = date.getTime();
    return addLeadingZeros(timestamp, token.length);
  }
};
function formatTimezoneShort(offset, delimiter = "") {
  const sign = offset > 0 ? "-" : "+";
  const absOffset = Math.abs(offset);
  const hours = Math.trunc(absOffset / 60);
  const minutes = absOffset % 60;
  if (minutes === 0) {
    return sign + String(hours);
  }
  return sign + String(hours) + delimiter + addLeadingZeros(minutes, 2);
}
function formatTimezoneWithOptionalMinutes(offset, delimiter) {
  if (offset % 60 === 0) {
    const sign = offset > 0 ? "-" : "+";
    return sign + addLeadingZeros(Math.abs(offset) / 60, 2);
  }
  return formatTimezone(offset, delimiter);
}
function formatTimezone(offset, delimiter = "") {
  const sign = offset > 0 ? "-" : "+";
  const absOffset = Math.abs(offset);
  const hours = addLeadingZeros(Math.trunc(absOffset / 60), 2);
  const minutes = addLeadingZeros(absOffset % 60, 2);
  return sign + hours + delimiter + minutes;
}
const dateLongFormatter = (pattern, formatLong2) => {
  switch (pattern) {
    case "P":
      return formatLong2.date({ width: "short" });
    case "PP":
      return formatLong2.date({ width: "medium" });
    case "PPP":
      return formatLong2.date({ width: "long" });
    case "PPPP":
    default:
      return formatLong2.date({ width: "full" });
  }
};
const timeLongFormatter = (pattern, formatLong2) => {
  switch (pattern) {
    case "p":
      return formatLong2.time({ width: "short" });
    case "pp":
      return formatLong2.time({ width: "medium" });
    case "ppp":
      return formatLong2.time({ width: "long" });
    case "pppp":
    default:
      return formatLong2.time({ width: "full" });
  }
};
const dateTimeLongFormatter = (pattern, formatLong2) => {
  const matchResult = pattern.match(/(P+)(p+)?/) || [];
  const datePattern = matchResult[1];
  const timePattern = matchResult[2];
  if (!timePattern) {
    return dateLongFormatter(pattern, formatLong2);
  }
  let dateTimeFormat;
  switch (datePattern) {
    case "P":
      dateTimeFormat = formatLong2.dateTime({ width: "short" });
      break;
    case "PP":
      dateTimeFormat = formatLong2.dateTime({ width: "medium" });
      break;
    case "PPP":
      dateTimeFormat = formatLong2.dateTime({ width: "long" });
      break;
    case "PPPP":
    default:
      dateTimeFormat = formatLong2.dateTime({ width: "full" });
      break;
  }
  return dateTimeFormat.replace("{{date}}", dateLongFormatter(datePattern, formatLong2)).replace("{{time}}", timeLongFormatter(timePattern, formatLong2));
};
const longFormatters = {
  p: timeLongFormatter,
  P: dateTimeLongFormatter
};
const dayOfYearTokenRE = /^D+$/;
const weekYearTokenRE = /^Y+$/;
const throwTokens = ["D", "DD", "YY", "YYYY"];
function isProtectedDayOfYearToken(token) {
  return dayOfYearTokenRE.test(token);
}
function isProtectedWeekYearToken(token) {
  return weekYearTokenRE.test(token);
}
function warnOrThrowProtectedError(token, format2, input) {
  const _message = message(token, format2, input);
  console.warn(_message);
  if (throwTokens.includes(token)) throw new RangeError(_message);
}
function message(token, format2, input) {
  const subject = token[0] === "Y" ? "years" : "days of the month";
  return `Use \`${token.toLowerCase()}\` instead of \`${token}\` (in \`${format2}\`) for formatting ${subject} to the input \`${input}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}
const formattingTokensRegExp = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g;
const longFormattingTokensRegExp = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g;
const escapedStringRegExp = /^'([^]*?)'?$/;
const doubleQuoteRegExp = /''/g;
const unescapedLatinCharacterRegExp = /[a-zA-Z]/;
function format(date, formatStr, options) {
  var _a, _b, _c, _d;
  const defaultOptions2 = getDefaultOptions();
  const locale = defaultOptions2.locale ?? enUS;
  const firstWeekContainsDate = defaultOptions2.firstWeekContainsDate ?? ((_b = (_a = defaultOptions2.locale) == null ? void 0 : _a.options) == null ? void 0 : _b.firstWeekContainsDate) ?? 1;
  const weekStartsOn = defaultOptions2.weekStartsOn ?? ((_d = (_c = defaultOptions2.locale) == null ? void 0 : _c.options) == null ? void 0 : _d.weekStartsOn) ?? 0;
  const originalDate = toDate(date);
  if (!isValid(originalDate)) {
    throw new RangeError("Invalid time value");
  }
  let parts = formatStr.match(longFormattingTokensRegExp).map((substring) => {
    const firstCharacter = substring[0];
    if (firstCharacter === "p" || firstCharacter === "P") {
      const longFormatter = longFormatters[firstCharacter];
      return longFormatter(substring, locale.formatLong);
    }
    return substring;
  }).join("").match(formattingTokensRegExp).map((substring) => {
    if (substring === "''") {
      return { isToken: false, value: "'" };
    }
    const firstCharacter = substring[0];
    if (firstCharacter === "'") {
      return { isToken: false, value: cleanEscapedString(substring) };
    }
    if (formatters[firstCharacter]) {
      return { isToken: true, value: substring };
    }
    if (firstCharacter.match(unescapedLatinCharacterRegExp)) {
      throw new RangeError(
        "Format string contains an unescaped latin alphabet character `" + firstCharacter + "`"
      );
    }
    return { isToken: false, value: substring };
  });
  if (locale.localize.preprocessor) {
    parts = locale.localize.preprocessor(originalDate, parts);
  }
  const formatterOptions = {
    firstWeekContainsDate,
    weekStartsOn,
    locale
  };
  return parts.map((part) => {
    if (!part.isToken) return part.value;
    const token = part.value;
    if (isProtectedWeekYearToken(token) || isProtectedDayOfYearToken(token)) {
      warnOrThrowProtectedError(token, formatStr, String(date));
    }
    const formatter = formatters[token[0]];
    return formatter(originalDate, token, locale.localize, formatterOptions);
  }).join("");
}
function cleanEscapedString(input) {
  const matched = input.match(escapedStringRegExp);
  if (!matched) {
    return input;
  }
  return matched[1].replace(doubleQuoteRegExp, "'");
}
const ComplianceUserDetail = ({ userId, userName, department, onBack }) => {
  const { supabaseClient: supabase2 } = useOrganisationContext();
  const { data: userAssignments, isLoading } = useQuery({
    queryKey: ["user-assignments", userId],
    queryFn: async () => {
      const { data, error } = await supabase2.from("document_assignments").select(`
          assignment_id,
          document_id,
          status,
          due_date,
          completed_at,
          assigned_at,
          documents(title, category)
        `).eq("user_id", userId).order("due_date", { ascending: true });
      if (error) throw error;
      return data.map((assignment) => {
        var _a, _b;
        return {
          ...assignment,
          document_title: ((_a = assignment.documents) == null ? void 0 : _a.title) || "Unknown Document",
          document_category: ((_b = assignment.documents) == null ? void 0 : _b.category) || "General",
          days_overdue: assignment.status !== "Completed" && new Date(assignment.due_date) < /* @__PURE__ */ new Date() ? Math.ceil(((/* @__PURE__ */ new Date()).getTime() - new Date(assignment.due_date).getTime()) / (1e3 * 60 * 60 * 24)) : 0
        };
      });
    }
  });
  const stats = userAssignments ? {
    total: userAssignments.length,
    completed: userAssignments.filter((a) => a.status === "Completed").length,
    overdue: userAssignments.filter((a) => a.status !== "Completed" && new Date(a.due_date) < /* @__PURE__ */ new Date()).length,
    pending: userAssignments.filter((a) => a.status !== "Completed" && new Date(a.due_date) >= /* @__PURE__ */ new Date()).length
  } : { total: 0, completed: 0, overdue: 0 };
  const complianceRate = stats.total > 0 ? stats.completed / stats.total * 100 : 0;
  const getStatusIcon = (assignment) => {
    if (assignment.status === "Completed") {
      return /* @__PURE__ */ jsx(CircleCheckBig, { className: "h-4 w-4 text-green-600" });
    } else if (assignment.days_overdue > 0) {
      return /* @__PURE__ */ jsx(CircleAlert, { className: "h-4 w-4 text-red-600" });
    } else {
      return /* @__PURE__ */ jsx(Clock, { className: "h-4 w-4 text-yellow-600" });
    }
  };
  const getStatusBadge = (assignment) => {
    if (assignment.status === "Completed") {
      return /* @__PURE__ */ jsx(Badge, { className: "bg-green-100 text-green-800", children: "Completed" });
    } else if (assignment.days_overdue > 0) {
      return /* @__PURE__ */ jsxs(Badge, { className: "bg-red-100 text-red-800", children: [
        assignment.days_overdue,
        "d overdue"
      ] });
    } else {
      return /* @__PURE__ */ jsx(Badge, { className: "bg-yellow-100 text-yellow-800", children: "Pending" });
    }
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "sm", onClick: onBack, children: /* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4" }) }),
        /* @__PURE__ */ jsx("div", { className: "h-8 w-32 bg-muted animate-pulse rounded" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4", children: [...Array(4)].map((_, i) => /* @__PURE__ */ jsx("div", { className: "h-24 bg-muted animate-pulse rounded" }, i)) })
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
      /* @__PURE__ */ jsxs(Button, { variant: "ghost", size: "sm", onClick: onBack, children: [
        /* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4" }),
        "Back"
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold", children: userName }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: department })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsxs(Card, { children: [
        /* @__PURE__ */ jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsx(CardTitle, { className: "text-sm font-medium", children: "Total Assignments" }) }),
        /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("div", { className: "text-2xl font-bold", children: stats.total }) })
      ] }),
      /* @__PURE__ */ jsxs(Card, { children: [
        /* @__PURE__ */ jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsx(CardTitle, { className: "text-sm font-medium", children: "Completed" }) }),
        /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("div", { className: "text-2xl font-bold text-green-600", children: stats.completed }) })
      ] }),
      /* @__PURE__ */ jsxs(Card, { children: [
        /* @__PURE__ */ jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsx(CardTitle, { className: "text-sm font-medium", children: "Overdue" }) }),
        /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("div", { className: "text-2xl font-bold text-red-600", children: stats.overdue }) })
      ] }),
      /* @__PURE__ */ jsxs(Card, { children: [
        /* @__PURE__ */ jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsx(CardTitle, { className: "text-sm font-medium", children: "Compliance Rate" }) }),
        /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("div", { className: `text-2xl font-bold ${complianceRate >= 90 ? "text-green-600" : complianceRate >= 70 ? "text-yellow-600" : "text-red-600"}`, children: [
          Math.round(complianceRate),
          "%"
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(Card, { children: [
      /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { children: "Overall Progress" }) }),
      /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-sm", children: [
          /* @__PURE__ */ jsx("span", { children: "Progress" }),
          /* @__PURE__ */ jsxs("span", { children: [
            stats.completed,
            " / ",
            stats.total,
            " completed"
          ] })
        ] }),
        /* @__PURE__ */ jsx(Progress, { value: complianceRate, className: "w-full" })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs(Card, { children: [
      /* @__PURE__ */ jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(FileText, { className: "h-5 w-5" }),
          "Document Assignments"
        ] }),
        /* @__PURE__ */ jsx(CardDescription, { children: "Detailed view of all document assignments for this user" })
      ] }),
      /* @__PURE__ */ jsxs(CardContent, { children: [
        /* @__PURE__ */ jsxs(Table, { children: [
          /* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
            /* @__PURE__ */ jsx(TableHead, { children: "Status" }),
            /* @__PURE__ */ jsx(TableHead, { children: "Document" }),
            /* @__PURE__ */ jsx(TableHead, { children: "Category" }),
            /* @__PURE__ */ jsx(TableHead, { children: "Due Date" }),
            /* @__PURE__ */ jsx(TableHead, { children: "Completed" }),
            /* @__PURE__ */ jsx(TableHead, { children: "Assigned" })
          ] }) }),
          /* @__PURE__ */ jsx(TableBody, { children: userAssignments == null ? void 0 : userAssignments.map((assignment) => /* @__PURE__ */ jsxs(TableRow, { children: [
            /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              getStatusIcon(assignment),
              getStatusBadge(assignment)
            ] }) }),
            /* @__PURE__ */ jsx(TableCell, { className: "font-medium", children: assignment.document_title }),
            /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(Badge, { variant: "outline", children: assignment.document_category }) }),
            /* @__PURE__ */ jsx(TableCell, { children: format(new Date(assignment.due_date), "MMM dd, yyyy") }),
            /* @__PURE__ */ jsx(TableCell, { children: assignment.completed_at ? format(new Date(assignment.completed_at), "MMM dd, yyyy") : "-" }),
            /* @__PURE__ */ jsx(TableCell, { className: "text-muted-foreground", children: format(new Date(assignment.assigned_at), "MMM dd, yyyy") })
          ] }, assignment.assignment_id)) })
        ] }),
        (!userAssignments || userAssignments.length === 0) && /* @__PURE__ */ jsx("div", { className: "text-center py-8 text-muted-foreground", children: "No document assignments found for this user." })
      ] })
    ] })
  ] });
};
const ComplianceDocumentDetail = ({ documentId, documentTitle, onBack }) => {
  const { supabaseClient: supabase2 } = useOrganisationContext();
  const { data: documentAssignments, isLoading } = useQuery({
    queryKey: ["document-assignments", documentId],
    queryFn: async () => {
      const { data: assignments, error } = await supabase2.from("document_assignments").select(`
          assignment_id,
          user_id,
          status,
          due_date,
          completed_at,
          assigned_at
        `).eq("document_id", documentId).order("due_date", { ascending: true });
      if (error) throw error;
      const { data: profiles } = await supabase2.from("profiles").select("id, full_name");
      const { data: userDepartments } = await supabase2.from("user_departments").select(`
          user_id,
          is_primary,
          departments(name)
        `);
      const profileMap = new Map((profiles == null ? void 0 : profiles.map((p) => [p.id, p])) || []);
      const departmentMap = /* @__PURE__ */ new Map();
      userDepartments == null ? void 0 : userDepartments.forEach((ud) => {
        var _a;
        const deptName = ((_a = ud.departments) == null ? void 0 : _a.name) || "Unknown";
        if (ud.is_primary || !departmentMap.has(ud.user_id)) {
          departmentMap.set(ud.user_id, deptName);
        }
      });
      return assignments.map((assignment) => {
        var _a;
        return {
          ...assignment,
          user_name: ((_a = profileMap.get(assignment.user_id)) == null ? void 0 : _a.full_name) || "Unknown User",
          department: departmentMap.get(assignment.user_id) || "No Department",
          days_overdue: assignment.status !== "Completed" && new Date(assignment.due_date) < /* @__PURE__ */ new Date() ? Math.ceil(((/* @__PURE__ */ new Date()).getTime() - new Date(assignment.due_date).getTime()) / (1e3 * 60 * 60 * 24)) : 0
        };
      });
    }
  });
  const { data: documentInfo } = useQuery({
    queryKey: ["document-info", documentId],
    queryFn: async () => {
      const { data, error } = await supabase2.from("documents").select("title, description, category, required, due_days").eq("document_id", documentId).single();
      if (error) throw error;
      return data;
    }
  });
  const stats = documentAssignments ? {
    total: documentAssignments.length,
    completed: documentAssignments.filter((a) => a.status === "Completed").length,
    overdue: documentAssignments.filter((a) => a.status !== "Completed" && new Date(a.due_date) < /* @__PURE__ */ new Date()).length,
    pending: documentAssignments.filter((a) => a.status !== "Completed" && new Date(a.due_date) >= /* @__PURE__ */ new Date()).length
  } : { total: 0, completed: 0, overdue: 0 };
  const complianceRate = stats.total > 0 ? stats.completed / stats.total * 100 : 0;
  const getStatusIcon = (assignment) => {
    if (assignment.status === "Completed") {
      return /* @__PURE__ */ jsx(CircleCheckBig, { className: "h-4 w-4 text-green-600" });
    } else if (assignment.days_overdue > 0) {
      return /* @__PURE__ */ jsx(CircleAlert, { className: "h-4 w-4 text-red-600" });
    } else {
      return /* @__PURE__ */ jsx(Clock, { className: "h-4 w-4 text-yellow-600" });
    }
  };
  const getStatusBadge = (assignment) => {
    if (assignment.status === "Completed") {
      return /* @__PURE__ */ jsx(Badge, { className: "bg-green-100 text-green-800", children: "Completed" });
    } else if (assignment.days_overdue > 0) {
      return /* @__PURE__ */ jsxs(Badge, { className: "bg-red-100 text-red-800", children: [
        assignment.days_overdue,
        "d overdue"
      ] });
    } else {
      return /* @__PURE__ */ jsx(Badge, { className: "bg-yellow-100 text-yellow-800", children: "Pending" });
    }
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "sm", onClick: onBack, children: /* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4" }) }),
        /* @__PURE__ */ jsx("div", { className: "h-8 w-48 bg-muted animate-pulse rounded" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4", children: [...Array(4)].map((_, i) => /* @__PURE__ */ jsx("div", { className: "h-24 bg-muted animate-pulse rounded" }, i)) })
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
      /* @__PURE__ */ jsxs(Button, { variant: "ghost", size: "sm", onClick: onBack, children: [
        /* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4" }),
        "Back"
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold", children: documentTitle }),
        documentInfo && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mt-1", children: [
          /* @__PURE__ */ jsx(Badge, { variant: "outline", children: documentInfo.category }),
          documentInfo.required && /* @__PURE__ */ jsx(Badge, { className: "bg-red-100 text-red-800", children: "Required" }),
          /* @__PURE__ */ jsxs("span", { className: "text-sm text-muted-foreground", children: [
            "Due in ",
            documentInfo.due_days,
            " days"
          ] })
        ] })
      ] })
    ] }),
    (documentInfo == null ? void 0 : documentInfo.description) && /* @__PURE__ */ jsxs(Card, { children: [
      /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(FileText, { className: "h-5 w-5" }),
        "Document Information"
      ] }) }),
      /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: documentInfo.description }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsxs(Card, { children: [
        /* @__PURE__ */ jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsx(CardTitle, { className: "text-sm font-medium", children: "Total Assignments" }) }),
        /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("div", { className: "text-2xl font-bold", children: stats.total }) })
      ] }),
      /* @__PURE__ */ jsxs(Card, { children: [
        /* @__PURE__ */ jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsx(CardTitle, { className: "text-sm font-medium", children: "Completed" }) }),
        /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("div", { className: "text-2xl font-bold text-green-600", children: stats.completed }) })
      ] }),
      /* @__PURE__ */ jsxs(Card, { children: [
        /* @__PURE__ */ jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsx(CardTitle, { className: "text-sm font-medium", children: "Overdue" }) }),
        /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("div", { className: "text-2xl font-bold text-red-600", children: stats.overdue }) })
      ] }),
      /* @__PURE__ */ jsxs(Card, { children: [
        /* @__PURE__ */ jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsx(CardTitle, { className: "text-sm font-medium", children: "Compliance Rate" }) }),
        /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("div", { className: `text-2xl font-bold ${complianceRate >= 90 ? "text-green-600" : complianceRate >= 70 ? "text-yellow-600" : "text-red-600"}`, children: [
          Math.round(complianceRate),
          "%"
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(Card, { children: [
      /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { children: "Overall Progress" }) }),
      /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-sm", children: [
          /* @__PURE__ */ jsx("span", { children: "Progress" }),
          /* @__PURE__ */ jsxs("span", { children: [
            stats.completed,
            " / ",
            stats.total,
            " completed"
          ] })
        ] }),
        /* @__PURE__ */ jsx(Progress, { value: complianceRate, className: "w-full" })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs(Card, { children: [
      /* @__PURE__ */ jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(Users, { className: "h-5 w-5" }),
          "User Assignments"
        ] }),
        /* @__PURE__ */ jsx(CardDescription, { children: "Status of all users assigned to read this document" })
      ] }),
      /* @__PURE__ */ jsxs(CardContent, { children: [
        /* @__PURE__ */ jsxs(Table, { children: [
          /* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
            /* @__PURE__ */ jsx(TableHead, { children: "Status" }),
            /* @__PURE__ */ jsx(TableHead, { children: "User" }),
            /* @__PURE__ */ jsx(TableHead, { children: "Department" }),
            /* @__PURE__ */ jsx(TableHead, { children: "Due Date" }),
            /* @__PURE__ */ jsx(TableHead, { children: "Completed" }),
            /* @__PURE__ */ jsx(TableHead, { children: "Assigned" })
          ] }) }),
          /* @__PURE__ */ jsx(TableBody, { children: documentAssignments == null ? void 0 : documentAssignments.map((assignment) => /* @__PURE__ */ jsxs(TableRow, { children: [
            /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              getStatusIcon(assignment),
              getStatusBadge(assignment)
            ] }) }),
            /* @__PURE__ */ jsx(TableCell, { className: "font-medium", children: assignment.user_name }),
            /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(Badge, { variant: "outline", children: assignment.department }) }),
            /* @__PURE__ */ jsx(TableCell, { children: format(new Date(assignment.due_date), "MMM dd, yyyy") }),
            /* @__PURE__ */ jsx(TableCell, { children: assignment.completed_at ? format(new Date(assignment.completed_at), "MMM dd, yyyy") : "-" }),
            /* @__PURE__ */ jsx(TableCell, { className: "text-muted-foreground", children: format(new Date(assignment.assigned_at), "MMM dd, yyyy") })
          ] }, assignment.assignment_id)) })
        ] }),
        (!documentAssignments || documentAssignments.length === 0) && /* @__PURE__ */ jsx("div", { className: "text-center py-8 text-muted-foreground", children: "No assignments found for this document." })
      ] })
    ] })
  ] });
};
const ComplianceDepartmentDetail = ({ department, onBack }) => {
  const { supabaseClient: supabase2 } = useOrganisationContext();
  const { data: departmentAssignments, isLoading } = useQuery({
    queryKey: ["department-assignments", department],
    queryFn: async () => {
      const { data: userDepartments } = await supabase2.from("user_departments").select(`
          user_id,
          departments!inner(name)
        `).eq("departments.name", department);
      if (!userDepartments || userDepartments.length === 0) {
        return [];
      }
      const userIds = userDepartments.map((ud) => ud.user_id);
      const { data: assignments, error } = await supabase2.from("document_assignments").select(`
          assignment_id,
          user_id,
          document_id,
          status,
          due_date,
          completed_at,
          assigned_at,
          documents(title, category)
        `).in("user_id", userIds).order("due_date", { ascending: true });
      if (error) throw error;
      const { data: profiles } = await supabase2.from("profiles").select("id, full_name");
      const profileMap = new Map((profiles == null ? void 0 : profiles.map((p) => [p.id, p])) || []);
      return assignments.map((assignment) => {
        var _a, _b, _c;
        return {
          ...assignment,
          user_name: ((_a = profileMap.get(assignment.user_id)) == null ? void 0 : _a.full_name) || "Unknown User",
          document_title: ((_b = assignment.documents) == null ? void 0 : _b.title) || "Unknown Document",
          document_category: ((_c = assignment.documents) == null ? void 0 : _c.category) || "General",
          days_overdue: assignment.status !== "Completed" && new Date(assignment.due_date) < /* @__PURE__ */ new Date() ? Math.ceil(((/* @__PURE__ */ new Date()).getTime() - new Date(assignment.due_date).getTime()) / (1e3 * 60 * 60 * 24)) : 0
        };
      });
    }
  });
  const { data: departmentUsers } = useQuery({
    queryKey: ["department-users", department],
    queryFn: async () => {
      const { data, error } = await supabase2.from("user_departments").select(`
          user_id,
          departments!inner(name),
          profiles!inner(full_name)
        `).eq("departments.name", department);
      if (error) throw error;
      return data;
    }
  });
  const stats = departmentAssignments ? {
    total: departmentAssignments.length,
    completed: departmentAssignments.filter((a) => a.status === "Completed").length,
    overdue: departmentAssignments.filter((a) => a.status !== "Completed" && new Date(a.due_date) < /* @__PURE__ */ new Date()).length,
    pending: departmentAssignments.filter((a) => a.status !== "Completed" && new Date(a.due_date) >= /* @__PURE__ */ new Date()).length
  } : { total: 0, completed: 0, overdue: 0 };
  const complianceRate = stats.total > 0 ? stats.completed / stats.total * 100 : 0;
  const userStats = departmentAssignments ? Object.entries(
    departmentAssignments.reduce((acc, assignment) => {
      const userId = assignment.user_id;
      if (!acc[userId]) {
        acc[userId] = {
          user_id: userId,
          user_name: assignment.user_name,
          assignments: []
        };
      }
      acc[userId].assignments.push(assignment);
      return acc;
    }, {})
  ).map(([userId, data]) => {
    const assignments = data.assignments;
    const completed = assignments.filter((a) => a.status === "Completed").length;
    const overdue = assignments.filter((a) => a.status !== "Completed" && new Date(a.due_date) < /* @__PURE__ */ new Date()).length;
    return {
      user_id: userId,
      user_name: data.user_name,
      total_assignments: assignments.length,
      completed_assignments: completed,
      overdue_assignments: overdue,
      compliance_rate: assignments.length > 0 ? completed / assignments.length * 100 : 0
    };
  }) : [];
  const getStatusIcon = (assignment) => {
    if (assignment.status === "Completed") {
      return /* @__PURE__ */ jsx(CircleCheckBig, { className: "h-4 w-4 text-green-600" });
    } else if (assignment.days_overdue > 0) {
      return /* @__PURE__ */ jsx(CircleAlert, { className: "h-4 w-4 text-red-600" });
    } else {
      return /* @__PURE__ */ jsx(Clock, { className: "h-4 w-4 text-yellow-600" });
    }
  };
  const getStatusBadge = (assignment) => {
    if (assignment.status === "Completed") {
      return /* @__PURE__ */ jsx(Badge, { className: "bg-green-100 text-green-800", children: "Completed" });
    } else if (assignment.days_overdue > 0) {
      return /* @__PURE__ */ jsxs(Badge, { className: "bg-red-100 text-red-800", children: [
        assignment.days_overdue,
        "d overdue"
      ] });
    } else {
      return /* @__PURE__ */ jsx(Badge, { className: "bg-yellow-100 text-yellow-800", children: "Pending" });
    }
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "sm", onClick: onBack, children: /* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4" }) }),
        /* @__PURE__ */ jsx("div", { className: "h-8 w-48 bg-muted animate-pulse rounded" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4", children: [...Array(4)].map((_, i) => /* @__PURE__ */ jsx("div", { className: "h-24 bg-muted animate-pulse rounded" }, i)) })
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
      /* @__PURE__ */ jsxs(Button, { variant: "ghost", size: "sm", onClick: onBack, children: [
        /* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4" }),
        "Back"
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold", children: department }),
        /* @__PURE__ */ jsxs("p", { className: "text-muted-foreground", children: [
          (departmentUsers == null ? void 0 : departmentUsers.length) || 0,
          " users in department"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsxs(Card, { children: [
        /* @__PURE__ */ jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsx(CardTitle, { className: "text-sm font-medium", children: "Total Assignments" }) }),
        /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("div", { className: "text-2xl font-bold", children: stats.total }) })
      ] }),
      /* @__PURE__ */ jsxs(Card, { children: [
        /* @__PURE__ */ jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsx(CardTitle, { className: "text-sm font-medium", children: "Completed" }) }),
        /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("div", { className: "text-2xl font-bold text-green-600", children: stats.completed }) })
      ] }),
      /* @__PURE__ */ jsxs(Card, { children: [
        /* @__PURE__ */ jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsx(CardTitle, { className: "text-sm font-medium", children: "Overdue" }) }),
        /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("div", { className: "text-2xl font-bold text-red-600", children: stats.overdue }) })
      ] }),
      /* @__PURE__ */ jsxs(Card, { children: [
        /* @__PURE__ */ jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsx(CardTitle, { className: "text-sm font-medium", children: "Compliance Rate" }) }),
        /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("div", { className: `text-2xl font-bold ${complianceRate >= 90 ? "text-green-600" : complianceRate >= 70 ? "text-yellow-600" : "text-red-600"}`, children: [
          Math.round(complianceRate),
          "%"
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(Card, { children: [
      /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { children: "Department Progress" }) }),
      /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-sm", children: [
          /* @__PURE__ */ jsx("span", { children: "Progress" }),
          /* @__PURE__ */ jsxs("span", { children: [
            stats.completed,
            " / ",
            stats.total,
            " completed"
          ] })
        ] }),
        /* @__PURE__ */ jsx(Progress, { value: complianceRate, className: "w-full" })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs(Card, { children: [
      /* @__PURE__ */ jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(Users, { className: "h-5 w-5" }),
          "User Performance"
        ] }),
        /* @__PURE__ */ jsx(CardDescription, { children: "Individual compliance performance for users in this department" })
      ] }),
      /* @__PURE__ */ jsxs(CardContent, { children: [
        /* @__PURE__ */ jsx("div", { className: "grid gap-4", children: userStats.map((user) => /* @__PURE__ */ jsxs(Card, { children: [
          /* @__PURE__ */ jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsx(CardTitle, { className: "text-lg", children: user.user_name }),
            /* @__PURE__ */ jsxs(Badge, { className: user.compliance_rate >= 90 ? "bg-green-100 text-green-800" : user.compliance_rate >= 70 ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800", children: [
              Math.round(user.compliance_rate),
              "% Complete"
            ] })
          ] }) }),
          /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-sm", children: [
              /* @__PURE__ */ jsx("span", { children: "Progress" }),
              /* @__PURE__ */ jsxs("span", { children: [
                user.completed_assignments,
                " / ",
                user.total_assignments
              ] })
            ] }),
            /* @__PURE__ */ jsx(Progress, { value: user.compliance_rate, className: "w-full" }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-sm text-muted-foreground", children: [
              /* @__PURE__ */ jsxs("span", { children: [
                "Completed: ",
                user.completed_assignments
              ] }),
              /* @__PURE__ */ jsxs("span", { children: [
                "Overdue: ",
                user.overdue_assignments
              ] })
            ] })
          ] }) })
        ] }, user.user_id)) }),
        userStats.length === 0 && /* @__PURE__ */ jsx("div", { className: "text-center py-8 text-muted-foreground", children: "No users found in this department." })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(Card, { children: [
      /* @__PURE__ */ jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(Building, { className: "h-5 w-5" }),
          "All Assignments"
        ] }),
        /* @__PURE__ */ jsx(CardDescription, { children: "Detailed view of all document assignments in this department" })
      ] }),
      /* @__PURE__ */ jsxs(CardContent, { children: [
        /* @__PURE__ */ jsxs(Table, { children: [
          /* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
            /* @__PURE__ */ jsx(TableHead, { children: "Status" }),
            /* @__PURE__ */ jsx(TableHead, { children: "User" }),
            /* @__PURE__ */ jsx(TableHead, { children: "Document" }),
            /* @__PURE__ */ jsx(TableHead, { children: "Category" }),
            /* @__PURE__ */ jsx(TableHead, { children: "Due Date" }),
            /* @__PURE__ */ jsx(TableHead, { children: "Completed" })
          ] }) }),
          /* @__PURE__ */ jsx(TableBody, { children: departmentAssignments == null ? void 0 : departmentAssignments.map((assignment) => /* @__PURE__ */ jsxs(TableRow, { children: [
            /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              getStatusIcon(assignment),
              getStatusBadge(assignment)
            ] }) }),
            /* @__PURE__ */ jsx(TableCell, { className: "font-medium", children: assignment.user_name }),
            /* @__PURE__ */ jsx(TableCell, { children: assignment.document_title }),
            /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(Badge, { variant: "outline", children: assignment.document_category }) }),
            /* @__PURE__ */ jsx(TableCell, { children: format(new Date(assignment.due_date), "MMM dd, yyyy") }),
            /* @__PURE__ */ jsx(TableCell, { children: assignment.completed_at ? format(new Date(assignment.completed_at), "MMM dd, yyyy") : "-" })
          ] }, assignment.assignment_id)) })
        ] }),
        (!departmentAssignments || departmentAssignments.length === 0) && /* @__PURE__ */ jsx("div", { className: "text-center py-8 text-muted-foreground", children: "No assignments found for this department." })
      ] })
    ] })
  ] });
};
const ComplianceRoleDetail = ({ role, onBack }) => {
  const { supabaseClient: supabase2 } = useOrganisationContext();
  const { data: roleAssignments, isLoading } = useQuery({
    queryKey: ["role-assignments", role],
    queryFn: async () => {
      const { data: userRoles } = await supabase2.from("user_profile_roles").select(`
          user_id,
          roles!inner(name)
        `).eq("roles.name", role);
      if (!userRoles || userRoles.length === 0) {
        return [];
      }
      const userIds = userRoles.map((ur) => ur.user_id);
      const { data: assignments, error } = await supabase2.from("document_assignments").select(`
          assignment_id,
          user_id,
          document_id,
          status,
          due_date,
          completed_at,
          assigned_at,
          documents(title, category)
        `).in("user_id", userIds).order("due_date", { ascending: true });
      if (error) throw error;
      const { data: profiles } = await supabase2.from("profiles").select("id, full_name");
      const { data: userDepartments } = await supabase2.from("user_departments").select(`
          user_id,
          is_primary,
          departments(name)
        `);
      const profileMap = new Map((profiles == null ? void 0 : profiles.map((p) => [p.id, p])) || []);
      const departmentMap = /* @__PURE__ */ new Map();
      userDepartments == null ? void 0 : userDepartments.forEach((ud) => {
        var _a;
        const deptName = ((_a = ud.departments) == null ? void 0 : _a.name) || "Unknown";
        if (ud.is_primary || !departmentMap.has(ud.user_id)) {
          departmentMap.set(ud.user_id, deptName);
        }
      });
      return assignments.map((assignment) => {
        var _a, _b, _c;
        return {
          ...assignment,
          user_name: ((_a = profileMap.get(assignment.user_id)) == null ? void 0 : _a.full_name) || "Unknown User",
          department: departmentMap.get(assignment.user_id) || "No Department",
          document_title: ((_b = assignment.documents) == null ? void 0 : _b.title) || "Unknown Document",
          document_category: ((_c = assignment.documents) == null ? void 0 : _c.category) || "General",
          days_overdue: assignment.status !== "Completed" && new Date(assignment.due_date) < /* @__PURE__ */ new Date() ? Math.ceil(((/* @__PURE__ */ new Date()).getTime() - new Date(assignment.due_date).getTime()) / (1e3 * 60 * 60 * 24)) : 0
        };
      });
    }
  });
  const { data: roleUsers } = useQuery({
    queryKey: ["role-users", role],
    queryFn: async () => {
      const { data, error } = await supabase2.from("user_profile_roles").select(`
          user_id,
          roles!inner(name),
          profiles!inner(full_name)
        `).eq("roles.name", role);
      if (error) throw error;
      return data;
    }
  });
  const stats = roleAssignments ? {
    total: roleAssignments.length,
    completed: roleAssignments.filter((a) => a.status === "Completed").length,
    overdue: roleAssignments.filter((a) => a.status !== "Completed" && new Date(a.due_date) < /* @__PURE__ */ new Date()).length,
    pending: roleAssignments.filter((a) => a.status !== "Completed" && new Date(a.due_date) >= /* @__PURE__ */ new Date()).length
  } : { total: 0, completed: 0, overdue: 0 };
  const complianceRate = stats.total > 0 ? stats.completed / stats.total * 100 : 0;
  const userStats = roleAssignments ? Object.entries(
    roleAssignments.reduce((acc, assignment) => {
      const userId = assignment.user_id;
      if (!acc[userId]) {
        acc[userId] = {
          user_id: userId,
          user_name: assignment.user_name,
          department: assignment.department,
          assignments: []
        };
      }
      acc[userId].assignments.push(assignment);
      return acc;
    }, {})
  ).map(([userId, data]) => {
    const assignments = data.assignments;
    const completed = assignments.filter((a) => a.status === "Completed").length;
    const overdue = assignments.filter((a) => a.status !== "Completed" && new Date(a.due_date) < /* @__PURE__ */ new Date()).length;
    return {
      user_id: userId,
      user_name: data.user_name,
      department: data.department,
      total_assignments: assignments.length,
      completed_assignments: completed,
      overdue_assignments: overdue,
      compliance_rate: assignments.length > 0 ? completed / assignments.length * 100 : 0
    };
  }) : [];
  const getStatusIcon = (assignment) => {
    if (assignment.status === "Completed") {
      return /* @__PURE__ */ jsx(CircleCheckBig, { className: "h-4 w-4 text-green-600" });
    } else if (assignment.days_overdue > 0) {
      return /* @__PURE__ */ jsx(CircleAlert, { className: "h-4 w-4 text-red-600" });
    } else {
      return /* @__PURE__ */ jsx(Clock, { className: "h-4 w-4 text-yellow-600" });
    }
  };
  const getStatusBadge = (assignment) => {
    if (assignment.status === "Completed") {
      return /* @__PURE__ */ jsx(Badge, { className: "bg-green-100 text-green-800", children: "Completed" });
    } else if (assignment.days_overdue > 0) {
      return /* @__PURE__ */ jsxs(Badge, { className: "bg-red-100 text-red-800", children: [
        assignment.days_overdue,
        "d overdue"
      ] });
    } else {
      return /* @__PURE__ */ jsx(Badge, { className: "bg-yellow-100 text-yellow-800", children: "Pending" });
    }
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "sm", onClick: onBack, children: /* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4" }) }),
        /* @__PURE__ */ jsx("div", { className: "h-8 w-48 bg-muted animate-pulse rounded" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4", children: [...Array(4)].map((_, i) => /* @__PURE__ */ jsx("div", { className: "h-24 bg-muted animate-pulse rounded" }, i)) })
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
      /* @__PURE__ */ jsxs(Button, { variant: "ghost", size: "sm", onClick: onBack, children: [
        /* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4" }),
        "Back"
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold", children: role }),
        /* @__PURE__ */ jsxs("p", { className: "text-muted-foreground", children: [
          (roleUsers == null ? void 0 : roleUsers.length) || 0,
          " users with this role"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsxs(Card, { children: [
        /* @__PURE__ */ jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsx(CardTitle, { className: "text-sm font-medium", children: "Total Assignments" }) }),
        /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("div", { className: "text-2xl font-bold", children: stats.total }) })
      ] }),
      /* @__PURE__ */ jsxs(Card, { children: [
        /* @__PURE__ */ jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsx(CardTitle, { className: "text-sm font-medium", children: "Completed" }) }),
        /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("div", { className: "text-2xl font-bold text-green-600", children: stats.completed }) })
      ] }),
      /* @__PURE__ */ jsxs(Card, { children: [
        /* @__PURE__ */ jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsx(CardTitle, { className: "text-sm font-medium", children: "Overdue" }) }),
        /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("div", { className: "text-2xl font-bold text-red-600", children: stats.overdue }) })
      ] }),
      /* @__PURE__ */ jsxs(Card, { children: [
        /* @__PURE__ */ jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsx(CardTitle, { className: "text-sm font-medium", children: "Compliance Rate" }) }),
        /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("div", { className: `text-2xl font-bold ${complianceRate >= 90 ? "text-green-600" : complianceRate >= 70 ? "text-yellow-600" : "text-red-600"}`, children: [
          Math.round(complianceRate),
          "%"
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(Card, { children: [
      /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { children: "Role Progress" }) }),
      /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-sm", children: [
          /* @__PURE__ */ jsx("span", { children: "Progress" }),
          /* @__PURE__ */ jsxs("span", { children: [
            stats.completed,
            " / ",
            stats.total,
            " completed"
          ] })
        ] }),
        /* @__PURE__ */ jsx(Progress, { value: complianceRate, className: "w-full" })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs(Card, { children: [
      /* @__PURE__ */ jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(Users, { className: "h-5 w-5" }),
          "User Performance"
        ] }),
        /* @__PURE__ */ jsx(CardDescription, { children: "Individual compliance performance for users with this role" })
      ] }),
      /* @__PURE__ */ jsxs(CardContent, { children: [
        /* @__PURE__ */ jsx("div", { className: "grid gap-4", children: userStats.map((user) => /* @__PURE__ */ jsxs(Card, { children: [
          /* @__PURE__ */ jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(CardTitle, { className: "text-lg", children: user.user_name }),
              /* @__PURE__ */ jsx(CardDescription, { children: user.department })
            ] }),
            /* @__PURE__ */ jsxs(Badge, { className: user.compliance_rate >= 90 ? "bg-green-100 text-green-800" : user.compliance_rate >= 70 ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800", children: [
              Math.round(user.compliance_rate),
              "% Complete"
            ] })
          ] }) }),
          /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-sm", children: [
              /* @__PURE__ */ jsx("span", { children: "Progress" }),
              /* @__PURE__ */ jsxs("span", { children: [
                user.completed_assignments,
                " / ",
                user.total_assignments
              ] })
            ] }),
            /* @__PURE__ */ jsx(Progress, { value: user.compliance_rate, className: "w-full" }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-sm text-muted-foreground", children: [
              /* @__PURE__ */ jsxs("span", { children: [
                "Completed: ",
                user.completed_assignments
              ] }),
              /* @__PURE__ */ jsxs("span", { children: [
                "Overdue: ",
                user.overdue_assignments
              ] })
            ] })
          ] }) })
        ] }, user.user_id)) }),
        userStats.length === 0 && /* @__PURE__ */ jsx("div", { className: "text-center py-8 text-muted-foreground", children: "No users found with this role." })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(Card, { children: [
      /* @__PURE__ */ jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(UserCheck, { className: "h-5 w-5" }),
          "All Assignments"
        ] }),
        /* @__PURE__ */ jsx(CardDescription, { children: "Detailed view of all document assignments for this role" })
      ] }),
      /* @__PURE__ */ jsxs(CardContent, { children: [
        /* @__PURE__ */ jsxs(Table, { children: [
          /* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
            /* @__PURE__ */ jsx(TableHead, { children: "Status" }),
            /* @__PURE__ */ jsx(TableHead, { children: "User" }),
            /* @__PURE__ */ jsx(TableHead, { children: "Department" }),
            /* @__PURE__ */ jsx(TableHead, { children: "Document" }),
            /* @__PURE__ */ jsx(TableHead, { children: "Category" }),
            /* @__PURE__ */ jsx(TableHead, { children: "Due Date" }),
            /* @__PURE__ */ jsx(TableHead, { children: "Completed" })
          ] }) }),
          /* @__PURE__ */ jsx(TableBody, { children: roleAssignments == null ? void 0 : roleAssignments.map((assignment) => /* @__PURE__ */ jsxs(TableRow, { children: [
            /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              getStatusIcon(assignment),
              getStatusBadge(assignment)
            ] }) }),
            /* @__PURE__ */ jsx(TableCell, { className: "font-medium", children: assignment.user_name }),
            /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(Badge, { variant: "outline", children: assignment.department }) }),
            /* @__PURE__ */ jsx(TableCell, { children: assignment.document_title }),
            /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(Badge, { variant: "outline", children: assignment.document_category }) }),
            /* @__PURE__ */ jsx(TableCell, { children: format(new Date(assignment.due_date), "MMM dd, yyyy") }),
            /* @__PURE__ */ jsx(TableCell, { children: assignment.completed_at ? format(new Date(assignment.completed_at), "MMM dd, yyyy") : "-" })
          ] }, assignment.assignment_id)) })
        ] }),
        (!roleAssignments || roleAssignments.length === 0) && /* @__PURE__ */ jsx("div", { className: "text-center py-8 text-muted-foreground", children: "No assignments found for this role." })
      ] })
    ] })
  ] });
};
const ComplianceTracking = () => {
  const { supabaseClient: supabase2 } = useOrganisationContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("users");
  const [showCompletedDetails, setShowCompletedDetails] = useState(false);
  const [showOverdueDetails, setShowOverdueDetails] = useState(false);
  const [selectedUserDetail, setSelectedUserDetail] = useState(null);
  const [selectedDocumentDetail, setSelectedDocumentDetail] = useState(null);
  const [selectedDepartmentDetail, setSelectedDepartmentDetail] = useState(null);
  const [selectedRoleDetail, setSelectedRoleDetail] = useState(null);
  const { data: overallStats } = useQuery({
    queryKey: ["compliance-stats"],
    queryFn: async () => {
      const { data, error } = await supabase2.from("document_assignments").select("status, due_date");
      if (error) throw error;
      const totalAssignments = data.length;
      const completedAssignments = data.filter((a) => a.status === "Completed").length;
      const overdueAssignments = data.filter(
        (a) => new Date(a.due_date) < /* @__PURE__ */ new Date() && a.status !== "Completed"
      ).length;
      const complianceRate = totalAssignments > 0 ? completedAssignments / totalAssignments * 100 : 0;
      return {
        totalAssignments,
        completedAssignments,
        overdueAssignments,
        complianceRate
      };
    }
  });
  const { data: documentStats } = useQuery({
    queryKey: ["document-compliance-stats"],
    queryFn: async () => {
      const { data, error } = await supabase2.from("document_assignments").select(`
          document_id,
          status,
          due_date,
          document:documents(title)
        `);
      if (error) throw error;
      const statsMap = /* @__PURE__ */ new Map();
      data.forEach((assignment) => {
        const key = assignment.document_id;
        const current = statsMap.get(key) || {
          title: assignment.document.title,
          total: 0,
          completed: 0,
          overdue: 0
        };
        current.total++;
        if (assignment.status === "Completed") {
          current.completed++;
        } else if (new Date(assignment.due_date) < /* @__PURE__ */ new Date()) {
          current.overdue++;
        }
        statsMap.set(key, current);
      });
      return Array.from(statsMap.entries()).map(([document_id, stats]) => ({
        document_id,
        document_title: stats.title,
        total_assignments: stats.total,
        completed_assignments: stats.completed,
        overdue_assignments: stats.overdue,
        compliance_rate: stats.total > 0 ? stats.completed / stats.total * 100 : 0
      }));
    }
  });
  const { data: userStats } = useQuery({
    queryKey: ["user-compliance-stats"],
    queryFn: async () => {
      const { data, error } = await supabase2.from("document_assignments").select(`
          user_id,
          status,
          due_date
        `);
      if (error) throw error;
      const statsMap = /* @__PURE__ */ new Map();
      const { data: profiles } = await supabase2.from("profiles").select("id, full_name, location_id");
      const { data: userDepartments } = await supabase2.from("user_departments").select(`
          user_id,
          is_primary,
          departments(name)
        `);
      const profileMap = new Map((profiles == null ? void 0 : profiles.map((p) => [p.id, p])) || []);
      const departmentMap = /* @__PURE__ */ new Map();
      userDepartments == null ? void 0 : userDepartments.forEach((ud) => {
        var _a;
        const deptName = ((_a = ud.departments) == null ? void 0 : _a.name) || "Unknown";
        if (ud.is_primary || !departmentMap.has(ud.user_id)) {
          departmentMap.set(ud.user_id, deptName);
        }
      });
      const locationIdMap = new Map(
        (profiles == null ? void 0 : profiles.map((p) => [p.id, p.location_id ?? void 0])) || []
      );
      data.forEach((assignment) => {
        const key = assignment.user_id;
        const profile = profileMap.get(key);
        const department = departmentMap.get(key) || "Unknown";
        const current = statsMap.get(key) || {
          name: (profile == null ? void 0 : profile.full_name) || "Unknown",
          department,
          total: 0,
          completed: 0,
          overdue: 0
        };
        current.total++;
        if (assignment.status === "Completed") {
          current.completed++;
        } else if (new Date(assignment.due_date) < /* @__PURE__ */ new Date()) {
          current.overdue++;
        }
        statsMap.set(key, current);
      });
      return Array.from(statsMap.entries()).map(([user_id, stats]) => ({
        user_id,
        user_name: stats.name,
        department: stats.department,
        location_id: locationIdMap.get(user_id),
        total_assignments: stats.total,
        completed_assignments: stats.completed,
        overdue_assignments: stats.overdue,
        compliance_rate: stats.total > 0 ? stats.completed / stats.total * 100 : 0
      }));
    }
  });
  const { data: departmentStats } = useQuery({
    queryKey: ["department-compliance-stats"],
    queryFn: async () => {
      const { data, error } = await supabase2.from("document_assignments").select(`
          user_id,
          status,
          due_date
        `);
      if (error) throw error;
      const statsMap = /* @__PURE__ */ new Map();
      const { data: userDepartments } = await supabase2.from("user_departments").select(`
          user_id,
          is_primary,
          departments(name)
        `);
      const departmentMap = /* @__PURE__ */ new Map();
      userDepartments == null ? void 0 : userDepartments.forEach((ud) => {
        var _a;
        const deptName = ((_a = ud.departments) == null ? void 0 : _a.name) || "Unknown";
        if (ud.is_primary || !departmentMap.has(ud.user_id)) {
          departmentMap.set(ud.user_id, deptName);
        }
      });
      data.forEach((assignment) => {
        const department = departmentMap.get(assignment.user_id) || "Unknown";
        const current = statsMap.get(department) || {
          total: 0,
          completed: 0,
          overdue: 0
        };
        current.total++;
        if (assignment.status === "Completed") {
          current.completed++;
        } else if (new Date(assignment.due_date) < /* @__PURE__ */ new Date()) {
          current.overdue++;
        }
        statsMap.set(department, current);
      });
      return Array.from(statsMap.entries()).map(([department, stats]) => ({
        department,
        total_assignments: stats.total,
        completed_assignments: stats.completed,
        overdue_assignments: stats.overdue,
        compliance_rate: stats.total > 0 ? stats.completed / stats.total * 100 : 0
      }));
    }
  });
  const { data: roleStats } = useQuery({
    queryKey: ["role-compliance-stats"],
    queryFn: async () => {
      const { data, error } = await supabase2.from("document_assignments").select(`
          user_id,
          status,
          due_date
        `);
      if (error) throw error;
      const statsMap = /* @__PURE__ */ new Map();
      const { data: userRoles } = await supabase2.from("user_profile_roles").select(`
          user_id,
          is_primary,
          roles(name)
        `);
      const roleMap = /* @__PURE__ */ new Map();
      userRoles == null ? void 0 : userRoles.forEach((ur) => {
        var _a;
        const roleName = ((_a = ur.roles) == null ? void 0 : _a.name) || "Unknown";
        if (ur.is_primary || !roleMap.has(ur.user_id)) {
          roleMap.set(ur.user_id, roleName);
        }
      });
      data.forEach((assignment) => {
        const role = roleMap.get(assignment.user_id) || "Unknown";
        const current = statsMap.get(role) || {
          total: 0,
          completed: 0,
          overdue: 0
        };
        current.total++;
        if (assignment.status === "Completed") {
          current.completed++;
        } else if (new Date(assignment.due_date) < /* @__PURE__ */ new Date()) {
          current.overdue++;
        }
        statsMap.set(role, current);
      });
      return Array.from(statsMap.entries()).map(([role, stats]) => ({
        role,
        total_assignments: stats.total,
        completed_assignments: stats.completed,
        overdue_assignments: stats.overdue,
        compliance_rate: stats.total > 0 ? stats.completed / stats.total * 100 : 0
      }));
    }
  });
  const { data: locations = [] } = useQuery({
    queryKey: ["compliance-locations"],
    queryFn: async () => {
      const { data } = await supabase2.from("locations").select("id, name").order("name");
      return data || [];
    }
  });
  const getComplianceColor = (rate) => {
    if (rate >= 90) return "text-green-600";
    if (rate >= 70) return "text-yellow-600";
    return "text-red-600";
  };
  const getComplianceBadge = (rate) => {
    if (rate >= 90) return "bg-green-100 text-green-800";
    if (rate >= 70) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };
  const departments = Array.from(new Set(userStats == null ? void 0 : userStats.map((u) => u.department).filter(Boolean)));
  const filteredUserStats = userStats == null ? void 0 : userStats.filter((user) => {
    const matchesSearch = user.user_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = departmentFilter === "all" || user.department === departmentFilter;
    const matchesLocation = locationFilter === "all" || user.location_id === locationFilter;
    const matchesStatus = statusFilter === "all" || statusFilter === "Completed" && user.compliance_rate === 100 || statusFilter === "overdue" && user.overdue_assignments > 0 && user.compliance_rate < 100;
    return matchesSearch && matchesDepartment && matchesLocation && matchesStatus;
  });
  const filteredDocumentStats = documentStats == null ? void 0 : documentStats.filter((doc) => {
    const matchesSearch = doc.document_title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || statusFilter === "Completed" && doc.compliance_rate === 100 || statusFilter === "overdue" && doc.overdue_assignments > 0 && doc.compliance_rate < 100;
    return matchesSearch && matchesStatus;
  });
  const filteredDepartmentStats = departmentStats == null ? void 0 : departmentStats.filter((dept) => {
    const matchesSearch = dept.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = departmentFilter === "all" || dept.department === departmentFilter;
    const matchesStatus = statusFilter === "all" || statusFilter === "Completed" && dept.compliance_rate === 100 || statusFilter === "overdue" && dept.overdue_assignments > 0 && dept.compliance_rate < 100;
    return matchesSearch && matchesDepartment && matchesStatus;
  });
  const { data: completedDetails } = useQuery({
    queryKey: ["completed-document-details"],
    queryFn: async () => {
      const { data: assignments, error } = await supabase2.from("document_assignments").select(`
          document_id,
          user_id,
          completed_at,
          documents(title)
        `).eq("status", "Completed");
      if (error) throw error;
      const { data: profiles } = await supabase2.from("profiles").select("id, full_name");
      const { data: userDepartments } = await supabase2.from("user_departments").select(`
          user_id,
          is_primary,
          departments(name)
        `);
      const profileMap = new Map((profiles == null ? void 0 : profiles.map((p) => [p.id, p])) || []);
      const departmentMap = /* @__PURE__ */ new Map();
      userDepartments == null ? void 0 : userDepartments.forEach((ud) => {
        var _a;
        const deptName = ((_a = ud.departments) == null ? void 0 : _a.name) || "Unknown";
        if (ud.is_primary || !departmentMap.has(ud.user_id)) {
          departmentMap.set(ud.user_id, deptName);
        }
      });
      return assignments.map((assignment) => {
        var _a, _b;
        return {
          document_id: assignment.document_id,
          document_title: ((_a = assignment.documents) == null ? void 0 : _a.title) || "Unknown Document",
          user_id: assignment.user_id,
          user_name: ((_b = profileMap.get(assignment.user_id)) == null ? void 0 : _b.full_name) || "Unknown User",
          department: departmentMap.get(assignment.user_id) || "No Department",
          completed_at: assignment.completed_at
        };
      });
    },
    enabled: showCompletedDetails
  });
  const { data: overdueDetails } = useQuery({
    queryKey: ["overdue-document-details"],
    queryFn: async () => {
      const { data: assignments, error } = await supabase2.from("document_assignments").select(`
          assignment_id,
          document_id,
          user_id,
          due_date,
          status,
          documents(title)
        `).neq("status", "Completed");
      if (error) throw error;
      const overdueAssignments = assignments.filter(
        (assignment) => new Date(assignment.due_date) < /* @__PURE__ */ new Date()
      );
      const { data: profiles } = await supabase2.from("profiles").select("id, full_name");
      const { data: userDepartments } = await supabase2.from("user_departments").select(`
          user_id,
          is_primary,
          departments(name)
        `);
      const profileMap = new Map((profiles == null ? void 0 : profiles.map((p) => [p.id, p])) || []);
      const departmentMap = /* @__PURE__ */ new Map();
      userDepartments == null ? void 0 : userDepartments.forEach((ud) => {
        var _a;
        const deptName = ((_a = ud.departments) == null ? void 0 : _a.name) || "Unknown";
        if (ud.is_primary || !departmentMap.has(ud.user_id)) {
          departmentMap.set(ud.user_id, deptName);
        }
      });
      return overdueAssignments.map((assignment) => {
        var _a, _b;
        return {
          assignment_id: assignment.assignment_id,
          document_id: assignment.document_id,
          document_title: ((_a = assignment.documents) == null ? void 0 : _a.title) || "Unknown Document",
          user_id: assignment.user_id,
          user_name: ((_b = profileMap.get(assignment.user_id)) == null ? void 0 : _b.full_name) || "Unknown User",
          department: departmentMap.get(assignment.user_id) || "No Department",
          due_date: assignment.due_date,
          status: assignment.status,
          days_overdue: Math.ceil(((/* @__PURE__ */ new Date()).getTime() - new Date(assignment.due_date).getTime()) / (1e3 * 60 * 60 * 24))
        };
      });
    },
    enabled: showOverdueDetails
  });
  if (selectedUserDetail) {
    return /* @__PURE__ */ jsx(
      ComplianceUserDetail,
      {
        userId: selectedUserDetail.userId,
        userName: selectedUserDetail.userName,
        department: selectedUserDetail.department,
        onBack: () => setSelectedUserDetail(null)
      }
    );
  }
  if (selectedDocumentDetail) {
    return /* @__PURE__ */ jsx(
      ComplianceDocumentDetail,
      {
        documentId: selectedDocumentDetail.documentId,
        documentTitle: selectedDocumentDetail.documentTitle,
        onBack: () => setSelectedDocumentDetail(null)
      }
    );
  }
  if (selectedDepartmentDetail) {
    return /* @__PURE__ */ jsx(
      ComplianceDepartmentDetail,
      {
        department: selectedDepartmentDetail,
        onBack: () => setSelectedDepartmentDetail(null)
      }
    );
  }
  if (selectedRoleDetail) {
    return /* @__PURE__ */ jsx(
      ComplianceRoleDetail,
      {
        role: selectedRoleDetail,
        onBack: () => setSelectedRoleDetail(null)
      }
    );
  }
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold", children: "Compliance Tracking" }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Monitor document reading compliance across the organization" })
      ] }),
      /* @__PURE__ */ jsxs(Button, { variant: "outline", children: [
        /* @__PURE__ */ jsx(Download, { className: "h-4 w-4 mr-2" }),
        "Export Report"
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsxs(Card, { children: [
        /* @__PURE__ */ jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [
          /* @__PURE__ */ jsx(CardTitle, { className: "text-sm font-medium", children: "Total Assignments" }),
          /* @__PURE__ */ jsx(FileText, { className: "h-4 w-4 text-muted-foreground" })
        ] }),
        /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("div", { className: "text-2xl font-bold", children: (overallStats == null ? void 0 : overallStats.totalAssignments) || 0 }) })
      ] }),
      /* @__PURE__ */ jsxs(Card, { className: "cursor-pointer hover:bg-accent/50 transition-colors", onClick: () => {
        setShowCompletedDetails(true);
        setActiveTab("completed-details");
      }, children: [
        /* @__PURE__ */ jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [
          /* @__PURE__ */ jsx(CardTitle, { className: "text-sm font-medium", children: "Completed" }),
          /* @__PURE__ */ jsx(CircleCheckBig, { className: "h-4 w-4 text-green-600" })
        ] }),
        /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("div", { className: "text-2xl font-bold text-green-600", children: (overallStats == null ? void 0 : overallStats.completedAssignments) || 0 }) })
      ] }),
      /* @__PURE__ */ jsxs(Card, { className: "cursor-pointer hover:bg-accent/50 transition-colors", onClick: () => {
        if (((overallStats == null ? void 0 : overallStats.overdueAssignments) || 0) > 0) {
          setShowOverdueDetails(true);
          setActiveTab("overdue-details");
        } else {
          setStatusFilter("overdue");
          setDepartmentFilter("all");
          setActiveTab("users");
          toast$2.info("No overdue assignments found", {
            description: "All assignments are currently on time or completed."
          });
        }
      }, children: [
        /* @__PURE__ */ jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [
          /* @__PURE__ */ jsx(CardTitle, { className: "text-sm font-medium", children: "Overdue" }),
          /* @__PURE__ */ jsx(CircleAlert, { className: "h-4 w-4 text-red-600" })
        ] }),
        /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("div", { className: "text-2xl font-bold text-red-600", children: (overallStats == null ? void 0 : overallStats.overdueAssignments) || 0 }) })
      ] }),
      /* @__PURE__ */ jsxs(Card, { children: [
        /* @__PURE__ */ jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [
          /* @__PURE__ */ jsx(CardTitle, { className: "text-sm font-medium", children: "Compliance Rate" }),
          /* @__PURE__ */ jsx(TrendingUp, { className: "h-4 w-4 text-muted-foreground" })
        ] }),
        /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("div", { className: `text-2xl font-bold ${getComplianceColor((overallStats == null ? void 0 : overallStats.complianceRate) || 0)}`, children: [
          Math.round((overallStats == null ? void 0 : overallStats.complianceRate) || 0),
          "%"
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(Tabs, { value: activeTab, onValueChange: setActiveTab, className: "w-full", children: [
      /* @__PURE__ */ jsxs(TabsList, { children: [
        /* @__PURE__ */ jsx(TabsTrigger, { value: "users", "data-value": "users", children: "Users" }),
        /* @__PURE__ */ jsx(TabsTrigger, { value: "documents", children: "Documents" }),
        /* @__PURE__ */ jsx(TabsTrigger, { value: "departments", children: "Departments" }),
        /* @__PURE__ */ jsx(TabsTrigger, { value: "roles", children: "Roles" }),
        showCompletedDetails && /* @__PURE__ */ jsx(TabsTrigger, { value: "completed-details", children: "Completed Details" }),
        showOverdueDetails && /* @__PURE__ */ jsx(TabsTrigger, { value: "overdue-details", children: "Overdue Details" })
      ] }),
      /* @__PURE__ */ jsxs(TabsContent, { value: "users", className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "flex-1", children: /* @__PURE__ */ jsx(
            Input,
            {
              placeholder: "Search by name...",
              value: searchTerm,
              onChange: (e) => setSearchTerm(e.target.value)
            }
          ) }),
          /* @__PURE__ */ jsxs(Select, { value: locationFilter, onValueChange: setLocationFilter, children: [
            /* @__PURE__ */ jsxs(SelectTrigger, { className: "w-full sm:w-44", children: [
              /* @__PURE__ */ jsx(MapPin, { className: "h-3.5 w-3.5 mr-1 text-muted-foreground" }),
              /* @__PURE__ */ jsx(SelectValue, { placeholder: "All Locations" })
            ] }),
            /* @__PURE__ */ jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsx(SelectItem, { value: "all", children: "All Locations" }),
              locations.map((loc) => /* @__PURE__ */ jsx(SelectItem, { value: loc.id, children: loc.name }, loc.id))
            ] })
          ] }),
          /* @__PURE__ */ jsxs(Select, { value: departmentFilter, onValueChange: setDepartmentFilter, children: [
            /* @__PURE__ */ jsx(SelectTrigger, { className: "w-full sm:w-44", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "All Departments" }) }),
            /* @__PURE__ */ jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsx(SelectItem, { value: "all", children: "All Departments" }),
              departments.map((dept) => /* @__PURE__ */ jsx(SelectItem, { value: dept, children: dept }, dept))
            ] })
          ] }),
          /* @__PURE__ */ jsxs(Select, { value: statusFilter, onValueChange: setStatusFilter, children: [
            /* @__PURE__ */ jsx(SelectTrigger, { className: "w-full sm:w-36", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "All Status" }) }),
            /* @__PURE__ */ jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsx(SelectItem, { value: "all", children: "All Status" }),
              /* @__PURE__ */ jsx(SelectItem, { value: "Completed", children: "Completed" }),
              /* @__PURE__ */ jsx(SelectItem, { value: "overdue", children: "Overdue" })
            ] })
          ] }),
          /* @__PURE__ */ jsx(
            Button,
            {
              variant: "outline",
              onClick: () => {
                setSearchTerm("");
                setLocationFilter("all");
                setDepartmentFilter("all");
                setStatusFilter("all");
              },
              children: "Clear"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-xs text-muted-foreground", children: [
          "Showing ",
          (filteredUserStats == null ? void 0 : filteredUserStats.length) || 0,
          " of ",
          (userStats == null ? void 0 : userStats.length) || 0,
          " users"
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "divide-y rounded-lg border", children: [
          filteredUserStats == null ? void 0 : filteredUserStats.map((user) => /* @__PURE__ */ jsxs(
            "div",
            {
              className: "flex items-center gap-4 px-4 py-3 cursor-pointer hover:bg-accent/50 transition-colors",
              onClick: () => setSelectedUserDetail({ userId: user.user_id, userName: user.user_name, department: user.department }),
              children: [
                /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsx("div", { className: "font-medium truncate", children: user.user_name }),
                  /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground truncate", children: user.department })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "w-32 hidden sm:block", children: /* @__PURE__ */ jsx(Progress, { value: user.compliance_rate, className: "h-1.5" }) }),
                /* @__PURE__ */ jsxs("div", { className: "text-sm text-muted-foreground whitespace-nowrap w-16 text-right", children: [
                  user.completed_assignments,
                  "/",
                  user.total_assignments
                ] }),
                /* @__PURE__ */ jsxs(Badge, { className: `${getComplianceBadge(user.compliance_rate)} whitespace-nowrap`, children: [
                  Math.round(user.compliance_rate),
                  "%"
                ] }),
                /* @__PURE__ */ jsx(ChevronRight, { className: "h-4 w-4 text-muted-foreground flex-shrink-0" })
              ]
            },
            user.user_id
          )),
          (filteredUserStats == null ? void 0 : filteredUserStats.length) === 0 && /* @__PURE__ */ jsx("div", { className: "px-4 py-8 text-center text-sm text-muted-foreground", children: "No users match the current filters." })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(TabsContent, { value: "documents", className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "flex-1", children: /* @__PURE__ */ jsx(
            Input,
            {
              placeholder: "Search by document title...",
              value: searchTerm,
              onChange: (e) => setSearchTerm(e.target.value)
            }
          ) }),
          /* @__PURE__ */ jsxs(Select, { value: statusFilter, onValueChange: setStatusFilter, children: [
            /* @__PURE__ */ jsx(SelectTrigger, { className: "w-full sm:w-36", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "All Status" }) }),
            /* @__PURE__ */ jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsx(SelectItem, { value: "all", children: "All Status" }),
              /* @__PURE__ */ jsx(SelectItem, { value: "Completed", children: "Completed" }),
              /* @__PURE__ */ jsx(SelectItem, { value: "overdue", children: "Overdue" })
            ] })
          ] }),
          /* @__PURE__ */ jsx(Button, { variant: "outline", onClick: () => {
            setSearchTerm("");
            setStatusFilter("all");
          }, children: "Clear" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-xs text-muted-foreground", children: [
          "Showing ",
          (filteredDocumentStats == null ? void 0 : filteredDocumentStats.length) || 0,
          " of ",
          (documentStats == null ? void 0 : documentStats.length) || 0,
          " documents"
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "divide-y rounded-lg border", children: [
          filteredDocumentStats == null ? void 0 : filteredDocumentStats.map((doc) => /* @__PURE__ */ jsxs(
            "div",
            {
              className: "flex items-center gap-4 px-4 py-3 cursor-pointer hover:bg-accent/50 transition-colors",
              onClick: () => setSelectedDocumentDetail({ documentId: doc.document_id, documentTitle: doc.document_title }),
              children: [
                /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsx("div", { className: "font-medium truncate", children: doc.document_title }),
                  /* @__PURE__ */ jsxs("div", { className: "text-xs text-muted-foreground", children: [
                    doc.total_assignments,
                    " assignments"
                  ] })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "w-32 hidden sm:block", children: /* @__PURE__ */ jsx(Progress, { value: doc.compliance_rate, className: "h-1.5" }) }),
                /* @__PURE__ */ jsxs("div", { className: "text-sm text-muted-foreground whitespace-nowrap w-16 text-right", children: [
                  doc.completed_assignments,
                  "/",
                  doc.total_assignments
                ] }),
                /* @__PURE__ */ jsxs(Badge, { className: `${getComplianceBadge(doc.compliance_rate)} whitespace-nowrap`, children: [
                  Math.round(doc.compliance_rate),
                  "%"
                ] }),
                /* @__PURE__ */ jsx(ChevronRight, { className: "h-4 w-4 text-muted-foreground flex-shrink-0" })
              ]
            },
            doc.document_id
          )),
          (filteredDocumentStats == null ? void 0 : filteredDocumentStats.length) === 0 && /* @__PURE__ */ jsx("div", { className: "px-4 py-8 text-center text-sm text-muted-foreground", children: "No documents match the current filters." })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(TabsContent, { value: "departments", className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "flex-1", children: /* @__PURE__ */ jsx(
            Input,
            {
              placeholder: "Search by department name...",
              value: searchTerm,
              onChange: (e) => setSearchTerm(e.target.value)
            }
          ) }),
          /* @__PURE__ */ jsxs(Select, { value: statusFilter, onValueChange: setStatusFilter, children: [
            /* @__PURE__ */ jsx(SelectTrigger, { className: "w-full sm:w-36", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "All Status" }) }),
            /* @__PURE__ */ jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsx(SelectItem, { value: "all", children: "All Status" }),
              /* @__PURE__ */ jsx(SelectItem, { value: "Completed", children: "Completed" }),
              /* @__PURE__ */ jsx(SelectItem, { value: "overdue", children: "Overdue" })
            ] })
          ] }),
          /* @__PURE__ */ jsx(Button, { variant: "outline", onClick: () => {
            setSearchTerm("");
            setDepartmentFilter("all");
            setStatusFilter("all");
          }, children: "Clear" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-xs text-muted-foreground", children: [
          "Showing ",
          (filteredDepartmentStats == null ? void 0 : filteredDepartmentStats.length) || 0,
          " of ",
          (departmentStats == null ? void 0 : departmentStats.length) || 0,
          " departments"
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "divide-y rounded-lg border", children: [
          filteredDepartmentStats == null ? void 0 : filteredDepartmentStats.map((dept) => /* @__PURE__ */ jsxs(
            "div",
            {
              className: "flex items-center gap-4 px-4 py-3 cursor-pointer hover:bg-accent/50 transition-colors",
              onClick: () => setSelectedDepartmentDetail(dept.department),
              children: [
                /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsx("div", { className: "font-medium truncate", children: dept.department }),
                  /* @__PURE__ */ jsxs("div", { className: "text-xs text-muted-foreground", children: [
                    dept.total_assignments,
                    " assignments"
                  ] })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "w-32 hidden sm:block", children: /* @__PURE__ */ jsx(Progress, { value: dept.compliance_rate, className: "h-1.5" }) }),
                /* @__PURE__ */ jsxs("div", { className: "text-sm text-muted-foreground whitespace-nowrap w-16 text-right", children: [
                  dept.completed_assignments,
                  "/",
                  dept.total_assignments
                ] }),
                /* @__PURE__ */ jsxs(Badge, { className: `${getComplianceBadge(dept.compliance_rate)} whitespace-nowrap`, children: [
                  Math.round(dept.compliance_rate),
                  "%"
                ] }),
                /* @__PURE__ */ jsx(ChevronRight, { className: "h-4 w-4 text-muted-foreground flex-shrink-0" })
              ]
            },
            dept.department
          )),
          (filteredDepartmentStats == null ? void 0 : filteredDepartmentStats.length) === 0 && /* @__PURE__ */ jsx("div", { className: "px-4 py-8 text-center text-sm text-muted-foreground", children: "No departments match the current filters." })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(TabsContent, { value: "roles", className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "flex-1", children: /* @__PURE__ */ jsx(
            Input,
            {
              placeholder: "Search by role name...",
              value: searchTerm,
              onChange: (e) => setSearchTerm(e.target.value)
            }
          ) }),
          /* @__PURE__ */ jsxs(Select, { value: statusFilter, onValueChange: setStatusFilter, children: [
            /* @__PURE__ */ jsx(SelectTrigger, { className: "w-full sm:w-36", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "All Status" }) }),
            /* @__PURE__ */ jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsx(SelectItem, { value: "all", children: "All Status" }),
              /* @__PURE__ */ jsx(SelectItem, { value: "Completed", children: "Completed" }),
              /* @__PURE__ */ jsx(SelectItem, { value: "overdue", children: "Overdue" })
            ] })
          ] }),
          /* @__PURE__ */ jsx(Button, { variant: "outline", onClick: () => {
            setSearchTerm("");
            setStatusFilter("all");
          }, children: "Clear" })
        ] }),
        (() => {
          const filteredRoleStats = roleStats == null ? void 0 : roleStats.filter((role) => {
            const matchesSearch = role.role.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesStatus = statusFilter === "all" || statusFilter === "Completed" && role.compliance_rate === 100 || statusFilter === "overdue" && role.overdue_assignments > 0 && role.compliance_rate < 100;
            return matchesSearch && matchesStatus;
          });
          return /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsxs("div", { className: "text-xs text-muted-foreground", children: [
              "Showing ",
              (filteredRoleStats == null ? void 0 : filteredRoleStats.length) || 0,
              " of ",
              (roleStats == null ? void 0 : roleStats.length) || 0,
              " roles"
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "divide-y rounded-lg border", children: [
              filteredRoleStats == null ? void 0 : filteredRoleStats.map((role) => /* @__PURE__ */ jsxs(
                "div",
                {
                  className: "flex items-center gap-4 px-4 py-3 cursor-pointer hover:bg-accent/50 transition-colors",
                  onClick: () => setSelectedRoleDetail(role.role),
                  children: [
                    /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
                      /* @__PURE__ */ jsx("div", { className: "font-medium truncate", children: role.role }),
                      /* @__PURE__ */ jsxs("div", { className: "text-xs text-muted-foreground", children: [
                        role.total_assignments,
                        " assignments"
                      ] })
                    ] }),
                    /* @__PURE__ */ jsx("div", { className: "w-32 hidden sm:block", children: /* @__PURE__ */ jsx(Progress, { value: role.compliance_rate, className: "h-1.5" }) }),
                    /* @__PURE__ */ jsxs("div", { className: "text-sm text-muted-foreground whitespace-nowrap w-16 text-right", children: [
                      role.completed_assignments,
                      "/",
                      role.total_assignments
                    ] }),
                    /* @__PURE__ */ jsxs(Badge, { className: `${getComplianceBadge(role.compliance_rate)} whitespace-nowrap`, children: [
                      Math.round(role.compliance_rate),
                      "%"
                    ] }),
                    /* @__PURE__ */ jsx(ChevronRight, { className: "h-4 w-4 text-muted-foreground flex-shrink-0" })
                  ]
                },
                role.role
              )),
              (filteredRoleStats == null ? void 0 : filteredRoleStats.length) === 0 && /* @__PURE__ */ jsx("div", { className: "px-4 py-8 text-center text-sm text-muted-foreground", children: "No roles match the current filters." })
            ] })
          ] });
        })()
      ] }),
      /* @__PURE__ */ jsxs(TabsContent, { value: "completed-details", className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold", children: "Completed Document Details" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "View which documents have been completed by which users" })
          ] }),
          /* @__PURE__ */ jsx(
            Button,
            {
              variant: "outline",
              size: "icon",
              onClick: () => {
                setShowCompletedDetails(false);
                setActiveTab("users");
              },
              children: /* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4" })
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid gap-4", children: completedDetails == null ? void 0 : completedDetails.map((detail, index) => /* @__PURE__ */ jsxs(Card, { children: [
          /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(CardTitle, { className: "text-lg", children: detail.document_title }),
              /* @__PURE__ */ jsxs(CardDescription, { children: [
                "Completed by ",
                detail.user_name,
                " (",
                detail.department,
                ")"
              ] })
            ] }),
            /* @__PURE__ */ jsxs(Badge, { className: "bg-green-100 text-green-800", children: [
              /* @__PURE__ */ jsx(CircleCheckBig, { className: "h-3 w-3 mr-1" }),
              "Completed"
            ] })
          ] }) }),
          /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("div", { className: "text-sm text-muted-foreground", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Calendar, { className: "h-4 w-4" }),
            /* @__PURE__ */ jsxs("span", { children: [
              "Completed on: ",
              detail.completed_at ? new Date(detail.completed_at).toLocaleDateString() : "Date not recorded"
            ] })
          ] }) }) })
        ] }, `${detail.user_id}-${detail.document_id}-${index}`)) }),
        (completedDetails == null ? void 0 : completedDetails.length) === 0 && /* @__PURE__ */ jsxs("div", { className: "text-center py-8 text-muted-foreground", children: [
          /* @__PURE__ */ jsx(FileText, { className: "h-12 w-12 mx-auto mb-4 opacity-50" }),
          /* @__PURE__ */ jsx("p", { children: "No completed documents found." })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(TabsContent, { value: "overdue-details", className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold", children: "Overdue Document Details" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "View which documents are overdue and by which users" })
          ] }),
          /* @__PURE__ */ jsx(
            Button,
            {
              variant: "outline",
              size: "icon",
              onClick: () => {
                setShowOverdueDetails(false);
                setActiveTab("users");
              },
              children: /* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4" })
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid gap-4", children: overdueDetails == null ? void 0 : overdueDetails.map((detail, index) => /* @__PURE__ */ jsxs(Card, { children: [
          /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(CardTitle, { className: "text-lg", children: detail.document_title }),
              /* @__PURE__ */ jsxs(CardDescription, { children: [
                "Assigned to ",
                detail.user_name,
                " (",
                detail.department,
                ")"
              ] })
            ] }),
            /* @__PURE__ */ jsxs(Badge, { className: "bg-red-100 text-red-800", children: [
              /* @__PURE__ */ jsx(CircleAlert, { className: "h-3 w-3 mr-1" }),
              detail.days_overdue,
              " days overdue"
            ] })
          ] }) }),
          /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("div", { className: "text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(Calendar, { className: "h-4 w-4" }),
              /* @__PURE__ */ jsxs("span", { children: [
                "Due date: ",
                new Date(detail.due_date).toLocaleDateString()
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mt-1", children: [
              /* @__PURE__ */ jsx(Clock, { className: "h-4 w-4" }),
              /* @__PURE__ */ jsxs("span", { children: [
                "Status: ",
                detail.status
              ] })
            ] })
          ] }) })
        ] }, `${detail.user_id}-${detail.document_id}-${index}`)) }),
        (overdueDetails == null ? void 0 : overdueDetails.length) === 0 && /* @__PURE__ */ jsxs("div", { className: "text-center py-8 text-muted-foreground", children: [
          /* @__PURE__ */ jsx(FileText, { className: "h-12 w-12 mx-auto mb-4 opacity-50" }),
          /* @__PURE__ */ jsx("p", { children: "No overdue documents found." })
        ] })
      ] })
    ] })
  ] });
};
const KnowledgePanelInner = () => {
  const [activeTab, setActiveTab] = useState("documents");
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold tracking-tight", children: "Knowledge Management" }),
      /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Manage organizational documents, policies, and compliance tracking" })
    ] }),
    /* @__PURE__ */ jsxs(Tabs, { value: activeTab, onValueChange: setActiveTab, className: "w-full", children: [
      /* @__PURE__ */ jsxs(TabsList, { className: "grid w-full grid-cols-3", children: [
        /* @__PURE__ */ jsxs(TabsTrigger, { value: "documents", className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(FileText, { className: "h-4 w-4" }),
          "Documents"
        ] }),
        /* @__PURE__ */ jsxs(TabsTrigger, { value: "assignments", className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(Users, { className: "h-4 w-4" }),
          "Assignments"
        ] }),
        /* @__PURE__ */ jsxs(TabsTrigger, { value: "compliance", className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(CircleCheckBig, { className: "h-4 w-4" }),
          "Document Compliance"
        ] })
      ] }),
      /* @__PURE__ */ jsx(TabsContent, { value: "documents", className: "space-y-4", children: /* @__PURE__ */ jsx(DocumentManagement, { onNavigateToAssignments: () => setActiveTab("assignments") }) }),
      /* @__PURE__ */ jsx(TabsContent, { value: "assignments", className: "space-y-4", children: /* @__PURE__ */ jsx(DocumentAssignments, {}) }),
      /* @__PURE__ */ jsx(TabsContent, { value: "compliance", className: "space-y-4", children: /* @__PURE__ */ jsx(ComplianceTracking, {}) })
    ] })
  ] });
};
const KnowledgePanel = ({ basePath }) => {
  const { hasAdminAccess } = useUserRole();
  const config = {
    supabaseClient: supabase,
    basePath,
    permissions: {
      canCreateUsers: hasAdminAccess,
      canEditUsers: hasAdminAccess,
      canDeleteUsers: hasAdminAccess,
      canManageRoles: hasAdminAccess,
      canManageDepartments: hasAdminAccess,
      canManageLocations: hasAdminAccess,
      canManageCertificates: hasAdminAccess,
      canManageProfile: hasAdminAccess
    }
  };
  return /* @__PURE__ */ jsx(OrganisationProvider, { config, children: /* @__PURE__ */ jsx(KnowledgePanelInner, {}) });
};
export {
  AddEducationDialog as AddCertificatesDialog,
  AddOrganisationCertificateDialog,
  AddPhysicalLocationDialog,
  AssignHardwareDialog,
  AssignPhysicalLocationDialog,
  AssignSoftwareDialog,
  Certificates,
  ChangePasswordDialog,
  CreateUserDialog,
  DepartmentManagement,
  DepartmentRolePairsDisplay,
  EditableField,
  EditableProfileHeader,
  ImportErrorReport,
  ImportUsersDialog,
  KnowledgePanel,
  LocationManagement,
  MultipleRolesField,
  MyDocuments,
  OrganisationPanel,
  OrganisationProvider,
  OrganisationWrapper,
  PersonaDetailsTabs,
  PersonaProfile,
  PhysicalLocationTab,
  ProfileAvatar,
  ProfileBasicInfo,
  ProfileContactInfo,
  RoleManagement,
  UserCard,
  UserDetailView,
  UserList,
  UserManagement,
  UserTable,
  handleCreateUser,
  handleDeleteUser,
  handleSaveUser,
  useOrganisationContext,
  useUserAssets2 as useUserAssets,
  useUserDepartments2 as useUserDepartments,
  useUserManagement2 as useUserManagement,
  useUserProfileRoles2 as useUserProfileRoles,
  useUserProfiles2 as useUserProfiles,
  useUserRole2 as useUserRole,
  useViewPreference2 as useViewPreference
};
//# sourceMappingURL=index.esm.js.map
