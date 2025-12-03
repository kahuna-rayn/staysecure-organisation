(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports, require("react/jsx-runtime"), require("react"), require("@/components/ui/card"), require("@/components/ui/tabs"), require("@/components/ui/badge"), require("@/hooks/useUserProfiles"), require("@/hooks/useUserManagement"), require("@/hooks/useViewPreference"), require("@/integrations/supabase/client"), require("@/components/ui/use-toast"), require("@/components/ui/toggle-group"), require("@/components/ui/delete-user-dialog"), require("@/hooks/use-toast"), require("react-router-dom"), require("@tanstack/react-query"), require("@/components/ui/button"), require("@/components/ui/avatar"), require("@/components/ui/input"), require("@/components/ui/select"), require("@/components/ui/editable-table"), require("@/components/ui/dialog"), require("@/components/ui/label"), require("@/components/ui/textarea"), require("staysecure-auth"), require("react-dropzone"), require("papaparse"), require("@/components/import/ImportErrorReport"), require("@/components/ui/table"), require("@/components/ui/switch"), require("@/components/ui/separator"), require("react-dom"), require("@/lib/utils"), require("@/components/ui/command"), require("@/components/ui/popover"), require("@/hooks/useUserRole"), require("@/components/HardwareInventory"), require("@/components/SoftwareAccounts"), require("@/hooks/useInventory"), require("@/hooks/useUserAssets"), require("@/components/knowledge/MyDocuments"), require("@/hooks/useUserDepartments"), require("@/components/LearningTracksTab"), require("@/hooks/useUserProfileRoles"), require("@/hooks/useUserPhysicalLocations"), require("@/hooks/useUserRoleById"), require("@/hooks/useProfile"), require("@/components/ui/alert"), require("@/components/ui/scroll-area")) : typeof define === "function" && define.amd ? define(["exports", "react/jsx-runtime", "react", "@/components/ui/card", "@/components/ui/tabs", "@/components/ui/badge", "@/hooks/useUserProfiles", "@/hooks/useUserManagement", "@/hooks/useViewPreference", "@/integrations/supabase/client", "@/components/ui/use-toast", "@/components/ui/toggle-group", "@/components/ui/delete-user-dialog", "@/hooks/use-toast", "react-router-dom", "@tanstack/react-query", "@/components/ui/button", "@/components/ui/avatar", "@/components/ui/input", "@/components/ui/select", "@/components/ui/editable-table", "@/components/ui/dialog", "@/components/ui/label", "@/components/ui/textarea", "staysecure-auth", "react-dropzone", "papaparse", "@/components/import/ImportErrorReport", "@/components/ui/table", "@/components/ui/switch", "@/components/ui/separator", "react-dom", "@/lib/utils", "@/components/ui/command", "@/components/ui/popover", "@/hooks/useUserRole", "@/components/HardwareInventory", "@/components/SoftwareAccounts", "@/hooks/useInventory", "@/hooks/useUserAssets", "@/components/knowledge/MyDocuments", "@/hooks/useUserDepartments", "@/components/LearningTracksTab", "@/hooks/useUserProfileRoles", "@/hooks/useUserPhysicalLocations", "@/hooks/useUserRoleById", "@/hooks/useProfile", "@/components/ui/alert", "@/components/ui/scroll-area"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global.OrganisationManagement = {}, global["react/jsx-runtime"], global.React, global.card, global.tabs, global.badge, global.useUserProfiles, global.useUserManagement, global.useViewPreference, global.client, global.useToast, global.toggleGroup, global.deleteUserDialog, global.useToast$1, global.ReactRouterDOM, global.ReactQuery, global.button, global.avatar, global.input, global.select, global.editableTable, global.dialog, global.label, global.textarea, global.StaySecureAuth, global.reactDropzone, global.Papa, global.ImportErrorReport$1, global.table, global._switch, global.separator, global.ReactDOM, global.utils, global.command, global.popover, global.useUserRole, global.HardwareInventory, global.SoftwareAccounts, global.useInventory, global.useUserAssets, global.MyDocuments, global.useUserDepartments, global.LearningTracksTab, global.useUserProfileRoles, global.useUserPhysicalLocations, global.useUserRoleById, global.useProfile, global.alert, global.scrollArea));
})(this, function(exports2, jsxRuntime, o, card, tabs, badge, useUserProfiles, useUserManagement, useViewPreference, client, useToast, toggleGroup, deleteUserDialog, useToast$1, reactRouterDom, reactQuery, button, avatar, input, select, editableTable, dialog, label, textarea, staysecureAuth, reactDropzone, Papa, ImportErrorReport$1, table, _switch, separator, vt, utils, command, popover, useUserRole, HardwareInventory, SoftwareAccounts, useInventory, useUserAssets, MyDocuments, useUserDepartments, LearningTracksTab, useUserProfileRoles, useUserPhysicalLocations, useUserRoleById, useProfile, alert, scrollArea) {
  "use strict";
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
  const Icon = o.forwardRef(
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
      return o.createElement(
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
          ...iconNode.map(([tag, attrs]) => o.createElement(tag, attrs)),
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
    const Component = o.forwardRef(
      ({ className, ...props }, ref) => o.createElement(Icon, {
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
  const Check = createLucideIcon("Check", [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]]);
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
  const OrganisationContext = o.createContext(null);
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
    return /* @__PURE__ */ jsxRuntime.jsx(OrganisationContext.Provider, { value: contextValue, children });
  };
  const useOrganisationContext = () => {
    const context = o.useContext(OrganisationContext);
    if (!context) {
      throw new Error("useOrganisationContext must be used within OrganisationProvider");
    }
    return context;
  };
  const CLIENT_CONFIGS = {
    default: {}
  };
  const __vite_import_meta_env__ = { "BASE_URL": "/", "DEV": false, "MODE": "production", "PROD": true, "SSR": false };
  const isTestEnvironment = typeof process !== "undefined" && (process.env.NODE_ENV === "test" || process.env.JEST_WORKER_ID !== void 0);
  const getEnvVar = (key) => {
    if (isTestEnvironment && typeof process !== "undefined" && process.env) {
      return process.env[key];
    }
    const metaEnv = typeof globalThis !== "undefined" && globalThis.__VITE_META_ENV__;
    if (metaEnv) {
      return metaEnv[key];
    }
    try {
      return __vite_import_meta_env__[key];
    } catch {
      if (typeof process !== "undefined" && process.env) {
        return process.env[key];
      }
    }
    return void 0;
  };
  const getSupabaseUrl = () => {
    return getEnvVar("VITE_SUPABASE_URL");
  };
  const getSupabaseAnonKey = () => {
    return getEnvVar("VITE_SUPABASE_ANON_KEY") || getEnvVar("VITE_SUPABASE_PUB_KEY") || getEnvVar("VITE_SB_PUB_KEY");
  };
  const handleSaveUser = async (editingUser, updateProfile, onSuccess) => {
    try {
      await updateProfile(editingUser.id, editingUser);
      useToast.toast({
        title: "Success",
        description: "User updated successfully"
      });
      onSuccess();
    } catch (error) {
      useToast.toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };
  const handleCreateUser = async (newUser, updateProfile, onSuccess) => {
    var _a, _b;
    try {
      const clientId = client.getCurrentClientId();
      const clientPath = clientId ? `/${clientId}` : "";
      const { data: sessionData, error: sessionError } = await client.supabase.auth.getSession();
      if (sessionError || !((_a = sessionData == null ? void 0 : sessionData.session) == null ? void 0 : _a.access_token)) {
        throw new Error("Unable to determine current session. Please refresh and try again.");
      }
      const accessToken = sessionData.session.access_token;
      const clientConfig = clientId && CLIENT_CONFIGS[clientId] || CLIENT_CONFIGS["default"];
      const anonKey = (clientConfig == null ? void 0 : clientConfig.supabaseAnonKey) || getSupabaseAnonKey();
      const baseUrl = (_b = getSupabaseUrl()) == null ? void 0 : _b.replace(/\/$/, "");
      if (!baseUrl) {
        throw new Error("Supabase base URL is not configured.");
      }
      const createUserUrl = `${baseUrl}/functions/v1/create-user`;
      console.log("[handleCreateUser] Invoking create-user Edge Function", {
        createUserUrl,
        hasAnonKey: !!anonKey,
        hasAccessToken: !!accessToken,
        clientId
      });
      const response = await fetch(createUserUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...anonKey ? { apikey: anonKey } : {},
          ...accessToken ? { Authorization: `Bearer ${accessToken}` } : {}
        },
        body: JSON.stringify({
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
        })
      });
      const rawText = await response.text();
      let data = null;
      try {
        data = rawText ? JSON.parse(rawText) : null;
      } catch (parseError) {
        console.warn("[handleCreateUser] Failed to parse Edge Function response as JSON", {
          parseError,
          rawText,
          status: response.status
        });
      }
      console.log("[handleCreateUser] Edge Function response summary", {
        status: response.status,
        ok: response.ok,
        dataPreview: data ? JSON.stringify(data).slice(0, 200) : rawText == null ? void 0 : rawText.slice(0, 200)
      });
      const error = !response.ok ? { message: (data == null ? void 0 : data.error) || rawText || response.statusText || `Request failed with status ${response.status}` } : null;
      if (error) {
        throw new Error(error.message || "Failed to create user");
      }
      if (data == null ? void 0 : data.error) {
        console.error("Edge Function returned error:", data.error);
        console.error("Full Edge Function response:", data);
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
          bio: newUser.bio,
          employee_id: newUser.employee_id
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
            const { data: locationDataResult, error: locationError } = await client.supabase.from("physical_location_access").insert(locationData).select();
            if (locationError) {
              console.error("❌ Error assigning physical location access:", locationError);
            }
          } catch (locationError) {
            console.error("❌ Exception assigning physical location access:", locationError);
          }
        }
      }
      useToast.toast({
        title: "Success",
        description: "User created successfully"
      });
      onSuccess();
    } catch (error) {
      console.error("Error creating user:", error);
      useToast.toast({
        title: "Error",
        description: error.message || "Failed to create user",
        variant: "destructive"
      });
    }
  };
  const handleDeleteUser = async (userId, userName, reason) => {
    try {
      const { data, error } = await client.supabase.functions.invoke("delete-user", {
        body: {
          userId,
          reason: reason || void 0
        }
      });
      if (error) {
        console.error("Error calling delete function:", error);
        useToast.toast({
          title: "Error",
          description: "Failed to delete user",
          variant: "destructive"
        });
        return { success: false, error: "Failed to delete user" };
      }
      if (!data.success) {
        console.error("Delete function returned error:", data.error);
        useToast.toast({
          title: "Error",
          description: data.error || "Failed to delete user",
          variant: "destructive"
        });
        return { success: false, error: data.error || "Failed to delete user" };
      }
      return { success: true, deletedUser: data.deletedUser };
    } catch (error) {
      console.error("Error deleting user:", error);
      useToast.toast({
        title: "Error",
        description: "Failed to delete user",
        variant: "destructive"
      });
      return { success: false, error: "Failed to delete user" };
    }
  };
  const EditableField = ({
    value,
    fieldKey,
    label: label2,
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
    const [editValue, setEditValue] = o.useState(value);
    o.useEffect(() => {
      setEditValue(value);
    }, [value, isEditing]);
    const validatePhoneInput = (input2) => {
      return input2.replace(/[^0-9+\s\-\(\)]/g, "");
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
        return /* @__PURE__ */ jsxRuntime.jsxs(
          select.Select,
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
              /* @__PURE__ */ jsxRuntime.jsx(select.SelectTrigger, { className: inputClassName || "w-48", children: /* @__PURE__ */ jsxRuntime.jsx(select.SelectValue, { placeholder: isLoading ? "Loading..." : "Select location" }) }),
              /* @__PURE__ */ jsxRuntime.jsxs(select.SelectContent, { children: [
                selectOptions.length === 0 && !isLoading && /* @__PURE__ */ jsxRuntime.jsx(select.SelectItem, { value: "none", disabled: true, children: "No locations assigned" }),
                selectOptions.map((option) => /* @__PURE__ */ jsxRuntime.jsx(select.SelectItem, { value: option.value, children: option.label }, option.value))
              ] })
            ]
          }
        );
      }
      return /* @__PURE__ */ jsxRuntime.jsx(
        input.Input,
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
    return /* @__PURE__ */ jsxRuntime.jsxs("div", { className, children: [
      label2 && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-sm text-muted-foreground mr-2", children: label2 }),
      /* @__PURE__ */ jsxRuntime.jsx(
        "span",
        {
          className: "cursor-pointer hover:bg-muted/50 px-2 py-1 rounded transition-colors",
          onClick: () => fieldKey && onEdit(fieldKey),
          children: value || placeholder
        }
      )
    ] });
  };
  const DepartmentRolePairsDisplay = ({ pairs, userId }) => {
    if (!pairs || pairs.length === 0) {
      return /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-muted-foreground", children: "No assignments" });
    }
    return /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex flex-wrap gap-1", children: pairs.map((pair, index) => /* @__PURE__ */ jsxRuntime.jsxs(badge.Badge, { variant: "secondary", className: "text-xs", children: [
      pair.department,
      " - ",
      pair.role
    ] }, index)) });
  };
  const UserCard = ({ user, onEdit, onDelete }) => {
    var _a;
    const navigate = reactRouterDom.useNavigate();
    const [editingField, setEditingField] = o.useState(null);
    const [saving, setSaving] = o.useState(false);
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
    const { data: locationAccess = [] } = reactQuery.useQuery({
      queryKey: ["user-location-access", user.email],
      queryFn: async () => {
        const { data, error } = await client.supabase.from("physical_location_access").select("access_purpose, status").eq("user_id", user.id).eq("status", "Active");
        if (error) throw error;
        return data;
      }
    });
    const handleFieldSave = async (fieldKey, value) => {
      setSaving(true);
      try {
        if (fieldKey === "email") {
          useToast.toast({
            title: "Email Update Limitation",
            description: "Email addresses are managed by authentication and cannot be updated directly from this interface.",
            variant: "destructive"
          });
          return;
        }
        const updatedUser = { ...user, [fieldKey]: value };
        onEdit(updatedUser);
        useToast.toast({
          title: "Field updated",
          description: `${fieldKey} has been updated successfully.`
        });
      } catch (error) {
        useToast.toast({
          title: "Error",
          description: error.message,
          variant: "destructive"
        });
      } finally {
        setSaving(false);
        setEditingField(null);
      }
    };
    const handleViewDetails = () => {
      navigate(`/admin/users/${user.id}`);
    };
    return /* @__PURE__ */ jsxRuntime.jsx(card.Card, { className: "cursor-pointer hover:shadow-md transition-shadow", onClick: handleViewDetails, children: /* @__PURE__ */ jsxRuntime.jsxs(card.CardContent, { className: "p-4", children: [
      /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-start justify-between mb-3", children: [
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntime.jsxs(avatar.Avatar, { className: "h-10 w-10", children: [
            /* @__PURE__ */ jsxRuntime.jsx(avatar.AvatarImage, { src: user.avatar_url }),
            /* @__PURE__ */ jsxRuntime.jsx(avatar.AvatarFallback, { children: initials })
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntime.jsx("h3", { className: "font-medium", children: user.full_name || "No name" }),
            /* @__PURE__ */ jsxRuntime.jsx("div", { className: "text-sm text-muted-foreground", children: /* @__PURE__ */ jsxRuntime.jsx(DepartmentRolePairsDisplay, { userId: user.id }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsx(badge.Badge, { className: `${getStatusColor(user.status || "Active")} text-white`, children: user.status || "Active" })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-2 text-sm", children: [
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntime.jsx(Mail, { className: "h-3 w-3 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntime.jsx(
            EditableField,
            {
              value: user.email || "No email",
              fieldKey: "email",
              placeholder: "Enter email",
              className: "flex-1",
              inputClassName: "text-sm",
              onSave: handleFieldSave,
              isEditing: editingField === "email",
              onEdit: setEditingField,
              onCancel: () => setEditingField(null),
              saving
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntime.jsx(IdCard, { className: "h-3 w-3 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "text-muted-foreground", children: [
            "ID: ",
            user.employee_id || "Not set"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntime.jsx(Phone, { className: "h-3 w-3 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-muted-foreground", children: user.phone || "No phone" })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntime.jsx(MapPin, { className: "h-3 w-3 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-muted-foreground", children: user.location || "No location" })
        ] }),
        locationAccess.length > 0 && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "mt-3 pt-3 border-t", children: [
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
            /* @__PURE__ */ jsxRuntime.jsx(MapPin, { className: "h-3 w-3 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-xs font-medium text-muted-foreground", children: "Physical Access:" })
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex flex-wrap gap-1", children: [
            locationAccess.slice(0, 3).map((access, index) => /* @__PURE__ */ jsxRuntime.jsx(badge.Badge, { variant: "outline", className: "text-xs", children: access.access_purpose || "Unknown Purpose" }, index)),
            locationAccess.length > 3 && /* @__PURE__ */ jsxRuntime.jsxs(badge.Badge, { variant: "outline", className: "text-xs", children: [
              "+",
              locationAccess.length - 3,
              " more"
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex gap-2 mt-4", onClick: (e) => e.stopPropagation(), children: [
        /* @__PURE__ */ jsxRuntime.jsx(button.Button, { size: "sm", variant: "outline", onClick: handleViewDetails, children: /* @__PURE__ */ jsxRuntime.jsx(Eye, { className: "h-3 w-3" }) }),
        /* @__PURE__ */ jsxRuntime.jsx(button.Button, { size: "sm", variant: "outline", onClick: () => navigate(`/admin/users/${user.id}`), children: /* @__PURE__ */ jsxRuntime.jsx(Settings, { className: "h-3 w-3" }) }),
        /* @__PURE__ */ jsxRuntime.jsx(button.Button, { size: "sm", variant: "outline", onClick: () => onEdit(user), children: /* @__PURE__ */ jsxRuntime.jsx(SquarePen, { className: "h-3 w-3" }) }),
        /* @__PURE__ */ jsxRuntime.jsx(button.Button, { size: "sm", variant: "outline", onClick: () => onDelete(user.id), children: /* @__PURE__ */ jsxRuntime.jsx(Trash2, { className: "h-3 w-3" }) })
      ] })
    ] }) });
  };
  const UserList = ({ profiles, onEdit, onDelete }) => {
    return /* @__PURE__ */ jsxRuntime.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: profiles.map((user) => /* @__PURE__ */ jsxRuntime.jsx(
      UserCard,
      {
        user,
        onEdit,
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
    const navigate = reactRouterDom.useNavigate();
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
      navigate(`/admin/users/${user.id}`);
    };
    return /* @__PURE__ */ jsxRuntime.jsx("div", { className: "w-full", children: /* @__PURE__ */ jsxRuntime.jsx(
      editableTable.EditableTable,
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
    const [editingField, setEditingField] = o.useState(null);
    const [saving, setSaving] = o.useState(false);
    const { supabaseClient } = useOrganisationContext();
    const [isFullNameManuallyEdited, setIsFullNameManuallyEdited] = o.useState(false);
    const { user } = staysecureAuth.useAuth();
    const { data: currentUserRole } = reactQuery.useQuery({
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
    const { data: locations } = reactQuery.useQuery({
      queryKey: ["locations"],
      queryFn: async () => {
        const { data } = await supabaseClient.from("locations").select("id, name").eq("status", "Active").order("name");
        return data || [];
      }
    });
    const validatePhoneInput = (input2) => {
      return input2.replace(/[^0-9+\s\-\(\)]/g, "");
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
          access_level: "User",
          location_id: "",
          location: "",
          bio: ""
        };
        onUserChange(resetUser);
        setIsFullNameManuallyEdited(false);
        setEditingField(null);
        setSaving(false);
      }
      onOpenChange(open);
    };
    return /* @__PURE__ */ jsxRuntime.jsxs(dialog.Dialog, { open: isOpen, onOpenChange: handleDialogClose, children: [
      /* @__PURE__ */ jsxRuntime.jsx(dialog.DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntime.jsx(button.Button, { children: /* @__PURE__ */ jsxRuntime.jsx(Plus, { className: "h-4 w-4 mr-2" }) }) }),
      /* @__PURE__ */ jsxRuntime.jsxs(dialog.DialogContent, { className: "max-w-2xl max-h-[90vh] overflow-y-auto", children: [
        /* @__PURE__ */ jsxRuntime.jsxs(dialog.DialogHeader, { children: [
          /* @__PURE__ */ jsxRuntime.jsx(dialog.DialogTitle, { children: "Create New User" }),
          /* @__PURE__ */ jsxRuntime.jsx(dialog.DialogDescription, { children: "Add a new user to your organization. The user will receive an activation email to set their password." })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs("form", { onSubmit, className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntime.jsxs(label.Label, { htmlFor: "first_name", children: [
                "First Name ",
                /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-red-500", children: "*" })
              ] }),
              /* @__PURE__ */ jsxRuntime.jsx(
                input.Input,
                {
                  id: "first_name",
                  value: newUser.first_name,
                  onChange: (e) => handleNameChange("first_name", e.target.value),
                  placeholder: "Enter first name",
                  required: true
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntime.jsxs(label.Label, { htmlFor: "last_name", children: [
                "Last Name ",
                /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-red-500", children: "*" })
              ] }),
              /* @__PURE__ */ jsxRuntime.jsx(
                input.Input,
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
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntime.jsx(label.Label, { htmlFor: "full_name", children: "Full Name (Auto-generated, editable)" }),
              /* @__PURE__ */ jsxRuntime.jsx(
                input.Input,
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
            /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntime.jsxs(label.Label, { htmlFor: "email", children: [
                "Email Address ",
                /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-red-500", children: "*" })
              ] }),
              /* @__PURE__ */ jsxRuntime.jsx(
                input.Input,
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
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntime.jsxs(label.Label, { htmlFor: "access_level", children: [
                "Access Level ",
                /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-red-500", children: "*" })
              ] }),
              /* @__PURE__ */ jsxRuntime.jsxs(
                select.Select,
                {
                  value: newUser.access_level,
                  onValueChange: (value) => {
                    const backendValue = value === "Admin" ? "client_admin" : value.toLowerCase();
                    updateField("access_level", backendValue);
                  },
                  required: true,
                  children: [
                    /* @__PURE__ */ jsxRuntime.jsx(select.SelectTrigger, { children: /* @__PURE__ */ jsxRuntime.jsx(select.SelectValue, { placeholder: "Select access level" }) }),
                    /* @__PURE__ */ jsxRuntime.jsxs(select.SelectContent, { children: [
                      /* @__PURE__ */ jsxRuntime.jsx(select.SelectItem, { value: "user", children: "User" }),
                      /* @__PURE__ */ jsxRuntime.jsx(select.SelectItem, { value: "manager", children: "Manager" }),
                      /* @__PURE__ */ jsxRuntime.jsx(select.SelectItem, { value: "client_admin", children: "Admin" }),
                      isSuperAdmin && /* @__PURE__ */ jsxRuntime.jsx(select.SelectItem, { value: "author", children: "Author" }),
                      isSuperAdmin && /* @__PURE__ */ jsxRuntime.jsx(select.SelectItem, { value: "super_admin", children: "Super Admin" })
                    ] })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntime.jsxs(label.Label, { htmlFor: "location", children: [
                "Location ",
                /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-red-500", children: "*" })
              ] }),
              /* @__PURE__ */ jsxRuntime.jsxs(select.Select, { value: newUser.location_id || "", onValueChange: handleLocationChange, required: true, children: [
                /* @__PURE__ */ jsxRuntime.jsx(select.SelectTrigger, { children: /* @__PURE__ */ jsxRuntime.jsx(select.SelectValue, { placeholder: "Select a location" }) }),
                /* @__PURE__ */ jsxRuntime.jsx(select.SelectContent, { children: locations == null ? void 0 : locations.map((location) => /* @__PURE__ */ jsxRuntime.jsx(select.SelectItem, { value: location.id, children: location.name }, location.id)) })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntime.jsx(label.Label, { htmlFor: "phone", children: "Phone" }),
              /* @__PURE__ */ jsxRuntime.jsx(
                input.Input,
                {
                  id: "phone",
                  value: newUser.phone,
                  onChange: (e) => updateField("phone", e.target.value),
                  placeholder: "Enter phone number"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntime.jsx(label.Label, { htmlFor: "employee_id", children: "Employee ID" }),
              /* @__PURE__ */ jsxRuntime.jsx(
                input.Input,
                {
                  id: "employee_id",
                  value: newUser.employee_id,
                  onChange: (e) => updateField("employee_id", e.target.value),
                  placeholder: "Enter employee ID"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntime.jsx(label.Label, { htmlFor: "bio", children: "Bio" }),
            /* @__PURE__ */ jsxRuntime.jsx(
              textarea.Textarea,
              {
                id: "bio",
                value: newUser.bio,
                onChange: (e) => updateField("bio", e.target.value),
                placeholder: "Enter bio (optional)",
                rows: 3
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-red-500", children: "*" }),
            " Required fields"
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs(dialog.DialogFooter, { children: [
            /* @__PURE__ */ jsxRuntime.jsx(button.Button, { type: "button", variant: "outline", onClick: () => handleDialogClose(false), disabled: loading, size: "icon", children: /* @__PURE__ */ jsxRuntime.jsx(X, { className: "h-4 w-4" }) }),
            /* @__PURE__ */ jsxRuntime.jsx(button.Button, { type: "submit", disabled: loading || !isFormValid(), size: "icon", children: loading ? /* @__PURE__ */ jsxRuntime.jsx("div", { className: "w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" }) : /* @__PURE__ */ jsxRuntime.jsx(Save, { className: "h-4 w-4" }) })
          ] })
        ] })
      ] })
    ] });
  };
  const EditUserDialog = ({
    isOpen,
    onOpenChange,
    editingUser,
    onUserChange,
    onSubmit
  }) => {
    const { supabaseClient } = useOrganisationContext();
    const { data: locations } = reactQuery.useQuery({
      queryKey: ["locations"],
      queryFn: async () => {
        const { data } = await supabaseClient.from("locations").select("id, name").eq("status", "Active").order("name");
        return data || [];
      }
    });
    if (!editingUser) return null;
    const updateField = (field, value) => {
      onUserChange({ ...editingUser, [field]: value });
    };
    const handleLocationChange = (locationId) => {
      const selectedLocation = locations == null ? void 0 : locations.find((loc) => loc.id === locationId);
      if (selectedLocation) {
        onUserChange({
          ...editingUser,
          location_id: locationId,
          location: selectedLocation.name
        });
      }
    };
    const getLocationId = () => {
      if (editingUser.location_id) {
        return editingUser.location_id;
      }
      if (editingUser.location && locations) {
        const foundLocation = locations.find((loc) => loc.name === editingUser.location);
        return (foundLocation == null ? void 0 : foundLocation.id) || "";
      }
      return "";
    };
    return /* @__PURE__ */ jsxRuntime.jsx(dialog.Dialog, { open: isOpen, onOpenChange, children: /* @__PURE__ */ jsxRuntime.jsxs(dialog.DialogContent, { className: "max-w-2xl max-h-[90vh] overflow-y-auto", children: [
      /* @__PURE__ */ jsxRuntime.jsxs(dialog.DialogHeader, { children: [
        /* @__PURE__ */ jsxRuntime.jsx(dialog.DialogTitle, { children: "Edit User" }),
        /* @__PURE__ */ jsxRuntime.jsx(dialog.DialogDescription, { children: "Update user information" })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("form", { onSubmit, className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntime.jsx(label.Label, { htmlFor: "edit_full_name", children: "Full Name" }),
            /* @__PURE__ */ jsxRuntime.jsx(
              input.Input,
              {
                id: "edit_full_name",
                value: editingUser.full_name || "",
                onChange: (e) => updateField("full_name", e.target.value),
                placeholder: "Enter full name"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntime.jsx(label.Label, { htmlFor: "edit_username", children: "Username" }),
            /* @__PURE__ */ jsxRuntime.jsx(
              input.Input,
              {
                id: "edit_username",
                value: editingUser.username || "",
                onChange: (e) => updateField("username", e.target.value),
                placeholder: "Enter username"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntime.jsx(label.Label, { htmlFor: "edit_email", children: "Email" }),
            /* @__PURE__ */ jsxRuntime.jsx(
              input.Input,
              {
                id: "edit_email",
                type: "email",
                value: editingUser.email || "",
                onChange: (e) => updateField("email", e.target.value),
                placeholder: "Enter email address"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntime.jsx(label.Label, { htmlFor: "edit_phone", children: "Phone" }),
            /* @__PURE__ */ jsxRuntime.jsx(
              input.Input,
              {
                id: "edit_phone",
                value: editingUser.phone || "",
                onChange: (e) => updateField("phone", e.target.value),
                placeholder: "Enter phone number"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntime.jsx(label.Label, { htmlFor: "edit_role", children: "Role" }),
            /* @__PURE__ */ jsxRuntime.jsx(
              input.Input,
              {
                id: "edit_role",
                value: editingUser.role || "",
                onChange: (e) => updateField("role", e.target.value),
                placeholder: "Enter user role"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntime.jsx(label.Label, { htmlFor: "edit_department", children: "Department" }),
            /* @__PURE__ */ jsxRuntime.jsx(
              input.Input,
              {
                id: "edit_department",
                value: editingUser.department || "",
                onChange: (e) => updateField("department", e.target.value),
                placeholder: "Enter department"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntime.jsx(label.Label, { htmlFor: "edit_employee_id", children: "Employee ID" }),
            /* @__PURE__ */ jsxRuntime.jsx(
              input.Input,
              {
                id: "edit_employee_id",
                value: editingUser.employee_id || "",
                onChange: (e) => updateField("employee_id", e.target.value),
                placeholder: "Enter employee ID"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntime.jsx(label.Label, { htmlFor: "edit_location", children: "Location" }),
            /* @__PURE__ */ jsxRuntime.jsxs(select.Select, { value: getLocationId(), onValueChange: handleLocationChange, children: [
              /* @__PURE__ */ jsxRuntime.jsx(select.SelectTrigger, { children: /* @__PURE__ */ jsxRuntime.jsx(select.SelectValue, { placeholder: "Select a location" }) }),
              /* @__PURE__ */ jsxRuntime.jsx(select.SelectContent, { children: locations == null ? void 0 : locations.map((location) => /* @__PURE__ */ jsxRuntime.jsx(select.SelectItem, { value: location.id, children: location.name }, location.id)) })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntime.jsx(label.Label, { htmlFor: "edit_status", children: "Status" }),
            /* @__PURE__ */ jsxRuntime.jsxs(
              select.Select,
              {
                value: editingUser.status || "Active",
                onValueChange: (value) => updateField("status", value),
                children: [
                  /* @__PURE__ */ jsxRuntime.jsx(select.SelectTrigger, { children: /* @__PURE__ */ jsxRuntime.jsx(select.SelectValue, {}) }),
                  /* @__PURE__ */ jsxRuntime.jsxs(select.SelectContent, { children: [
                    /* @__PURE__ */ jsxRuntime.jsx(select.SelectItem, { value: "Active", children: "Active" }),
                    /* @__PURE__ */ jsxRuntime.jsx(select.SelectItem, { value: "Inactive", children: "Inactive" }),
                    /* @__PURE__ */ jsxRuntime.jsx(select.SelectItem, { value: "Pending", children: "Pending" })
                  ] })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntime.jsx(label.Label, { htmlFor: "edit_access_level", children: "Access Level" }),
            /* @__PURE__ */ jsxRuntime.jsxs(
              select.Select,
              {
                value: editingUser.access_level || "User",
                onValueChange: (value) => updateField("access_level", value),
                children: [
                  /* @__PURE__ */ jsxRuntime.jsx(select.SelectTrigger, { children: /* @__PURE__ */ jsxRuntime.jsx(select.SelectValue, {}) }),
                  /* @__PURE__ */ jsxRuntime.jsxs(select.SelectContent, { children: [
                    /* @__PURE__ */ jsxRuntime.jsx(select.SelectItem, { value: "User", children: "User" }),
                    /* @__PURE__ */ jsxRuntime.jsx(select.SelectItem, { value: "Manager", children: "Manager" }),
                    /* @__PURE__ */ jsxRuntime.jsx(select.SelectItem, { value: "Admin", children: "Admin" })
                  ] })
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntime.jsx(label.Label, { htmlFor: "edit_bio", children: "Bio" }),
          /* @__PURE__ */ jsxRuntime.jsx(
            textarea.Textarea,
            {
              id: "edit_bio",
              value: editingUser.bio || "",
              onChange: (e) => updateField("bio", e.target.value),
              placeholder: "Enter bio (optional)",
              rows: 3
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs(dialog.DialogFooter, { children: [
          /* @__PURE__ */ jsxRuntime.jsx(button.Button, { type: "button", variant: "outline", onClick: () => onOpenChange(false), size: "icon", children: /* @__PURE__ */ jsxRuntime.jsx(X, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsxRuntime.jsx(button.Button, { type: "submit", size: "icon", children: /* @__PURE__ */ jsxRuntime.jsx(Save, { className: "h-4 w-4" }) })
        ] })
      ] })
    ] }) });
  };
  const validateManager = (managerIdentifier, existingProfiles) => {
    if (!managerIdentifier || !existingProfiles) {
      return { isValid: false };
    }
    const trimmedIdentifier = managerIdentifier.trim().toLowerCase();
    const manager = existingProfiles.find((profile) => {
      const email = (profile.email || "").toLowerCase();
      const fullName = (profile.full_name || "").toLowerCase();
      const username = (profile.username || "").toLowerCase();
      return email === trimmedIdentifier || fullName === trimmedIdentifier || username === trimmedIdentifier;
    });
    return {
      isValid: !!manager,
      managerId: manager == null ? void 0 : manager.id
    };
  };
  const ImportUsersDialog = ({ onImportComplete, onImportError }) => {
    const [isOpen, setIsOpen] = o.useState(false);
    const [uploadedFile, setUploadedFile] = o.useState(null);
    const [isProcessing, setIsProcessing] = o.useState(false);
    const { createProfile } = useUserProfiles.useUserProfiles();
    const { data: validLocations } = reactQuery.useQuery({
      queryKey: ["locations"],
      queryFn: async () => {
        const { data, error } = await client.supabase.from("locations").select("id, name").eq("status", "Active").order("name");
        if (error) throw error;
        return data || [];
      }
    });
    const { data: validDepartments } = reactQuery.useQuery({
      queryKey: ["departments"],
      queryFn: async () => {
        const { data, error } = await client.supabase.from("departments").select("id, name").order("name");
        if (error) throw error;
        return data || [];
      }
    });
    const { data: validRoles } = reactQuery.useQuery({
      queryKey: ["roles"],
      queryFn: async () => {
        const { data, error } = await client.supabase.from("roles").select("role_id, name, department_id, is_active").eq("is_active", true).order("name");
        if (error) throw error;
        return data || [];
      }
    });
    const { data: existingProfiles } = reactQuery.useQuery({
      queryKey: ["profiles-for-manager-validation"],
      queryFn: async () => {
        const { data, error } = await client.supabase.from("profiles").select("id, full_name, username").order("full_name");
        if (error) throw error;
        return data || [];
      }
    });
    const onDrop = o.useCallback((acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        if (!file.name.endsWith(".csv") && file.type !== "text/csv") {
          useToast$1.toast({
            title: "Invalid file type",
            description: "Please upload a CSV file (.csv)",
            variant: "destructive"
          });
          return;
        }
        setUploadedFile(file);
        useToast$1.toast({
          title: "File uploaded",
          description: `${file.name} is ready for import`
        });
      }
    }, []);
    const { getRootProps, getInputProps, isDragActive } = reactDropzone.useDropzone({
      onDrop,
      accept: {
        "text/csv": [".csv"]
      },
      multiple: false
    });
    const generateSampleCSV = () => {
      const headers = ["Email", "Full Name", "First Name", "Last Name", "Phone", "Employee ID", "Access Level", "Location", "Department", "Role", "Manager"];
      const sampleData = [
        ["john.doe@company.com", "John Doe", "John", "Doe", "+1-555-0123", "EMP-2024-001", "User", "Main Office", "Engineering", "Software Engineer", "jane.smith@company.com"],
        ["jane.smith@company.com", "Jane Smith", "Jane", "Smith", "+1-555-0124", "EMP-2024-002", "Manager", "Branch Office", "Human Resources", "HR Manager", ""]
      ];
      const csvContent = [headers, ...sampleData].map((row) => row.map((field) => `"${field}"`).join(",")).join("\n");
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
        console.log("Location validation: No location name or validLocations not loaded", { locationName, validLocations });
        return { isValid: false };
      }
      const trimmedLocation = locationName.trim();
      console.log("Location validation: Checking location", {
        providedLocation: trimmedLocation,
        availableLocations: validLocations.map((l) => l.name)
      });
      const validLocation = validLocations.find(
        (loc) => loc.name.toLowerCase() === trimmedLocation.toLowerCase()
      );
      console.log("Location validation result:", {
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
    const validateManager$1 = (managerIdentifier) => {
      return validateManager(managerIdentifier, existingProfiles);
    };
    const validateAccessLevel = (accessLevel) => {
      if (!accessLevel) {
        return { isValid: false };
      }
      const trimmedLevel = accessLevel.trim().toLowerCase();
      const validLevels = ["user", "manager", "client_admin", "admin", "author"];
      const levelMapping = {
        "admin": "client_admin",
        "client admin": "client_admin"
      };
      const backendValue = levelMapping[trimmedLevel] || trimmedLevel;
      const isValid = validLevels.includes(backendValue);
      return {
        isValid,
        value: isValid ? backendValue : void 0
      };
    };
    const translateError = (error) => {
      const errorMessage = (error == null ? void 0 : error.message) || (error == null ? void 0 : error.error) || "Unknown error";
      console.log("Translating error:", { originalError: error, errorMessage });
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
      console.log("Processing user:", email);
      const accessLevelValue = row["Access Level"] || row["access_level"] || "";
      const accessLevelValidation = validateAccessLevel(accessLevelValue);
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
      const managerName = row["Manager"] || row["manager"] || "";
      let managerId;
      let managerWarning = null;
      if (managerName) {
        const managerValidation = validateManager$1(managerName);
        if (!managerValidation.isValid) {
          managerWarning = {
            field: "Manager",
            value: managerName,
            message: `Manager "${managerName}" does not exist in the system - user created without manager assignment`
          };
        } else {
          managerId = managerValidation.managerId;
        }
      }
      const clientId = client.getCurrentClientId();
      const clientPath = clientId ? `/${clientId}` : "";
      const { data: authData, error: authError } = await client.supabase.functions.invoke("create-user", {
        body: {
          email,
          full_name: row["Full Name"] || row["full_name"] || "Unknown User",
          first_name: row["First Name"] || row["first_name"] || "",
          last_name: row["Last Name"] || row["last_name"] || "",
          username: row["Username"] || row["username"] || "",
          phone: row["Phone"] || row["phone"] || "",
          status: "Pending",
          employee_id: row["Employee ID"] || row["employee_id"] || "",
          access_level: accessLevelValidation.isValid ? accessLevelValidation.value : "user",
          manager: managerId || null,
          // Include manager if validated
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
        console.log("User created successfully:", email);
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
      if (!accessLevelValidation.isValid && accessLevelValue) {
        warnings.push({
          field: "Access Level",
          value: accessLevelValue,
          message: `Access Level "${accessLevelValue}" is invalid - user created with default "User" access level`
        });
      }
      if (managerWarning) {
        warnings.push(managerWarning);
      }
      if (locationName) {
        const locationValidation = validateLocation(locationName);
        if (locationValidation.isValid && locationValidation.locationId) {
          try {
            const locationData = {
              user_id: userId,
              location_id: locationValidation.locationId,
              full_name: row["Full Name"] || row["full_name"] || "Unknown User",
              access_purpose: "General Access",
              status: "Active",
              date_access_created: (/* @__PURE__ */ new Date()).toISOString()
            };
            const { error: locationError } = await client.supabase.from("physical_location_access").insert(locationData);
            if (locationError) {
              console.error("Error assigning location:", locationError);
              warnings.push({
                field: "Location",
                value: locationName,
                message: `Location "${locationName}" could not be assigned: ${locationError.message}`
              });
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
            const { error: deptError } = await client.supabase.from("user_departments").insert({
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
              const { data: existingDepts } = await client.supabase.from("user_departments").select("id").eq("user_id", userId);
              if (existingDepts && existingDepts.length === 1) {
                await client.supabase.from("user_departments").update({ is_primary: true }).eq("user_id", userId).eq("department_id", departmentId);
              }
            }
          }
          if (roleId) {
            const { error: roleError } = await client.supabase.from("user_profile_roles").insert({
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
              const { data: existingRoles } = await client.supabase.from("user_profile_roles").select("id").eq("user_id", userId);
              if (existingRoles && existingRoles.length === 1) {
                await client.supabase.from("user_profile_roles").update({ is_primary: true }).eq("user_id", userId).eq("role_id", roleId);
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
        warnings: warnings.length > 0 ? warnings : null
      };
    };
    const handleImport = async () => {
      if (!uploadedFile) {
        useToast$1.toast({
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
              useToast$1.toast({
                title: "Empty file",
                description: "The uploaded file contains no data",
                variant: "destructive"
              });
              setIsProcessing(false);
              return;
            }
            console.log("Processing", data.length, "rows");
            let successCount = 0;
            const errors = [];
            const warnings = [];
            for (let i = 0; i < data.length; i++) {
              const row = data[i];
              if (!row["Email"] && !row["email"] && !row["Full Name"] && !row["full_name"]) {
                console.log("Skipping empty row at index", i);
                continue;
              }
              const email = row["Email"] || row["email"] || "Unknown";
              try {
                console.log(`Processing user ${i + 1} of ${data.length}:`, email);
                const result = await processUserImport(row);
                successCount++;
                console.log(`Successfully processed user ${i + 1}`);
                if (result.warnings) {
                  result.warnings.forEach((warning) => {
                    warnings.push({
                      rowNumber: i + 2,
                      // +2 because row 1 is headers, and i is 0-indexed
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
                  rowNumber: i + 2,
                  // +2 because row 1 is headers, and i is 0-indexed
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
            console.log("Import completed. Success:", successCount, "Errors:", errors.length, "Warnings:", warnings.length);
            setUploadedFile(null);
            setIsProcessing(false);
            setIsOpen(false);
            if ((errors.length > 0 || warnings.length > 0) && onImportError) {
              setTimeout(() => {
                onImportError(errors, warnings, { success: successCount, total: data.length });
              }, 300);
              if (errors.length > 0 && warnings.length > 0) {
                useToast$1.toast({
                  title: "Import completed with errors and warnings",
                  description: `${successCount} users imported successfully. ${errors.length} failed, ${warnings.length} have validation warnings.`,
                  variant: "destructive"
                });
              } else if (errors.length > 0) {
                useToast$1.toast({
                  title: "Import completed with errors",
                  description: `${successCount} users imported successfully. ${errors.length} failed. Opening error report...`,
                  variant: "destructive"
                });
              } else if (warnings.length > 0) {
                useToast$1.toast({
                  title: "Import completed with warnings",
                  description: `${successCount} users imported successfully. ${warnings.length} users have validation warnings. Opening warning report...`,
                  variant: "default"
                });
              }
            } else {
              useToast$1.toast({
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
            useToast$1.toast({
              title: "Parse error",
              description: "Failed to parse the CSV file",
              variant: "destructive"
            });
            setIsProcessing(false);
          }
        });
      } catch (error) {
        console.error("Import error:", error);
        useToast$1.toast({
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
    return /* @__PURE__ */ jsxRuntime.jsxs(dialog.Dialog, { open: isOpen, onOpenChange: handleDialogClose, children: [
      /* @__PURE__ */ jsxRuntime.jsx(dialog.DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntime.jsx(button.Button, { variant: "outline", children: /* @__PURE__ */ jsxRuntime.jsx(Upload, { className: "h-4 w-4 mr-2" }) }) }),
      /* @__PURE__ */ jsxRuntime.jsxs(dialog.DialogContent, { className: "max-w-3xl max-h-[90vh] overflow-y-auto", children: [
        /* @__PURE__ */ jsxRuntime.jsxs(dialog.DialogHeader, { children: [
          /* @__PURE__ */ jsxRuntime.jsx(dialog.DialogTitle, { children: "Import Users" }),
          /* @__PURE__ */ jsxRuntime.jsx(dialog.DialogDescription, { children: "Upload a CSV file to import users in bulk. Users will be created with authentication accounts and will receive an activation link via email. Departments, roles, and locations can be assigned during import." })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntime.jsxs(
              "div",
              {
                ...getRootProps(),
                className: `border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${isDragActive ? "border-blue-400 bg-blue-50" : uploadedFile ? "border-green-400 bg-green-50" : "border-gray-300 hover:border-gray-400"}`,
                children: [
                  /* @__PURE__ */ jsxRuntime.jsx("input", { ...getInputProps() }),
                  /* @__PURE__ */ jsxRuntime.jsx(Upload, { className: "h-12 w-12 mx-auto mb-4 text-gray-400" }),
                  uploadedFile ? /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-lg font-medium text-green-700", children: "File Ready for Import" }),
                    /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-sm text-green-600 mt-1", children: uploadedFile.name }),
                    /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-xs text-gray-500 mt-2", children: "Click to select a different file or drop a new one here" })
                  ] }) : isDragActive ? /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-lg font-medium text-blue-700", children: "Drop your user file here" }) : /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-lg font-medium", children: "Drag and drop your user file here, or browse" }),
                    /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-sm text-gray-500 mt-1", children: "Supports CSV files (.csv)" })
                  ] })
                ]
              }
            ),
            uploadedFile && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex gap-3", children: [
              /* @__PURE__ */ jsxRuntime.jsx(
                button.Button,
                {
                  onClick: handleImport,
                  disabled: isProcessing,
                  className: "flex items-center gap-2",
                  children: isProcessing ? /* @__PURE__ */ jsxRuntime.jsx(jsxRuntime.Fragment, { children: /* @__PURE__ */ jsxRuntime.jsx("div", { className: "animate-spin rounded-full h-4 w-4 border-b-2 border-white" }) }) : /* @__PURE__ */ jsxRuntime.jsx(jsxRuntime.Fragment, { children: /* @__PURE__ */ jsxRuntime.jsx(Upload, { className: "h-4 w-4" }) })
                }
              ),
              /* @__PURE__ */ jsxRuntime.jsx(
                button.Button,
                {
                  variant: "outline",
                  onClick: () => setUploadedFile(null),
                  disabled: isProcessing,
                  children: "X"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "bg-yellow-50 border border-yellow-200 rounded-lg p-4", children: [
            /* @__PURE__ */ jsxRuntime.jsx("h4", { className: "text-sm font-medium text-yellow-800 mb-2", children: "User Import Template" }),
            /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-sm text-yellow-700 mb-3", children: "Download a template for importing users with sample data." }),
            /* @__PURE__ */ jsxRuntime.jsx("div", { className: "space-y-2", children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center justify-between p-2 bg-white rounded border", children: [
              /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntime.jsx(FileText, { className: "h-4 w-4" }),
                /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-sm font-medium", children: "Users Template (CSV)" }),
                /* @__PURE__ */ jsxRuntime.jsx(badge.Badge, { variant: "secondary", className: "text-xs", children: "Ready to use template" })
              ] }),
              /* @__PURE__ */ jsxRuntime.jsx(button.Button, { size: "sm", variant: "outline", onClick: generateSampleCSV, className: "gap-2", children: /* @__PURE__ */ jsxRuntime.jsx(Download, { className: "h-4 w-4" }) })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "bg-blue-50 border border-blue-200 rounded-lg p-4", children: [
            /* @__PURE__ */ jsxRuntime.jsx("h4", { className: "font-semibold text-blue-900 mb-2", children: "Available Columns" }),
            /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex flex-wrap gap-2 mb-4", children: [
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
            ].map((column) => /* @__PURE__ */ jsxRuntime.jsx(badge.Badge, { variant: "outline", className: "text-xs", children: column }, column)) }),
            /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "text-sm text-blue-800 space-y-1", children: [
              /* @__PURE__ */ jsxRuntime.jsxs("p", { children: [
                "• ",
                /* @__PURE__ */ jsxRuntime.jsx("strong", { children: "Email" }),
                " is required for each user"
              ] }),
              /* @__PURE__ */ jsxRuntime.jsx("p", { children: "• Users will be created with 'Pending' status and must activate via email" }),
              /* @__PURE__ */ jsxRuntime.jsxs("p", { children: [
                "• ",
                /* @__PURE__ */ jsxRuntime.jsx("strong", { children: "Location" }),
                " (optional) - must match an existing active location"
              ] }),
              /* @__PURE__ */ jsxRuntime.jsxs("p", { children: [
                "• ",
                /* @__PURE__ */ jsxRuntime.jsx("strong", { children: "Department" }),
                " (optional) - must match an existing department"
              ] }),
              /* @__PURE__ */ jsxRuntime.jsxs("p", { children: [
                "• ",
                /* @__PURE__ */ jsxRuntime.jsx("strong", { children: "Role" }),
                " (optional) - must match an existing active role"
              ] }),
              /* @__PURE__ */ jsxRuntime.jsxs("p", { children: [
                "• If both ",
                /* @__PURE__ */ jsxRuntime.jsx("strong", { children: "Department" }),
                " and ",
                /* @__PURE__ */ jsxRuntime.jsx("strong", { children: "Role" }),
                " are provided, the role must belong to that department (or be a general role)"
              ] }),
              /* @__PURE__ */ jsxRuntime.jsxs("p", { children: [
                "• If only ",
                /* @__PURE__ */ jsxRuntime.jsx("strong", { children: "Role" }),
                " is provided, it must be a general role (not assigned to any department)"
              ] }),
              /* @__PURE__ */ jsxRuntime.jsxs("p", { children: [
                "• ",
                /* @__PURE__ */ jsxRuntime.jsx("strong", { children: "Manager" }),
                " (optional) - can be identified by email, full name, or username. If manager doesn't exist, user will be created but a warning will be reported"
              ] }),
              /* @__PURE__ */ jsxRuntime.jsx("p", { children: "• All other fields are optional and will use default values if not provided" })
            ] })
          ] })
        ] })
      ] })
    ] });
  };
  const UserManagement = () => {
    const { hasPermission, onUserAction } = useOrganisationContext();
    const { profiles, loading, updateProfile, refetch } = useUserProfiles.useUserProfiles();
    const { toast } = useToast$1.useToast();
    const [viewMode, setViewMode] = useViewPreference.useViewPreference("userManagement", "cards");
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = o.useState(false);
    const [userToDelete, setUserToDelete] = o.useState(null);
    const [isDeleting, setIsDeleting] = o.useState(false);
    const [showImportErrorReport, setShowImportErrorReport] = o.useState(false);
    const [importErrors, setImportErrors] = o.useState([]);
    const [importWarnings, setImportWarnings] = o.useState([]);
    const [importStats, setImportStats] = o.useState({ success: 0, total: 0 });
    const [isCreatingUser, setIsCreatingUser] = o.useState(false);
    const {
      editingUser,
      setEditingUser,
      isEditDialogOpen,
      setIsEditDialogOpen,
      isCreateDialogOpen,
      setIsCreateDialogOpen,
      newUser,
      setNewUser,
      openEditDialog,
      closeEditDialog,
      resetNewUser
    } = useUserManagement.useUserManagement();
    const onSaveUser = async (e) => {
      e.preventDefault();
      if (!editingUser) return;
      await handleSaveUser(editingUser, async (id, updates) => {
        await updateProfile(id, updates);
      }, closeEditDialog);
    };
    const onCreateUser = async (e) => {
      e.preventDefault();
      setIsCreatingUser(true);
      try {
        await handleCreateUser(newUser, async (id, updates) => {
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
      const user = profiles.find((p) => p.id === userId);
      setUserToDelete({ id: userId, name: (user == null ? void 0 : user.full_name) || "Unknown User" });
      setIsDeleteDialogOpen(true);
    };
    const handleDeleteConfirm = async (reason) => {
      var _a;
      if (!userToDelete) return;
      setIsDeleting(true);
      try {
        const result = await handleDeleteUser(userToDelete.id, userToDelete.name, reason);
        if (result.success) {
          setIsDeleteDialogOpen(false);
          setUserToDelete(null);
          toast({
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
      return /* @__PURE__ */ jsxRuntime.jsx("div", { children: "Loading users..." });
    }
    return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(
        ImportErrorReport$1.ImportErrorReport,
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
      /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntime.jsxs(card.Card, { children: [
          /* @__PURE__ */ jsxRuntime.jsx(card.CardHeader, { children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntime.jsxs(card.CardTitle, { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntime.jsx(Users, { className: "h-5 w-5" }),
                "User Management"
              ] }),
              /* @__PURE__ */ jsxRuntime.jsx(card.CardDescription, { children: "Manage user accounts, roles, and permissions" })
            ] }),
            /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-4", children: [
              /* @__PURE__ */ jsxRuntime.jsxs(
                toggleGroup.ToggleGroup,
                {
                  type: "single",
                  value: viewMode,
                  onValueChange: (value) => value && setViewMode(value),
                  children: [
                    /* @__PURE__ */ jsxRuntime.jsx(toggleGroup.ToggleGroupItem, { value: "cards", "aria-label": "Card view", children: /* @__PURE__ */ jsxRuntime.jsx(LayoutGrid, { className: "h-4 w-4" }) }),
                    /* @__PURE__ */ jsxRuntime.jsx(toggleGroup.ToggleGroupItem, { value: "list", "aria-label": "List view", children: /* @__PURE__ */ jsxRuntime.jsx(List, { className: "h-4 w-4" }) })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntime.jsx(
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
              /* @__PURE__ */ jsxRuntime.jsx(
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
          /* @__PURE__ */ jsxRuntime.jsx(card.CardContent, { children: viewMode === "cards" ? /* @__PURE__ */ jsxRuntime.jsx(
            UserList,
            {
              profiles,
              onEdit: openEditDialog,
              onDelete: onDeleteUser
            }
          ) : /* @__PURE__ */ jsxRuntime.jsx(
            UserTable,
            {
              profiles,
              onEdit: openEditDialog,
              onDelete: onDeleteUser,
              onUpdate: onUpdateProfile
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsx(
          EditUserDialog,
          {
            isOpen: isEditDialogOpen,
            onOpenChange: setIsEditDialogOpen,
            editingUser,
            onUserChange: setEditingUser,
            onSubmit: onSaveUser
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsx(
          deleteUserDialog.DeleteUserDialog,
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
    const [isOpen, setIsOpen] = o.useState(false);
    const [uploadedFile, setUploadedFile] = o.useState(null);
    const [isProcessing, setIsProcessing] = o.useState(false);
    const { supabaseClient } = useOrganisationContext();
    const onDrop = o.useCallback((acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        if (!file.name.endsWith(".csv") && file.type !== "text/csv") {
          useToast.toast({
            title: "Invalid file type",
            description: "Please upload a CSV file (.csv)",
            variant: "destructive"
          });
          return;
        }
        setUploadedFile(file);
        useToast.toast({
          title: "File uploaded",
          description: `${file.name} is ready for import`
        });
      }
    }, []);
    const { getRootProps, getInputProps, isDragActive } = reactDropzone.useDropzone({
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
        useToast.toast({
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
              useToast.toast({
                title: "Empty file",
                description: "The uploaded file contains no data",
                variant: "destructive"
              });
              setIsProcessing(false);
              return;
            }
            console.log("Processing", data.length, "roles");
            let successCount = 0;
            const errors = [];
            const warnings = [];
            for (let i = 0; i < data.length; i++) {
              const row = data[i];
              if (!row["Name"] && !row["name"]) {
                console.log("Skipping empty row at index", i);
                continue;
              }
              const name = row["Name"] || row["name"] || "Unknown";
              try {
                console.log(`Processing role ${i + 1} of ${data.length}:`, name);
                const result = await processRoleImport(row);
                successCount++;
                console.log(`Successfully processed role ${i + 1}`);
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
            console.log("Import completed. Success:", successCount, "Errors:", errors.length, "Warnings:", warnings.length);
            setUploadedFile(null);
            setIsProcessing(false);
            setIsOpen(false);
            if ((errors.length > 0 || warnings.length > 0) && onImportError) {
              setTimeout(() => {
                onImportError(errors, warnings, { success: successCount, total: data.length });
              }, 300);
              if (errors.length > 0 && warnings.length > 0) {
                useToast.toast({
                  title: "Import completed with errors and warnings",
                  description: `${successCount} roles imported successfully. ${errors.length} failed, ${warnings.length} have validation warnings.`,
                  variant: "destructive"
                });
              } else if (errors.length > 0) {
                useToast.toast({
                  title: "Import completed with errors",
                  description: `${successCount} roles imported successfully. ${errors.length} failed.`,
                  variant: "destructive"
                });
              } else if (warnings.length > 0) {
                useToast.toast({
                  title: "Import completed with warnings",
                  description: `${successCount} roles imported successfully. ${warnings.length} have validation warnings.`,
                  variant: "default"
                });
              }
            } else {
              useToast.toast({
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
            useToast.toast({
              title: "Parse error",
              description: "Failed to parse the CSV file",
              variant: "destructive"
            });
            setIsProcessing(false);
          }
        });
      } catch (error) {
        console.error("Import error:", error);
        useToast.toast({
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
    return /* @__PURE__ */ jsxRuntime.jsxs(dialog.Dialog, { open: isOpen, onOpenChange: handleDialogClose, children: [
      /* @__PURE__ */ jsxRuntime.jsx(dialog.DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntime.jsx(button.Button, { variant: "outline", size: "icon", children: /* @__PURE__ */ jsxRuntime.jsx(Upload, { className: "h-4 w-4" }) }) }),
      /* @__PURE__ */ jsxRuntime.jsxs(dialog.DialogContent, { className: "max-w-3xl max-h-[90vh] overflow-y-auto", children: [
        /* @__PURE__ */ jsxRuntime.jsxs(dialog.DialogHeader, { children: [
          /* @__PURE__ */ jsxRuntime.jsx(dialog.DialogTitle, { children: "Import Roles" }),
          /* @__PURE__ */ jsxRuntime.jsx(dialog.DialogDescription, { children: "Upload a CSV or Excel file to import roles in bulk. Departments can be assigned by name." })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntime.jsxs(
              "div",
              {
                ...getRootProps(),
                className: `border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${isDragActive ? "border-blue-400 bg-blue-50" : uploadedFile ? "border-green-400 bg-green-50" : "border-gray-300 hover:border-gray-400"}`,
                children: [
                  /* @__PURE__ */ jsxRuntime.jsx("input", { ...getInputProps() }),
                  /* @__PURE__ */ jsxRuntime.jsx(Upload, { className: "h-12 w-12 mx-auto mb-4 text-gray-400" }),
                  uploadedFile ? /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-lg font-medium text-green-700", children: "File Ready for Import" }),
                    /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-sm text-green-600 mt-1", children: uploadedFile.name }),
                    /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-xs text-gray-500 mt-2", children: "Click to select a different file or drop a new one here" })
                  ] }) : isDragActive ? /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-lg font-medium text-blue-700", children: "Drop your role file here" }) : /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-lg font-medium", children: "Drag and drop your role file here, or browse" }),
                    /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-sm text-gray-500 mt-1", children: "Supports CSV files (.csv)" })
                  ] })
                ]
              }
            ),
            uploadedFile && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex gap-3", children: [
              /* @__PURE__ */ jsxRuntime.jsx(
                button.Button,
                {
                  onClick: handleImport,
                  disabled: isProcessing,
                  size: "icon",
                  children: isProcessing ? /* @__PURE__ */ jsxRuntime.jsx("div", { className: "animate-spin rounded-full h-4 w-4 border-b-2 border-white" }) : /* @__PURE__ */ jsxRuntime.jsx(Upload, { className: "h-4 w-4" })
                }
              ),
              /* @__PURE__ */ jsxRuntime.jsx(
                button.Button,
                {
                  variant: "outline",
                  onClick: () => setUploadedFile(null),
                  disabled: isProcessing,
                  size: "icon",
                  children: /* @__PURE__ */ jsxRuntime.jsx(Trash2, { className: "h-4 w-4" })
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "bg-yellow-50 border border-yellow-200 rounded-lg p-4", children: [
            /* @__PURE__ */ jsxRuntime.jsx("h4", { className: "text-sm font-medium text-yellow-800 mb-2", children: "Role Import Template" }),
            /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-sm text-yellow-700 mb-3", children: "Download a template for importing roles with sample data." }),
            /* @__PURE__ */ jsxRuntime.jsx("div", { className: "space-y-2", children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center justify-between p-2 bg-white rounded border", children: [
              /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntime.jsx(FileText, { className: "h-4 w-4" }),
                /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-sm font-medium", children: "Roles Template (CSV)" }),
                /* @__PURE__ */ jsxRuntime.jsx(badge.Badge, { variant: "secondary", className: "text-xs", children: "Ready to use template" })
              ] }),
              /* @__PURE__ */ jsxRuntime.jsx(button.Button, { size: "sm", variant: "outline", onClick: generateSampleCSV, className: "gap-2", children: /* @__PURE__ */ jsxRuntime.jsx(Download, { className: "h-4 w-4" }) })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "bg-blue-50 border border-blue-200 rounded-lg p-4", children: [
            /* @__PURE__ */ jsxRuntime.jsx("h4", { className: "font-semibold text-blue-900 mb-2", children: "Available Columns" }),
            /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex flex-wrap gap-2 mb-4", children: ["Name", "Description", "Department"].map((column) => /* @__PURE__ */ jsxRuntime.jsx(badge.Badge, { variant: "outline", className: "text-xs", children: column }, column)) }),
            /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "text-sm text-blue-800 space-y-1", children: [
              /* @__PURE__ */ jsxRuntime.jsxs("p", { children: [
                "• ",
                /* @__PURE__ */ jsxRuntime.jsx("strong", { children: "Name" }),
                " is required for each role"
              ] }),
              /* @__PURE__ */ jsxRuntime.jsxs("p", { children: [
                "• ",
                /* @__PURE__ */ jsxRuntime.jsx("strong", { children: "Description" }),
                " is optional"
              ] }),
              /* @__PURE__ */ jsxRuntime.jsxs("p", { children: [
                "• ",
                /* @__PURE__ */ jsxRuntime.jsx("strong", { children: "Department" }),
                " is optional - must match an existing department name"
              ] }),
              /* @__PURE__ */ jsxRuntime.jsxs("p", { children: [
                "• All imported roles will be created as ",
                /* @__PURE__ */ jsxRuntime.jsx("strong", { children: "active" }),
                " by default"
              ] }),
              /* @__PURE__ */ jsxRuntime.jsx("p", { children: "• Duplicate role names will be rejected" })
            ] })
          ] })
        ] })
      ] })
    ] });
  };
  const RoleManagement = () => {
    const { supabaseClient, hasPermission } = useOrganisationContext();
    const queryClient = reactQuery.useQueryClient();
    const [isCreateDialogOpen, setIsCreateDialogOpen] = o.useState(false);
    const [editingRole, setEditingRole] = o.useState(null);
    const [showImportErrorReport, setShowImportErrorReport] = o.useState(false);
    const [importErrors, setImportErrors] = o.useState([]);
    const [importWarnings, setImportWarnings] = o.useState([]);
    const [importStats, setImportStats] = o.useState({ success: 0, total: 0 });
    const [formData, setFormData] = o.useState({
      name: "",
      description: "",
      department_id: "none",
      is_active: true
    });
    const [sortField, setSortField] = o.useState("name");
    const [sortDirection, setSortDirection] = o.useState("asc");
    const { data: rolesData, isLoading: rolesLoading } = reactQuery.useQuery({
      queryKey: ["roles"],
      queryFn: async () => {
        const { data, error } = await supabaseClient.from("roles").select("*");
        if (error) throw error;
        return data;
      }
    });
    const { data: departments } = reactQuery.useQuery({
      queryKey: ["departments-for-roles"],
      queryFn: async () => {
        const { data, error } = await supabaseClient.from("departments").select("id, name").order("name");
        if (error) throw error;
        return data;
      }
    });
    const roles = o.useMemo(() => {
      if (!rolesData) return [];
      return [...rolesData].sort((a, b) => {
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
    }, [rolesData, sortField, sortDirection, departments]);
    const handleSort = (field) => {
      if (sortField === field) {
        setSortDirection(sortDirection === "asc" ? "desc" : "asc");
      } else {
        setSortField(field);
        setSortDirection("asc");
      }
    };
    const createRoleMutation = reactQuery.useMutation({
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
        useToast.toast({
          title: "Success",
          description: "Role created successfully"
        });
        setIsCreateDialogOpen(false);
        resetForm();
      },
      onError: (error) => {
        useToast.toast({
          title: "Error",
          description: error.message,
          variant: "destructive"
        });
      }
    });
    const updateRoleMutation = reactQuery.useMutation({
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
        useToast.toast({
          title: "Success",
          description: "Role updated successfully"
        });
        setEditingRole(null);
        resetForm();
      },
      onError: (error) => {
        useToast.toast({
          title: "Error",
          description: error.message,
          variant: "destructive"
        });
      }
    });
    const deleteRoleMutation = reactQuery.useMutation({
      mutationFn: async (roleId) => {
        const { error } = await supabaseClient.from("roles").delete().eq("role_id", roleId);
        if (error) throw error;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["roles"] });
        useToast.toast({
          title: "Success",
          description: "Role deleted successfully"
        });
      },
      onError: (error) => {
        useToast.toast({
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
      return /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex items-center justify-center h-64", children: /* @__PURE__ */ jsxRuntime.jsx("div", { className: "animate-spin rounded-full h-32 w-32 border-b-2 border-primary" }) });
    }
    return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntime.jsx(
        ImportErrorReport$1.ImportErrorReport,
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
      /* @__PURE__ */ jsxRuntime.jsxs(card.Card, { children: [
        /* @__PURE__ */ jsxRuntime.jsx(card.CardHeader, { children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntime.jsxs(card.CardTitle, { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntime.jsx(UserCheck, { className: "h-5 w-5" }),
              "Roles"
            ] }),
            /* @__PURE__ */ jsxRuntime.jsx(card.CardDescription, { children: "Manage organizational roles and their department associations" })
          ] }),
          hasPermission("canManageRoles") && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntime.jsx(
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
            /* @__PURE__ */ jsxRuntime.jsxs(dialog.Dialog, { open: isCreateDialogOpen, onOpenChange: setIsCreateDialogOpen, children: [
              /* @__PURE__ */ jsxRuntime.jsx(dialog.DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntime.jsx(button.Button, { size: "icon", children: /* @__PURE__ */ jsxRuntime.jsx(Plus, { className: "h-4 w-4" }) }) }),
              /* @__PURE__ */ jsxRuntime.jsxs(dialog.DialogContent, { children: [
                /* @__PURE__ */ jsxRuntime.jsxs(dialog.DialogHeader, { children: [
                  /* @__PURE__ */ jsxRuntime.jsx(dialog.DialogTitle, { children: "Create Role" }),
                  /* @__PURE__ */ jsxRuntime.jsx(dialog.DialogDescription, { children: "Add a new role to your organization" })
                ] }),
                /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "grid gap-4 py-4", children: [
                  /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "grid gap-2", children: [
                    /* @__PURE__ */ jsxRuntime.jsx(label.Label, { htmlFor: "name", children: "Role Name" }),
                    /* @__PURE__ */ jsxRuntime.jsx(
                      input.Input,
                      {
                        id: "name",
                        value: formData.name,
                        onChange: (e) => setFormData((prev) => ({ ...prev, name: e.target.value })),
                        placeholder: "Enter role name"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "grid gap-2", children: [
                    /* @__PURE__ */ jsxRuntime.jsx(label.Label, { htmlFor: "description", children: "Description" }),
                    /* @__PURE__ */ jsxRuntime.jsx(
                      textarea.Textarea,
                      {
                        id: "description",
                        value: formData.description,
                        onChange: (e) => setFormData((prev) => ({ ...prev, description: e.target.value })),
                        placeholder: "Enter role description (optional)"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "grid gap-2", children: [
                    /* @__PURE__ */ jsxRuntime.jsx(label.Label, { htmlFor: "department", children: "Department" }),
                    /* @__PURE__ */ jsxRuntime.jsxs(
                      select.Select,
                      {
                        value: formData.department_id,
                        onValueChange: (value) => setFormData((prev) => ({ ...prev, department_id: value })),
                        children: [
                          /* @__PURE__ */ jsxRuntime.jsx(select.SelectTrigger, { children: /* @__PURE__ */ jsxRuntime.jsx(select.SelectValue, { placeholder: "Select department (optional)" }) }),
                          /* @__PURE__ */ jsxRuntime.jsxs(select.SelectContent, { children: [
                            /* @__PURE__ */ jsxRuntime.jsx(select.SelectItem, { value: "none", children: "No department" }),
                            departments == null ? void 0 : departments.map((department) => /* @__PURE__ */ jsxRuntime.jsx(select.SelectItem, { value: department.id, children: department.name }, department.id))
                          ] })
                        ]
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center space-x-2", children: [
                    /* @__PURE__ */ jsxRuntime.jsx(
                      _switch.Switch,
                      {
                        id: "is_active",
                        checked: formData.is_active,
                        onCheckedChange: (checked) => setFormData((prev) => ({ ...prev, is_active: checked }))
                      }
                    ),
                    /* @__PURE__ */ jsxRuntime.jsx(label.Label, { htmlFor: "is_active", children: "Active Role" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntime.jsxs(dialog.DialogFooter, { children: [
                  /* @__PURE__ */ jsxRuntime.jsx(button.Button, { variant: "outline", onClick: () => setIsCreateDialogOpen(false), size: "icon", children: /* @__PURE__ */ jsxRuntime.jsx(X, { className: "h-4 w-4" }) }),
                  /* @__PURE__ */ jsxRuntime.jsx(button.Button, { onClick: handleSubmit, disabled: !formData.name.trim(), size: "icon", children: /* @__PURE__ */ jsxRuntime.jsx(Save, { className: "h-4 w-4" }) })
                ] })
              ] })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntime.jsxs(card.CardContent, { children: [
          /* @__PURE__ */ jsxRuntime.jsxs(table.Table, { children: [
            /* @__PURE__ */ jsxRuntime.jsx(table.TableHeader, { children: /* @__PURE__ */ jsxRuntime.jsxs(table.TableRow, { className: "bg-muted/50", children: [
              /* @__PURE__ */ jsxRuntime.jsx(
                table.TableHead,
                {
                  className: "cursor-pointer hover:bg-muted/70 transition-colors",
                  onClick: () => handleSort("name"),
                  children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-2", children: [
                    "Name",
                    sortField === "name" && (sortDirection === "asc" ? /* @__PURE__ */ jsxRuntime.jsx(ArrowUp, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntime.jsx(ArrowDown, { className: "h-4 w-4" }))
                  ] })
                }
              ),
              /* @__PURE__ */ jsxRuntime.jsx(table.TableHead, { children: "Description" }),
              /* @__PURE__ */ jsxRuntime.jsx(
                table.TableHead,
                {
                  className: "cursor-pointer hover:bg-muted/70 transition-colors",
                  onClick: () => handleSort("department"),
                  children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-2", children: [
                    "Department",
                    sortField === "department" && (sortDirection === "asc" ? /* @__PURE__ */ jsxRuntime.jsx(ArrowUp, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntime.jsx(ArrowDown, { className: "h-4 w-4" }))
                  ] })
                }
              ),
              /* @__PURE__ */ jsxRuntime.jsx(
                table.TableHead,
                {
                  className: "cursor-pointer hover:bg-muted/70 transition-colors",
                  onClick: () => handleSort("status"),
                  children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-2", children: [
                    "Status",
                    sortField === "status" && (sortDirection === "asc" ? /* @__PURE__ */ jsxRuntime.jsx(ArrowUp, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntime.jsx(ArrowDown, { className: "h-4 w-4" }))
                  ] })
                }
              ),
              /* @__PURE__ */ jsxRuntime.jsx(
                table.TableHead,
                {
                  className: "cursor-pointer hover:bg-muted/70 transition-colors",
                  onClick: () => handleSort("created_at"),
                  children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-2", children: [
                    "Created",
                    sortField === "created_at" && (sortDirection === "asc" ? /* @__PURE__ */ jsxRuntime.jsx(ArrowUp, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntime.jsx(ArrowDown, { className: "h-4 w-4" }))
                  ] })
                }
              ),
              hasPermission("canManageRoles") && /* @__PURE__ */ jsxRuntime.jsx(table.TableHead, { className: "text-right", children: "Actions" })
            ] }) }),
            /* @__PURE__ */ jsxRuntime.jsx(table.TableBody, { children: roles == null ? void 0 : roles.map((role) => /* @__PURE__ */ jsxRuntime.jsxs(table.TableRow, { children: [
              /* @__PURE__ */ jsxRuntime.jsx(table.TableCell, { className: "font-medium", children: role.name }),
              /* @__PURE__ */ jsxRuntime.jsx(table.TableCell, { children: role.description || /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-muted-foreground", children: "No description" }) }),
              /* @__PURE__ */ jsxRuntime.jsx(table.TableCell, { children: getDepartmentName(role.department_id) }),
              /* @__PURE__ */ jsxRuntime.jsx(table.TableCell, { children: /* @__PURE__ */ jsxRuntime.jsx(badge.Badge, { variant: role.is_active ? "default" : "secondary", children: role.is_active ? "Active" : "Inactive" }) }),
              /* @__PURE__ */ jsxRuntime.jsx(table.TableCell, { children: new Date(role.created_at).toLocaleDateString() }),
              hasPermission("canManageRoles") && /* @__PURE__ */ jsxRuntime.jsx(table.TableCell, { className: "text-right", children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center justify-end gap-2", children: [
                /* @__PURE__ */ jsxRuntime.jsx(
                  button.Button,
                  {
                    variant: "outline",
                    size: "sm",
                    onClick: () => handleEdit(role),
                    children: /* @__PURE__ */ jsxRuntime.jsx(SquarePen, { className: "h-4 w-4" })
                  }
                ),
                /* @__PURE__ */ jsxRuntime.jsx(
                  button.Button,
                  {
                    variant: "outline",
                    size: "sm",
                    onClick: () => deleteRoleMutation.mutate(role.role_id),
                    children: /* @__PURE__ */ jsxRuntime.jsx(Trash2, { className: "h-4 w-4" })
                  }
                )
              ] }) })
            ] }, role.role_id)) })
          ] }),
          (roles == null ? void 0 : roles.length) === 0 && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "text-center py-8", children: [
            /* @__PURE__ */ jsxRuntime.jsx(UserCheck, { className: "h-12 w-12 mx-auto text-muted-foreground mb-4" }),
            /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-muted-foreground", children: "No roles found" }),
            /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-sm text-muted-foreground", children: "Create your first role to get started" })
          ] })
        ] })
      ] }),
      hasPermission("canManageRoles") && /* @__PURE__ */ jsxRuntime.jsx(dialog.Dialog, { open: !!editingRole, onOpenChange: (open) => !open && setEditingRole(null), children: /* @__PURE__ */ jsxRuntime.jsxs(dialog.DialogContent, { children: [
        /* @__PURE__ */ jsxRuntime.jsxs(dialog.DialogHeader, { children: [
          /* @__PURE__ */ jsxRuntime.jsx(dialog.DialogTitle, { children: "Edit Role" }),
          /* @__PURE__ */ jsxRuntime.jsx(dialog.DialogDescription, { children: "Update role information" })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "grid gap-4 py-4", children: [
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "grid gap-2", children: [
            /* @__PURE__ */ jsxRuntime.jsx(label.Label, { htmlFor: "edit-name", children: "Role Name" }),
            /* @__PURE__ */ jsxRuntime.jsx(
              input.Input,
              {
                id: "edit-name",
                value: formData.name,
                onChange: (e) => setFormData((prev) => ({ ...prev, name: e.target.value })),
                placeholder: "Enter role name"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "grid gap-2", children: [
            /* @__PURE__ */ jsxRuntime.jsx(label.Label, { htmlFor: "edit-description", children: "Description" }),
            /* @__PURE__ */ jsxRuntime.jsx(
              textarea.Textarea,
              {
                id: "edit-description",
                value: formData.description,
                onChange: (e) => setFormData((prev) => ({ ...prev, description: e.target.value })),
                placeholder: "Enter role description (optional)"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "grid gap-2", children: [
            /* @__PURE__ */ jsxRuntime.jsx(label.Label, { htmlFor: "edit-department", children: "Department" }),
            /* @__PURE__ */ jsxRuntime.jsxs(
              select.Select,
              {
                value: formData.department_id,
                onValueChange: (value) => setFormData((prev) => ({ ...prev, department_id: value })),
                children: [
                  /* @__PURE__ */ jsxRuntime.jsx(select.SelectTrigger, { children: /* @__PURE__ */ jsxRuntime.jsx(select.SelectValue, { placeholder: "Select department (optional)" }) }),
                  /* @__PURE__ */ jsxRuntime.jsxs(select.SelectContent, { children: [
                    /* @__PURE__ */ jsxRuntime.jsx(select.SelectItem, { value: "none", children: "No department" }),
                    departments == null ? void 0 : departments.map((department) => /* @__PURE__ */ jsxRuntime.jsx(select.SelectItem, { value: department.id, children: department.name }, department.id))
                  ] })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center space-x-2", children: [
            /* @__PURE__ */ jsxRuntime.jsx(
              _switch.Switch,
              {
                id: "edit-is_active",
                checked: formData.is_active,
                onCheckedChange: (checked) => setFormData((prev) => ({ ...prev, is_active: checked }))
              }
            ),
            /* @__PURE__ */ jsxRuntime.jsx(label.Label, { htmlFor: "edit-is_active", children: "Active Role" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs(dialog.DialogFooter, { children: [
          /* @__PURE__ */ jsxRuntime.jsx(button.Button, { variant: "outline", onClick: () => setEditingRole(null), size: "icon", children: /* @__PURE__ */ jsxRuntime.jsx(X, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsxRuntime.jsx(button.Button, { onClick: handleSubmit, disabled: !formData.name.trim(), size: "icon", children: /* @__PURE__ */ jsxRuntime.jsx(Save, { className: "h-4 w-4" }) })
        ] })
      ] }) })
    ] });
  };
  const ImportDepartmentsDialog = ({ onImportComplete, onImportError }) => {
    const [isOpen, setIsOpen] = o.useState(false);
    const [uploadedFile, setUploadedFile] = o.useState(null);
    const [isProcessing, setIsProcessing] = o.useState(false);
    const { supabaseClient } = useOrganisationContext();
    const onDrop = o.useCallback((acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        if (!file.name.endsWith(".csv") && file.type !== "text/csv") {
          useToast.toast({
            title: "Invalid file type",
            description: "Please upload a CSV file (.csv)",
            variant: "destructive"
          });
          return;
        }
        setUploadedFile(file);
        useToast.toast({
          title: "File uploaded",
          description: `${file.name} is ready for import`
        });
      }
    }, []);
    const { getRootProps, getInputProps, isDragActive } = reactDropzone.useDropzone({
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
    const validateManager2 = async (managerName) => {
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
        const managerValidation = await validateManager2(managerName);
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
        useToast.toast({
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
              useToast.toast({
                title: "Empty file",
                description: "The uploaded file contains no data",
                variant: "destructive"
              });
              setIsProcessing(false);
              return;
            }
            console.log("Processing", data.length, "departments");
            let successCount = 0;
            const errors = [];
            const warnings = [];
            for (let i = 0; i < data.length; i++) {
              const row = data[i];
              if (!row["Name"] && !row["name"]) {
                console.log("Skipping empty row at index", i);
                continue;
              }
              const name = row["Name"] || row["name"] || "Unknown";
              try {
                console.log(`Processing department ${i + 1} of ${data.length}:`, name);
                const result = await processDepartmentImport(row);
                successCount++;
                console.log(`Successfully processed department ${i + 1}`);
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
            console.log("Import completed. Success:", successCount, "Errors:", errors.length, "Warnings:", warnings.length);
            setUploadedFile(null);
            setIsProcessing(false);
            setIsOpen(false);
            if ((errors.length > 0 || warnings.length > 0) && onImportError) {
              setTimeout(() => {
                onImportError(errors, warnings, { success: successCount, total: data.length });
              }, 300);
              if (errors.length > 0 && warnings.length > 0) {
                useToast.toast({
                  title: "Import completed with errors and warnings",
                  description: `${successCount} departments imported successfully. ${errors.length} failed, ${warnings.length} have validation warnings.`,
                  variant: "destructive"
                });
              } else if (errors.length > 0) {
                useToast.toast({
                  title: "Import completed with errors",
                  description: `${successCount} departments imported successfully. ${errors.length} failed.`,
                  variant: "destructive"
                });
              } else if (warnings.length > 0) {
                useToast.toast({
                  title: "Import completed with warnings",
                  description: `${successCount} departments imported successfully. ${warnings.length} have validation warnings.`,
                  variant: "default"
                });
              }
            } else {
              useToast.toast({
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
            useToast.toast({
              title: "Parse error",
              description: "Failed to parse the CSV file",
              variant: "destructive"
            });
            setIsProcessing(false);
          }
        });
      } catch (error) {
        console.error("Import error:", error);
        useToast.toast({
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
    return /* @__PURE__ */ jsxRuntime.jsxs(dialog.Dialog, { open: isOpen, onOpenChange: handleDialogClose, children: [
      /* @__PURE__ */ jsxRuntime.jsx(dialog.DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntime.jsx(button.Button, { variant: "outline", size: "icon", children: /* @__PURE__ */ jsxRuntime.jsx(Upload, { className: "h-4 w-4" }) }) }),
      /* @__PURE__ */ jsxRuntime.jsxs(dialog.DialogContent, { className: "max-w-3xl max-h-[90vh] overflow-y-auto", children: [
        /* @__PURE__ */ jsxRuntime.jsxs(dialog.DialogHeader, { children: [
          /* @__PURE__ */ jsxRuntime.jsx(dialog.DialogTitle, { children: "Import Departments" }),
          /* @__PURE__ */ jsxRuntime.jsx(dialog.DialogDescription, { children: "Upload a CSV or Excel file to import departments in bulk. Managers can be assigned by name or email." })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntime.jsxs(
              "div",
              {
                ...getRootProps(),
                className: `border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${isDragActive ? "border-blue-400 bg-blue-50" : uploadedFile ? "border-green-400 bg-green-50" : "border-gray-300 hover:border-gray-400"}`,
                children: [
                  /* @__PURE__ */ jsxRuntime.jsx("input", { ...getInputProps() }),
                  /* @__PURE__ */ jsxRuntime.jsx(Upload, { className: "h-12 w-12 mx-auto mb-4 text-gray-400" }),
                  uploadedFile ? /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-lg font-medium text-green-700", children: "File Ready for Import" }),
                    /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-sm text-green-600 mt-1", children: uploadedFile.name }),
                    /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-xs text-gray-500 mt-2", children: "Click to select a different file or drop a new one here" })
                  ] }) : isDragActive ? /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-lg font-medium text-blue-700", children: "Drop your department file here" }) : /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-lg font-medium", children: "Drag and drop your department file here, or browse" }),
                    /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-sm text-gray-500 mt-1", children: "Supports CSV files (.csv)" })
                  ] })
                ]
              }
            ),
            uploadedFile && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex gap-3", children: [
              /* @__PURE__ */ jsxRuntime.jsx(
                button.Button,
                {
                  onClick: handleImport,
                  disabled: isProcessing,
                  size: "icon",
                  children: isProcessing ? /* @__PURE__ */ jsxRuntime.jsx("div", { className: "animate-spin rounded-full h-4 w-4 border-b-2 border-white" }) : /* @__PURE__ */ jsxRuntime.jsx(Upload, { className: "h-4 w-4" })
                }
              ),
              /* @__PURE__ */ jsxRuntime.jsx(
                button.Button,
                {
                  variant: "outline",
                  onClick: () => setUploadedFile(null),
                  disabled: isProcessing,
                  size: "icon",
                  children: /* @__PURE__ */ jsxRuntime.jsx(Trash2, { className: "h-4 w-4" })
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "bg-yellow-50 border border-yellow-200 rounded-lg p-4", children: [
            /* @__PURE__ */ jsxRuntime.jsx("h4", { className: "text-sm font-medium text-yellow-800 mb-2", children: "Department Import Template" }),
            /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-sm text-yellow-700 mb-3", children: "Download a template for importing departments with sample data." }),
            /* @__PURE__ */ jsxRuntime.jsx("div", { className: "space-y-2", children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center justify-between p-2 bg-white rounded border", children: [
              /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntime.jsx(FileText, { className: "h-4 w-4" }),
                /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-sm font-medium", children: "Departments Template (CSV)" }),
                /* @__PURE__ */ jsxRuntime.jsx(badge.Badge, { variant: "secondary", className: "text-xs", children: "Ready to use template" })
              ] }),
              /* @__PURE__ */ jsxRuntime.jsx(button.Button, { size: "sm", variant: "outline", onClick: generateSampleCSV, className: "gap-2", children: /* @__PURE__ */ jsxRuntime.jsx(Download, { className: "h-4 w-4" }) })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "bg-blue-50 border border-blue-200 rounded-lg p-4", children: [
            /* @__PURE__ */ jsxRuntime.jsx("h4", { className: "font-semibold text-blue-900 mb-2", children: "Available Columns" }),
            /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex flex-wrap gap-2 mb-4", children: ["Name", "Description", "Manager"].map((column) => /* @__PURE__ */ jsxRuntime.jsx(badge.Badge, { variant: "outline", className: "text-xs", children: column }, column)) }),
            /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "text-sm text-blue-800 space-y-1", children: [
              /* @__PURE__ */ jsxRuntime.jsxs("p", { children: [
                "• ",
                /* @__PURE__ */ jsxRuntime.jsx("strong", { children: "Name" }),
                " is required for each department"
              ] }),
              /* @__PURE__ */ jsxRuntime.jsxs("p", { children: [
                "• ",
                /* @__PURE__ */ jsxRuntime.jsx("strong", { children: "Description" }),
                " is optional"
              ] }),
              /* @__PURE__ */ jsxRuntime.jsxs("p", { children: [
                "• ",
                /* @__PURE__ */ jsxRuntime.jsx("strong", { children: "Manager" }),
                " is optional - can be full name or email (must exist in system)"
              ] }),
              /* @__PURE__ */ jsxRuntime.jsx("p", { children: "• Duplicate department names will be rejected" })
            ] })
          ] })
        ] })
      ] })
    ] });
  };
  const DepartmentManagement = () => {
    const { supabaseClient, hasPermission } = useOrganisationContext();
    const queryClient = reactQuery.useQueryClient();
    const [isCreateDialogOpen, setIsCreateDialogOpen] = o.useState(false);
    const [editingDepartment, setEditingDepartment] = o.useState(null);
    const [showImportErrorReport, setShowImportErrorReport] = o.useState(false);
    const [importErrors, setImportErrors] = o.useState([]);
    const [importWarnings, setImportWarnings] = o.useState([]);
    const [importStats, setImportStats] = o.useState({ success: 0, total: 0 });
    const [formData, setFormData] = o.useState({
      name: "",
      description: "",
      manager_id: "none"
    });
    const [sortField, setSortField] = o.useState("name");
    const [sortDirection, setSortDirection] = o.useState("asc");
    const { data: departmentsData, isLoading: departmentsLoading } = reactQuery.useQuery({
      queryKey: ["departments"],
      queryFn: async () => {
        const { data, error } = await supabaseClient.from("departments").select("*");
        if (error) throw error;
        return data;
      }
    });
    const departments = o.useMemo(() => {
      if (!departmentsData) return [];
      return [...departmentsData].sort((a, b) => {
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
    }, [departmentsData, sortField, sortDirection]);
    const handleSort = (field) => {
      if (sortField === field) {
        setSortDirection(sortDirection === "asc" ? "desc" : "asc");
      } else {
        setSortField(field);
        setSortDirection("asc");
      }
    };
    const { data: profiles } = reactQuery.useQuery({
      queryKey: ["profiles-for-managers"],
      queryFn: async () => {
        const { data, error } = await supabaseClient.from("profiles").select("id, full_name").not("full_name", "is", null).order("full_name");
        if (error) throw error;
        return data;
      }
    });
    const createDepartmentMutation = reactQuery.useMutation({
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
        useToast.toast({
          title: "Success",
          description: "Department created successfully"
        });
        setIsCreateDialogOpen(false);
        resetForm();
      },
      onError: (error) => {
        useToast.toast({
          title: "Error",
          description: error.message,
          variant: "destructive"
        });
      }
    });
    const updateDepartmentMutation = reactQuery.useMutation({
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
        useToast.toast({
          title: "Success",
          description: "Department updated successfully"
        });
        setEditingDepartment(null);
        resetForm();
      },
      onError: (error) => {
        useToast.toast({
          title: "Error",
          description: error.message,
          variant: "destructive"
        });
      }
    });
    const deleteDepartmentMutation = reactQuery.useMutation({
      mutationFn: async (id) => {
        const { error } = await supabaseClient.from("departments").delete().eq("id", id);
        if (error) throw error;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["departments"] });
        useToast.toast({
          title: "Success",
          description: "Department deleted successfully"
        });
      },
      onError: (error) => {
        useToast.toast({
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
      return /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex items-center justify-center h-64", children: /* @__PURE__ */ jsxRuntime.jsx("div", { className: "animate-spin rounded-full h-32 w-32 border-b-2 border-primary" }) });
    }
    return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntime.jsx(
        ImportErrorReport$1.ImportErrorReport,
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
      /* @__PURE__ */ jsxRuntime.jsxs(card.Card, { children: [
        /* @__PURE__ */ jsxRuntime.jsx(card.CardHeader, { children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntime.jsxs(card.CardTitle, { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntime.jsx(Building2, { className: "h-5 w-5" }),
              "Departments"
            ] }),
            /* @__PURE__ */ jsxRuntime.jsx(card.CardDescription, { children: "Manage organizational departments and assign managers" })
          ] }),
          hasPermission("canManageDepartments") && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntime.jsx(
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
            /* @__PURE__ */ jsxRuntime.jsxs(dialog.Dialog, { open: isCreateDialogOpen, onOpenChange: setIsCreateDialogOpen, children: [
              /* @__PURE__ */ jsxRuntime.jsx(dialog.DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntime.jsx(button.Button, { size: "icon", children: /* @__PURE__ */ jsxRuntime.jsx(Plus, { className: "h-4 w-4" }) }) }),
              /* @__PURE__ */ jsxRuntime.jsxs(dialog.DialogContent, { children: [
                /* @__PURE__ */ jsxRuntime.jsxs(dialog.DialogHeader, { children: [
                  /* @__PURE__ */ jsxRuntime.jsx(dialog.DialogTitle, { children: "Create Department" }),
                  /* @__PURE__ */ jsxRuntime.jsx(dialog.DialogDescription, { children: "Add a new department to your organization" })
                ] }),
                /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "grid gap-4 py-4", children: [
                  /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "grid gap-2", children: [
                    /* @__PURE__ */ jsxRuntime.jsx(label.Label, { htmlFor: "name", children: "Department Name" }),
                    /* @__PURE__ */ jsxRuntime.jsx(
                      input.Input,
                      {
                        id: "name",
                        value: formData.name,
                        onChange: (e) => setFormData((prev) => ({ ...prev, name: e.target.value })),
                        placeholder: "Enter department name"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "grid gap-2", children: [
                    /* @__PURE__ */ jsxRuntime.jsx(label.Label, { htmlFor: "description", children: "Description" }),
                    /* @__PURE__ */ jsxRuntime.jsx(
                      textarea.Textarea,
                      {
                        id: "description",
                        value: formData.description,
                        onChange: (e) => setFormData((prev) => ({ ...prev, description: e.target.value })),
                        placeholder: "Enter department description (optional)"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "grid gap-2", children: [
                    /* @__PURE__ */ jsxRuntime.jsx(label.Label, { htmlFor: "manager", children: "Manager" }),
                    /* @__PURE__ */ jsxRuntime.jsxs(
                      select.Select,
                      {
                        value: formData.manager_id,
                        onValueChange: (value) => setFormData((prev) => ({ ...prev, manager_id: value })),
                        children: [
                          /* @__PURE__ */ jsxRuntime.jsx(select.SelectTrigger, { children: /* @__PURE__ */ jsxRuntime.jsx(select.SelectValue, { placeholder: "Select manager (optional)" }) }),
                          /* @__PURE__ */ jsxRuntime.jsxs(select.SelectContent, { children: [
                            /* @__PURE__ */ jsxRuntime.jsx(select.SelectItem, { value: "none", children: "No manager" }),
                            profiles == null ? void 0 : profiles.map((profile) => /* @__PURE__ */ jsxRuntime.jsx(select.SelectItem, { value: profile.id, children: profile.full_name }, profile.id))
                          ] })
                        ]
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntime.jsxs(dialog.DialogFooter, { children: [
                  /* @__PURE__ */ jsxRuntime.jsx(button.Button, { variant: "outline", onClick: () => setIsCreateDialogOpen(false), size: "icon", children: /* @__PURE__ */ jsxRuntime.jsx(X, { className: "h-4 w-4" }) }),
                  /* @__PURE__ */ jsxRuntime.jsx(button.Button, { onClick: handleSubmit, disabled: !formData.name.trim(), size: "icon", children: /* @__PURE__ */ jsxRuntime.jsx(Save, { className: "h-4 w-4" }) })
                ] })
              ] })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntime.jsxs(card.CardContent, { children: [
          /* @__PURE__ */ jsxRuntime.jsxs(table.Table, { children: [
            /* @__PURE__ */ jsxRuntime.jsx(table.TableHeader, { children: /* @__PURE__ */ jsxRuntime.jsxs(table.TableRow, { className: "bg-muted/50", children: [
              /* @__PURE__ */ jsxRuntime.jsx(
                table.TableHead,
                {
                  className: "cursor-pointer hover:bg-muted/70 transition-colors",
                  onClick: () => handleSort("name"),
                  children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-2", children: [
                    "Name",
                    sortField === "name" && (sortDirection === "asc" ? /* @__PURE__ */ jsxRuntime.jsx(ArrowUp, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntime.jsx(ArrowDown, { className: "h-4 w-4" }))
                  ] })
                }
              ),
              /* @__PURE__ */ jsxRuntime.jsx(table.TableHead, { children: "Description" }),
              /* @__PURE__ */ jsxRuntime.jsx(table.TableHead, { children: "Manager" }),
              /* @__PURE__ */ jsxRuntime.jsx(
                table.TableHead,
                {
                  className: "cursor-pointer hover:bg-muted/70 transition-colors",
                  onClick: () => handleSort("created_at"),
                  children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-2", children: [
                    "Created",
                    sortField === "created_at" && (sortDirection === "asc" ? /* @__PURE__ */ jsxRuntime.jsx(ArrowUp, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntime.jsx(ArrowDown, { className: "h-4 w-4" }))
                  ] })
                }
              ),
              hasPermission("canManageDepartments") && /* @__PURE__ */ jsxRuntime.jsx(table.TableHead, { className: "text-right", children: "Actions" })
            ] }) }),
            /* @__PURE__ */ jsxRuntime.jsx(table.TableBody, { children: departments == null ? void 0 : departments.map((department) => /* @__PURE__ */ jsxRuntime.jsxs(table.TableRow, { children: [
              /* @__PURE__ */ jsxRuntime.jsx(table.TableCell, { className: "font-medium", children: department.name }),
              /* @__PURE__ */ jsxRuntime.jsx(table.TableCell, { children: department.description || /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-muted-foreground", children: "No description" }) }),
              /* @__PURE__ */ jsxRuntime.jsx(table.TableCell, { children: getManagerName(department.manager_id) }),
              /* @__PURE__ */ jsxRuntime.jsx(table.TableCell, { children: new Date(department.created_at).toLocaleDateString() }),
              hasPermission("canManageDepartments") && /* @__PURE__ */ jsxRuntime.jsx(table.TableCell, { className: "text-right", children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center justify-end gap-2", children: [
                /* @__PURE__ */ jsxRuntime.jsx(
                  button.Button,
                  {
                    variant: "outline",
                    size: "sm",
                    onClick: () => handleEdit(department),
                    children: /* @__PURE__ */ jsxRuntime.jsx(SquarePen, { className: "h-4 w-4" })
                  }
                ),
                /* @__PURE__ */ jsxRuntime.jsx(
                  button.Button,
                  {
                    variant: "outline",
                    size: "sm",
                    onClick: () => deleteDepartmentMutation.mutate(department.id),
                    children: /* @__PURE__ */ jsxRuntime.jsx(Trash2, { className: "h-4 w-4" })
                  }
                )
              ] }) })
            ] }, department.id)) })
          ] }),
          (departments == null ? void 0 : departments.length) === 0 && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "text-center py-8", children: [
            /* @__PURE__ */ jsxRuntime.jsx(Building2, { className: "h-12 w-12 mx-auto text-muted-foreground mb-4" }),
            /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-muted-foreground", children: "No departments found" }),
            /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-sm text-muted-foreground", children: "Create your first department to get started" })
          ] })
        ] })
      ] }),
      hasPermission("canManageDepartments") && /* @__PURE__ */ jsxRuntime.jsx(dialog.Dialog, { open: !!editingDepartment, onOpenChange: (open) => !open && setEditingDepartment(null), children: /* @__PURE__ */ jsxRuntime.jsxs(dialog.DialogContent, { children: [
        /* @__PURE__ */ jsxRuntime.jsxs(dialog.DialogHeader, { children: [
          /* @__PURE__ */ jsxRuntime.jsx(dialog.DialogTitle, { children: "Edit Department" }),
          /* @__PURE__ */ jsxRuntime.jsx(dialog.DialogDescription, { children: "Update department information" })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "grid gap-4 py-4", children: [
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "grid gap-2", children: [
            /* @__PURE__ */ jsxRuntime.jsx(label.Label, { htmlFor: "edit-name", children: "Department Name" }),
            /* @__PURE__ */ jsxRuntime.jsx(
              input.Input,
              {
                id: "edit-name",
                value: formData.name,
                onChange: (e) => setFormData((prev) => ({ ...prev, name: e.target.value })),
                placeholder: "Enter department name"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "grid gap-2", children: [
            /* @__PURE__ */ jsxRuntime.jsx(label.Label, { htmlFor: "edit-description", children: "Description" }),
            /* @__PURE__ */ jsxRuntime.jsx(
              textarea.Textarea,
              {
                id: "edit-description",
                value: formData.description,
                onChange: (e) => setFormData((prev) => ({ ...prev, description: e.target.value })),
                placeholder: "Enter department description (optional)"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "grid gap-2", children: [
            /* @__PURE__ */ jsxRuntime.jsx(label.Label, { htmlFor: "edit-manager", children: "Manager" }),
            /* @__PURE__ */ jsxRuntime.jsxs(
              select.Select,
              {
                value: formData.manager_id,
                onValueChange: (value) => setFormData((prev) => ({ ...prev, manager_id: value })),
                children: [
                  /* @__PURE__ */ jsxRuntime.jsx(select.SelectTrigger, { children: /* @__PURE__ */ jsxRuntime.jsx(select.SelectValue, { placeholder: "Select manager (optional)" }) }),
                  /* @__PURE__ */ jsxRuntime.jsxs(select.SelectContent, { children: [
                    /* @__PURE__ */ jsxRuntime.jsx(select.SelectItem, { value: "none", children: "No manager" }),
                    profiles == null ? void 0 : profiles.map((profile) => /* @__PURE__ */ jsxRuntime.jsx(select.SelectItem, { value: profile.id, children: profile.full_name }, profile.id))
                  ] })
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs(dialog.DialogFooter, { children: [
          /* @__PURE__ */ jsxRuntime.jsx(button.Button, { variant: "outline", onClick: () => setEditingDepartment(null), size: "icon", children: /* @__PURE__ */ jsxRuntime.jsx(X, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsxRuntime.jsx(button.Button, { onClick: handleSubmit, disabled: !formData.name.trim(), size: "icon", children: /* @__PURE__ */ jsxRuntime.jsx(Save, { className: "h-4 w-4" }) })
        ] })
      ] }) })
    ] });
  };
  const LocationManagement = () => {
    const { supabaseClient, hasPermission } = useOrganisationContext();
    const queryClient = reactQuery.useQueryClient();
    const [isCreateDialogOpen, setIsCreateDialogOpen] = o.useState(false);
    const [editingLocation, setEditingLocation] = o.useState(null);
    const [formData, setFormData] = o.useState({
      name: "",
      description: "",
      building: "",
      floor: "",
      room: "",
      status: "Active"
    });
    const [sortField, setSortField] = o.useState("name");
    const [sortDirection, setSortDirection] = o.useState("asc");
    const { data: locationsData, isLoading: locationsLoading } = reactQuery.useQuery({
      queryKey: ["locations"],
      queryFn: async () => {
        const { data, error } = await supabaseClient.from("locations").select("*");
        if (error) throw error;
        return data;
      }
    });
    const locations = o.useMemo(() => {
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
    const createLocationMutation = reactQuery.useMutation({
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
        useToast.toast({
          title: "Success",
          description: "Location created successfully"
        });
        setIsCreateDialogOpen(false);
        resetForm();
      },
      onError: (error) => {
        useToast.toast({
          title: "Error",
          description: error.message,
          variant: "destructive"
        });
      }
    });
    const updateLocationMutation = reactQuery.useMutation({
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
        useToast.toast({
          title: "Success",
          description: "Location updated successfully"
        });
        setEditingLocation(null);
        resetForm();
      },
      onError: (error) => {
        useToast.toast({
          title: "Error",
          description: error.message,
          variant: "destructive"
        });
      }
    });
    const deleteLocationMutation = reactQuery.useMutation({
      mutationFn: async (id) => {
        const { error } = await supabaseClient.from("locations").delete().eq("id", id);
        if (error) throw error;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["locations"] });
        useToast.toast({
          title: "Success",
          description: "Location deleted successfully"
        });
      },
      onError: (error) => {
        useToast.toast({
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
      return /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex items-center justify-center h-64", children: /* @__PURE__ */ jsxRuntime.jsx("div", { className: "animate-spin rounded-full h-32 w-32 border-b-2 border-primary" }) });
    }
    return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntime.jsxs(card.Card, { children: [
        /* @__PURE__ */ jsxRuntime.jsx(card.CardHeader, { children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntime.jsxs(card.CardTitle, { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntime.jsx(MapPin, { className: "h-5 w-5" }),
              "Locations"
            ] }),
            /* @__PURE__ */ jsxRuntime.jsx(card.CardDescription, { children: "Manage organizational locations and facilities" })
          ] }),
          hasPermission("canManageLocations") && /* @__PURE__ */ jsxRuntime.jsxs(dialog.Dialog, { open: isCreateDialogOpen, onOpenChange: setIsCreateDialogOpen, children: [
            /* @__PURE__ */ jsxRuntime.jsx(dialog.DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntime.jsx(button.Button, { size: "icon", children: /* @__PURE__ */ jsxRuntime.jsx(Plus, { className: "h-4 w-4" }) }) }),
            /* @__PURE__ */ jsxRuntime.jsxs(dialog.DialogContent, { children: [
              /* @__PURE__ */ jsxRuntime.jsxs(dialog.DialogHeader, { children: [
                /* @__PURE__ */ jsxRuntime.jsx(dialog.DialogTitle, { children: "Create Location" }),
                /* @__PURE__ */ jsxRuntime.jsx(dialog.DialogDescription, { children: "Add a new location to your organization" })
              ] }),
              /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "grid gap-4 py-4", children: [
                /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "grid gap-2", children: [
                  /* @__PURE__ */ jsxRuntime.jsx(label.Label, { htmlFor: "name", children: "Location Name" }),
                  /* @__PURE__ */ jsxRuntime.jsx(
                    input.Input,
                    {
                      id: "name",
                      value: formData.name,
                      onChange: (e) => setFormData((prev) => ({ ...prev, name: e.target.value })),
                      placeholder: "Enter location name"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "grid gap-2", children: [
                  /* @__PURE__ */ jsxRuntime.jsx(label.Label, { htmlFor: "description", children: "Description" }),
                  /* @__PURE__ */ jsxRuntime.jsx(
                    textarea.Textarea,
                    {
                      id: "description",
                      value: formData.description,
                      onChange: (e) => setFormData((prev) => ({ ...prev, description: e.target.value })),
                      placeholder: "Enter location description (optional)"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                  /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "grid gap-2", children: [
                    /* @__PURE__ */ jsxRuntime.jsx(label.Label, { htmlFor: "building", children: "Building" }),
                    /* @__PURE__ */ jsxRuntime.jsx(
                      input.Input,
                      {
                        id: "building",
                        value: formData.building,
                        onChange: (e) => setFormData((prev) => ({ ...prev, building: e.target.value })),
                        placeholder: "Building name"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "grid gap-2", children: [
                    /* @__PURE__ */ jsxRuntime.jsx(label.Label, { htmlFor: "floor", children: "Floor" }),
                    /* @__PURE__ */ jsxRuntime.jsx(
                      input.Input,
                      {
                        id: "floor",
                        value: formData.floor,
                        onChange: (e) => setFormData((prev) => ({ ...prev, floor: e.target.value })),
                        placeholder: "Floor number"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "grid gap-2", children: [
                  /* @__PURE__ */ jsxRuntime.jsx(label.Label, { htmlFor: "room", children: "Room" }),
                  /* @__PURE__ */ jsxRuntime.jsx(
                    input.Input,
                    {
                      id: "room",
                      value: formData.room,
                      onChange: (e) => setFormData((prev) => ({ ...prev, room: e.target.value })),
                      placeholder: "Room number/name"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center space-x-2", children: [
                  /* @__PURE__ */ jsxRuntime.jsx(
                    _switch.Switch,
                    {
                      id: "status",
                      checked: formData.status === "Active",
                      onCheckedChange: (checked) => setFormData((prev) => ({ ...prev, status: checked ? "Active" : "Inactive" }))
                    }
                  ),
                  /* @__PURE__ */ jsxRuntime.jsx(label.Label, { htmlFor: "status", children: "Active Location" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntime.jsxs(dialog.DialogFooter, { children: [
                /* @__PURE__ */ jsxRuntime.jsx(button.Button, { variant: "outline", onClick: () => setIsCreateDialogOpen(false), size: "icon", children: /* @__PURE__ */ jsxRuntime.jsx(X, { className: "h-4 w-4" }) }),
                /* @__PURE__ */ jsxRuntime.jsx(button.Button, { onClick: handleSubmit, disabled: !formData.name.trim(), size: "icon", children: /* @__PURE__ */ jsxRuntime.jsx(Save, { className: "h-4 w-4" }) })
              ] })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntime.jsxs(card.CardContent, { children: [
          /* @__PURE__ */ jsxRuntime.jsxs(table.Table, { children: [
            /* @__PURE__ */ jsxRuntime.jsx(table.TableHeader, { children: /* @__PURE__ */ jsxRuntime.jsxs(table.TableRow, { className: "bg-muted/50", children: [
              /* @__PURE__ */ jsxRuntime.jsx(
                table.TableHead,
                {
                  className: "cursor-pointer hover:bg-muted/70 transition-colors",
                  onClick: () => handleSort("name"),
                  children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-2", children: [
                    "Name",
                    sortField === "name" && (sortDirection === "asc" ? /* @__PURE__ */ jsxRuntime.jsx(ArrowUp, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntime.jsx(ArrowDown, { className: "h-4 w-4" }))
                  ] })
                }
              ),
              /* @__PURE__ */ jsxRuntime.jsx(
                table.TableHead,
                {
                  className: "cursor-pointer hover:bg-muted/70 transition-colors",
                  onClick: () => handleSort("building"),
                  children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-2", children: [
                    "Building",
                    sortField === "building" && (sortDirection === "asc" ? /* @__PURE__ */ jsxRuntime.jsx(ArrowUp, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntime.jsx(ArrowDown, { className: "h-4 w-4" }))
                  ] })
                }
              ),
              /* @__PURE__ */ jsxRuntime.jsx(table.TableHead, { children: "Floor" }),
              /* @__PURE__ */ jsxRuntime.jsx(table.TableHead, { children: "Room" }),
              /* @__PURE__ */ jsxRuntime.jsx(
                table.TableHead,
                {
                  className: "cursor-pointer hover:bg-muted/70 transition-colors",
                  onClick: () => handleSort("status"),
                  children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-2", children: [
                    "Status",
                    sortField === "status" && (sortDirection === "asc" ? /* @__PURE__ */ jsxRuntime.jsx(ArrowUp, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntime.jsx(ArrowDown, { className: "h-4 w-4" }))
                  ] })
                }
              ),
              /* @__PURE__ */ jsxRuntime.jsx(
                table.TableHead,
                {
                  className: "cursor-pointer hover:bg-muted/70 transition-colors",
                  onClick: () => handleSort("created_at"),
                  children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-2", children: [
                    "Created",
                    sortField === "created_at" && (sortDirection === "asc" ? /* @__PURE__ */ jsxRuntime.jsx(ArrowUp, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntime.jsx(ArrowDown, { className: "h-4 w-4" }))
                  ] })
                }
              ),
              hasPermission("canManageLocations") && /* @__PURE__ */ jsxRuntime.jsx(table.TableHead, { className: "text-right", children: "Actions" })
            ] }) }),
            /* @__PURE__ */ jsxRuntime.jsx(table.TableBody, { children: locations == null ? void 0 : locations.map((location) => /* @__PURE__ */ jsxRuntime.jsxs(table.TableRow, { children: [
              /* @__PURE__ */ jsxRuntime.jsx(table.TableCell, { className: "font-medium", children: /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntime.jsx("div", { children: location.name }),
                location.description && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "text-sm text-muted-foreground", children: location.description })
              ] }) }),
              /* @__PURE__ */ jsxRuntime.jsx(table.TableCell, { children: location.building || "-" }),
              /* @__PURE__ */ jsxRuntime.jsx(table.TableCell, { children: location.floor || "-" }),
              /* @__PURE__ */ jsxRuntime.jsx(table.TableCell, { children: location.room || "-" }),
              /* @__PURE__ */ jsxRuntime.jsx(table.TableCell, { children: /* @__PURE__ */ jsxRuntime.jsx("span", { className: `px-2 py-1 rounded text-xs ${location.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`, children: location.status }) }),
              /* @__PURE__ */ jsxRuntime.jsx(table.TableCell, { children: new Date(location.created_at).toLocaleDateString() }),
              hasPermission("canManageLocations") && /* @__PURE__ */ jsxRuntime.jsx(table.TableCell, { className: "text-right", children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center justify-end gap-2", children: [
                /* @__PURE__ */ jsxRuntime.jsx(
                  button.Button,
                  {
                    variant: "outline",
                    size: "sm",
                    onClick: () => handleEdit(location),
                    children: /* @__PURE__ */ jsxRuntime.jsx(SquarePen, { className: "h-4 w-4" })
                  }
                ),
                /* @__PURE__ */ jsxRuntime.jsx(
                  button.Button,
                  {
                    variant: "outline",
                    size: "sm",
                    onClick: () => deleteLocationMutation.mutate(location.id),
                    children: /* @__PURE__ */ jsxRuntime.jsx(Trash2, { className: "h-4 w-4" })
                  }
                )
              ] }) })
            ] }, location.id)) })
          ] }),
          (locations == null ? void 0 : locations.length) === 0 && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "text-center py-8", children: [
            /* @__PURE__ */ jsxRuntime.jsx(MapPin, { className: "h-12 w-12 mx-auto text-muted-foreground mb-4" }),
            /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-muted-foreground", children: "No locations found" }),
            /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-sm text-muted-foreground", children: "Create your first location to get started" })
          ] })
        ] })
      ] }),
      hasPermission("canManageLocations") && /* @__PURE__ */ jsxRuntime.jsx(dialog.Dialog, { open: !!editingLocation, onOpenChange: (open) => !open && setEditingLocation(null), children: /* @__PURE__ */ jsxRuntime.jsxs(dialog.DialogContent, { children: [
        /* @__PURE__ */ jsxRuntime.jsxs(dialog.DialogHeader, { children: [
          /* @__PURE__ */ jsxRuntime.jsx(dialog.DialogTitle, { children: "Edit Location" }),
          /* @__PURE__ */ jsxRuntime.jsx(dialog.DialogDescription, { children: "Update location information" })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "grid gap-4 py-4", children: [
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "grid gap-2", children: [
            /* @__PURE__ */ jsxRuntime.jsx(label.Label, { htmlFor: "edit-name", children: "Location Name" }),
            /* @__PURE__ */ jsxRuntime.jsx(
              input.Input,
              {
                id: "edit-name",
                value: formData.name,
                onChange: (e) => setFormData((prev) => ({ ...prev, name: e.target.value })),
                placeholder: "Enter location name"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "grid gap-2", children: [
            /* @__PURE__ */ jsxRuntime.jsx(label.Label, { htmlFor: "edit-description", children: "Description" }),
            /* @__PURE__ */ jsxRuntime.jsx(
              textarea.Textarea,
              {
                id: "edit-description",
                value: formData.description,
                onChange: (e) => setFormData((prev) => ({ ...prev, description: e.target.value })),
                placeholder: "Enter location description (optional)"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "grid gap-2", children: [
              /* @__PURE__ */ jsxRuntime.jsx(label.Label, { htmlFor: "edit-building", children: "Building" }),
              /* @__PURE__ */ jsxRuntime.jsx(
                input.Input,
                {
                  id: "edit-building",
                  value: formData.building,
                  onChange: (e) => setFormData((prev) => ({ ...prev, building: e.target.value })),
                  placeholder: "Building name"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "grid gap-2", children: [
              /* @__PURE__ */ jsxRuntime.jsx(label.Label, { htmlFor: "edit-floor", children: "Floor" }),
              /* @__PURE__ */ jsxRuntime.jsx(
                input.Input,
                {
                  id: "edit-floor",
                  value: formData.floor,
                  onChange: (e) => setFormData((prev) => ({ ...prev, floor: e.target.value })),
                  placeholder: "Floor number"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "grid gap-2", children: [
            /* @__PURE__ */ jsxRuntime.jsx(label.Label, { htmlFor: "edit-room", children: "Room" }),
            /* @__PURE__ */ jsxRuntime.jsx(
              input.Input,
              {
                id: "edit-room",
                value: formData.room,
                onChange: (e) => setFormData((prev) => ({ ...prev, room: e.target.value })),
                placeholder: "Room number/name"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center space-x-2", children: [
            /* @__PURE__ */ jsxRuntime.jsx(
              _switch.Switch,
              {
                id: "edit-status",
                checked: formData.status === "Active",
                onCheckedChange: (checked) => setFormData((prev) => ({ ...prev, status: checked ? "Active" : "Inactive" }))
              }
            ),
            /* @__PURE__ */ jsxRuntime.jsx(label.Label, { htmlFor: "edit-status", children: "Active Location" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs(dialog.DialogFooter, { children: [
          /* @__PURE__ */ jsxRuntime.jsx(button.Button, { variant: "outline", onClick: () => setEditingLocation(null), size: "icon", children: /* @__PURE__ */ jsxRuntime.jsx(X, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsxRuntime.jsx(button.Button, { onClick: handleSubmit, disabled: !formData.name.trim(), size: "icon", children: /* @__PURE__ */ jsxRuntime.jsx(Save, { className: "h-4 w-4" }) })
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
    const [loading, setLoading] = o.useState(false);
    const [formData, setFormData] = o.useState({
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
    };
    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      try {
        const { data: { user }, error: userError } = await supabaseClient.auth.getUser();
        if (userError || !user) {
          throw new Error("User not authenticated");
        }
        const certificateData = {
          user_id: user.id,
          type: formData.type,
          name: formData.name,
          issued_by: formData.issued_by,
          date_acquired: formData.date_acquired,
          expiry_date: formData.expiry_date || null,
          credential_id: formData.credential_id || null,
          status: formData.status,
          org_cert: true
          // This is an organisation certificate
        };
        const { error } = await supabaseClient.from("certificates").insert([certificateData]);
        if (error) throw error;
        useToast.toast({
          title: "Organisation certificate added",
          description: "Certificate has been successfully added to the organisation."
        });
        onOpenChange(false);
        resetForm();
        onSuccess == null ? void 0 : onSuccess();
      } catch (error) {
        useToast.toast({
          title: "Error",
          description: error.message,
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    return /* @__PURE__ */ jsxRuntime.jsx(dialog.Dialog, { open: isOpen, onOpenChange, children: /* @__PURE__ */ jsxRuntime.jsxs(dialog.DialogContent, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(dialog.DialogHeader, { children: /* @__PURE__ */ jsxRuntime.jsx(dialog.DialogTitle, { children: "Add Organisation Certificate" }) }),
      /* @__PURE__ */ jsxRuntime.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntime.jsx(label.Label, { htmlFor: "type", children: "Type *" }),
          /* @__PURE__ */ jsxRuntime.jsxs(select.Select, { value: formData.type, onValueChange: (value) => setFormData({ ...formData, type: value }), children: [
            /* @__PURE__ */ jsxRuntime.jsx(select.SelectTrigger, { children: /* @__PURE__ */ jsxRuntime.jsx(select.SelectValue, {}) }),
            /* @__PURE__ */ jsxRuntime.jsxs(select.SelectContent, { children: [
              /* @__PURE__ */ jsxRuntime.jsx(select.SelectItem, { value: "Certificate", children: "Certificate" }),
              /* @__PURE__ */ jsxRuntime.jsx(select.SelectItem, { value: "Document", children: "Document" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntime.jsx(label.Label, { htmlFor: "name", children: "Name *" }),
          /* @__PURE__ */ jsxRuntime.jsx(
            input.Input,
            {
              id: "name",
              value: formData.name,
              onChange: (e) => setFormData({ ...formData, name: e.target.value }),
              placeholder: "e.g., ISO 27001, SOC 2, GDPR Compliance",
              required: true
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntime.jsx(label.Label, { htmlFor: "issued_by", children: "Issued By *" }),
          /* @__PURE__ */ jsxRuntime.jsx(
            input.Input,
            {
              id: "issued_by",
              value: formData.issued_by,
              onChange: (e) => setFormData({ ...formData, issued_by: e.target.value }),
              placeholder: "e.g., BSI, AICPA, TÜV SÜD",
              required: true
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntime.jsx(label.Label, { htmlFor: "date_acquired", children: "Date Acquired *" }),
            /* @__PURE__ */ jsxRuntime.jsx(
              input.Input,
              {
                id: "date_acquired",
                type: "date",
                value: formData.date_acquired,
                onChange: (e) => setFormData({ ...formData, date_acquired: e.target.value }),
                required: true
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntime.jsx(label.Label, { htmlFor: "expiry_date", children: "Expiry Date" }),
            /* @__PURE__ */ jsxRuntime.jsx(
              input.Input,
              {
                id: "expiry_date",
                type: "date",
                value: formData.expiry_date,
                onChange: (e) => setFormData({ ...formData, expiry_date: e.target.value })
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntime.jsx(label.Label, { htmlFor: "credential_id", children: "Credential ID" }),
          /* @__PURE__ */ jsxRuntime.jsx(
            input.Input,
            {
              id: "credential_id",
              value: formData.credential_id,
              onChange: (e) => setFormData({ ...formData, credential_id: e.target.value }),
              placeholder: "Certificate or credential identifier"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntime.jsx(label.Label, { htmlFor: "status", children: "Status" }),
          /* @__PURE__ */ jsxRuntime.jsxs(select.Select, { value: formData.status, onValueChange: (value) => setFormData({ ...formData, status: value }), children: [
            /* @__PURE__ */ jsxRuntime.jsx(select.SelectTrigger, { children: /* @__PURE__ */ jsxRuntime.jsx(select.SelectValue, {}) }),
            /* @__PURE__ */ jsxRuntime.jsxs(select.SelectContent, { children: [
              /* @__PURE__ */ jsxRuntime.jsx(select.SelectItem, { value: "Valid", children: "Valid" }),
              /* @__PURE__ */ jsxRuntime.jsx(select.SelectItem, { value: "Expired", children: "Expired" }),
              /* @__PURE__ */ jsxRuntime.jsx(select.SelectItem, { value: "Pending", children: "Pending" }),
              /* @__PURE__ */ jsxRuntime.jsx(select.SelectItem, { value: "Revoked", children: "Revoked" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex gap-2 justify-end", children: [
          /* @__PURE__ */ jsxRuntime.jsx(button.Button, { type: "button", variant: "outline", onClick: () => onOpenChange(false), size: "icon", children: /* @__PURE__ */ jsxRuntime.jsx(X, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsxRuntime.jsx(button.Button, { type: "submit", disabled: loading || !formData.name || !formData.issued_by || !formData.date_acquired, size: "icon", children: loading ? /* @__PURE__ */ jsxRuntime.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntime.jsx(Plus, { className: "h-4 w-4" }) })
        ] })
      ] })
    ] }) });
  };
  const OrganisationCertificates = () => {
    const { supabaseClient } = useOrganisationContext();
    const [certificates, setCertificates] = o.useState([]);
    const [userProfiles, setUserProfiles] = o.useState({});
    const [loading, setLoading] = o.useState(true);
    const [error, setError] = o.useState(null);
    const [isAddDialogOpen, setIsAddDialogOpen] = o.useState(false);
    const formatDate = (dateString) => {
      if (!dateString) return "No expiry";
      return new Date(dateString).toLocaleDateString();
    };
    const getTypeIcon = (type) => {
      return type === "Document" ? /* @__PURE__ */ jsxRuntime.jsx(FileText, { className: "h-5 w-5 text-primary flex-shrink-0" }) : /* @__PURE__ */ jsxRuntime.jsx(Award, { className: "h-5 w-5 text-primary flex-shrink-0" });
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
    o.useEffect(() => {
      fetchOrganisationCertificates();
    }, [supabaseClient]);
    if (loading) {
      return /* @__PURE__ */ jsxRuntime.jsxs(card.Card, { children: [
        /* @__PURE__ */ jsxRuntime.jsx(card.CardHeader, { children: /* @__PURE__ */ jsxRuntime.jsxs(card.CardTitle, { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntime.jsx(Award, { className: "h-5 w-5" }),
          "Certificates"
        ] }) }),
        /* @__PURE__ */ jsxRuntime.jsx(card.CardContent, { children: /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex items-center justify-center py-8", children: /* @__PURE__ */ jsxRuntime.jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-primary" }) }) })
      ] });
    }
    if (error) {
      return /* @__PURE__ */ jsxRuntime.jsxs(card.Card, { children: [
        /* @__PURE__ */ jsxRuntime.jsx(card.CardHeader, { children: /* @__PURE__ */ jsxRuntime.jsxs(card.CardTitle, { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntime.jsx(Award, { className: "h-5 w-5" }),
          "Certificates"
        ] }) }),
        /* @__PURE__ */ jsxRuntime.jsx(card.CardContent, { children: /* @__PURE__ */ jsxRuntime.jsxs("p", { className: "text-red-500", children: [
          "Error loading certificates: ",
          error
        ] }) })
      ] });
    }
    return /* @__PURE__ */ jsxRuntime.jsxs(card.Card, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(card.CardHeader, { children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntime.jsxs(card.CardTitle, { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntime.jsx(Award, { className: "h-5 w-5" }),
            "Certificates"
          ] }),
          /* @__PURE__ */ jsxRuntime.jsx(card.CardDescription, { children: "Manage organisation certificates" })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsx(button.Button, { onClick: () => setIsAddDialogOpen(true), size: "icon", children: /* @__PURE__ */ jsxRuntime.jsx(Plus, { className: "h-4 w-4" }) })
      ] }) }),
      /* @__PURE__ */ jsxRuntime.jsxs(card.CardContent, { children: [
        /* @__PURE__ */ jsxRuntime.jsx("div", { className: "space-y-4", children: certificates.length === 0 ? /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-muted-foreground text-center py-8", children: "No organisation certificates found" }) : certificates.map((cert) => {
          const validityStatus = getValidityStatus(cert.expiry_date);
          return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "border rounded-lg p-4", children: [
            /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
              /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-3 min-w-0 flex-1", children: [
                getTypeIcon(cert.type),
                /* @__PURE__ */ jsxRuntime.jsx("h3", { className: "font-semibold text-lg truncate", children: cert.name })
              ] }),
              /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex items-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntime.jsx(badge.Badge, { className: `${getTypeColor(cert.type)} text-white text-sm px-2 py-1`, children: cert.type || "Certificate" }) })
            ] }),
            /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "grid grid-cols-4 gap-4 text-sm ml-8", children: [
              /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntime.jsx(Building, { className: "h-4 w-4 text-muted-foreground" }),
                /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-muted-foreground", children: "Issuer:" }),
                /* @__PURE__ */ jsxRuntime.jsx("span", { className: "font-medium text-foreground", children: cert.issued_by })
              ] }),
              /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-muted-foreground", children: "ID:" }),
                /* @__PURE__ */ jsxRuntime.jsx("span", { className: "font-medium", children: cert.credential_id || "N/A" })
              ] }),
              /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntime.jsx(Calendar, { className: "h-4 w-4 text-muted-foreground" }),
                /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-muted-foreground", children: "Issued:" }),
                /* @__PURE__ */ jsxRuntime.jsx("span", { className: "font-medium", children: formatDate(cert.date_acquired) })
              ] }),
              /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntime.jsx(Calendar, { className: "h-4 w-4 text-muted-foreground" }),
                /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-muted-foreground", children: "Expires:" }),
                /* @__PURE__ */ jsxRuntime.jsx("span", { className: "font-medium", children: formatDate(cert.expiry_date) })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center justify-between ml-8 mt-2", children: [
              /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
                /* @__PURE__ */ jsxRuntime.jsx(User, { className: "h-4 w-4 text-muted-foreground" }),
                /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-muted-foreground", children: "Added by:" }),
                /* @__PURE__ */ jsxRuntime.jsx("span", { className: "font-medium", children: getUserDisplayName(cert.user_id) })
              ] }),
              /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex items-center", children: /* @__PURE__ */ jsxRuntime.jsx(badge.Badge, { className: `${getValidityStatusColor(validityStatus)} text-white`, children: validityStatus }) })
            ] })
          ] }, cert.id);
        }) }),
        /* @__PURE__ */ jsxRuntime.jsx(
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
  var jt = (n) => {
    switch (n) {
      case "success":
        return ee;
      case "info":
        return ae;
      case "warning":
        return oe;
      case "error":
        return se;
      default:
        return null;
    }
  }, te = Array(12).fill(0), Yt = ({ visible: n, className: e }) => o.createElement("div", { className: ["sonner-loading-wrapper", e].filter(Boolean).join(" "), "data-visible": n }, o.createElement("div", { className: "sonner-spinner" }, te.map((t, a) => o.createElement("div", { className: "sonner-loading-bar", key: `spinner-bar-${a}` })))), ee = o.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", height: "20", width: "20" }, o.createElement("path", { fillRule: "evenodd", d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z", clipRule: "evenodd" })), oe = o.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor", height: "20", width: "20" }, o.createElement("path", { fillRule: "evenodd", d: "M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z", clipRule: "evenodd" })), ae = o.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", height: "20", width: "20" }, o.createElement("path", { fillRule: "evenodd", d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z", clipRule: "evenodd" })), se = o.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", height: "20", width: "20" }, o.createElement("path", { fillRule: "evenodd", d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z", clipRule: "evenodd" })), Ot = o.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }, o.createElement("line", { x1: "18", y1: "6", x2: "6", y2: "18" }), o.createElement("line", { x1: "6", y1: "6", x2: "18", y2: "18" }));
  var Ft = () => {
    let [n, e] = o.useState(document.hidden);
    return o.useEffect(() => {
      let t = () => {
        e(document.hidden);
      };
      return document.addEventListener("visibilitychange", t), () => window.removeEventListener("visibilitychange", t);
    }, []), n;
  };
  var bt = 1, yt = class {
    constructor() {
      this.subscribe = (e) => (this.subscribers.push(e), () => {
        let t = this.subscribers.indexOf(e);
        this.subscribers.splice(t, 1);
      });
      this.publish = (e) => {
        this.subscribers.forEach((t) => t(e));
      };
      this.addToast = (e) => {
        this.publish(e), this.toasts = [...this.toasts, e];
      };
      this.create = (e) => {
        var S;
        let { message: t, ...a } = e, u = typeof (e == null ? void 0 : e.id) == "number" || ((S = e.id) == null ? void 0 : S.length) > 0 ? e.id : bt++, f = this.toasts.find((g) => g.id === u), w = e.dismissible === void 0 ? true : e.dismissible;
        return this.dismissedToasts.has(u) && this.dismissedToasts.delete(u), f ? this.toasts = this.toasts.map((g) => g.id === u ? (this.publish({ ...g, ...e, id: u, title: t }), { ...g, ...e, id: u, dismissible: w, title: t }) : g) : this.addToast({ title: t, ...a, dismissible: w, id: u }), u;
      };
      this.dismiss = (e) => (this.dismissedToasts.add(e), e || this.toasts.forEach((t) => {
        this.subscribers.forEach((a) => a({ id: t.id, dismiss: true }));
      }), this.subscribers.forEach((t) => t({ id: e, dismiss: true })), e);
      this.message = (e, t) => this.create({ ...t, message: e });
      this.error = (e, t) => this.create({ ...t, message: e, type: "error" });
      this.success = (e, t) => this.create({ ...t, type: "success", message: e });
      this.info = (e, t) => this.create({ ...t, type: "info", message: e });
      this.warning = (e, t) => this.create({ ...t, type: "warning", message: e });
      this.loading = (e, t) => this.create({ ...t, type: "loading", message: e });
      this.promise = (e, t) => {
        if (!t) return;
        let a;
        t.loading !== void 0 && (a = this.create({ ...t, promise: e, type: "loading", message: t.loading, description: typeof t.description != "function" ? t.description : void 0 }));
        let u = e instanceof Promise ? e : e(), f = a !== void 0, w, S = u.then(async (i) => {
          if (w = ["resolve", i], o.isValidElement(i)) f = false, this.create({ id: a, type: "default", message: i });
          else if (ie(i) && !i.ok) {
            f = false;
            let T = typeof t.error == "function" ? await t.error(`HTTP error! status: ${i.status}`) : t.error, F = typeof t.description == "function" ? await t.description(`HTTP error! status: ${i.status}`) : t.description;
            this.create({ id: a, type: "error", message: T, description: F });
          } else if (t.success !== void 0) {
            f = false;
            let T = typeof t.success == "function" ? await t.success(i) : t.success, F = typeof t.description == "function" ? await t.description(i) : t.description;
            this.create({ id: a, type: "success", message: T, description: F });
          }
        }).catch(async (i) => {
          if (w = ["reject", i], t.error !== void 0) {
            f = false;
            let D = typeof t.error == "function" ? await t.error(i) : t.error, T = typeof t.description == "function" ? await t.description(i) : t.description;
            this.create({ id: a, type: "error", message: D, description: T });
          }
        }).finally(() => {
          var i;
          f && (this.dismiss(a), a = void 0), (i = t.finally) == null || i.call(t);
        }), g = () => new Promise((i, D) => S.then(() => w[0] === "reject" ? D(w[1]) : i(w[1])).catch(D));
        return typeof a != "string" && typeof a != "number" ? { unwrap: g } : Object.assign(a, { unwrap: g });
      };
      this.custom = (e, t) => {
        let a = (t == null ? void 0 : t.id) || bt++;
        return this.create({ jsx: e(a), id: a, ...t }), a;
      };
      this.getActiveToasts = () => this.toasts.filter((e) => !this.dismissedToasts.has(e.id));
      this.subscribers = [], this.toasts = [], this.dismissedToasts = /* @__PURE__ */ new Set();
    }
  }, v = new yt(), ne = (n, e) => {
    let t = (e == null ? void 0 : e.id) || bt++;
    return v.addToast({ title: n, ...e, id: t }), t;
  }, ie = (n) => n && typeof n == "object" && "ok" in n && typeof n.ok == "boolean" && "status" in n && typeof n.status == "number", le = ne, ce = () => v.toasts, de = () => v.getActiveToasts(), ue = Object.assign(le, { success: v.success, info: v.info, warning: v.warning, error: v.error, custom: v.custom, message: v.message, promise: v.promise, dismiss: v.dismiss, loading: v.loading }, { getHistory: ce, getToasts: de });
  function wt(n, { insertAt: e } = {}) {
    if (typeof document == "undefined") return;
    let t = document.head || document.getElementsByTagName("head")[0], a = document.createElement("style");
    a.type = "text/css", e === "top" && t.firstChild ? t.insertBefore(a, t.firstChild) : t.appendChild(a), a.styleSheet ? a.styleSheet.cssText = n : a.appendChild(document.createTextNode(n));
  }
  wt(`:where(html[dir="ltr"]),:where([data-sonner-toaster][dir="ltr"]){--toast-icon-margin-start: -3px;--toast-icon-margin-end: 4px;--toast-svg-margin-start: -1px;--toast-svg-margin-end: 0px;--toast-button-margin-start: auto;--toast-button-margin-end: 0;--toast-close-button-start: 0;--toast-close-button-end: unset;--toast-close-button-transform: translate(-35%, -35%)}:where(html[dir="rtl"]),:where([data-sonner-toaster][dir="rtl"]){--toast-icon-margin-start: 4px;--toast-icon-margin-end: -3px;--toast-svg-margin-start: 0px;--toast-svg-margin-end: -1px;--toast-button-margin-start: 0;--toast-button-margin-end: auto;--toast-close-button-start: unset;--toast-close-button-end: 0;--toast-close-button-transform: translate(35%, -35%)}:where([data-sonner-toaster]){position:fixed;width:var(--width);font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;--gray1: hsl(0, 0%, 99%);--gray2: hsl(0, 0%, 97.3%);--gray3: hsl(0, 0%, 95.1%);--gray4: hsl(0, 0%, 93%);--gray5: hsl(0, 0%, 90.9%);--gray6: hsl(0, 0%, 88.7%);--gray7: hsl(0, 0%, 85.8%);--gray8: hsl(0, 0%, 78%);--gray9: hsl(0, 0%, 56.1%);--gray10: hsl(0, 0%, 52.3%);--gray11: hsl(0, 0%, 43.5%);--gray12: hsl(0, 0%, 9%);--border-radius: 8px;box-sizing:border-box;padding:0;margin:0;list-style:none;outline:none;z-index:999999999;transition:transform .4s ease}:where([data-sonner-toaster][data-lifted="true"]){transform:translateY(-10px)}@media (hover: none) and (pointer: coarse){:where([data-sonner-toaster][data-lifted="true"]){transform:none}}:where([data-sonner-toaster][data-x-position="right"]){right:var(--offset-right)}:where([data-sonner-toaster][data-x-position="left"]){left:var(--offset-left)}:where([data-sonner-toaster][data-x-position="center"]){left:50%;transform:translate(-50%)}:where([data-sonner-toaster][data-y-position="top"]){top:var(--offset-top)}:where([data-sonner-toaster][data-y-position="bottom"]){bottom:var(--offset-bottom)}:where([data-sonner-toast]){--y: translateY(100%);--lift-amount: calc(var(--lift) * var(--gap));z-index:var(--z-index);position:absolute;opacity:0;transform:var(--y);filter:blur(0);touch-action:none;transition:transform .4s,opacity .4s,height .4s,box-shadow .2s;box-sizing:border-box;outline:none;overflow-wrap:anywhere}:where([data-sonner-toast][data-styled="true"]){padding:16px;background:var(--normal-bg);border:1px solid var(--normal-border);color:var(--normal-text);border-radius:var(--border-radius);box-shadow:0 4px 12px #0000001a;width:var(--width);font-size:13px;display:flex;align-items:center;gap:6px}:where([data-sonner-toast]:focus-visible){box-shadow:0 4px 12px #0000001a,0 0 0 2px #0003}:where([data-sonner-toast][data-y-position="top"]){top:0;--y: translateY(-100%);--lift: 1;--lift-amount: calc(1 * var(--gap))}:where([data-sonner-toast][data-y-position="bottom"]){bottom:0;--y: translateY(100%);--lift: -1;--lift-amount: calc(var(--lift) * var(--gap))}:where([data-sonner-toast]) :where([data-description]){font-weight:400;line-height:1.4;color:inherit}:where([data-sonner-toast]) :where([data-title]){font-weight:500;line-height:1.5;color:inherit}:where([data-sonner-toast]) :where([data-icon]){display:flex;height:16px;width:16px;position:relative;justify-content:flex-start;align-items:center;flex-shrink:0;margin-left:var(--toast-icon-margin-start);margin-right:var(--toast-icon-margin-end)}:where([data-sonner-toast][data-promise="true"]) :where([data-icon])>svg{opacity:0;transform:scale(.8);transform-origin:center;animation:sonner-fade-in .3s ease forwards}:where([data-sonner-toast]) :where([data-icon])>*{flex-shrink:0}:where([data-sonner-toast]) :where([data-icon]) svg{margin-left:var(--toast-svg-margin-start);margin-right:var(--toast-svg-margin-end)}:where([data-sonner-toast]) :where([data-content]){display:flex;flex-direction:column;gap:2px}[data-sonner-toast][data-styled=true] [data-button]{border-radius:4px;padding-left:8px;padding-right:8px;height:24px;font-size:12px;color:var(--normal-bg);background:var(--normal-text);margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end);border:none;cursor:pointer;outline:none;display:flex;align-items:center;flex-shrink:0;transition:opacity .4s,box-shadow .2s}:where([data-sonner-toast]) :where([data-button]):focus-visible{box-shadow:0 0 0 2px #0006}:where([data-sonner-toast]) :where([data-button]):first-of-type{margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end)}:where([data-sonner-toast]) :where([data-cancel]){color:var(--normal-text);background:rgba(0,0,0,.08)}:where([data-sonner-toast][data-theme="dark"]) :where([data-cancel]){background:rgba(255,255,255,.3)}:where([data-sonner-toast]) :where([data-close-button]){position:absolute;left:var(--toast-close-button-start);right:var(--toast-close-button-end);top:0;height:20px;width:20px;display:flex;justify-content:center;align-items:center;padding:0;color:var(--gray12);border:1px solid var(--gray4);transform:var(--toast-close-button-transform);border-radius:50%;cursor:pointer;z-index:1;transition:opacity .1s,background .2s,border-color .2s}[data-sonner-toast] [data-close-button]{background:var(--gray1)}:where([data-sonner-toast]) :where([data-close-button]):focus-visible{box-shadow:0 4px 12px #0000001a,0 0 0 2px #0003}:where([data-sonner-toast]) :where([data-disabled="true"]){cursor:not-allowed}:where([data-sonner-toast]):hover :where([data-close-button]):hover{background:var(--gray2);border-color:var(--gray5)}:where([data-sonner-toast][data-swiping="true"]):before{content:"";position:absolute;left:-50%;right:-50%;height:100%;z-index:-1}:where([data-sonner-toast][data-y-position="top"][data-swiping="true"]):before{bottom:50%;transform:scaleY(3) translateY(50%)}:where([data-sonner-toast][data-y-position="bottom"][data-swiping="true"]):before{top:50%;transform:scaleY(3) translateY(-50%)}:where([data-sonner-toast][data-swiping="false"][data-removed="true"]):before{content:"";position:absolute;inset:0;transform:scaleY(2)}:where([data-sonner-toast]):after{content:"";position:absolute;left:0;height:calc(var(--gap) + 1px);bottom:100%;width:100%}:where([data-sonner-toast][data-mounted="true"]){--y: translateY(0);opacity:1}:where([data-sonner-toast][data-expanded="false"][data-front="false"]){--scale: var(--toasts-before) * .05 + 1;--y: translateY(calc(var(--lift-amount) * var(--toasts-before))) scale(calc(-1 * var(--scale)));height:var(--front-toast-height)}:where([data-sonner-toast])>*{transition:opacity .4s}:where([data-sonner-toast][data-expanded="false"][data-front="false"][data-styled="true"])>*{opacity:0}:where([data-sonner-toast][data-visible="false"]){opacity:0;pointer-events:none}:where([data-sonner-toast][data-mounted="true"][data-expanded="true"]){--y: translateY(calc(var(--lift) * var(--offset)));height:var(--initial-height)}:where([data-sonner-toast][data-removed="true"][data-front="true"][data-swipe-out="false"]){--y: translateY(calc(var(--lift) * -100%));opacity:0}:where([data-sonner-toast][data-removed="true"][data-front="false"][data-swipe-out="false"][data-expanded="true"]){--y: translateY(calc(var(--lift) * var(--offset) + var(--lift) * -100%));opacity:0}:where([data-sonner-toast][data-removed="true"][data-front="false"][data-swipe-out="false"][data-expanded="false"]){--y: translateY(40%);opacity:0;transition:transform .5s,opacity .2s}:where([data-sonner-toast][data-removed="true"][data-front="false"]):before{height:calc(var(--initial-height) + 20%)}[data-sonner-toast][data-swiping=true]{transform:var(--y) translateY(var(--swipe-amount-y, 0px)) translate(var(--swipe-amount-x, 0px));transition:none}[data-sonner-toast][data-swiped=true]{user-select:none}[data-sonner-toast][data-swipe-out=true][data-y-position=bottom],[data-sonner-toast][data-swipe-out=true][data-y-position=top]{animation-duration:.2s;animation-timing-function:ease-out;animation-fill-mode:forwards}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=left]{animation-name:swipe-out-left}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=right]{animation-name:swipe-out-right}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=up]{animation-name:swipe-out-up}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=down]{animation-name:swipe-out-down}@keyframes swipe-out-left{0%{transform:var(--y) translate(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translate(calc(var(--swipe-amount-x) - 100%));opacity:0}}@keyframes swipe-out-right{0%{transform:var(--y) translate(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translate(calc(var(--swipe-amount-x) + 100%));opacity:0}}@keyframes swipe-out-up{0%{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) - 100%));opacity:0}}@keyframes swipe-out-down{0%{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) + 100%));opacity:0}}@media (max-width: 600px){[data-sonner-toaster]{position:fixed;right:var(--mobile-offset-right);left:var(--mobile-offset-left);width:100%}[data-sonner-toaster][dir=rtl]{left:calc(var(--mobile-offset-left) * -1)}[data-sonner-toaster] [data-sonner-toast]{left:0;right:0;width:calc(100% - var(--mobile-offset-left) * 2)}[data-sonner-toaster][data-x-position=left]{left:var(--mobile-offset-left)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--mobile-offset-bottom)}[data-sonner-toaster][data-y-position=top]{top:var(--mobile-offset-top)}[data-sonner-toaster][data-x-position=center]{left:var(--mobile-offset-left);right:var(--mobile-offset-right);transform:none}}[data-sonner-toaster][data-theme=light]{--normal-bg: #fff;--normal-border: var(--gray4);--normal-text: var(--gray12);--success-bg: hsl(143, 85%, 96%);--success-border: hsl(145, 92%, 91%);--success-text: hsl(140, 100%, 27%);--info-bg: hsl(208, 100%, 97%);--info-border: hsl(221, 91%, 91%);--info-text: hsl(210, 92%, 45%);--warning-bg: hsl(49, 100%, 97%);--warning-border: hsl(49, 91%, 91%);--warning-text: hsl(31, 92%, 45%);--error-bg: hsl(359, 100%, 97%);--error-border: hsl(359, 100%, 94%);--error-text: hsl(360, 100%, 45%)}[data-sonner-toaster][data-theme=light] [data-sonner-toast][data-invert=true]{--normal-bg: #000;--normal-border: hsl(0, 0%, 20%);--normal-text: var(--gray1)}[data-sonner-toaster][data-theme=dark] [data-sonner-toast][data-invert=true]{--normal-bg: #fff;--normal-border: var(--gray3);--normal-text: var(--gray12)}[data-sonner-toaster][data-theme=dark]{--normal-bg: #000;--normal-bg-hover: hsl(0, 0%, 12%);--normal-border: hsl(0, 0%, 20%);--normal-border-hover: hsl(0, 0%, 25%);--normal-text: var(--gray1);--success-bg: hsl(150, 100%, 6%);--success-border: hsl(147, 100%, 12%);--success-text: hsl(150, 86%, 65%);--info-bg: hsl(215, 100%, 6%);--info-border: hsl(223, 100%, 12%);--info-text: hsl(216, 87%, 65%);--warning-bg: hsl(64, 100%, 6%);--warning-border: hsl(60, 100%, 12%);--warning-text: hsl(46, 87%, 65%);--error-bg: hsl(358, 76%, 10%);--error-border: hsl(357, 89%, 16%);--error-text: hsl(358, 100%, 81%)}[data-sonner-toaster][data-theme=dark] [data-sonner-toast] [data-close-button]{background:var(--normal-bg);border-color:var(--normal-border);color:var(--normal-text)}[data-sonner-toaster][data-theme=dark] [data-sonner-toast] [data-close-button]:hover{background:var(--normal-bg-hover);border-color:var(--normal-border-hover)}[data-rich-colors=true][data-sonner-toast][data-type=success],[data-rich-colors=true][data-sonner-toast][data-type=success] [data-close-button]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=info],[data-rich-colors=true][data-sonner-toast][data-type=info] [data-close-button]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning],[data-rich-colors=true][data-sonner-toast][data-type=warning] [data-close-button]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=error],[data-rich-colors=true][data-sonner-toast][data-type=error] [data-close-button]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}.sonner-loading-wrapper{--size: 16px;height:var(--size);width:var(--size);position:absolute;inset:0;z-index:10}.sonner-loading-wrapper[data-visible=false]{transform-origin:center;animation:sonner-fade-out .2s ease forwards}.sonner-spinner{position:relative;top:50%;left:50%;height:var(--size);width:var(--size)}.sonner-loading-bar{animation:sonner-spin 1.2s linear infinite;background:var(--gray11);border-radius:6px;height:8%;left:-10%;position:absolute;top:-3.9%;width:24%}.sonner-loading-bar:nth-child(1){animation-delay:-1.2s;transform:rotate(.0001deg) translate(146%)}.sonner-loading-bar:nth-child(2){animation-delay:-1.1s;transform:rotate(30deg) translate(146%)}.sonner-loading-bar:nth-child(3){animation-delay:-1s;transform:rotate(60deg) translate(146%)}.sonner-loading-bar:nth-child(4){animation-delay:-.9s;transform:rotate(90deg) translate(146%)}.sonner-loading-bar:nth-child(5){animation-delay:-.8s;transform:rotate(120deg) translate(146%)}.sonner-loading-bar:nth-child(6){animation-delay:-.7s;transform:rotate(150deg) translate(146%)}.sonner-loading-bar:nth-child(7){animation-delay:-.6s;transform:rotate(180deg) translate(146%)}.sonner-loading-bar:nth-child(8){animation-delay:-.5s;transform:rotate(210deg) translate(146%)}.sonner-loading-bar:nth-child(9){animation-delay:-.4s;transform:rotate(240deg) translate(146%)}.sonner-loading-bar:nth-child(10){animation-delay:-.3s;transform:rotate(270deg) translate(146%)}.sonner-loading-bar:nth-child(11){animation-delay:-.2s;transform:rotate(300deg) translate(146%)}.sonner-loading-bar:nth-child(12){animation-delay:-.1s;transform:rotate(330deg) translate(146%)}@keyframes sonner-fade-in{0%{opacity:0;transform:scale(.8)}to{opacity:1;transform:scale(1)}}@keyframes sonner-fade-out{0%{opacity:1;transform:scale(1)}to{opacity:0;transform:scale(.8)}}@keyframes sonner-spin{0%{opacity:1}to{opacity:.15}}@media (prefers-reduced-motion){[data-sonner-toast],[data-sonner-toast]>*,.sonner-loading-bar{transition:none!important;animation:none!important}}.sonner-loader{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);transform-origin:center;transition:opacity .2s,transform .2s}.sonner-loader[data-visible=false]{opacity:0;transform:scale(.8) translate(-50%,-50%)}
`);
  function tt(n) {
    return n.label !== void 0;
  }
  var pe = 3, me = "32px", ge = "16px", Wt = 4e3, he = 356, be = 14, ye = 20, we = 200;
  function M(...n) {
    return n.filter(Boolean).join(" ");
  }
  function xe(n) {
    let [e, t] = n.split("-"), a = [];
    return e && a.push(e), t && a.push(t), a;
  }
  var ve = (n) => {
    var Dt, Pt, Nt, Bt, Ct, kt, It, Mt, Ht, At, Lt;
    let { invert: e, toast: t, unstyled: a, interacting: u, setHeights: f, visibleToasts: w, heights: S, index: g, toasts: i, expanded: D, removeToast: T, defaultRichColors: F, closeButton: et, style: ut, cancelButtonStyle: ft, actionButtonStyle: l, className: ot = "", descriptionClassName: at = "", duration: X2, position: st, gap: pt, loadingIcon: rt, expandByDefault: B, classNames: s, icons: P, closeButtonAriaLabel: nt = "Close toast", pauseWhenPageIsHidden: it } = n, [Y, C] = o.useState(null), [lt, J] = o.useState(null), [W, H] = o.useState(false), [A, mt] = o.useState(false), [L, z] = o.useState(false), [ct, d] = o.useState(false), [h, y] = o.useState(false), [R, j] = o.useState(0), [p, _] = o.useState(0), O = o.useRef(t.duration || X2 || Wt), G = o.useRef(null), k = o.useRef(null), Vt = g === 0, Ut = g + 1 <= w, N = t.type, V = t.dismissible !== false, Kt = t.className || "", Xt = t.descriptionClassName || "", dt = o.useMemo(() => S.findIndex((r) => r.toastId === t.id) || 0, [S, t.id]), Jt = o.useMemo(() => {
      var r;
      return (r = t.closeButton) != null ? r : et;
    }, [t.closeButton, et]), Tt = o.useMemo(() => t.duration || X2 || Wt, [t.duration, X2]), gt = o.useRef(0), U = o.useRef(0), St = o.useRef(0), K = o.useRef(null), [Gt, Qt] = st.split("-"), Rt = o.useMemo(() => S.reduce((r, m, c) => c >= dt ? r : r + m.height, 0), [S, dt]), Et = Ft(), qt = t.invert || e, ht = N === "loading";
    U.current = o.useMemo(() => dt * pt + Rt, [dt, Rt]), o.useEffect(() => {
      O.current = Tt;
    }, [Tt]), o.useEffect(() => {
      H(true);
    }, []), o.useEffect(() => {
      let r = k.current;
      if (r) {
        let m = r.getBoundingClientRect().height;
        return _(m), f((c) => [{ toastId: t.id, height: m, position: t.position }, ...c]), () => f((c) => c.filter((b) => b.toastId !== t.id));
      }
    }, [f, t.id]), o.useLayoutEffect(() => {
      if (!W) return;
      let r = k.current, m = r.style.height;
      r.style.height = "auto";
      let c = r.getBoundingClientRect().height;
      r.style.height = m, _(c), f((b) => b.find((x) => x.toastId === t.id) ? b.map((x) => x.toastId === t.id ? { ...x, height: c } : x) : [{ toastId: t.id, height: c, position: t.position }, ...b]);
    }, [W, t.title, t.description, f, t.id]);
    let $ = o.useCallback(() => {
      mt(true), j(U.current), f((r) => r.filter((m) => m.toastId !== t.id)), setTimeout(() => {
        T(t);
      }, we);
    }, [t, T, f, U]);
    o.useEffect(() => {
      if (t.promise && N === "loading" || t.duration === 1 / 0 || t.type === "loading") return;
      let r;
      return D || u || it && Et ? (() => {
        if (St.current < gt.current) {
          let b = (/* @__PURE__ */ new Date()).getTime() - gt.current;
          O.current = O.current - b;
        }
        St.current = (/* @__PURE__ */ new Date()).getTime();
      })() : (() => {
        O.current !== 1 / 0 && (gt.current = (/* @__PURE__ */ new Date()).getTime(), r = setTimeout(() => {
          var b;
          (b = t.onAutoClose) == null || b.call(t, t), $();
        }, O.current));
      })(), () => clearTimeout(r);
    }, [D, u, t, N, it, Et, $]), o.useEffect(() => {
      t.delete && $();
    }, [$, t.delete]);
    function Zt() {
      var r, m, c;
      return P != null && P.loading ? o.createElement("div", { className: M(s == null ? void 0 : s.loader, (r = t == null ? void 0 : t.classNames) == null ? void 0 : r.loader, "sonner-loader"), "data-visible": N === "loading" }, P.loading) : rt ? o.createElement("div", { className: M(s == null ? void 0 : s.loader, (m = t == null ? void 0 : t.classNames) == null ? void 0 : m.loader, "sonner-loader"), "data-visible": N === "loading" }, rt) : o.createElement(Yt, { className: M(s == null ? void 0 : s.loader, (c = t == null ? void 0 : t.classNames) == null ? void 0 : c.loader), visible: N === "loading" });
    }
    return o.createElement("li", { tabIndex: 0, ref: k, className: M(ot, Kt, s == null ? void 0 : s.toast, (Dt = t == null ? void 0 : t.classNames) == null ? void 0 : Dt.toast, s == null ? void 0 : s.default, s == null ? void 0 : s[N], (Pt = t == null ? void 0 : t.classNames) == null ? void 0 : Pt[N]), "data-sonner-toast": "", "data-rich-colors": (Nt = t.richColors) != null ? Nt : F, "data-styled": !(t.jsx || t.unstyled || a), "data-mounted": W, "data-promise": !!t.promise, "data-swiped": h, "data-removed": A, "data-visible": Ut, "data-y-position": Gt, "data-x-position": Qt, "data-index": g, "data-front": Vt, "data-swiping": L, "data-dismissible": V, "data-type": N, "data-invert": qt, "data-swipe-out": ct, "data-swipe-direction": lt, "data-expanded": !!(D || B && W), style: { "--index": g, "--toasts-before": g, "--z-index": i.length - g, "--offset": `${A ? R : U.current}px`, "--initial-height": B ? "auto" : `${p}px`, ...ut, ...t.style }, onDragEnd: () => {
      z(false), C(null), K.current = null;
    }, onPointerDown: (r) => {
      ht || !V || (G.current = /* @__PURE__ */ new Date(), j(U.current), r.target.setPointerCapture(r.pointerId), r.target.tagName !== "BUTTON" && (z(true), K.current = { x: r.clientX, y: r.clientY }));
    }, onPointerUp: () => {
      var x, Q, q, Z;
      if (ct || !V) return;
      K.current = null;
      let r = Number(((x = k.current) == null ? void 0 : x.style.getPropertyValue("--swipe-amount-x").replace("px", "")) || 0), m = Number(((Q = k.current) == null ? void 0 : Q.style.getPropertyValue("--swipe-amount-y").replace("px", "")) || 0), c = (/* @__PURE__ */ new Date()).getTime() - ((q = G.current) == null ? void 0 : q.getTime()), b = Y === "x" ? r : m, I = Math.abs(b) / c;
      if (Math.abs(b) >= ye || I > 0.11) {
        j(U.current), (Z = t.onDismiss) == null || Z.call(t, t), J(Y === "x" ? r > 0 ? "right" : "left" : m > 0 ? "down" : "up"), $(), d(true), y(false);
        return;
      }
      z(false), C(null);
    }, onPointerMove: (r) => {
      var Q, q, Z, zt;
      if (!K.current || !V || ((Q = window.getSelection()) == null ? void 0 : Q.toString().length) > 0) return;
      let c = r.clientY - K.current.y, b = r.clientX - K.current.x, I = (q = n.swipeDirections) != null ? q : xe(st);
      !Y && (Math.abs(b) > 1 || Math.abs(c) > 1) && C(Math.abs(b) > Math.abs(c) ? "x" : "y");
      let x = { x: 0, y: 0 };
      Y === "y" ? (I.includes("top") || I.includes("bottom")) && (I.includes("top") && c < 0 || I.includes("bottom") && c > 0) && (x.y = c) : Y === "x" && (I.includes("left") || I.includes("right")) && (I.includes("left") && b < 0 || I.includes("right") && b > 0) && (x.x = b), (Math.abs(x.x) > 0 || Math.abs(x.y) > 0) && y(true), (Z = k.current) == null || Z.style.setProperty("--swipe-amount-x", `${x.x}px`), (zt = k.current) == null || zt.style.setProperty("--swipe-amount-y", `${x.y}px`);
    } }, Jt && !t.jsx ? o.createElement("button", { "aria-label": nt, "data-disabled": ht, "data-close-button": true, onClick: ht || !V ? () => {
    } : () => {
      var r;
      $(), (r = t.onDismiss) == null || r.call(t, t);
    }, className: M(s == null ? void 0 : s.closeButton, (Bt = t == null ? void 0 : t.classNames) == null ? void 0 : Bt.closeButton) }, (Ct = P == null ? void 0 : P.close) != null ? Ct : Ot) : null, t.jsx || o.isValidElement(t.title) ? t.jsx ? t.jsx : typeof t.title == "function" ? t.title() : t.title : o.createElement(o.Fragment, null, N || t.icon || t.promise ? o.createElement("div", { "data-icon": "", className: M(s == null ? void 0 : s.icon, (kt = t == null ? void 0 : t.classNames) == null ? void 0 : kt.icon) }, t.promise || t.type === "loading" && !t.icon ? t.icon || Zt() : null, t.type !== "loading" ? t.icon || (P == null ? void 0 : P[N]) || jt(N) : null) : null, o.createElement("div", { "data-content": "", className: M(s == null ? void 0 : s.content, (It = t == null ? void 0 : t.classNames) == null ? void 0 : It.content) }, o.createElement("div", { "data-title": "", className: M(s == null ? void 0 : s.title, (Mt = t == null ? void 0 : t.classNames) == null ? void 0 : Mt.title) }, typeof t.title == "function" ? t.title() : t.title), t.description ? o.createElement("div", { "data-description": "", className: M(at, Xt, s == null ? void 0 : s.description, (Ht = t == null ? void 0 : t.classNames) == null ? void 0 : Ht.description) }, typeof t.description == "function" ? t.description() : t.description) : null), o.isValidElement(t.cancel) ? t.cancel : t.cancel && tt(t.cancel) ? o.createElement("button", { "data-button": true, "data-cancel": true, style: t.cancelButtonStyle || ft, onClick: (r) => {
      var m, c;
      tt(t.cancel) && V && ((c = (m = t.cancel).onClick) == null || c.call(m, r), $());
    }, className: M(s == null ? void 0 : s.cancelButton, (At = t == null ? void 0 : t.classNames) == null ? void 0 : At.cancelButton) }, t.cancel.label) : null, o.isValidElement(t.action) ? t.action : t.action && tt(t.action) ? o.createElement("button", { "data-button": true, "data-action": true, style: t.actionButtonStyle || l, onClick: (r) => {
      var m, c;
      tt(t.action) && ((c = (m = t.action).onClick) == null || c.call(m, r), !r.defaultPrevented && $());
    }, className: M(s == null ? void 0 : s.actionButton, (Lt = t == null ? void 0 : t.classNames) == null ? void 0 : Lt.actionButton) }, t.action.label) : null));
  };
  function _t() {
    if (typeof window == "undefined" || typeof document == "undefined") return "ltr";
    let n = document.documentElement.getAttribute("dir");
    return n === "auto" || !n ? window.getComputedStyle(document.documentElement).direction : n;
  }
  function Te(n, e) {
    let t = {};
    return [n, e].forEach((a, u) => {
      let f = u === 1, w = f ? "--mobile-offset" : "--offset", S = f ? ge : me;
      function g(i) {
        ["top", "right", "bottom", "left"].forEach((D) => {
          t[`${w}-${D}`] = typeof i == "number" ? `${i}px` : i;
        });
      }
      typeof a == "number" || typeof a == "string" ? g(a) : typeof a == "object" ? ["top", "right", "bottom", "left"].forEach((i) => {
        a[i] === void 0 ? t[`${w}-${i}`] = S : t[`${w}-${i}`] = typeof a[i] == "number" ? `${a[i]}px` : a[i];
      }) : g(S);
    }), t;
  }
  o.forwardRef(function(e, t) {
    let { invert: a, position: u = "bottom-right", hotkey: f = ["altKey", "KeyT"], expand: w, closeButton: S, className: g, offset: i, mobileOffset: D, theme: T = "light", richColors: F, duration: et, style: ut, visibleToasts: ft = pe, toastOptions: l, dir: ot = _t(), gap: at = be, loadingIcon: X2, icons: st, containerAriaLabel: pt = "Notifications", pauseWhenPageIsHidden: rt } = e, [B, s] = o.useState([]), P = o.useMemo(() => Array.from(new Set([u].concat(B.filter((d) => d.position).map((d) => d.position)))), [B, u]), [nt, it] = o.useState([]), [Y, C] = o.useState(false), [lt, J] = o.useState(false), [W, H] = o.useState(T !== "system" ? T : typeof window != "undefined" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"), A = o.useRef(null), mt = f.join("+").replace(/Key/g, "").replace(/Digit/g, ""), L = o.useRef(null), z = o.useRef(false), ct = o.useCallback((d) => {
      s((h) => {
        var y;
        return (y = h.find((R) => R.id === d.id)) != null && y.delete || v.dismiss(d.id), h.filter(({ id: R }) => R !== d.id);
      });
    }, []);
    return o.useEffect(() => v.subscribe((d) => {
      if (d.dismiss) {
        s((h) => h.map((y) => y.id === d.id ? { ...y, delete: true } : y));
        return;
      }
      setTimeout(() => {
        vt.flushSync(() => {
          s((h) => {
            let y = h.findIndex((R) => R.id === d.id);
            return y !== -1 ? [...h.slice(0, y), { ...h[y], ...d }, ...h.slice(y + 1)] : [d, ...h];
          });
        });
      });
    }), []), o.useEffect(() => {
      if (T !== "system") {
        H(T);
        return;
      }
      if (T === "system" && (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? H("dark") : H("light")), typeof window == "undefined") return;
      let d = window.matchMedia("(prefers-color-scheme: dark)");
      try {
        d.addEventListener("change", ({ matches: h }) => {
          H(h ? "dark" : "light");
        });
      } catch (h) {
        d.addListener(({ matches: y }) => {
          try {
            H(y ? "dark" : "light");
          } catch (R) {
            console.error(R);
          }
        });
      }
    }, [T]), o.useEffect(() => {
      B.length <= 1 && C(false);
    }, [B]), o.useEffect(() => {
      let d = (h) => {
        var R, j;
        f.every((p) => h[p] || h.code === p) && (C(true), (R = A.current) == null || R.focus()), h.code === "Escape" && (document.activeElement === A.current || (j = A.current) != null && j.contains(document.activeElement)) && C(false);
      };
      return document.addEventListener("keydown", d), () => document.removeEventListener("keydown", d);
    }, [f]), o.useEffect(() => {
      if (A.current) return () => {
        L.current && (L.current.focus({ preventScroll: true }), L.current = null, z.current = false);
      };
    }, [A.current]), o.createElement("section", { ref: t, "aria-label": `${pt} ${mt}`, tabIndex: -1, "aria-live": "polite", "aria-relevant": "additions text", "aria-atomic": "false", suppressHydrationWarning: true }, P.map((d, h) => {
      var j;
      let [y, R] = d.split("-");
      return B.length ? o.createElement("ol", { key: d, dir: ot === "auto" ? _t() : ot, tabIndex: -1, ref: A, className: g, "data-sonner-toaster": true, "data-theme": W, "data-y-position": y, "data-lifted": Y && B.length > 1 && !w, "data-x-position": R, style: { "--front-toast-height": `${((j = nt[0]) == null ? void 0 : j.height) || 0}px`, "--width": `${he}px`, "--gap": `${at}px`, ...ut, ...Te(i, D) }, onBlur: (p) => {
        z.current && !p.currentTarget.contains(p.relatedTarget) && (z.current = false, L.current && (L.current.focus({ preventScroll: true }), L.current = null));
      }, onFocus: (p) => {
        p.target instanceof HTMLElement && p.target.dataset.dismissible === "false" || z.current || (z.current = true, L.current = p.relatedTarget);
      }, onMouseEnter: () => C(true), onMouseMove: () => C(true), onMouseLeave: () => {
        lt || C(false);
      }, onDragEnd: () => C(false), onPointerDown: (p) => {
        p.target instanceof HTMLElement && p.target.dataset.dismissible === "false" || J(true);
      }, onPointerUp: () => J(false) }, B.filter((p) => !p.position && h === 0 || p.position === d).map((p, _) => {
        var O, G;
        return o.createElement(ve, { key: p.id, icons: st, index: _, toast: p, defaultRichColors: F, duration: (O = l == null ? void 0 : l.duration) != null ? O : et, className: l == null ? void 0 : l.className, descriptionClassName: l == null ? void 0 : l.descriptionClassName, invert: a, visibleToasts: ft, closeButton: (G = l == null ? void 0 : l.closeButton) != null ? G : S, interacting: lt, position: d, style: l == null ? void 0 : l.style, unstyled: l == null ? void 0 : l.unstyled, classNames: l == null ? void 0 : l.classNames, cancelButtonStyle: l == null ? void 0 : l.cancelButtonStyle, actionButtonStyle: l == null ? void 0 : l.actionButtonStyle, removeToast: ct, toasts: B.filter((k) => k.position == p.position), heights: nt.filter((k) => k.position == p.position), setHeights: it, expandByDefault: w, gap: at, loadingIcon: X2, expanded: Y, pauseWhenPageIsHidden: rt, swipeDirections: e.swipeDirections });
      })) : null;
    }));
  });
  const SearchableProfileField = ({
    value,
    onSelect,
    placeholder = "Select profile...",
    disabled = false
  }) => {
    const [open, setOpen] = o.useState(false);
    const [profiles, setProfiles] = o.useState([]);
    const [loading, setLoading] = o.useState(false);
    const [searchTerm, setSearchTerm] = o.useState("");
    o.useEffect(() => {
      fetchProfiles();
    }, []);
    const fetchProfiles = async () => {
      try {
        setLoading(true);
        const { data, error } = await client.supabase.from("profiles").select("id, full_name, username").not("full_name", "is", null).order("full_name");
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
    return /* @__PURE__ */ jsxRuntime.jsxs(popover.Popover, { open, onOpenChange: setOpen, children: [
      /* @__PURE__ */ jsxRuntime.jsx(popover.PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntime.jsxs(
        button.Button,
        {
          variant: "outline",
          role: "combobox",
          "aria-expanded": open,
          className: "w-full justify-between",
          disabled,
          children: [
            value ? /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntime.jsx(User, { className: "h-4 w-4" }),
              value
            ] }) : placeholder,
            /* @__PURE__ */ jsxRuntime.jsx(ChevronsUpDown, { className: "ml-2 h-4 w-4 shrink-0 opacity-50" })
          ]
        }
      ) }),
      /* @__PURE__ */ jsxRuntime.jsx(popover.PopoverContent, { className: "w-full p-0", children: /* @__PURE__ */ jsxRuntime.jsxs(command.Command, { children: [
        /* @__PURE__ */ jsxRuntime.jsx(
          command.CommandInput,
          {
            placeholder: "Search profiles...",
            value: searchTerm,
            onValueChange: setSearchTerm
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsxs(command.CommandList, { children: [
          /* @__PURE__ */ jsxRuntime.jsx(command.CommandEmpty, { children: loading ? "Loading..." : "No profiles found." }),
          /* @__PURE__ */ jsxRuntime.jsxs(command.CommandGroup, { children: [
            value && /* @__PURE__ */ jsxRuntime.jsxs(
              command.CommandItem,
              {
                value: "",
                onSelect: () => {
                  onSelect(null);
                  setOpen(false);
                },
                children: [
                  /* @__PURE__ */ jsxRuntime.jsx(
                    Check,
                    {
                      className: utils.cn(
                        "mr-2 h-4 w-4",
                        !value ? "opacity-100" : "opacity-0"
                      )
                    }
                  ),
                  "Clear selection"
                ]
              }
            ),
            filteredProfiles.map((profile) => /* @__PURE__ */ jsxRuntime.jsxs(
              command.CommandItem,
              {
                value: profile.full_name,
                onSelect: (currentValue) => {
                  const selected = profiles.find((p) => p.full_name === currentValue);
                  onSelect(selected || null);
                  setOpen(false);
                },
                children: [
                  /* @__PURE__ */ jsxRuntime.jsx(
                    Check,
                    {
                      className: utils.cn(
                        "mr-2 h-4 w-4",
                        value === profile.full_name ? "opacity-100" : "opacity-0"
                      )
                    }
                  ),
                  /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex flex-col", children: [
                    /* @__PURE__ */ jsxRuntime.jsx("span", { children: profile.full_name }),
                    profile.username && /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "text-sm text-muted-foreground", children: [
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
    const [isEditing, setIsEditing] = o.useState(false);
    const [loading, setLoading] = o.useState(true);
    const [saving, setSaving] = o.useState(false);
    const [organisationData, setOrganisationData] = o.useState({});
    const [signatoryData, setSignatoryData] = o.useState({});
    const { isSuperAdmin } = useUserRole.useUserRole();
    const { supabaseClient } = useOrganisationContext();
    const validatePhoneInput = (input2) => {
      return input2.replace(/[^0-9+\s\-()]/g, "");
    };
    const handleTelephoneChange = (e) => {
      const validatedValue = validatePhoneInput(e.target.value);
      setOrganisationData((prev) => ({ ...prev, telephone: validatedValue }));
    };
    o.useEffect(() => {
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
        ue.error("Failed to load organisation data");
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
        ue.success("Organisation profile updated successfully");
        setIsEditing(false);
      } catch (error) {
        console.error("Error saving organisation data:", error);
        ue.error("Failed to save organisation data");
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
    const handleCancel = () => {
      setIsEditing(false);
      fetchOrganisationData();
    };
    if (loading) {
      return /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex items-center justify-center p-8", children: /* @__PURE__ */ jsxRuntime.jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-primary" }) });
    }
    return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-6 text-left", children: [
      /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntime.jsx("h2", { className: "text-2xl font-bold", children: "Organisation Profile" }),
          /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-muted-foreground", children: "Manage organisation details and signatory information" })
        ] }),
        !isEditing ? /* @__PURE__ */ jsxRuntime.jsx(button.Button, { onClick: () => setIsEditing(true), variant: "outline", size: "icon", children: /* @__PURE__ */ jsxRuntime.jsx(SquarePen, { className: "h-4 w-4" }) }) : /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntime.jsx(button.Button, { onClick: handleSave, disabled: saving, size: "icon", children: /* @__PURE__ */ jsxRuntime.jsx(Save, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsxRuntime.jsx(button.Button, { onClick: handleCancel, variant: "outline", disabled: saving, size: "icon", children: /* @__PURE__ */ jsxRuntime.jsx(X, { className: "h-4 w-4" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs(card.Card, { children: [
        /* @__PURE__ */ jsxRuntime.jsx(card.CardHeader, { children: /* @__PURE__ */ jsxRuntime.jsx(card.CardTitle, { children: "General Information" }) }),
        /* @__PURE__ */ jsxRuntime.jsxs(card.CardContent, { className: "space-y-4 text-left", children: [
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntime.jsx(label.Label, { htmlFor: "org-name", children: "Organisation Name" }),
              /* @__PURE__ */ jsxRuntime.jsx(
                input.Input,
                {
                  id: "org-name",
                  value: organisationData.org_name || "",
                  onChange: (e) => setOrganisationData((prev) => ({ ...prev, org_name: e.target.value })),
                  disabled: !isEditing
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntime.jsx(label.Label, { htmlFor: "org-name-short", children: "Organisation Name (Short)" }),
              /* @__PURE__ */ jsxRuntime.jsx(
                input.Input,
                {
                  id: "org-name-short",
                  value: organisationData.org_short_name || "",
                  onChange: (e) => setOrganisationData((prev) => ({ ...prev, org_short_name: e.target.value })),
                  disabled: !isEditing || !isSuperAdmin
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntime.jsx(label.Label, { htmlFor: "acra-uen", children: "ACRA Number/Unique Entity Number (UEN)" }),
              /* @__PURE__ */ jsxRuntime.jsx(
                input.Input,
                {
                  id: "acra-uen",
                  value: organisationData.acra_uen_number || "",
                  onChange: (e) => setOrganisationData((prev) => ({ ...prev, acra_uen_number: e.target.value })),
                  disabled: !isEditing
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntime.jsx(label.Label, { htmlFor: "charity-reg", children: "Charity Registration Number" }),
              /* @__PURE__ */ jsxRuntime.jsx(
                input.Input,
                {
                  id: "charity-reg",
                  value: organisationData.charity_registration_number || "",
                  onChange: (e) => setOrganisationData((prev) => ({ ...prev, charity_registration_number: e.target.value })),
                  disabled: !isEditing
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntime.jsx(label.Label, { htmlFor: "address", children: "Address" }),
            /* @__PURE__ */ jsxRuntime.jsx(
              textarea.Textarea,
              {
                id: "address",
                value: organisationData.address || "",
                onChange: (e) => setOrganisationData((prev) => ({ ...prev, address: e.target.value })),
                disabled: !isEditing,
                rows: 3
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntime.jsx(label.Label, { htmlFor: "telephone", children: "Telephone" }),
              /* @__PURE__ */ jsxRuntime.jsx(
                input.Input,
                {
                  id: "telephone",
                  value: organisationData.telephone || "",
                  onChange: handleTelephoneChange,
                  disabled: !isEditing
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntime.jsx(label.Label, { htmlFor: "annual-turnover", children: "Annual Turnover" }),
              /* @__PURE__ */ jsxRuntime.jsx(
                input.Input,
                {
                  id: "annual-turnover",
                  value: organisationData.annual_turnover || "",
                  onChange: (e) => setOrganisationData((prev) => ({ ...prev, annual_turnover: e.target.value })),
                  disabled: !isEditing
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntime.jsx(label.Label, { htmlFor: "num-employees", children: "Number of Employees" }),
              /* @__PURE__ */ jsxRuntime.jsx(
                input.Input,
                {
                  id: "num-employees",
                  type: "number",
                  value: organisationData.number_of_employees || "",
                  onChange: (e) => setOrganisationData((prev) => ({ ...prev, number_of_employees: parseInt(e.target.value) || 0 })),
                  disabled: !isEditing
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntime.jsx(label.Label, { htmlFor: "num-executives", children: "Number of Executives" }),
              /* @__PURE__ */ jsxRuntime.jsx(
                input.Input,
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
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntime.jsx(label.Label, { htmlFor: "cert-body", children: "Appointed Certification Body" }),
            /* @__PURE__ */ jsxRuntime.jsx(
              input.Input,
              {
                id: "cert-body",
                value: organisationData.appointed_certification_body || "",
                onChange: (e) => setOrganisationData((prev) => ({ ...prev, appointed_certification_body: e.target.value })),
                disabled: !isEditing
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs(card.Card, { children: [
        /* @__PURE__ */ jsxRuntime.jsx(card.CardHeader, { children: /* @__PURE__ */ jsxRuntime.jsx(card.CardTitle, { children: "Signatory Information" }) }),
        /* @__PURE__ */ jsxRuntime.jsxs(card.CardContent, { className: "space-y-6 text-left", children: [
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntime.jsx("h4", { className: "font-semibold text-sm text-muted-foreground uppercase tracking-wide", children: "CEM Declaration" }),
            /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
              /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntime.jsx(label.Label, { htmlFor: "cem-name", children: "Name of Signatory to CEM Declaration" }),
                /* @__PURE__ */ jsxRuntime.jsx(
                  SearchableProfileField,
                  {
                    value: signatoryData.name_signatory_cem,
                    onSelect: (profile) => handleProfileSelect("cem", profile),
                    placeholder: "Select CEM signatory...",
                    disabled: !isEditing
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntime.jsx(label.Label, { htmlFor: "cem-title", children: "Title of Signatory to CEM Declaration" }),
                /* @__PURE__ */ jsxRuntime.jsx(
                  input.Input,
                  {
                    id: "cem-title",
                    value: signatoryData.title_signatory_cem || "",
                    onChange: (e) => setSignatoryData((prev) => ({ ...prev, title_signatory_cem: e.target.value })),
                    disabled: !isEditing
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntime.jsx(label.Label, { htmlFor: "cem-email", children: "Email of Signatory to CEM Declaration" }),
                /* @__PURE__ */ jsxRuntime.jsx(
                  input.Input,
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
          /* @__PURE__ */ jsxRuntime.jsx(separator.Separator, {}),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntime.jsx("h4", { className: "font-semibold text-sm text-muted-foreground uppercase tracking-wide", children: "HIB Pledge" }),
            /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
              /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntime.jsx(label.Label, { htmlFor: "hib-name", children: "Name of Signatory to HIB Pledge" }),
                /* @__PURE__ */ jsxRuntime.jsx(
                  SearchableProfileField,
                  {
                    value: signatoryData.name_signatory_hib,
                    onSelect: (profile) => handleProfileSelect("hib", profile),
                    placeholder: "Select HIB signatory...",
                    disabled: !isEditing
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntime.jsx(label.Label, { htmlFor: "hib-title", children: "Title of Signatory to HIB Pledge" }),
                /* @__PURE__ */ jsxRuntime.jsx(
                  input.Input,
                  {
                    id: "hib-title",
                    value: signatoryData.title_signatory_hib || "",
                    onChange: (e) => setSignatoryData((prev) => ({ ...prev, title_signatory_hib: e.target.value })),
                    disabled: !isEditing
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntime.jsx(label.Label, { htmlFor: "hib-email", children: "Email of Signatory to HIB Pledge" }),
                /* @__PURE__ */ jsxRuntime.jsx(
                  input.Input,
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
          /* @__PURE__ */ jsxRuntime.jsx(separator.Separator, {}),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntime.jsx("h4", { className: "font-semibold text-sm text-muted-foreground uppercase tracking-wide", children: "DPE Pledge" }),
            /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
              /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntime.jsx(label.Label, { htmlFor: "dpe-name", children: "Name of Signatory to DPE Pledge" }),
                /* @__PURE__ */ jsxRuntime.jsx(
                  SearchableProfileField,
                  {
                    value: signatoryData.name_signatory_dpe,
                    onSelect: (profile) => handleProfileSelect("dpe", profile),
                    placeholder: "Select DPE signatory...",
                    disabled: !isEditing
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntime.jsx(label.Label, { htmlFor: "dpe-title", children: "Title of Signatory to DPE Pledge" }),
                /* @__PURE__ */ jsxRuntime.jsx(
                  input.Input,
                  {
                    id: "dpe-title",
                    value: signatoryData.title_signatory_dpe || "",
                    onChange: (e) => setSignatoryData((prev) => ({ ...prev, title_signatory_dpe: e.target.value })),
                    disabled: !isEditing
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntime.jsx(label.Label, { htmlFor: "dpe-email", children: "Email of Signatory to DPE Pledge" }),
                /* @__PURE__ */ jsxRuntime.jsx(
                  input.Input,
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
          /* @__PURE__ */ jsxRuntime.jsx(separator.Separator, {}),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntime.jsx("h4", { className: "font-semibold text-sm text-muted-foreground uppercase tracking-wide", children: "Key Personnel" }),
            /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntime.jsx(label.Label, { htmlFor: "dpo-name", children: "DPO Name" }),
                /* @__PURE__ */ jsxRuntime.jsx(
                  SearchableProfileField,
                  {
                    value: signatoryData.dpo_name,
                    onSelect: (profile) => handleProfileSelect("dpo", profile),
                    placeholder: "Select DPO...",
                    disabled: !isEditing
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntime.jsx(label.Label, { htmlFor: "dpo-email", children: "DPO Email" }),
                /* @__PURE__ */ jsxRuntime.jsx(
                  input.Input,
                  {
                    id: "dpo-email",
                    type: "email",
                    value: signatoryData.dpo_email || "",
                    onChange: (e) => setSignatoryData((prev) => ({ ...prev, dpo_email: e.target.value })),
                    disabled: !isEditing
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntime.jsx(label.Label, { htmlFor: "iso-name", children: "ISO Name" }),
                /* @__PURE__ */ jsxRuntime.jsx(
                  SearchableProfileField,
                  {
                    value: signatoryData.iso_name,
                    onSelect: (profile) => handleProfileSelect("iso", profile),
                    placeholder: "Select ISO...",
                    disabled: !isEditing
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntime.jsx(label.Label, { htmlFor: "iso-email", children: "ISO Email" }),
                /* @__PURE__ */ jsxRuntime.jsx(
                  input.Input,
                  {
                    id: "iso-email",
                    type: "email",
                    value: signatoryData.iso_email || "",
                    onChange: (e) => setSignatoryData((prev) => ({ ...prev, iso_email: e.target.value })),
                    disabled: !isEditing
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntime.jsx(label.Label, { htmlFor: "head-it-name", children: "Head of IT Name" }),
                /* @__PURE__ */ jsxRuntime.jsx(
                  SearchableProfileField,
                  {
                    value: signatoryData.head_it_name,
                    onSelect: (profile) => handleProfileSelect("head_it", profile),
                    placeholder: "Select Head of IT...",
                    disabled: !isEditing
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntime.jsx(label.Label, { htmlFor: "head-it-email", children: "Head of IT Email" }),
                /* @__PURE__ */ jsxRuntime.jsx(
                  input.Input,
                  {
                    id: "head-it-email",
                    type: "email",
                    value: signatoryData.head_it_email || "",
                    onChange: (e) => setSignatoryData((prev) => ({ ...prev, head_it_email: e.target.value })),
                    disabled: !isEditing
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntime.jsx(label.Label, { htmlFor: "it-manager-name", children: "IT Manager Name" }),
                /* @__PURE__ */ jsxRuntime.jsx(
                  SearchableProfileField,
                  {
                    value: signatoryData.it_manager_name,
                    onSelect: (profile) => handleProfileSelect("it_manager", profile),
                    placeholder: "Select IT Manager...",
                    disabled: !isEditing
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntime.jsx(label.Label, { htmlFor: "it-manager-email", children: "IT Manager Email" }),
                /* @__PURE__ */ jsxRuntime.jsx(
                  input.Input,
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
      ] })
    ] });
  };
  const OrganisationPanel = ({
    title = "Organisation",
    description = "Manage users, roles, departments, and locations",
    showAdminBadge = true,
    className = ""
  }) => {
    const { isTabEnabled, onNavigate } = useOrganisationContext();
    const [activeTab, setActiveTab] = o.useState(() => {
      const defaultTabs = ["users", "roles", "departments", "locations", "certificates", "profile"];
      return defaultTabs.find((tab) => isTabEnabled(tab)) || "users";
    });
    const handleTabChange = (value) => {
      setActiveTab(value);
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
    return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: `w-full px-4 space-y-6 ${className}`, children: [
      /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "text-left", children: [
          /* @__PURE__ */ jsxRuntime.jsx("h1", { className: "text-3xl font-bold", children: title }),
          /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-muted-foreground", children: description })
        ] }),
        showAdminBadge && /* @__PURE__ */ jsxRuntime.jsxs(badge.Badge, { variant: "secondary", className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntime.jsx(Settings, { className: "h-4 w-4" }),
          "Administrator"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsx(card.Card, { children: /* @__PURE__ */ jsxRuntime.jsx(card.CardContent, { className: "p-6", children: /* @__PURE__ */ jsxRuntime.jsxs(tabs.Tabs, { value: activeTab, onValueChange: handleTabChange, className: "w-full", children: [
        /* @__PURE__ */ jsxRuntime.jsx(tabs.TabsList, { className: "grid w-full", style: { gridTemplateColumns: `repeat(${enabledTabs.length}, 1fr)` }, children: enabledTabs.map(({ id, label: label2, icon: Icon2 }) => /* @__PURE__ */ jsxRuntime.jsxs(tabs.TabsTrigger, { value: id, className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntime.jsx(Icon2, { className: "h-4 w-4" }),
          label2
        ] }, id)) }),
        enabledTabs.map(({ id, component: Component }) => /* @__PURE__ */ jsxRuntime.jsx(tabs.TabsContent, { value: id, className: "space-y-4", children: /* @__PURE__ */ jsxRuntime.jsx(Component, {}) }, id))
      ] }) }) })
    ] });
  };
  const OrganisationWrapper = () => {
    const { hasAdminAccess } = useUserRole.useUserRole();
    const organisationConfig = {
      supabaseClient: client.supabase,
      enabledTabs: ["users", "roles", "departments", "locations", "certificates", "profile"],
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
    return /* @__PURE__ */ jsxRuntime.jsx(OrganisationProvider, { config: organisationConfig, children: /* @__PURE__ */ jsxRuntime.jsx(
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
    const formatDate = (dateString) => {
      if (!dateString) return "No expiry";
      return new Date(dateString).toLocaleDateString();
    };
    const getTypeIcon = (type) => {
      return type === "Document" ? /* @__PURE__ */ jsxRuntime.jsx(FileText, { className: "h-5 w-5 text-primary flex-shrink-0" }) : /* @__PURE__ */ jsxRuntime.jsx(Award, { className: "h-5 w-5 text-primary flex-shrink-0" });
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
    return /* @__PURE__ */ jsxRuntime.jsx("div", { className: "space-y-4 animate-fade-in", children: filteredCertificates.length === 0 ? /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-muted-foreground text-center py-8", children: "No certificates yet" }) : /* @__PURE__ */ jsxRuntime.jsx("div", { className: "space-y-4", children: filteredCertificates.map((cert, index) => {
      const validityStatus = getValidityStatus(cert.expiryDate);
      return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "border rounded-lg p-4", children: [
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-3 min-w-0 flex-1", children: [
            getTypeIcon(cert.type),
            /* @__PURE__ */ jsxRuntime.jsx("h3", { className: "font-semibold text-lg truncate", children: cert.name })
          ] }),
          /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex items-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntime.jsx(badge.Badge, { className: `${getTypeColor(cert.type)} text-white text-sm px-2 py-1`, children: cert.type || "Certificate" }) })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "grid grid-cols-4 gap-4 text-sm ml-8", children: [
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntime.jsx(Building, { className: "h-4 w-4 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntime.jsx("span", { className: "font-medium text-foreground", children: cert.issuedBy })
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntime.jsx(Calendar, { className: "h-4 w-4 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-muted-foreground", children: "Issued:" }),
            /* @__PURE__ */ jsxRuntime.jsx("span", { className: "font-medium", children: formatDate(cert.dateAcquired) })
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntime.jsx(Calendar, { className: "h-4 w-4 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-muted-foreground", children: "Expires:" }),
            /* @__PURE__ */ jsxRuntime.jsx("span", { className: "font-medium", children: formatDate(cert.expiryDate) })
          ] }),
          /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex items-center justify-end", children: /* @__PURE__ */ jsxRuntime.jsx(badge.Badge, { className: `${getValidityStatusColor(validityStatus)} text-white`, children: validityStatus }) })
        ] }),
        cert.credentialId && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "text-sm ml-8 mt-2", children: [
          /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-muted-foreground", children: "ID: " }),
          /* @__PURE__ */ jsxRuntime.jsx("span", { className: "font-medium", children: cert.credentialId })
        ] })
      ] }, index);
    }) }) });
  };
  const AssignPhysicalLocationDialog = ({
    isOpen,
    onOpenChange,
    prefilledUser,
    onSuccess
  }) => {
    const [loading, setLoading] = o.useState(false);
    const [selectedUserId, setSelectedUserId] = o.useState("");
    const { profiles } = useUserProfiles.useUserProfiles();
    const { data: locations } = reactQuery.useQuery({
      queryKey: ["locations"],
      queryFn: async () => {
        const { data } = await client.supabase.from("locations").select("id, name").eq("status", "Active").order("name");
        return data || [];
      }
    });
    const [formData, setFormData] = o.useState({
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
          const { data: locationData, error: locationError } = await client.supabase.from("locations").select("id, name").eq("id", formData.location).single();
          if (locationError) {
            throw new Error(`Failed to fetch location: ${locationError.message}`);
          }
          if (locationData) {
            const { error: profileUpdateError } = await client.supabase.from("profiles").update({
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
        const { error } = await client.supabase.from("physical_location_access").insert([insertData]);
        if (error) throw error;
        useToast.toast({
          title: "Physical location access added",
          description: formData.full_name === "Unassigned" ? "Location access record created without user assignment." : "Physical location access has been successfully added."
        });
        onOpenChange(false);
        resetForm();
        onSuccess == null ? void 0 : onSuccess();
      } catch (error) {
        useToast.toast({
          title: "Error",
          description: error.message,
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    return /* @__PURE__ */ jsxRuntime.jsx(dialog.Dialog, { open: isOpen, onOpenChange, children: /* @__PURE__ */ jsxRuntime.jsxs(dialog.DialogContent, { className: "max-w-2xl max-h-[80vh] overflow-y-auto", children: [
      /* @__PURE__ */ jsxRuntime.jsx(dialog.DialogHeader, { children: /* @__PURE__ */ jsxRuntime.jsx(dialog.DialogTitle, { children: "Add Physical Location Access" }) }),
      /* @__PURE__ */ jsxRuntime.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          !prefilledUser && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "col-span-2", children: [
            /* @__PURE__ */ jsxRuntime.jsx(label.Label, { htmlFor: "user_select", children: "Assign to User (Optional)" }),
            /* @__PURE__ */ jsxRuntime.jsxs(select.Select, { value: selectedUserId, onValueChange: handleUserSelection, children: [
              /* @__PURE__ */ jsxRuntime.jsx(select.SelectTrigger, { children: /* @__PURE__ */ jsxRuntime.jsx(select.SelectValue, { placeholder: "Select a user or create without assignment" }) }),
              /* @__PURE__ */ jsxRuntime.jsxs(select.SelectContent, { children: [
                /* @__PURE__ */ jsxRuntime.jsx(select.SelectItem, { value: "none", children: "Create without user assignment" }),
                profiles.map((profile) => /* @__PURE__ */ jsxRuntime.jsxs(select.SelectItem, { value: profile.id, children: [
                  profile.full_name || "No name",
                  " (",
                  profile.email || profile.username || "No email",
                  ")"
                ] }, profile.id))
              ] })
            ] })
          ] }),
          selectedUserId && selectedUserId !== "none" && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "col-span-2 p-3 bg-gray-50 rounded-lg", children: [
            /* @__PURE__ */ jsxRuntime.jsx("h4", { className: "font-medium mb-2", children: "Selected User Details:" }),
            /* @__PURE__ */ jsxRuntime.jsxs("p", { children: [
              /* @__PURE__ */ jsxRuntime.jsx("strong", { children: "Name:" }),
              " ",
              formData.full_name
            ] }),
            /* @__PURE__ */ jsxRuntime.jsxs("p", { children: [
              /* @__PURE__ */ jsxRuntime.jsx("strong", { children: "Email:" }),
              " ",
              formData.email
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntime.jsx(label.Label, { htmlFor: "full_name", children: "Full Name" }),
            /* @__PURE__ */ jsxRuntime.jsx(
              input.Input,
              {
                id: "full_name",
                value: formData.full_name,
                onChange: (e) => setFormData({ ...formData, full_name: e.target.value }),
                placeholder: "Leave empty for unassigned",
                disabled: !!prefilledUser || selectedUserId && selectedUserId !== "none"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntime.jsx(label.Label, { htmlFor: "email", children: "Email" }),
            /* @__PURE__ */ jsxRuntime.jsx(
              input.Input,
              {
                id: "email",
                value: formData.email,
                onChange: (e) => setFormData({ ...formData, email: e.target.value }),
                placeholder: "Leave empty for unassigned",
                disabled: !!prefilledUser || selectedUserId && selectedUserId !== "none"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntime.jsx(label.Label, { htmlFor: "location", children: "Location *" }),
            /* @__PURE__ */ jsxRuntime.jsxs(
              select.Select,
              {
                value: formData.location,
                onValueChange: (value) => setFormData({ ...formData, location: value }),
                required: true,
                children: [
                  /* @__PURE__ */ jsxRuntime.jsx(select.SelectTrigger, { children: /* @__PURE__ */ jsxRuntime.jsx(select.SelectValue, { placeholder: "Select a location" }) }),
                  /* @__PURE__ */ jsxRuntime.jsx(select.SelectContent, { children: locations == null ? void 0 : locations.map((location) => /* @__PURE__ */ jsxRuntime.jsx(select.SelectItem, { value: location.id, children: location.name }, location.id)) })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntime.jsx(label.Label, { htmlFor: "access_purpose", children: "Access Purpose *" }),
            /* @__PURE__ */ jsxRuntime.jsx(
              input.Input,
              {
                id: "access_purpose",
                value: formData.access_purpose,
                onChange: (e) => setFormData({ ...formData, access_purpose: e.target.value }),
                placeholder: "e.g., Maintenance, Security, Operations",
                required: true
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "col-span-2", children: [
            /* @__PURE__ */ jsxRuntime.jsx(label.Label, { htmlFor: "status", children: "Status" }),
            /* @__PURE__ */ jsxRuntime.jsxs(select.Select, { value: formData.status, onValueChange: (value) => setFormData({ ...formData, status: value }), children: [
              /* @__PURE__ */ jsxRuntime.jsx(select.SelectTrigger, { children: /* @__PURE__ */ jsxRuntime.jsx(select.SelectValue, {}) }),
              /* @__PURE__ */ jsxRuntime.jsxs(select.SelectContent, { children: [
                /* @__PURE__ */ jsxRuntime.jsx(select.SelectItem, { value: "Active", children: "Active" }),
                /* @__PURE__ */ jsxRuntime.jsx(select.SelectItem, { value: "Inactive", children: "Inactive" }),
                /* @__PURE__ */ jsxRuntime.jsx(select.SelectItem, { value: "Revoked", children: "Revoked" })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex gap-2 justify-end", children: [
          /* @__PURE__ */ jsxRuntime.jsx(button.Button, { type: "button", variant: "outline", onClick: () => onOpenChange(false), size: "icon", children: /* @__PURE__ */ jsxRuntime.jsx(X, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsxRuntime.jsx(button.Button, { type: "submit", disabled: loading, size: "icon", children: loading ? /* @__PURE__ */ jsxRuntime.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntime.jsx(Plus, { className: "h-4 w-4" }) })
        ] })
      ] })
    ] }) });
  };
  const PhysicalLocationTab = ({ profile }) => {
    const [isAssignDialogOpen, setIsAssignDialogOpen] = o.useState(false);
    const { data: locationAccess = [], refetch } = reactQuery.useQuery({
      queryKey: ["user-physical-location-access", profile.email],
      queryFn: async () => {
        const { data, error } = await client.supabase.from("physical_location_access").select(`
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
        editable: true,
        // Only this field is editable as requested
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
        const { error } = await client.supabase.from("physical_location_access").update(updates).eq("id", id);
        if (error) throw error;
        useToast$1.toast({
          title: "Access updated",
          description: "Physical location access has been successfully updated"
        });
        refetch();
        return { success: true };
      } catch (error) {
        console.error("Error updating physical location access:", error);
        useToast$1.toast({
          title: "Update failed",
          description: error.message,
          variant: "destructive"
        });
        return { success: false, error: error.message };
      }
    };
    const handleDelete = async (id) => {
      try {
        const { data: accessRecord, error: fetchError } = await client.supabase.from("physical_location_access").select("location_id").eq("id", id).single();
        if (fetchError) throw fetchError;
        if (accessRecord == null ? void 0 : accessRecord.location_id) {
          const { data: userProfile } = await client.supabase.from("profiles").select("location_id").eq("id", profile.id).single();
          if ((userProfile == null ? void 0 : userProfile.location_id) === accessRecord.location_id) {
            const { error: profileUpdateError } = await client.supabase.from("profiles").update({ location: null, location_id: null }).eq("id", profile.id);
            if (profileUpdateError) {
              throw new Error(`Failed to update profile: ${profileUpdateError.message}`);
            }
          }
        }
        const { error } = await client.supabase.from("physical_location_access").delete().eq("id", id);
        if (error) throw error;
        useToast$1.toast({
          title: "Access removed",
          description: "Physical location access has been successfully removed"
        });
        refetch();
        return { success: true };
      } catch (error) {
        useToast$1.toast({
          title: "Delete failed",
          description: error.message,
          variant: "destructive"
        });
        return { success: false, error: error.message };
      }
    };
    return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex justify-between items-center", children: [
        /* @__PURE__ */ jsxRuntime.jsxs("p", { className: "text-sm text-muted-foreground", children: [
          "Manage physical location access for ",
          profile.firstName,
          " ",
          profile.lastName
        ] }),
        /* @__PURE__ */ jsxRuntime.jsx(
          button.Button,
          {
            onClick: () => setIsAssignDialogOpen(true),
            size: "icon",
            children: /* @__PURE__ */ jsxRuntime.jsx(Plus, { className: "h-4 w-4" })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntime.jsx(
        editableTable.EditableTable,
        {
          data: locationAccess,
          columns,
          onUpdate: handleUpdate,
          onDelete: handleDelete,
          allowAdd: false,
          allowDelete: true
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsx(
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
    const [loading, setLoading] = o.useState(false);
    const [selectedHardwareId, setSelectedHardwareId] = o.useState("");
    const { hardwareInventory, refetch } = useInventory.useInventory();
    const unassignedHardware = hardwareInventory.filter((item) => {
      const hasNoUserId = !item.user_id;
      const isUnassigned = item.status === "Unassigned";
      const hasNoAssignedUser = !item.asset_owner || item.asset_owner.trim() === "" || item.asset_owner === "no-owner" || item.asset_owner === "Unassigned";
      return hasNoUserId && (isUnassigned || hasNoAssignedUser);
    });
    const selectedHardwareItem = selectedHardwareId ? hardwareInventory.find((item) => item.id === selectedHardwareId) : null;
    const { data: userProfile } = reactQuery.useQuery({
      queryKey: ["user-profile-by-id", userId],
      queryFn: async () => {
        const { data, error } = await client.supabase.from("profiles").select("full_name, username").eq("id", userId).single();
        if (error) throw error;
        return data;
      }
    });
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!selectedHardwareItem || !userProfile) {
        useToast$1.toast({
          title: "Error",
          description: "Please select a hardware item to assign.",
          variant: "destructive"
        });
        return;
      }
      setLoading(true);
      try {
        const userName = userProfile.full_name || userProfile.username || "Assigned User";
        const { error: inventoryError } = await client.supabase.from("hardware_inventory").update({
          user_id: userId,
          asset_owner: userName,
          status: "Assigned"
        }).eq("id", selectedHardwareId);
        if (inventoryError) throw inventoryError;
        useToast$1.toast({
          title: "Hardware assigned",
          description: `${selectedHardwareItem.device_name} has been successfully assigned to ${userName}`
        });
        await refetch();
        onOpenChange(false);
        setSelectedHardwareId("");
        onSuccess == null ? void 0 : onSuccess();
      } catch (error) {
        useToast$1.toast({
          title: "Error",
          description: error.message,
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    return /* @__PURE__ */ jsxRuntime.jsx(dialog.Dialog, { open: isOpen, onOpenChange, children: /* @__PURE__ */ jsxRuntime.jsxs(dialog.DialogContent, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(dialog.DialogHeader, { children: /* @__PURE__ */ jsxRuntime.jsx(dialog.DialogTitle, { children: "Assign Hardware to User" }) }),
      /* @__PURE__ */ jsxRuntime.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntime.jsx(label.Label, { htmlFor: "hardware", children: "Select Hardware" }),
          /* @__PURE__ */ jsxRuntime.jsxs(
            select.Select,
            {
              value: selectedHardwareId,
              onValueChange: setSelectedHardwareId,
              disabled: unassignedHardware.length === 0,
              children: [
                /* @__PURE__ */ jsxRuntime.jsx(select.SelectTrigger, { children: /* @__PURE__ */ jsxRuntime.jsx(select.SelectValue, { placeholder: unassignedHardware.length === 0 ? "No unassigned hardware available" : "Select unassigned hardware" }) }),
                /* @__PURE__ */ jsxRuntime.jsx(select.SelectContent, { children: unassignedHardware.map((item) => /* @__PURE__ */ jsxRuntime.jsxs(select.SelectItem, { value: item.id, children: [
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
        selectedHardwareItem && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "p-3 bg-blue-50 rounded-lg border border-blue-200", children: [
          /* @__PURE__ */ jsxRuntime.jsx("h4", { className: "font-medium mb-2 text-blue-900", children: "Assignment Details:" }),
          /* @__PURE__ */ jsxRuntime.jsxs("p", { className: "text-sm text-blue-700", children: [
            /* @__PURE__ */ jsxRuntime.jsx("strong", { children: "Device:" }),
            " ",
            selectedHardwareItem.device_name
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs("p", { className: "text-sm text-blue-700", children: [
            /* @__PURE__ */ jsxRuntime.jsx("strong", { children: "Type:" }),
            " ",
            selectedHardwareItem.asset_type
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs("p", { className: "text-sm text-blue-700", children: [
            /* @__PURE__ */ jsxRuntime.jsx("strong", { children: "Serial Number:" }),
            " ",
            selectedHardwareItem.serial_number
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs("p", { className: "text-sm text-blue-700", children: [
            /* @__PURE__ */ jsxRuntime.jsx("strong", { children: "Location:" }),
            " ",
            selectedHardwareItem.asset_location || "Not specified"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex gap-2 justify-end", children: [
          /* @__PURE__ */ jsxRuntime.jsx(button.Button, { type: "button", variant: "outline", onClick: () => onOpenChange(false), children: "Cancel" }),
          /* @__PURE__ */ jsxRuntime.jsx(button.Button, { type: "submit", disabled: loading || !selectedHardwareId, children: loading ? /* @__PURE__ */ jsxRuntime.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : "Assign Hardware" })
        ] })
      ] })
    ] }) });
  };
  const AssignSoftwareDialog = ({
    isOpen,
    onOpenChange,
    userId,
    onSuccess
  }) => {
    const [loading, setLoading] = o.useState(false);
    const [selectedSoftwareId, setSelectedSoftwareId] = o.useState("");
    const [roleAccountType, setRoleAccountType] = o.useState("");
    const { softwareInventory } = useInventory.useInventory();
    const { addSoftware } = useUserAssets.useUserAssets();
    const availableSoftware = softwareInventory.filter(
      (item) => item.status === "Active"
    );
    const selectedSoftwareItem = softwareInventory.find((item) => item.id === selectedSoftwareId);
    const { data: userProfile, isLoading: profileLoading, error: profileError } = reactQuery.useQuery({
      queryKey: ["user-profile-by-id", userId],
      queryFn: async () => {
        console.log("Querying profile for userId:", userId);
        const { data, error } = await client.supabase.from("profiles").select("id, full_name, username").eq("id", userId).single();
        console.log("Profile query result:", { data, error });
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
        useToast$1.toast({
          title: "Error",
          description: "Please fill in all required fields.",
          variant: "destructive"
        });
        return;
      }
      if (!selectedSoftwareItem) {
        useToast$1.toast({
          title: "Error",
          description: "Selected software item not found.",
          variant: "destructive"
        });
        return;
      }
      if (!(userProfile == null ? void 0 : userProfile.id)) {
        useToast$1.toast({
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
        useToast$1.toast({
          title: "Software assigned",
          description: "Software license has been successfully assigned to the user."
        });
        onOpenChange(false);
        setSelectedSoftwareId("");
        setRoleAccountType("");
        onSuccess == null ? void 0 : onSuccess();
      } catch (error) {
        console.error("Error assigning software:", error);
        useToast$1.toast({
          title: "Error",
          description: error.message,
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    if (profileLoading) {
      return /* @__PURE__ */ jsxRuntime.jsx(dialog.Dialog, { open: isOpen, onOpenChange, children: /* @__PURE__ */ jsxRuntime.jsx(dialog.DialogContent, { children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center justify-center p-6", children: [
        /* @__PURE__ */ jsxRuntime.jsx(LoaderCircle, { className: "h-6 w-6 animate-spin" }),
        /* @__PURE__ */ jsxRuntime.jsx("span", { className: "ml-2", children: "Loading user profile..." })
      ] }) }) });
    }
    if (profileError) {
      return /* @__PURE__ */ jsxRuntime.jsx(dialog.Dialog, { open: isOpen, onOpenChange, children: /* @__PURE__ */ jsxRuntime.jsxs(dialog.DialogContent, { children: [
        /* @__PURE__ */ jsxRuntime.jsx(dialog.DialogHeader, { children: /* @__PURE__ */ jsxRuntime.jsx(dialog.DialogTitle, { children: "Error Loading User Profile" }) }),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "p-4", children: [
          /* @__PURE__ */ jsxRuntime.jsxs("p", { className: "text-red-600", children: [
            "Failed to load user profile: ",
            profileError.message
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs("p", { className: "text-sm text-gray-600 mt-2", children: [
            "User ID: ",
            userId
          ] }),
          /* @__PURE__ */ jsxRuntime.jsx(button.Button, { onClick: () => onOpenChange(false), className: "mt-4", children: "Close" })
        ] })
      ] }) });
    }
    return /* @__PURE__ */ jsxRuntime.jsx(dialog.Dialog, { open: isOpen, onOpenChange, children: /* @__PURE__ */ jsxRuntime.jsxs(dialog.DialogContent, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(dialog.DialogHeader, { children: /* @__PURE__ */ jsxRuntime.jsxs(dialog.DialogTitle, { children: [
        "Assign Software License to ",
        (userProfile == null ? void 0 : userProfile.full_name) || "User"
      ] }) }),
      /* @__PURE__ */ jsxRuntime.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntime.jsx(label.Label, { htmlFor: "software", children: "Select Software" }),
          /* @__PURE__ */ jsxRuntime.jsxs(
            select.Select,
            {
              value: selectedSoftwareId,
              onValueChange: setSelectedSoftwareId,
              children: [
                /* @__PURE__ */ jsxRuntime.jsx(select.SelectTrigger, { children: /* @__PURE__ */ jsxRuntime.jsx(select.SelectValue, { placeholder: "Select software from inventory" }) }),
                /* @__PURE__ */ jsxRuntime.jsx(select.SelectContent, { children: availableSoftware.length === 0 ? /* @__PURE__ */ jsxRuntime.jsx(select.SelectItem, { value: "", disabled: true, children: "No software available in inventory" }) : availableSoftware.map((item) => /* @__PURE__ */ jsxRuntime.jsxs(select.SelectItem, { value: item.id, children: [
                  item.software_name,
                  " ",
                  item.software_version ? `v${item.software_version}` : "",
                  item.software_publisher ? ` by ${item.software_publisher}` : ""
                ] }, item.id)) })
              ]
            }
          )
        ] }),
        selectedSoftwareItem && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "p-3 bg-gray-50 rounded-lg", children: [
          /* @__PURE__ */ jsxRuntime.jsx("h4", { className: "font-medium mb-2", children: "Selected Software Details:" }),
          /* @__PURE__ */ jsxRuntime.jsxs("p", { children: [
            /* @__PURE__ */ jsxRuntime.jsx("strong", { children: "Name:" }),
            " ",
            selectedSoftwareItem.software_name
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs("p", { children: [
            /* @__PURE__ */ jsxRuntime.jsx("strong", { children: "Publisher:" }),
            " ",
            selectedSoftwareItem.software_publisher || "Not specified"
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs("p", { children: [
            /* @__PURE__ */ jsxRuntime.jsx("strong", { children: "Version:" }),
            " ",
            selectedSoftwareItem.software_version || "Not specified"
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs("p", { children: [
            /* @__PURE__ */ jsxRuntime.jsx("strong", { children: "Department:" }),
            " ",
            selectedSoftwareItem.department || "Not specified"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntime.jsx(label.Label, { htmlFor: "role_account_type", children: "Access Level" }),
          /* @__PURE__ */ jsxRuntime.jsxs(select.Select, { value: roleAccountType, onValueChange: setRoleAccountType, children: [
            /* @__PURE__ */ jsxRuntime.jsx(select.SelectTrigger, { children: /* @__PURE__ */ jsxRuntime.jsx(select.SelectValue, { placeholder: "Select access level" }) }),
            /* @__PURE__ */ jsxRuntime.jsxs(select.SelectContent, { children: [
              /* @__PURE__ */ jsxRuntime.jsx(select.SelectItem, { value: "Admin", children: "Admin" }),
              /* @__PURE__ */ jsxRuntime.jsx(select.SelectItem, { value: "User", children: "User" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex gap-2 justify-end", children: [
          /* @__PURE__ */ jsxRuntime.jsx(button.Button, { type: "button", variant: "outline", onClick: () => onOpenChange(false), children: "Cancel" }),
          /* @__PURE__ */ jsxRuntime.jsx(button.Button, { type: "submit", disabled: loading || !selectedSoftwareId || !roleAccountType, children: loading ? /* @__PURE__ */ jsxRuntime.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : "Assign Software" })
        ] })
      ] })
    ] }) });
  };
  const AddEducationDialog = ({
    isOpen,
    onOpenChange,
    userId,
    onSuccess
  }) => {
    const [loading, setLoading] = o.useState(false);
    const [formData, setFormData] = o.useState({
      type: "Certificate",
      name: "",
      issued_by: "",
      date_acquired: "",
      expiry_date: "",
      credential_id: "",
      status: "Valid"
    });
    const { addCertificate } = useUserAssets.useUserAssets();
    const { data: userProfile } = reactQuery.useQuery({
      queryKey: ["user-profile", userId],
      queryFn: async () => {
        const { data, error } = await client.supabase.from("profiles").select("id").eq("id", userId).single();
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
    };
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!userProfile) {
        useToast$1.toast({
          title: "Error",
          description: "User profile not found.",
          variant: "destructive"
        });
        return;
      }
      setLoading(true);
      try {
        const certificateData = {
          user_id: userProfile.id,
          type: formData.type,
          name: formData.name,
          issued_by: formData.issued_by,
          date_acquired: formData.date_acquired,
          expiry_date: formData.expiry_date || null,
          credential_id: formData.credential_id || null,
          status: formData.status
        };
        await addCertificate(certificateData);
        useToast$1.toast({
          title: "Education record added",
          description: "Education record has been successfully added."
        });
        onOpenChange(false);
        resetForm();
        onSuccess == null ? void 0 : onSuccess();
      } catch (error) {
        useToast$1.toast({
          title: "Error",
          description: error.message,
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    return /* @__PURE__ */ jsxRuntime.jsx(dialog.Dialog, { open: isOpen, onOpenChange, children: /* @__PURE__ */ jsxRuntime.jsxs(dialog.DialogContent, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(dialog.DialogHeader, { children: /* @__PURE__ */ jsxRuntime.jsx(dialog.DialogTitle, { children: "Add Certificate" }) }),
      /* @__PURE__ */ jsxRuntime.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntime.jsx(label.Label, { htmlFor: "type", children: "Type *" }),
          /* @__PURE__ */ jsxRuntime.jsxs(select.Select, { value: formData.type, onValueChange: (value) => setFormData({ ...formData, type: value }), children: [
            /* @__PURE__ */ jsxRuntime.jsx(select.SelectTrigger, { children: /* @__PURE__ */ jsxRuntime.jsx(select.SelectValue, {}) }),
            /* @__PURE__ */ jsxRuntime.jsxs(select.SelectContent, { children: [
              /* @__PURE__ */ jsxRuntime.jsx(select.SelectItem, { value: "Certificate", children: "Certificate" }),
              /* @__PURE__ */ jsxRuntime.jsx(select.SelectItem, { value: "Document", children: "Document" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntime.jsx(label.Label, { htmlFor: "name", children: "Name *" }),
          /* @__PURE__ */ jsxRuntime.jsx(
            input.Input,
            {
              id: "name",
              value: formData.name,
              onChange: (e) => setFormData({ ...formData, name: e.target.value }),
              placeholder: "e.g., Cybersecurity Certificate, PDPC e-Learning, ISP, IRP",
              required: true
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntime.jsx(label.Label, { htmlFor: "issued_by", children: "Issued By *" }),
          /* @__PURE__ */ jsxRuntime.jsx(
            input.Input,
            {
              id: "issued_by",
              value: formData.issued_by,
              onChange: (e) => setFormData({ ...formData, issued_by: e.target.value }),
              placeholder: "e.g., RAYN, PDPC,",
              required: true
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntime.jsx(label.Label, { htmlFor: "date_acquired", children: "Date Acquired *" }),
            /* @__PURE__ */ jsxRuntime.jsx(
              input.Input,
              {
                id: "date_acquired",
                type: "date",
                value: formData.date_acquired,
                onChange: (e) => setFormData({ ...formData, date_acquired: e.target.value }),
                required: true
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntime.jsx(label.Label, { htmlFor: "expiry_date", children: "Expiry Date" }),
            /* @__PURE__ */ jsxRuntime.jsx(
              input.Input,
              {
                id: "expiry_date",
                type: "date",
                value: formData.expiry_date,
                onChange: (e) => setFormData({ ...formData, expiry_date: e.target.value })
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntime.jsx(label.Label, { htmlFor: "credential_id", children: "Credential ID" }),
          /* @__PURE__ */ jsxRuntime.jsx(
            input.Input,
            {
              id: "credential_id",
              value: formData.credential_id,
              onChange: (e) => setFormData({ ...formData, credential_id: e.target.value }),
              placeholder: "Certificate or credential identifier"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntime.jsx(label.Label, { htmlFor: "status", children: "Status" }),
          /* @__PURE__ */ jsxRuntime.jsxs(select.Select, { value: formData.status, onValueChange: (value) => setFormData({ ...formData, status: value }), children: [
            /* @__PURE__ */ jsxRuntime.jsx(select.SelectTrigger, { children: /* @__PURE__ */ jsxRuntime.jsx(select.SelectValue, {}) }),
            /* @__PURE__ */ jsxRuntime.jsxs(select.SelectContent, { children: [
              /* @__PURE__ */ jsxRuntime.jsx(select.SelectItem, { value: "Valid", children: "Valid" }),
              /* @__PURE__ */ jsxRuntime.jsx(select.SelectItem, { value: "Expired", children: "Expired" }),
              /* @__PURE__ */ jsxRuntime.jsx(select.SelectItem, { value: "Pending", children: "Pending" }),
              /* @__PURE__ */ jsxRuntime.jsx(select.SelectItem, { value: "Revoked", children: "Revoked" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex gap-2 justify-end", children: [
          /* @__PURE__ */ jsxRuntime.jsx(button.Button, { type: "button", variant: "outline", onClick: () => onOpenChange(false), size: "icon", children: /* @__PURE__ */ jsxRuntime.jsx(X, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsxRuntime.jsx(button.Button, { type: "submit", disabled: loading || !formData.name || !formData.issued_by || !formData.date_acquired, size: "icon", children: loading ? /* @__PURE__ */ jsxRuntime.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntime.jsx(Plus, { className: "h-4 w-4" }) })
        ] })
      ] })
    ] }) });
  };
  const UserDepartmentsRolesTable = o.forwardRef(({ userId }, ref) => {
    const [newRows, setNewRows] = o.useState([]);
    const queryClient = reactQuery.useQueryClient();
    const { user } = staysecureAuth.useAuth();
    const {
      userDepartments,
      addDepartment,
      removeDepartment,
      setPrimaryDepartment,
      isAddingDepartment,
      refetch: refetchUserDepartments
    } = useUserDepartments.useUserDepartments(userId);
    const { data: allDepartments = [] } = reactQuery.useQuery({
      queryKey: ["departments"],
      queryFn: async () => {
        const { data, error } = await client.supabase.from("departments").select("id, name").order("name");
        if (error) throw error;
        return data;
      }
    });
    const { data: userRoles = [] } = reactQuery.useQuery({
      queryKey: ["user-roles", userId],
      queryFn: async () => {
        if (!userId) return [];
        console.log("UserDepartmentsRolesTable: Fetching roles for user:", userId);
        const { data, error } = await client.supabase.from("user_profile_roles").select(`
          *,
          roles (
            name
          )
        `).eq("user_id", userId).order("is_primary", { ascending: false });
        console.log("UserDepartmentsRolesTable: Raw roles data:", data);
        console.log("UserDepartmentsRolesTable: Roles query error:", error);
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
        console.log("UserDepartmentsRolesTable: Transformed roles data:", transformedData);
        return transformedData;
      },
      enabled: !!userId
    });
    const { data: allRoles = [] } = reactQuery.useQuery({
      queryKey: ["all-roles"],
      queryFn: async () => {
        const { data, error } = await client.supabase.from("roles").select("role_id, name, department_id, departments(name)").eq("is_active", true).order("name");
        if (error) throw error;
        return data;
      }
    });
    const addRoleMutation = reactQuery.useMutation({
      mutationFn: async ({ roleId, pairingId }) => {
        console.log("UserDepartmentsRolesTable: addRoleMutation called with roleId:", roleId, "pairingId:", pairingId);
        const role = allRoles.find((r) => r.role_id === roleId);
        console.log("UserDepartmentsRolesTable: Found role:", role);
        if (!role) throw new Error("Role not found");
        const isPrimary = userRoles.length === 0;
        console.log("UserDepartmentsRolesTable: isPrimary:", isPrimary, "userRoles.length:", userRoles.length);
        const insertData = {
          user_id: userId,
          role_id: roleId,
          is_primary: isPrimary,
          assigned_by: user == null ? void 0 : user.id,
          pairing_id: pairingId
        };
        console.log("UserDepartmentsRolesTable: Inserting role data:", insertData);
        const { data, error } = await client.supabase.from("user_profile_roles").insert(insertData).select();
        console.log("UserDepartmentsRolesTable: Insert result:", data);
        console.log("UserDepartmentsRolesTable: Insert error:", error);
        if (error) throw error;
        return role;
      },
      onSuccess: (data) => {
        console.log("UserDepartmentsRolesTable: Role assignment successful:", data);
        queryClient.invalidateQueries({ queryKey: ["user-roles", userId] });
        ue.success("Role assigned successfully");
      },
      onError: (error) => {
        console.error("UserDepartmentsRolesTable: Role assignment failed:", error);
        ue.error("Failed to assign role: " + error.message);
      }
    });
    const removeRoleMutation = reactQuery.useMutation({
      mutationFn: async (roleId) => {
        const { error } = await client.supabase.from("user_profile_roles").delete().eq("id", roleId);
        if (error) throw error;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["user-roles", userId] });
        ue.success("Role removed successfully");
      },
      onError: (error) => {
        ue.error("Failed to remove role: " + error.message);
      }
    });
    reactQuery.useMutation({
      mutationFn: async (roleId) => {
        await client.supabase.from("user_profile_roles").update({ is_primary: false }).eq("user_id", userId);
        const { error } = await client.supabase.from("user_profile_roles").update({ is_primary: true }).eq("id", roleId);
        if (error) throw error;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["user-roles", userId] });
        ue.success("Primary role updated");
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
      console.log("getAvailableRoles called with:", selectedDepartmentId);
      console.log("allRoles:", allRoles);
      if (!selectedDepartmentId) {
        const generalRoles = allRoles.filter((role) => !role.department_id);
        console.log("No department selected, showing general roles:", generalRoles);
        return generalRoles;
      }
      const departmentRoles = allRoles.filter((role) => role.department_id === selectedDepartmentId);
      console.log(`Department ${selectedDepartmentId} selected, showing ONLY department roles:`, departmentRoles);
      return departmentRoles;
    };
    const handleAddNewRow = () => {
      setNewRows((prev) => [...prev, { isNewRow: true }]);
    };
    o.useImperativeHandle(ref, () => ({
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
      console.log("UserDepartmentsRolesTable: Saving new row:", row);
      console.log("UserDepartmentsRolesTable: Current userRoles:", userRoles);
      console.log("UserDepartmentsRolesTable: Current userDepartments:", userDepartments);
      if (!row.departmentId && !row.roleId) {
        ue.error("Please select at least a department or role");
        return;
      }
      try {
        const pairingId = row.departmentId && row.roleId ? crypto.randomUUID() : void 0;
        console.log("UserDepartmentsRolesTable: Generated pairingId:", pairingId);
        if (row.departmentId) {
          const isDepartmentAlreadyAssigned = userDepartments.some((dept) => dept.department_id === row.departmentId);
          console.log("UserDepartmentsRolesTable: Department already assigned?", isDepartmentAlreadyAssigned);
          console.log("UserDepartmentsRolesTable: Current userDepartments:", userDepartments);
          console.log("UserDepartmentsRolesTable: Looking for departmentId:", row.departmentId);
          if (!isDepartmentAlreadyAssigned) {
            const isPrimary = userDepartments.length === 0;
            console.log("UserDepartmentsRolesTable: Adding department with isPrimary:", isPrimary);
            console.log("UserDepartmentsRolesTable: Department params:", {
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
            console.log("UserDepartmentsRolesTable: Department addition completed");
          } else {
            console.log("UserDepartmentsRolesTable: Department already assigned, skipping");
          }
        }
        if (row.roleId) {
          const isRoleAlreadyAssigned = userRoles.some((role) => role.role_id === row.roleId);
          console.log("UserDepartmentsRolesTable: Role already assigned?", isRoleAlreadyAssigned);
          console.log("UserDepartmentsRolesTable: Checking roleId", row.roleId, "against userRoles:", userRoles.map((r) => r.role_id));
          if (!isRoleAlreadyAssigned) {
            console.log("UserDepartmentsRolesTable: Adding role with roleId:", row.roleId);
            await addRoleMutation.mutateAsync({
              roleId: row.roleId,
              pairingId
            });
          }
        }
        setNewRows((prev) => prev.filter((_, i) => i !== index));
        ue.success("Assignment saved successfully");
      } catch (error) {
        console.error("Error saving assignment:", error);
        ue.error("Failed to save assignment");
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
      } catch (error) {
        ue.error("Failed to delete assignment");
      }
    };
    const handleCancelNewRow = (index) => {
      setNewRows((prev) => prev.filter((_, i) => i !== index));
    };
    const setPrimaryPairMutation = reactQuery.useMutation({
      mutationFn: async (pair) => {
        await client.supabase.from("user_departments").update({ is_primary: false }).eq("user_id", userId);
        await client.supabase.from("user_profile_roles").update({ is_primary: false }).eq("user_id", userId);
        if (pair.departmentAssignmentId) {
          const { error: deptError } = await client.supabase.from("user_departments").update({ is_primary: true }).eq("id", pair.departmentAssignmentId);
          if (deptError) throw deptError;
        }
        if (pair.roleId) {
          const { error: roleError } = await client.supabase.from("user_profile_roles").update({ is_primary: true }).eq("id", pair.roleId);
          if (roleError) throw roleError;
        }
      },
      onSuccess: () => {
        refetchUserDepartments();
        queryClient.invalidateQueries({ queryKey: ["user-roles", userId] });
        ue.success("Primary assignment updated successfully");
      },
      onError: (error) => {
        ue.error("Failed to update primary assignment: " + error.message);
      }
    });
    const tableData = createTableData();
    return /* @__PURE__ */ jsxRuntime.jsx(card.Card, { children: /* @__PURE__ */ jsxRuntime.jsx(card.CardContent, { className: "pt-6", children: /* @__PURE__ */ jsxRuntime.jsx("div", { className: "space-y-4", children: /* @__PURE__ */ jsxRuntime.jsxs(table.Table, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(table.TableHeader, { children: /* @__PURE__ */ jsxRuntime.jsxs(table.TableRow, { children: [
        /* @__PURE__ */ jsxRuntime.jsx(table.TableHead, { children: "Department" }),
        /* @__PURE__ */ jsxRuntime.jsx(table.TableHead, { children: "Role" }),
        /* @__PURE__ */ jsxRuntime.jsx(table.TableHead, { className: "w-[80px]", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsxRuntime.jsxs(table.TableBody, { children: [
        tableData.map((pair, index) => /* @__PURE__ */ jsxRuntime.jsxs(table.TableRow, { children: [
          /* @__PURE__ */ jsxRuntime.jsx(table.TableCell, { children: pair.isNewRow ? /* @__PURE__ */ jsxRuntime.jsxs(
            select.Select,
            {
              value: pair.departmentId || "",
              onValueChange: (value) => handleNewRowDepartmentChange(index - (tableData.length - newRows.length), value),
              children: [
                /* @__PURE__ */ jsxRuntime.jsx(select.SelectTrigger, { className: "w-full", children: /* @__PURE__ */ jsxRuntime.jsx(select.SelectValue, { placeholder: "Select department..." }) }),
                /* @__PURE__ */ jsxRuntime.jsxs(select.SelectContent, { className: "bg-background border z-50", children: [
                  allDepartments.map((dept) => /* @__PURE__ */ jsxRuntime.jsx(select.SelectItem, { value: dept.id, children: dept.name }, dept.id)),
                  /* @__PURE__ */ jsxRuntime.jsx(select.SelectItem, { value: "none", children: /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-muted-foreground italic", children: "Skip department" }) })
                ] })
              ]
            }
          ) : pair.departmentName ? /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntime.jsx(badge.Badge, { variant: pair.isDepartmentPrimary ? "default" : "secondary", children: pair.departmentName }),
            pair.isDepartmentPrimary && /* @__PURE__ */ jsxRuntime.jsx(Star, { className: "h-3 w-3 fill-current text-yellow-500" })
          ] }) : /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-muted-foreground italic", children: "No department" }) }),
          /* @__PURE__ */ jsxRuntime.jsx(table.TableCell, { children: pair.isNewRow ? /* @__PURE__ */ jsxRuntime.jsxs(
            select.Select,
            {
              value: pair.roleId || "",
              onValueChange: (value) => handleNewRowRoleChange(index - (tableData.length - newRows.length), value),
              children: [
                /* @__PURE__ */ jsxRuntime.jsx(select.SelectTrigger, { className: "w-full", children: /* @__PURE__ */ jsxRuntime.jsx(select.SelectValue, { placeholder: "Select role..." }) }),
                /* @__PURE__ */ jsxRuntime.jsxs(select.SelectContent, { className: "bg-background border z-50", children: [
                  getAvailableRoles(pair.departmentId).map((role) => /* @__PURE__ */ jsxRuntime.jsxs(select.SelectItem, { value: role.role_id, children: [
                    role.name,
                    role.department_id && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-xs text-muted-foreground ml-1", children: "(Dept. role)" })
                  ] }, role.role_id)),
                  /* @__PURE__ */ jsxRuntime.jsx(select.SelectItem, { value: "none", children: /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-muted-foreground italic", children: "Skip role" }) })
                ] })
              ]
            }
          ) : pair.roleName ? /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntime.jsx(badge.Badge, { variant: pair.isRolePrimary ? "default" : "secondary", children: pair.roleName }),
            pair.isRolePrimary && /* @__PURE__ */ jsxRuntime.jsx(Star, { className: "h-3 w-3 fill-current text-yellow-500" })
          ] }) : /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-muted-foreground italic", children: "No role" }) }),
          /* @__PURE__ */ jsxRuntime.jsx(table.TableCell, { children: pair.isNewRow ? /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntime.jsx(
              button.Button,
              {
                size: "sm",
                variant: "ghost",
                onClick: () => handleSaveNewRow(index - (tableData.length - newRows.length)),
                className: "h-6 w-6 p-0 hover:bg-primary hover:text-primary-foreground",
                disabled: !pair.departmentId && !pair.roleId,
                children: /* @__PURE__ */ jsxRuntime.jsx(Check, { className: "h-3 w-3" })
              }
            ),
            /* @__PURE__ */ jsxRuntime.jsx(
              button.Button,
              {
                size: "sm",
                variant: "ghost",
                onClick: () => handleCancelNewRow(index - (tableData.length - newRows.length)),
                className: "h-6 w-6 p-0 hover:bg-destructive hover:text-destructive-foreground",
                children: /* @__PURE__ */ jsxRuntime.jsx(X, { className: "h-3 w-3" })
              }
            )
          ] }) : pair.departmentName || pair.roleName ? /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntime.jsx(
              button.Button,
              {
                size: "sm",
                variant: "ghost",
                onClick: () => setPrimaryPairMutation.mutate(pair),
                disabled: setPrimaryPairMutation.isPending || pair.isDepartmentPrimary && pair.isRolePrimary,
                className: "h-6 w-6 p-0 hover:bg-yellow-500 hover:text-white",
                title: "Set as primary",
                children: /* @__PURE__ */ jsxRuntime.jsx(
                  Star,
                  {
                    className: `h-3 w-3 ${pair.isDepartmentPrimary || pair.isRolePrimary ? "fill-current text-yellow-500" : "text-muted-foreground"}`
                  }
                )
              }
            ),
            /* @__PURE__ */ jsxRuntime.jsx(
              button.Button,
              {
                size: "sm",
                variant: "ghost",
                className: "h-6 w-6 p-0 hover:bg-destructive hover:text-destructive-foreground",
                onClick: () => handleDeletePair(pair),
                children: /* @__PURE__ */ jsxRuntime.jsx(X, { className: "h-3 w-3" })
              }
            )
          ] }) : null })
        ] }, pair.id || `new-${index}`)),
        tableData.length === 0 && /* @__PURE__ */ jsxRuntime.jsx(table.TableRow, { children: /* @__PURE__ */ jsxRuntime.jsx(table.TableCell, { colSpan: 3, className: "text-center text-muted-foreground", children: "No department or role assignments" }) })
      ] })
    ] }) }) }) });
  });
  const UserDepartmentsRolesManager = o.forwardRef(
    ({ userId }, ref) => {
      const tableRef = o.useRef(null);
      o.useImperativeHandle(ref, () => ({
        handleAddNewRow: () => {
          var _a, _b;
          return (_b = (_a = tableRef.current) == null ? void 0 : _a.handleAddNewRow) == null ? void 0 : _b.call(_a);
        }
      }));
      return /* @__PURE__ */ jsxRuntime.jsx(UserDepartmentsRolesTable, { userId, ref: tableRef });
    }
  );
  const PersonaDetailsTabs = ({ profile, userId, onUpdate }) => {
    const [isAssignHardwareOpen, setIsAssignHardwareOpen] = o.useState(false);
    const [isAssignSoftwareOpen, setIsAssignSoftwareOpen] = o.useState(false);
    const [isAddEducationOpen, setIsAddEducationOpen] = o.useState(false);
    const departmentRolesRef = o.useRef(null);
    const { hasAdminAccess } = useUserRole.useUserRole();
    const handleCertificateUpdate = (certificateId, updates) => {
    };
    const handleDataChange = () => {
      onUpdate == null ? void 0 : onUpdate();
    };
    const getGridClass = () => {
      if (profile == null ? void 0 : profile.enrolled_in_learn) {
        return "grid-cols-7";
      }
      return "grid-cols-6";
    };
    return /* @__PURE__ */ jsxRuntime.jsx(card.Card, { className: "w-full", children: /* @__PURE__ */ jsxRuntime.jsxs(card.CardContent, { className: "p-6", children: [
      /* @__PURE__ */ jsxRuntime.jsxs(tabs.Tabs, { defaultValue: "departments", className: "w-full", children: [
        /* @__PURE__ */ jsxRuntime.jsxs(tabs.TabsList, { className: `grid w-full ${getGridClass()} mb-6`, children: [
          /* @__PURE__ */ jsxRuntime.jsxs(tabs.TabsTrigger, { value: "departments", className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntime.jsx(Users, { className: "h-4 w-4" }),
            /* @__PURE__ */ jsxRuntime.jsx("span", { className: "hidden sm:inline", children: "Departments & Roles" })
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
            /* @__PURE__ */ jsxRuntime.jsxs(tabs.TabsTrigger, { value: "hardware", className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntime.jsx(Laptop, { className: "h-4 w-4" }),
              /* @__PURE__ */ jsxRuntime.jsx("span", { className: "hidden sm:inline", children: "Hardware" })
            ] }),
            /* @__PURE__ */ jsxRuntime.jsxs(tabs.TabsTrigger, { value: "software", className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntime.jsx(MonitorSmartphone, { className: "h-4 w-4" }),
              /* @__PURE__ */ jsxRuntime.jsx("span", { className: "hidden sm:inline", children: "Accounts" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs(tabs.TabsTrigger, { value: "location", className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntime.jsx(MapPin, { className: "h-4 w-4" }),
            /* @__PURE__ */ jsxRuntime.jsx("span", { className: "hidden sm:inline", children: "Physical Location" })
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs(tabs.TabsTrigger, { value: "knowledge", className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntime.jsx(BookOpen, { className: "h-4 w-4" }),
            /* @__PURE__ */ jsxRuntime.jsx("span", { className: "hidden sm:inline", children: "Knowledge" })
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs(tabs.TabsTrigger, { value: "certification", className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntime.jsx(GraduationCap, { className: "h-4 w-4" }),
            /* @__PURE__ */ jsxRuntime.jsx("span", { className: "hidden sm:inline", children: "Certificates" })
          ] }),
          (profile == null ? void 0 : profile.enrolled_in_learn) && /* @__PURE__ */ jsxRuntime.jsxs(tabs.TabsTrigger, { value: "learn", className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntime.jsx(Play, { className: "h-4 w-4" }),
            /* @__PURE__ */ jsxRuntime.jsx("span", { className: "hidden sm:inline", children: "StaySecure LEARN" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs(tabs.TabsContent, { value: "departments", className: "space-y-4 animate-fade-in", children: [
          hasAdminAccess && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxRuntime.jsx(
            button.Button,
            {
              onClick: () => {
                var _a, _b;
                return (_b = (_a = departmentRolesRef.current) == null ? void 0 : _a.handleAddNewRow) == null ? void 0 : _b.call(_a);
              },
              size: "icon",
              children: /* @__PURE__ */ jsxRuntime.jsx(Plus, { className: "h-4 w-4" })
            }
          ) }),
          /* @__PURE__ */ jsxRuntime.jsx(UserDepartmentsRolesManager, { userId, ref: departmentRolesRef })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
          /* @__PURE__ */ jsxRuntime.jsxs(tabs.TabsContent, { value: "hardware", className: "space-y-4 animate-fade-in", children: [
            /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxRuntime.jsx(
              button.Button,
              {
                onClick: () => setIsAssignHardwareOpen(true),
                size: "icon",
                children: /* @__PURE__ */ jsxRuntime.jsx(Plus, { className: "h-4 w-4" })
              }
            ) }),
            /* @__PURE__ */ jsxRuntime.jsx(HardwareInventory, { profile, onUpdate: handleDataChange })
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs(tabs.TabsContent, { value: "software", className: "space-y-4 animate-fade-in", children: [
            /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxRuntime.jsx(
              button.Button,
              {
                onClick: () => setIsAssignSoftwareOpen(true),
                size: "icon",
                children: /* @__PURE__ */ jsxRuntime.jsx(Plus, { className: "h-4 w-4" })
              }
            ) }),
            /* @__PURE__ */ jsxRuntime.jsx(SoftwareAccounts, { profile })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsx(tabs.TabsContent, { value: "location", className: "space-y-4 animate-fade-in", children: /* @__PURE__ */ jsxRuntime.jsx(PhysicalLocationTab, { profile, canAdd: hasAdminAccess }) }),
        /* @__PURE__ */ jsxRuntime.jsx(tabs.TabsContent, { value: "knowledge", className: "space-y-4 animate-fade-in", children: /* @__PURE__ */ jsxRuntime.jsx(MyDocuments, { userId: profile.id }) }),
        /* @__PURE__ */ jsxRuntime.jsxs(tabs.TabsContent, { value: "certification", className: "space-y-4 animate-fade-in", children: [
          /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxRuntime.jsx(
            button.Button,
            {
              onClick: () => setIsAddEducationOpen(true),
              size: "icon",
              children: /* @__PURE__ */ jsxRuntime.jsx(Plus, { className: "h-4 w-4" })
            }
          ) }),
          /* @__PURE__ */ jsxRuntime.jsx(
            EditableCertificates,
            {
              profile,
              onUpdate: handleCertificateUpdate,
              onDataChange: handleDataChange
            }
          )
        ] }),
        (profile == null ? void 0 : profile.enrolled_in_learn) && /* @__PURE__ */ jsxRuntime.jsx(tabs.TabsContent, { value: "learn", className: "space-y-4 animate-fade-in", children: /* @__PURE__ */ jsxRuntime.jsx(LearningTracksTab, { userId: profile.id }) })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
        /* @__PURE__ */ jsxRuntime.jsx(
          AssignHardwareDialog,
          {
            isOpen: isAssignHardwareOpen,
            onOpenChange: setIsAssignHardwareOpen,
            userId: profile.id,
            onSuccess: () => {
              setIsAssignHardwareOpen(false);
              handleDataChange();
            }
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsx(
          AssignSoftwareDialog,
          {
            isOpen: isAssignSoftwareOpen,
            onOpenChange: setIsAssignSoftwareOpen,
            userId: profile.id,
            onSuccess: () => {
              setIsAssignSoftwareOpen(false);
              handleDataChange();
            }
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntime.jsx(
        AddEducationDialog,
        {
          isOpen: isAddEducationOpen,
          onOpenChange: setIsAddEducationOpen,
          userId: profile.id,
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
    const fileInputRef = o.useRef(null);
    const [uploading, setUploading] = o.useState(false);
    const initials = firstName && lastName ? firstName.charAt(0) + lastName.charAt(0) : (firstName == null ? void 0 : firstName.slice(0, 2)) || "U";
    const handleAvatarClick = () => {
      var _a;
      console.log("ProfileAvatar: Upload button clicked");
      console.log("ProfileAvatar: fileInputRef.current:", fileInputRef.current);
      console.log("ProfileAvatar: profileId:", profileId);
      console.log("ProfileAvatar: supabase:", client.supabase);
      (_a = fileInputRef.current) == null ? void 0 : _a.click();
    };
    const handleFileChange = async (event) => {
      var _a;
      console.log("ProfileAvatar: File selected:", event.target.files);
      const file = (_a = event.target.files) == null ? void 0 : _a[0];
      if (!file) {
        console.log("ProfileAvatar: No file selected");
        return;
      }
      console.log("ProfileAvatar: Processing file:", file.name, file.type, file.size);
      const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
      if (!validTypes.includes(file.type)) {
        useToast.toast({
          title: "Invalid file type",
          description: "Please upload an image (JPEG, PNG, GIF, or WebP)",
          variant: "destructive"
        });
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        useToast.toast({
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
              await client.supabase.storage.from("avatars").remove([oldFilePath]);
            }
          } catch (error2) {
            console.warn("Could not delete old avatar:", error2);
          }
        }
        const { data, error } = await client.supabase.storage.from("avatars").upload(fileName, file, {
          cacheControl: "3600",
          upsert: false
        });
        if (error) {
          console.error("Storage upload error:", error);
          throw error;
        }
        const { data: urlData } = client.supabase.storage.from("avatars").getPublicUrl(fileName);
        if (profileId) {
          const { error: updateError } = await client.supabase.from("profiles").update({ avatar_url: urlData.publicUrl }).eq("id", profileId);
          if (updateError) {
            console.error("Profile update error:", updateError);
            throw updateError;
          }
        }
        if (onAvatarUpdate) {
          console.log("ProfileAvatar: Calling onAvatarUpdate with:", urlData.publicUrl);
          onAvatarUpdate(urlData.publicUrl);
          console.log("ProfileAvatar: onAvatarUpdate called");
        } else {
          console.warn("ProfileAvatar: onAvatarUpdate callback not provided");
        }
        useToast.toast({
          title: "Avatar uploaded",
          description: "Your avatar has been updated successfully"
        });
      } catch (error) {
        console.error("Error uploading avatar:", error);
        const errorMessage = (error == null ? void 0 : error.message) || "Failed to upload avatar. Please try again.";
        useToast.toast({
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
    return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntime.jsxs(avatar.Avatar, { className: "h-24 w-24 border-2 border-primary", children: [
        /* @__PURE__ */ jsxRuntime.jsx(avatar.AvatarImage, { src: avatarUrl, alt: `${firstName} ${lastName}` }, avatarUrl),
        /* @__PURE__ */ jsxRuntime.jsx(avatar.AvatarFallback, { className: "text-2xl", children: initials })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsx(
        "input",
        {
          ref: fileInputRef,
          type: "file",
          accept: "image/jpeg,image/png,image/gif,image/webp",
          onChange: handleFileChange,
          className: "hidden"
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsx(
        button.Button,
        {
          size: "sm",
          variant: "outline",
          className: "absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0",
          onClick: handleAvatarClick,
          disabled: uploading || !profileId,
          children: uploading ? /* @__PURE__ */ jsxRuntime.jsx(LoaderCircle, { className: "h-3 w-3 animate-spin" }) : /* @__PURE__ */ jsxRuntime.jsx(Upload, { className: "h-3 w-3" })
        }
      )
    ] });
  };
  const UserRoleField = ({ userId }) => {
    const [isEditing, setIsEditing] = o.useState(false);
    const { role, isLoading, updateRole, isUpdating, getRoleDisplayName, getRoleBadgeVariant } = useUserRoleById.useUserRoleById(userId);
    const { hasAdminAccess } = useUserRole.useUserRole();
    const roleOptions = [
      { value: "user", label: "User" },
      { value: "author", label: "Author" },
      { value: "manager", label: "Manager" },
      { value: "client_admin", label: "Administrator" },
      { value: "super_admin", label: "Super Administrator" }
    ];
    if (isLoading) {
      return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntime.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
        /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-sm text-muted-foreground", children: "Loading role..." })
      ] });
    }
    const handleRoleChange = async (newRole) => {
      await updateRole(newRole);
      setIsEditing(false);
    };
    if (!isEditing) {
      return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntime.jsx(Key, { className: "h-4 w-4 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntime.jsx(
          badge.Badge,
          {
            variant: getRoleBadgeVariant(role),
            className: `text-sm ${hasAdminAccess ? "cursor-pointer hover:bg-muted/50 px-2 py-1 rounded transition-colors" : ""}`,
            onClick: () => hasAdminAccess && setIsEditing(true),
            children: getRoleDisplayName(role)
          }
        )
      ] });
    }
    return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntime.jsx(Key, { className: "h-4 w-4 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntime.jsxs(
        select.Select,
        {
          value: role || "user",
          onValueChange: (value) => handleRoleChange(value),
          disabled: isUpdating,
          open: isEditing,
          onOpenChange: setIsEditing,
          children: [
            /* @__PURE__ */ jsxRuntime.jsx(select.SelectTrigger, { className: "w-48 h-8 text-sm", children: /* @__PURE__ */ jsxRuntime.jsx(select.SelectValue, {}) }),
            /* @__PURE__ */ jsxRuntime.jsx(select.SelectContent, { className: "z-50", children: roleOptions.map((option) => /* @__PURE__ */ jsxRuntime.jsx(select.SelectItem, { value: option.value, children: option.label }, option.value)) })
          ]
        }
      ),
      isUpdating && /* @__PURE__ */ jsxRuntime.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" })
    ] });
  };
  const ProfileContactInfo = ({
    startDate,
    userId,
    status,
    accessLevel,
    lastLogin,
    passwordLastChanged,
    twoFactorEnabled
  }) => {
    const formatDate = (dateString) => {
      if (!dateString) return "Not set";
      return new Date(dateString).toLocaleDateString();
    };
    const formatDateAndTime = (dateString) => {
      if (!dateString) return "Never";
      return new Date(dateString).toLocaleString();
    };
    return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex flex-col items-end space-y-3 ml-auto", children: [
      /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
        /* @__PURE__ */ jsxRuntime.jsx(Shield, { className: "h-4 w-4 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntime.jsx(badge.Badge, { variant: status === "Active" ? "default" : "secondary", children: status || "Active" })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex items-center justify-end gap-2 text-sm", children: /* @__PURE__ */ jsxRuntime.jsx(UserRoleField, { userId }) }),
      /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
        /* @__PURE__ */ jsxRuntime.jsx(Calendar, { className: "h-4 w-4 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntime.jsxs("span", { children: [
          "Started ",
          formatDate(startDate)
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
        /* @__PURE__ */ jsxRuntime.jsx(Clock, { className: "h-4 w-4 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntime.jsxs("span", { children: [
          "Last login: ",
          lastLogin ? formatDateAndTime(lastLogin) : "Never"
        ] })
      ] })
    ] });
  };
  const EditableProfileHeader = ({
    profile,
    onProfileUpdate,
    isReadOnly = false,
    onOptimisticUpdate
  }) => {
    var _a, _b, _c, _d, _e, _f, _g;
    const { profiles, updateProfile } = useUserProfiles.useUserProfiles();
    const [editingField, setEditingField] = o.useState(null);
    const [saving, setSaving] = o.useState(false);
    const [managerValue, setManagerValue] = o.useState(profile.manager || "");
    const handleFieldEdit = (field) => {
      setEditingField(field);
    };
    const handleFieldSave = async (field, value) => {
      try {
        setSaving(true);
        let updateData = {};
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
        }
        if (!profile.id) {
          console.error("Profile ID is undefined. Profile object:", profile);
          useToast.toast({
            title: "Error",
            description: "Profile ID is missing. Cannot update profile.",
            variant: "destructive"
          });
          return;
        }
        await updateProfile(profile.id, updateData);
        useToast.toast({
          title: "Profile updated",
          description: "Your profile has been successfully updated."
        });
        setEditingField(null);
        if (onOptimisticUpdate) {
          onOptimisticUpdate(field, value);
        }
        onProfileUpdate();
      } catch (error) {
        console.error("Save error:", error);
        useToast.toast({
          title: "Error",
          description: error.message || "Failed to update profile",
          variant: "destructive"
        });
      } finally {
        setSaving(false);
      }
    };
    const handleFieldCancel = () => {
      setEditingField(null);
    };
    const handleNameChange = async (field, value) => {
      var _a2;
      try {
        setSaving(true);
        const updateData = {};
        if (field === "firstName") {
          updateData.first_name = value;
        } else {
          updateData.last_name = value;
        }
        if (profile.full_name === "" || ((_a2 = profile.full_name) == null ? void 0 : _a2.trim()) === "") {
          const firstName = field === "firstName" ? value : profile.firstName || "";
          const lastName = field === "lastName" ? value : profile.lastName || "";
          updateData.full_name = `${firstName} ${lastName}`.trim();
        }
        await updateProfile(profile.id, updateData);
        useToast.toast({
          title: "Profile updated",
          description: "Your profile has been successfully updated."
        });
        setEditingField(null);
        if (onOptimisticUpdate) {
          onOptimisticUpdate(field, value);
          if (updateData.full_name) {
            onOptimisticUpdate("full_name", updateData.full_name);
          }
        }
        onProfileUpdate();
      } catch (error) {
        useToast.toast({
          title: "Error",
          description: error.message || "Failed to update profile",
          variant: "destructive"
        });
      } finally {
        setSaving(false);
      }
    };
    const handleFullNameChange = async (value) => {
      await handleFieldSave("full_name", value);
    };
    const filteredProfiles = profiles.filter((user) => user.id !== profile.id);
    const managerProfile = profiles.find((u) => u.id === profile.manager);
    const managerName = managerProfile ? managerProfile.full_name || managerProfile.username : "Not assigned";
    const { userDepartments } = useUserDepartments.useUserDepartments(profile.id);
    const { primaryRole } = useUserProfileRoles.useUserProfileRoles(profile.id);
    const { data: physicalLocations, isLoading: locationsLoading } = useUserPhysicalLocations.useUserPhysicalLocations(profile.id);
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
    return /* @__PURE__ */ jsxRuntime.jsx(card.Card, { className: "w-full", children: /* @__PURE__ */ jsxRuntime.jsx(card.CardContent, { className: "p-6 lg:p-8", children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-3", children: [
      /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex justify-center md:justify-start", children: /* @__PURE__ */ jsxRuntime.jsx(
        ProfileAvatar,
        {
          avatarUrl: profile.avatar || profile.avatar_url,
          firstName: profile.firstName || profile.first_name || "",
          lastName: profile.lastName || profile.last_name || "",
          profileId: profile.id,
          onAvatarUpdate: (newAvatarUrl) => {
            console.log("EditableProfileHeader: onAvatarUpdate called with:", newAvatarUrl);
            console.log("EditableProfileHeader: onProfileUpdate type:", typeof onProfileUpdate);
            console.log("EditableProfileHeader: onProfileUpdate value:", onProfileUpdate);
            if (onOptimisticUpdate) {
              console.log("EditableProfileHeader: Calling onOptimisticUpdate");
              onOptimisticUpdate("avatar_url", newAvatarUrl);
            }
            console.log("EditableProfileHeader: Calling onProfileUpdate");
            if (onProfileUpdate && typeof onProfileUpdate === "function") {
              try {
                console.log("EditableProfileUpdate: About to invoke onProfileUpdate, function name:", onProfileUpdate.name);
                const result = onProfileUpdate();
                console.log("EditableProfileHeader: onProfileUpdate returned:", result);
                if (result && typeof result.then === "function") {
                  console.log("EditableProfileHeader: onProfileUpdate returned a promise, waiting...");
                  result.then(() => {
                    console.log("EditableProfileHeader: onProfileUpdate promise resolved");
                  }).catch((err) => {
                    console.error("EditableProfileHeader: onProfileUpdate promise rejected:", err);
                  });
                }
                console.log("EditableProfileHeader: onProfileUpdate called successfully");
              } catch (error) {
                console.error("EditableProfileHeader: Error calling onProfileUpdate:", error);
              }
            } else {
              console.error("EditableProfileHeader: onProfileUpdate is not a function!", onProfileUpdate);
            }
          }
        }
      ) }),
      /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "text-center sm:text-left space-y-2", children: [
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
            /* @__PURE__ */ jsxRuntime.jsx(
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
            /* @__PURE__ */ jsxRuntime.jsx(
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
          /* @__PURE__ */ jsxRuntime.jsx(
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
        ((_a = profile.account) == null ? void 0 : _a.username) && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntime.jsx(User, { className: "h-4 w-4 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-foreground", children: profile.account.username })
        ] }),
        ((_b = profile.account) == null ? void 0 : _b.employeeId) && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntime.jsx(Hash, { className: "h-4 w-4 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-foreground", children: profile.account.employeeId })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntime.jsx(Phone, { className: "h-4 w-4 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntime.jsx(
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
      /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntime.jsx(Network, { className: "h-4 w-4 text-muted-foreground" }),
          editingField === "manager" ? /* @__PURE__ */ jsxRuntime.jsxs(
            select.Select,
            {
              value: managerValue,
              onValueChange: handleManagerChange,
              children: [
                /* @__PURE__ */ jsxRuntime.jsx(select.SelectTrigger, { className: "w-full", children: /* @__PURE__ */ jsxRuntime.jsx(select.SelectValue, { placeholder: "Select manager" }) }),
                /* @__PURE__ */ jsxRuntime.jsx(select.SelectContent, { children: filteredProfiles.map((user) => /* @__PURE__ */ jsxRuntime.jsx(select.SelectItem, { value: user.id, children: user.full_name || user.username || "Unnamed User" }, user.id)) })
              ]
            }
          ) : /* @__PURE__ */ jsxRuntime.jsx(
            EditableField,
            {
              value: managerName,
              fieldKey: "manager",
              onSave: handleFieldSave,
              isEditing: editingField === "manager",
              onEdit: handleFieldEdit,
              onCancel: handleFieldCancel,
              saving,
              inputClassName: "text-sm h-6"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntime.jsx(MapPin, { className: "h-4 w-4 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntime.jsx(
            EditableField,
            {
              value: profile.location || "Not specified",
              fieldKey: "location",
              placeholder: "Select location",
              onSave: handleFieldSave,
              onSelectChange: handleLocationSelect,
              isEditing: editingField === "location",
              onEdit: handleFieldEdit,
              onCancel: handleFieldCancel,
              saving,
              type: "select",
              asyncOptions: physicalLocations,
              isLoading: locationsLoading,
              inputClassName: "h-6 text-sm w-48",
              locationId: profile.locationId
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-4 w-full", children: [
          /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsxRuntime.jsx(Star, { className: "h-3 w-3 fill-current text-yellow-500" }) }),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-2", children: [
            primaryDepartment && /* @__PURE__ */ jsxRuntime.jsx(badge.Badge, { variant: "default", children: primaryDepartment.department_name }),
            primaryRole && /* @__PURE__ */ jsxRuntime.jsx(badge.Badge, { variant: "default", children: primaryRole.role_name })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsx("div", { className: "space-y-2", children: /* @__PURE__ */ jsxRuntime.jsx(
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
      ) })
    ] }) }) });
  };
  const PersonaProfile = () => {
    const { user, signOut } = staysecureAuth.useAuth();
    const { hasAdminAccess } = useUserRole.useUserRole();
    const { profile, loading: profileLoading, refetch: refetchProfile } = useProfile.useProfile();
    const { hardware, software, certificates, loading: assetsLoading, refetch: refetchAssets } = useUserAssets.useUserAssets(user == null ? void 0 : user.id);
    const userEmail = user == null ? void 0 : user.email;
    const [optimisticData, setOptimisticData] = o.useState(null);
    const personaData = o.useMemo(() => ({
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
      account: {
        username: (profile == null ? void 0 : profile.username) || "Not set",
        employeeId: (profile == null ? void 0 : profile.employee_id) || "Not assigned",
        status: (profile == null ? void 0 : profile.status) || "Active",
        accessLevel: (profile == null ? void 0 : profile.access_level) || "User",
        lastLogin: (profile == null ? void 0 : profile.last_login) || (profile == null ? void 0 : profile.created_at) || "",
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
      certificates: (certificates || []).map((c) => {
        const mapped = {
          name: c.name,
          issuedBy: c.issued_by,
          dateAcquired: c.date_acquired,
          expiryDate: c.expiry_date,
          credentialId: c.credential_id,
          status: c.status,
          org_cert: c.org_cert !== void 0 ? c.org_cert : false,
          // Preserve false, default to false if undefined
          type: c.type
          // Include type for display
        };
        return mapped;
      })
    }), [profile, hardware, software, certificates, userEmail]);
    const handleProfileUpdate = async () => {
      console.log("PersonaProfile: handleProfileUpdate called");
      setOptimisticData(null);
      console.log("PersonaProfile: Cleared optimistic data, refetching profile...");
      await refetchProfile();
      console.log("PersonaProfile: Profile refetched");
      refetchAssets();
      console.log("PersonaProfile: Assets refetch triggered");
    };
    if (profileLoading || assetsLoading) {
      return /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex items-center justify-center min-h-screen", children: /* @__PURE__ */ jsxRuntime.jsx(LoaderCircle, { className: "h-8 w-8 animate-spin" }) });
    }
    if (!profile) {
      return /* @__PURE__ */ jsxRuntime.jsx("div", { className: "text-center py-8", children: /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-muted-foreground", children: "No profile found. Please update your profile information." }) });
    }
    const handleOptimisticUpdate = (field, value) => {
      setOptimisticData((prev) => {
        const baseData = prev || personaData;
        const updated = { ...baseData };
        if (field === "avatar_url") {
          updated.avatar = value;
        } else if (field in updated) {
          updated[field] = value;
        } else if (updated.account && field in updated.account) {
          updated.account = { ...updated.account, [field]: value };
        }
        return updated;
      });
    };
    const displayData = optimisticData || personaData;
    return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-6", children: [
      !hasAdminAccess && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex justify-between items-center", children: /* @__PURE__ */ jsxRuntime.jsx("h1", { className: "text-3xl font-bold", children: "My Profile" }) }),
      /* @__PURE__ */ jsxRuntime.jsx(EditableProfileHeader, { profile: displayData, onProfileUpdate: handleProfileUpdate, onOptimisticUpdate: handleOptimisticUpdate }),
      /* @__PURE__ */ jsxRuntime.jsx(PersonaDetailsTabs, { profile: displayData, userId: (user == null ? void 0 : user.id) || "", onUpdate: handleProfileUpdate })
    ] });
  };
  const UserDetailView = () => {
    const { userId } = reactRouterDom.useParams();
    const navigate = reactRouterDom.useNavigate();
    const { profiles, loading: profilesLoading } = useUserProfiles.useUserProfiles();
    const { hardware, software, certificates, loading: assetsLoading } = useUserAssets.useUserAssets(userId);
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
      enrolled_in_learn: profileObj.enrolled_in_learn || false,
      account: {
        username: profileObj.username || "Not set",
        employeeId: profileObj.employee_id || "Not assigned",
        status: profileObj.status || "Active",
        accessLevel: profileObj.access_level || "User",
        lastLogin: profileObj.last_login || profileObj.created_at,
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
        type: c.type || "Certificate",
        name: c.name,
        issuedBy: c.issued_by,
        dateAcquired: c.date_acquired,
        expiryDate: c.expiry_date,
        credentialId: c.credential_id,
        status: c.status,
        org_cert: c.org_cert
      }))
    });
    const [personaData, setPersonaData] = o.useState(null);
    o.useEffect(() => {
      const userProfile2 = profiles.find((p) => p.id === userId);
      if (userProfile2) {
        setPersonaData(buildPersonaData(userProfile2));
      }
    }, [profiles, userId, hardware, software, certificates]);
    const handleOptimisticUpdate = (field, value) => {
      setPersonaData((prev) => {
        const updated = { ...prev };
        if (field in updated) {
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
      navigate("/admin", { state: { activeTab: "organisation" } });
    };
    if (profilesLoading || assetsLoading) {
      return /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex items-center justify-center min-h-screen", children: /* @__PURE__ */ jsxRuntime.jsx(LoaderCircle, { className: "h-8 w-8 animate-spin" }) });
    }
    const userProfile = profiles.find((p) => p.id === userId);
    if (!userProfile) {
      return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex flex-col items-center justify-center min-h-screen gap-4", children: [
        /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-muted-foreground", children: "User not found" }),
        /* @__PURE__ */ jsxRuntime.jsxs(button.Button, { onClick: () => navigate("/admin"), variant: "outline", children: [
          /* @__PURE__ */ jsxRuntime.jsx(ArrowLeft, { className: "h-4 w-4 mr-2" }),
          "Back to Admin"
        ] })
      ] });
    }
    if (!personaData) {
      return /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex items-center justify-center min-h-screen", children: /* @__PURE__ */ jsxRuntime.jsx(LoaderCircle, { className: "h-8 w-8 animate-spin" }) });
    }
    return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "max-w-6xl mx-auto py-6 px-4 space-y-6", children: [
      /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-4 mb-6", children: [
        /* @__PURE__ */ jsxRuntime.jsx(button.Button, { onClick: handleBackToUsers, variant: "outline", size: "icon", children: /* @__PURE__ */ jsxRuntime.jsx(ArrowLeft, { className: "h-4 w-4" }) }),
        /* @__PURE__ */ jsxRuntime.jsxs("h1", { className: "text-2xl font-bold", children: [
          "User Profile: ",
          userProfile.full_name || "Unnamed User"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsx(
        EditableProfileHeader,
        {
          profile: personaData,
          onProfileUpdate: handleProfileUpdate,
          onOptimisticUpdate: handleOptimisticUpdate
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsx(PersonaDetailsTabs, { profile: personaData, userId })
    ] });
  };
  const Certificates = ({ profile }) => {
    const { certificates } = profile;
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
      return type === "Document" ? /* @__PURE__ */ jsxRuntime.jsx(FileText, { className: "h-5 w-5 text-primary flex-shrink-0" }) : /* @__PURE__ */ jsxRuntime.jsx(Award, { className: "h-5 w-5 text-primary flex-shrink-0" });
    };
    const getTypeColor = (type) => {
      return type === "Document" ? "bg-blue-500" : "bg-purple-500";
    };
    const filteredCertificates = certificates.filter(
      (cert) => cert.org_cert === false
    );
    return /* @__PURE__ */ jsxRuntime.jsx("div", { className: "space-y-4 animate-fade-in", children: filteredCertificates.length === 0 ? /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-muted-foreground text-center py-8", children: "No certificates yet" }) : /* @__PURE__ */ jsxRuntime.jsx("div", { className: "space-y-4", children: filteredCertificates.map((cert, index) => /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "border rounded-lg p-4", children: [
      /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center justify-between gap-3 mb-3", children: [
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-3 min-w-0 flex-1", children: [
          getTypeIcon(cert.type),
          /* @__PURE__ */ jsxRuntime.jsx("h3", { className: "font-semibold text-lg truncate", children: cert.name })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntime.jsx(Building, { className: "h-4 w-4 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-base font-medium text-foreground", children: cert.issuedBy })
          ] }),
          cert.credentialId && /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "text-base font-medium text-muted-foreground", children: [
            "ID: ",
            cert.credentialId
          ] }),
          /* @__PURE__ */ jsxRuntime.jsx(badge.Badge, { className: `${getTypeColor(cert.type)} text-white text-sm px-2 py-1 flex-shrink-0`, children: cert.type || "Certificate" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "grid grid-cols-3 gap-4 text-sm ml-8", children: [
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntime.jsx(Calendar, { className: "h-4 w-4 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-muted-foreground", children: "Issued:" }),
          /* @__PURE__ */ jsxRuntime.jsx("span", { className: "font-medium", children: formatDate(cert.dateAcquired) })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntime.jsx(Calendar, { className: "h-4 w-4 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-muted-foreground", children: "Expires:" }),
          /* @__PURE__ */ jsxRuntime.jsx("span", { className: "font-medium", children: formatDate(cert.expiryDate) })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex items-center justify-end", children: /* @__PURE__ */ jsxRuntime.jsx(badge.Badge, { className: `${getStatusColor(cert.status)} text-white`, children: cert.status }) })
      ] })
    ] }, index)) }) });
  };
  const AddPhysicalLocationDialog = ({
    isOpen,
    onOpenChange,
    prefilledUser,
    onSuccess
  }) => {
    const [loading, setLoading] = o.useState(false);
    const [selectedUserId, setSelectedUserId] = o.useState("");
    const { profiles } = useUserProfiles.useUserProfiles();
    const [formData, setFormData] = o.useState({
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
        const { error } = await client.supabase.from("physical_location_access").insert([insertData]);
        if (error) throw error;
        useToast.toast({
          title: "Physical location access added",
          description: formData.full_name === "Unassigned" ? "Location access record created without user assignment." : "Physical location access has been successfully added."
        });
        onOpenChange(false);
        resetForm();
        onSuccess == null ? void 0 : onSuccess();
      } catch (error) {
        useToast.toast({
          title: "Error",
          description: error.message,
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    return /* @__PURE__ */ jsxRuntime.jsx(dialog.Dialog, { open: isOpen, onOpenChange, children: /* @__PURE__ */ jsxRuntime.jsxs(dialog.DialogContent, { className: "max-w-2xl max-h-[80vh] overflow-y-auto", children: [
      /* @__PURE__ */ jsxRuntime.jsx(dialog.DialogHeader, { children: /* @__PURE__ */ jsxRuntime.jsx(dialog.DialogTitle, { children: "Add Physical Location Access" }) }),
      /* @__PURE__ */ jsxRuntime.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          !prefilledUser && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "col-span-2", children: [
            /* @__PURE__ */ jsxRuntime.jsx(label.Label, { htmlFor: "user_select", children: "Assign to User (Optional)" }),
            /* @__PURE__ */ jsxRuntime.jsxs(select.Select, { value: selectedUserId, onValueChange: handleUserSelection, children: [
              /* @__PURE__ */ jsxRuntime.jsx(select.SelectTrigger, { children: /* @__PURE__ */ jsxRuntime.jsx(select.SelectValue, { placeholder: "Select a user or create without assignment" }) }),
              /* @__PURE__ */ jsxRuntime.jsxs(select.SelectContent, { children: [
                /* @__PURE__ */ jsxRuntime.jsx(select.SelectItem, { value: "none", children: "Create without user assignment" }),
                profiles.map((profile) => /* @__PURE__ */ jsxRuntime.jsxs(select.SelectItem, { value: profile.id, children: [
                  profile.full_name || "No name",
                  " (",
                  profile.email || profile.username || "No email",
                  ")"
                ] }, profile.id))
              ] })
            ] })
          ] }),
          selectedUserId && selectedUserId !== "none" && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "col-span-2 p-3 bg-gray-50 rounded-lg", children: [
            /* @__PURE__ */ jsxRuntime.jsx("h4", { className: "font-medium mb-2", children: "Selected User Details:" }),
            /* @__PURE__ */ jsxRuntime.jsxs("p", { children: [
              /* @__PURE__ */ jsxRuntime.jsx("strong", { children: "Name:" }),
              " ",
              formData.full_name
            ] }),
            /* @__PURE__ */ jsxRuntime.jsxs("p", { children: [
              /* @__PURE__ */ jsxRuntime.jsx("strong", { children: "Email:" }),
              " ",
              formData.email
            ] }),
            /* @__PURE__ */ jsxRuntime.jsxs("p", { children: [
              /* @__PURE__ */ jsxRuntime.jsx("strong", { children: "Department:" }),
              " ",
              formData.department || "Not specified"
            ] }),
            /* @__PURE__ */ jsxRuntime.jsxs("p", { children: [
              /* @__PURE__ */ jsxRuntime.jsx("strong", { children: "Role:" }),
              " ",
              formData.role_account_type || "Not specified"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntime.jsx(label.Label, { htmlFor: "full_name", children: "Full Name" }),
            /* @__PURE__ */ jsxRuntime.jsx(
              input.Input,
              {
                id: "full_name",
                value: formData.full_name,
                onChange: (e) => setFormData({ ...formData, full_name: e.target.value }),
                placeholder: "Leave empty for unassigned",
                disabled: !!prefilledUser || selectedUserId && selectedUserId !== "none"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntime.jsx(label.Label, { htmlFor: "email", children: "Email" }),
            /* @__PURE__ */ jsxRuntime.jsx(
              input.Input,
              {
                id: "email",
                value: formData.email,
                onChange: (e) => setFormData({ ...formData, email: e.target.value }),
                placeholder: "Leave empty for unassigned",
                disabled: !!prefilledUser || selectedUserId && selectedUserId !== "none"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntime.jsx(label.Label, { htmlFor: "department", children: "Department" }),
            /* @__PURE__ */ jsxRuntime.jsx(
              input.Input,
              {
                id: "department",
                value: formData.department,
                onChange: (e) => setFormData({ ...formData, department: e.target.value }),
                disabled: !!prefilledUser || selectedUserId && selectedUserId !== "none"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntime.jsx(label.Label, { htmlFor: "role_account_type", children: "Role/Account Type" }),
            /* @__PURE__ */ jsxRuntime.jsx(
              input.Input,
              {
                id: "role_account_type",
                value: formData.role_account_type,
                onChange: (e) => setFormData({ ...formData, role_account_type: e.target.value }),
                disabled: !!prefilledUser || selectedUserId && selectedUserId !== "none"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntime.jsx(label.Label, { htmlFor: "location", children: "Location *" }),
            /* @__PURE__ */ jsxRuntime.jsx(
              input.Input,
              {
                id: "location",
                value: formData.location,
                onChange: (e) => setFormData({ ...formData, location: e.target.value }),
                placeholder: "e.g., Building A - Floor 3, Server Room",
                required: true
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntime.jsx(label.Label, { htmlFor: "access_purpose", children: "Access Purpose *" }),
            /* @__PURE__ */ jsxRuntime.jsx(
              input.Input,
              {
                id: "access_purpose",
                value: formData.access_purpose,
                onChange: (e) => setFormData({ ...formData, access_purpose: e.target.value }),
                placeholder: "e.g., Maintenance, Security, Operations",
                required: true
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntime.jsx(label.Label, { htmlFor: "date_access_created", children: "Date Access Created *" }),
            /* @__PURE__ */ jsxRuntime.jsx(
              input.Input,
              {
                id: "date_access_created",
                type: "date",
                value: formData.date_access_created,
                onChange: (e) => setFormData({ ...formData, date_access_created: e.target.value }),
                required: true
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntime.jsx(label.Label, { htmlFor: "date_access_revoked", children: "Date Access Revoked" }),
            /* @__PURE__ */ jsxRuntime.jsx(
              input.Input,
              {
                id: "date_access_revoked",
                type: "date",
                value: formData.date_access_revoked,
                onChange: (e) => setFormData({ ...formData, date_access_revoked: e.target.value })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "col-span-2", children: [
            /* @__PURE__ */ jsxRuntime.jsx(label.Label, { htmlFor: "status", children: "Status" }),
            /* @__PURE__ */ jsxRuntime.jsxs(select.Select, { value: formData.status, onValueChange: (value) => setFormData({ ...formData, status: value }), children: [
              /* @__PURE__ */ jsxRuntime.jsx(select.SelectTrigger, { children: /* @__PURE__ */ jsxRuntime.jsx(select.SelectValue, {}) }),
              /* @__PURE__ */ jsxRuntime.jsxs(select.SelectContent, { children: [
                /* @__PURE__ */ jsxRuntime.jsx(select.SelectItem, { value: "Active", children: "Active" }),
                /* @__PURE__ */ jsxRuntime.jsx(select.SelectItem, { value: "Inactive", children: "Inactive" }),
                /* @__PURE__ */ jsxRuntime.jsx(select.SelectItem, { value: "Revoked", children: "Revoked" })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex gap-2 justify-end", children: [
          /* @__PURE__ */ jsxRuntime.jsx(button.Button, { type: "button", variant: "outline", onClick: () => onOpenChange(false), size: "icon", children: /* @__PURE__ */ jsxRuntime.jsx(X, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsxRuntime.jsx(button.Button, { type: "submit", disabled: loading, size: "icon", children: loading ? /* @__PURE__ */ jsxRuntime.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntime.jsx(Plus, { className: "h-4 w-4" }) })
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
    console.log("ProfileBasicInfo rendering with userId:", userId, "currentUserId:", currentUserId);
    const { userDepartments } = useUserDepartments.useUserDepartments(userId);
    const { primaryRole } = useUserProfileRoles.useUserProfileRoles(userId);
    const { data: physicalLocations, isLoading: locationsLoading } = useUserPhysicalLocations.useUserPhysicalLocations(userId);
    const primaryDepartment = userDepartments.find((dept) => dept.is_primary);
    const handleNameSave = async (fieldKey, value) => {
      await onSave("full_name", value);
    };
    const [managerValue, setManagerValue] = o.useState(manager);
    o.useEffect(() => {
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
    return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex-1", children: [
      /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex items-center gap-2 mb-4", children: /* @__PURE__ */ jsxRuntime.jsx(
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
      /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 lg:gap-12 w-full", children: [
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-2 w-full", children: [
          username && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
            /* @__PURE__ */ jsxRuntime.jsx(User, { className: "h-4 w-4 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-foreground", children: username })
          ] }),
          employeeId && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
            /* @__PURE__ */ jsxRuntime.jsx(Hash, { className: "h-4 w-4 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-foreground", children: employeeId })
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
            /* @__PURE__ */ jsxRuntime.jsx(Phone, { className: "h-4 w-4 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntime.jsx(
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
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-2 w-full", children: [
          editingField === "manager" ? /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-sm text-muted-foreground", children: "Reports to:" }),
            /* @__PURE__ */ jsxRuntime.jsxs(
              select.Select,
              {
                value: managerValue,
                onValueChange: handleManagerChange,
                children: [
                  /* @__PURE__ */ jsxRuntime.jsx(select.SelectTrigger, { className: "w-full", children: /* @__PURE__ */ jsxRuntime.jsx(select.SelectValue, { placeholder: "Select manager" }) }),
                  /* @__PURE__ */ jsxRuntime.jsx(select.SelectContent, { children: filteredProfiles.map((user) => /* @__PURE__ */ jsxRuntime.jsx(select.SelectItem, { value: user.id, children: user.full_name || user.username || "Unnamed User" }, user.id)) })
                ]
              }
            )
          ] }) : /* @__PURE__ */ jsxRuntime.jsx(
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
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
            /* @__PURE__ */ jsxRuntime.jsx(MapPin, { className: "h-4 w-4 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntime.jsx(
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
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
            /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-muted-foreground", children: "System Role:" }),
            /* @__PURE__ */ jsxRuntime.jsx(UserRoleField, { userId })
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-4 w-full", children: [
            primaryDepartment && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntime.jsx(Star, { className: "h-3 w-3 fill-current text-yellow-500" }),
              /* @__PURE__ */ jsxRuntime.jsx(badge.Badge, { variant: "default", children: primaryDepartment.department_name })
            ] }),
            primaryRole && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntime.jsx(Star, { className: "h-3 w-3 fill-current text-yellow-500" }),
              /* @__PURE__ */ jsxRuntime.jsx(badge.Badge, { variant: "default", children: primaryRole.role_name })
            ] })
          ] })
        ] })
      ] })
    ] });
  };
  const MultipleRolesField = ({
    userId,
    departmentValue,
    isEditing,
    onEdit,
    onCancel
  }) => {
    const [isAddingRole, setIsAddingRole] = o.useState(false);
    const [selectedRole, setSelectedRole] = o.useState("");
    const queryClient = reactQuery.useQueryClient();
    const { data: userRoles, isLoading: rolesLoading } = reactQuery.useQuery({
      queryKey: ["user-roles", userId],
      queryFn: async () => {
        const { data, error } = await client.supabase.from("user_profile_roles").select(`
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
    const { data: availableRoles } = reactQuery.useQuery({
      queryKey: ["available-roles", departmentValue],
      queryFn: async () => {
        let query = client.supabase.from("roles").select("role_id, name, department_id, departments(name)").eq("is_active", true);
        if (departmentValue && departmentValue !== "") {
          const { data: department } = await client.supabase.from("departments").select("id").eq("name", departmentValue).maybeSingle();
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
    const addRoleMutation = reactQuery.useMutation({
      mutationFn: async ({ roleId, isPrimary }) => {
        const { error } = await client.supabase.from("user_profile_roles").insert({
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
        useToast.toast({
          title: "Role added",
          description: "The role has been successfully added."
        });
      },
      onError: (error) => {
        useToast.toast({
          title: "Error",
          description: error.message || "Failed to add role",
          variant: "destructive"
        });
      }
    });
    const removeRoleMutation = reactQuery.useMutation({
      mutationFn: async (roleId) => {
        const { error } = await client.supabase.from("user_profile_roles").delete().eq("id", roleId);
        if (error) throw error;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["user-roles", userId] });
        useToast.toast({
          title: "Role removed",
          description: "The role has been successfully removed."
        });
      },
      onError: (error) => {
        useToast.toast({
          title: "Error",
          description: error.message || "Failed to remove role",
          variant: "destructive"
        });
      }
    });
    const setPrimaryRoleMutation = reactQuery.useMutation({
      mutationFn: async (roleId) => {
        await client.supabase.from("user_profile_roles").update({ is_primary: false }).eq("user_id", userId);
        const { error } = await client.supabase.from("user_profile_roles").update({ is_primary: true }).eq("id", roleId);
        if (error) throw error;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["user-roles", userId] });
        useToast.toast({
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
      return /* @__PURE__ */ jsxRuntime.jsx("div", { className: "text-sm text-muted-foreground", children: "Loading roles..." });
    }
    return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
        userRoles == null ? void 0 : userRoles.map((userRole) => /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntime.jsxs(
            badge.Badge,
            {
              variant: userRole.is_primary ? "default" : "secondary",
              className: "flex items-center gap-1",
              children: [
                userRole.role_name,
                userRole.is_primary && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-xs font-normal", children: "(Primary)" }),
                isEditing && /* @__PURE__ */ jsxRuntime.jsx(
                  button.Button,
                  {
                    size: "sm",
                    variant: "ghost",
                    onClick: () => handleRemoveRole(userRole.id),
                    className: "h-4 w-4 p-0 ml-1 hover:bg-destructive hover:text-destructive-foreground",
                    children: /* @__PURE__ */ jsxRuntime.jsx(X, { className: "h-3 w-3" })
                  }
                )
              ]
            }
          ),
          isEditing && !userRole.is_primary && userRoles.length > 1 && /* @__PURE__ */ jsxRuntime.jsx(
            button.Button,
            {
              size: "sm",
              variant: "outline",
              onClick: () => handleSetPrimary(userRole.id),
              className: "h-6 px-2 text-xs",
              children: "Set Primary"
            }
          )
        ] }, userRole.id)),
        isEditing && /* @__PURE__ */ jsxRuntime.jsx(
          button.Button,
          {
            size: "sm",
            variant: "outline",
            onClick: () => setIsAddingRole(true),
            className: "h-6 w-6 p-0",
            children: /* @__PURE__ */ jsxRuntime.jsx(Plus, { className: "h-3 w-3" })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntime.jsx(dialog.Dialog, { open: isAddingRole, onOpenChange: setIsAddingRole, children: /* @__PURE__ */ jsxRuntime.jsxs(dialog.DialogContent, { className: "sm:max-w-md", children: [
        /* @__PURE__ */ jsxRuntime.jsx(dialog.DialogHeader, { children: /* @__PURE__ */ jsxRuntime.jsx(dialog.DialogTitle, { children: "Add Role" }) }),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntime.jsxs(select.Select, { value: selectedRole, onValueChange: setSelectedRole, children: [
            /* @__PURE__ */ jsxRuntime.jsx(select.SelectTrigger, { children: /* @__PURE__ */ jsxRuntime.jsx(select.SelectValue, { placeholder: "Select a role" }) }),
            /* @__PURE__ */ jsxRuntime.jsx(select.SelectContent, { children: availableRoles == null ? void 0 : availableRoles.filter(
              (role) => !(userRoles == null ? void 0 : userRoles.some((userRole) => userRole.role_id === role.role_id))
            ).map((role) => /* @__PURE__ */ jsxRuntime.jsx(select.SelectItem, { value: role.role_id, children: role.name }, role.role_id)) })
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex justify-end gap-2", children: [
            /* @__PURE__ */ jsxRuntime.jsx(button.Button, { variant: "outline", onClick: () => setIsAddingRole(false), children: "Cancel" }),
            /* @__PURE__ */ jsxRuntime.jsx(
              button.Button,
              {
                onClick: handleAddRole,
                disabled: !selectedRole || addRoleMutation.isPending,
                children: "Add Role"
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
    return /* @__PURE__ */ jsxRuntime.jsx(dialog.Dialog, { open: isOpen, onOpenChange: onClose, children: /* @__PURE__ */ jsxRuntime.jsxs(dialog.DialogContent, { className: "max-w-4xl max-h-[90vh]", children: [
      /* @__PURE__ */ jsxRuntime.jsxs(dialog.DialogHeader, { children: [
        /* @__PURE__ */ jsxRuntime.jsxs(dialog.DialogTitle, { className: "flex items-center gap-2", children: [
          errors.length > 0 ? /* @__PURE__ */ jsxRuntime.jsx(CircleAlert, { className: "h-5 w-5 text-destructive" }) : warnings.length > 0 ? /* @__PURE__ */ jsxRuntime.jsx(TriangleAlert, { className: "h-5 w-5 text-yellow-600" }) : /* @__PURE__ */ jsxRuntime.jsx(CircleAlert, { className: "h-5 w-5 text-destructive" }),
          "Import Report: ",
          importType
        ] }),
        /* @__PURE__ */ jsxRuntime.jsx(dialog.DialogDescription, { children: "Review the import results and download detailed error and warning information" })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-4 overflow-y-auto", children: [
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "grid grid-cols-4 gap-4", children: [
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "p-4 bg-green-50 border border-green-200 rounded-lg", children: [
            /* @__PURE__ */ jsxRuntime.jsx("div", { className: "text-2xl font-bold text-green-700", children: successCount }),
            /* @__PURE__ */ jsxRuntime.jsx("div", { className: "text-sm text-green-600", children: "Successful" })
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "p-4 bg-red-50 border border-red-200 rounded-lg", children: [
            /* @__PURE__ */ jsxRuntime.jsx("div", { className: "text-2xl font-bold text-red-700", children: errors.length }),
            /* @__PURE__ */ jsxRuntime.jsx("div", { className: "text-sm text-red-600", children: "Failed" })
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "p-4 bg-yellow-50 border border-yellow-200 rounded-lg", children: [
            /* @__PURE__ */ jsxRuntime.jsx("div", { className: "text-2xl font-bold text-yellow-700", children: warnings.length }),
            /* @__PURE__ */ jsxRuntime.jsx("div", { className: "text-sm text-yellow-600", children: "Warnings" })
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "p-4 bg-blue-50 border border-blue-200 rounded-lg", children: [
            /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "text-2xl font-bold text-blue-700", children: [
              errorRate,
              "%"
            ] }),
            /* @__PURE__ */ jsxRuntime.jsx("div", { className: "text-sm text-blue-600", children: "Error Rate" })
          ] })
        ] }),
        (errors.length > 0 || warnings.length > 0) && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex gap-2", children: /* @__PURE__ */ jsxRuntime.jsx(button.Button, { onClick: downloadErrorReport, variant: "outline", size: "icon", children: /* @__PURE__ */ jsxRuntime.jsx(Download, { className: "h-4 w-4" }) }) }),
        errors.length > 0 || warnings.length > 0 ? /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntime.jsxs("h4", { className: "font-semibold text-sm", children: [
            "Issues (",
            errors.length + warnings.length,
            ")"
          ] }),
          /* @__PURE__ */ jsxRuntime.jsx(scrollArea.ScrollArea, { className: "h-[400px] border rounded-lg p-4", children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-3", children: [
            errors.map((error, index) => /* @__PURE__ */ jsxRuntime.jsxs(
              alert.Alert,
              {
                variant: "destructive",
                className: "relative",
                children: [
                  /* @__PURE__ */ jsxRuntime.jsx(CircleAlert, { className: "h-4 w-4" }),
                  /* @__PURE__ */ jsxRuntime.jsx(alert.AlertDescription, { children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-1", children: [
                    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                      /* @__PURE__ */ jsxRuntime.jsx(badge.Badge, { variant: "destructive", className: "text-xs", children: "Error" }),
                      /* @__PURE__ */ jsxRuntime.jsxs(badge.Badge, { variant: "outline", className: "text-xs", children: [
                        "Row ",
                        error.rowNumber
                      ] }),
                      /* @__PURE__ */ jsxRuntime.jsx("span", { className: "font-semibold text-sm", children: error.identifier }),
                      error.field && /* @__PURE__ */ jsxRuntime.jsxs(badge.Badge, { variant: "secondary", className: "text-xs", children: [
                        "Field: ",
                        error.field
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-sm mt-1 text-destructive", children: error.error }),
                    error.rawData && /* @__PURE__ */ jsxRuntime.jsxs("details", { className: "mt-2", children: [
                      /* @__PURE__ */ jsxRuntime.jsx("summary", { className: "text-xs cursor-pointer hover:underline", children: "View raw data" }),
                      /* @__PURE__ */ jsxRuntime.jsx("pre", { className: "mt-1 text-xs bg-muted p-2 rounded overflow-x-auto", children: JSON.stringify(error.rawData, null, 2) })
                    ] })
                  ] }) })
                ]
              },
              `error-${index}`
            )),
            warnings.map((warning, index) => /* @__PURE__ */ jsxRuntime.jsxs(
              alert.Alert,
              {
                variant: "default",
                className: "relative bg-yellow-50 border-yellow-200 text-yellow-900",
                children: [
                  /* @__PURE__ */ jsxRuntime.jsx(TriangleAlert, { className: "h-4 w-4" }),
                  /* @__PURE__ */ jsxRuntime.jsx(alert.AlertDescription, { children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-1", children: [
                    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                      /* @__PURE__ */ jsxRuntime.jsx(badge.Badge, { variant: "secondary", className: "text-xs bg-yellow-200 text-yellow-800", children: "Warning" }),
                      /* @__PURE__ */ jsxRuntime.jsxs(badge.Badge, { variant: "outline", className: "text-xs", children: [
                        "Row ",
                        warning.rowNumber
                      ] }),
                      /* @__PURE__ */ jsxRuntime.jsx("span", { className: "font-semibold text-sm", children: warning.identifier }),
                      warning.field && /* @__PURE__ */ jsxRuntime.jsxs(badge.Badge, { variant: "secondary", className: "text-xs", children: [
                        "Field: ",
                        warning.field
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-sm mt-1 text-yellow-800", children: warning.error }),
                    warning.rawData && /* @__PURE__ */ jsxRuntime.jsxs("details", { className: "mt-2", children: [
                      /* @__PURE__ */ jsxRuntime.jsx("summary", { className: "text-xs cursor-pointer hover:underline", children: "View raw data" }),
                      /* @__PURE__ */ jsxRuntime.jsx("pre", { className: "mt-1 text-xs bg-muted p-2 rounded overflow-x-auto", children: JSON.stringify(warning.rawData, null, 2) })
                    ] })
                  ] }) })
                ]
              },
              `warning-${index}`
            ))
          ] }) })
        ] }) : /* @__PURE__ */ jsxRuntime.jsx(alert.Alert, { className: "bg-green-50 border-green-200", children: /* @__PURE__ */ jsxRuntime.jsx(alert.AlertDescription, { className: "text-green-800", children: "All rows imported successfully! No errors or warnings to report." }) }),
        (errors.length > 0 || warnings.length > 0) && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "bg-yellow-50 border border-yellow-200 rounded-lg p-4", children: [
          /* @__PURE__ */ jsxRuntime.jsx("h4", { className: "font-semibold text-sm text-yellow-900 mb-2", children: "Troubleshooting Tips" }),
          /* @__PURE__ */ jsxRuntime.jsx("div", { className: "max-h-32 overflow-y-auto", children: /* @__PURE__ */ jsxRuntime.jsxs("ul", { className: "text-sm text-yellow-800 space-y-1 list-disc list-inside pr-2", children: [
            errors.length > 0 && /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
              /* @__PURE__ */ jsxRuntime.jsx("li", { children: "Verify that all required fields are present in your CSV" }),
              /* @__PURE__ */ jsxRuntime.jsx("li", { children: "Check for special characters or formatting issues" }),
              /* @__PURE__ */ jsxRuntime.jsx("li", { children: "Ensure email addresses are valid and not duplicates" }),
              /* @__PURE__ */ jsxRuntime.jsx("li", { children: "Review the error messages for specific guidance" })
            ] }),
            warnings.length > 0 && /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
              /* @__PURE__ */ jsxRuntime.jsx("li", { children: "Users with invalid locations were still created successfully" }),
              /* @__PURE__ */ jsxRuntime.jsx("li", { children: "You can assign locations manually after import using the user management interface" }),
              /* @__PURE__ */ jsxRuntime.jsx("li", { children: "Check the locations table to see available valid location names" }),
              /* @__PURE__ */ jsxRuntime.jsx("li", { children: "Consider updating your import template with correct location names" })
            ] }),
            /* @__PURE__ */ jsxRuntime.jsx("li", { children: "Download the report to fix issues in bulk" })
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxRuntime.jsx(button.Button, { onClick: onClose, variant: "outline", size: "icon", children: /* @__PURE__ */ jsxRuntime.jsx(X, { className: "h-4 w-4" }) }) })
    ] }) });
  };
  Object.defineProperty(exports2, "useUserProfiles", {
    enumerable: true,
    get: () => useUserProfiles.useUserProfiles
  });
  Object.defineProperty(exports2, "useUserManagement", {
    enumerable: true,
    get: () => useUserManagement.useUserManagement
  });
  Object.defineProperty(exports2, "useViewPreference", {
    enumerable: true,
    get: () => useViewPreference.useViewPreference
  });
  Object.defineProperty(exports2, "useUserRole", {
    enumerable: true,
    get: () => useUserRole.useUserRole
  });
  Object.defineProperty(exports2, "useUserAssets", {
    enumerable: true,
    get: () => useUserAssets.useUserAssets
  });
  Object.defineProperty(exports2, "useUserDepartments", {
    enumerable: true,
    get: () => useUserDepartments.useUserDepartments
  });
  Object.defineProperty(exports2, "useUserProfileRoles", {
    enumerable: true,
    get: () => useUserProfileRoles.useUserProfileRoles
  });
  exports2.AddCertificatesDialog = AddEducationDialog;
  exports2.AddOrganisationCertificateDialog = AddOrganisationCertificateDialog;
  exports2.AddPhysicalLocationDialog = AddPhysicalLocationDialog;
  exports2.AssignHardwareDialog = AssignHardwareDialog;
  exports2.AssignPhysicalLocationDialog = AssignPhysicalLocationDialog;
  exports2.AssignSoftwareDialog = AssignSoftwareDialog;
  exports2.Certificates = Certificates;
  exports2.CreateUserDialog = CreateUserDialog;
  exports2.DepartmentManagement = DepartmentManagement;
  exports2.DepartmentRolePairsDisplay = DepartmentRolePairsDisplay;
  exports2.EditUserDialog = EditUserDialog;
  exports2.EditableField = EditableField;
  exports2.EditableProfileHeader = EditableProfileHeader;
  exports2.ImportErrorReport = ImportErrorReport;
  exports2.LocationManagement = LocationManagement;
  exports2.MultipleRolesField = MultipleRolesField;
  exports2.OrganisationPanel = OrganisationPanel;
  exports2.OrganisationProvider = OrganisationProvider;
  exports2.OrganisationWrapper = OrganisationWrapper;
  exports2.PersonaDetailsTabs = PersonaDetailsTabs;
  exports2.PersonaProfile = PersonaProfile;
  exports2.PhysicalLocationTab = PhysicalLocationTab;
  exports2.ProfileAvatar = ProfileAvatar;
  exports2.ProfileBasicInfo = ProfileBasicInfo;
  exports2.ProfileContactInfo = ProfileContactInfo;
  exports2.RoleManagement = RoleManagement;
  exports2.UserCard = UserCard;
  exports2.UserDetailView = UserDetailView;
  exports2.UserList = UserList;
  exports2.UserManagement = UserManagement;
  exports2.UserTable = UserTable;
  exports2.handleCreateUser = handleCreateUser;
  exports2.handleDeleteUser = handleDeleteUser;
  exports2.handleSaveUser = handleSaveUser;
  exports2.useOrganisationContext = useOrganisationContext;
  Object.defineProperty(exports2, Symbol.toStringTag, { value: "Module" });
});
//# sourceMappingURL=index.umd.js.map
