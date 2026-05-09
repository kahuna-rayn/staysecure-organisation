(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports, require("react/jsx-runtime"), require("react"), require("react-router-dom"), require("@/components/ui/card"), require("@/components/ui/tabs"), require("@/components/ui/badge"), require("@/hooks/useUserProfiles"), require("@/hooks/useUserManagement"), require("@/hooks/useUserRole"), require("@/hooks/useViewPreference"), require("staysecure-notifications"), require("@/integrations/supabase/client"), require("@/components/ui/use-toast"), require("@/components/ui/toggle-group"), require("@/components/ui/input"), require("@/components/ui/button"), require("@/components/ui/select"), require("@/components/ui/delete-user-dialog"), require("@/hooks/use-toast"), require("@/components/ui/alert-dialog"), require("@/components/ui/avatar"), require("@/hooks/useUserDepartments"), require("@/hooks/useUserProfileRoles"), require("@/components/ui/editable-table"), require("@/components/ui/dialog"), require("@/components/ui/label"), require("@/components/ui/textarea"), require("@tanstack/react-query"), require("staysecure-auth"), require("@/components/ui/checkbox"), require("react-dropzone"), require("@/components/ui/alert"), require("@/components/ui/scroll-area"), require("@/components/ui/table"), require("@/components/ui/switch"), require("@/hooks/useManagerPermissions"), require("papaparse"), require("xlsx"), require("jspdf"), require("jspdf-autotable"), require("react-to-print"), require("@/components/ui/separator"), require("sonner"), require("@/lib/utils"), require("@/components/ui/command"), require("@/components/ui/popover"), require("@/components/HardwareInventory"), require("@/components/SoftwareAccounts"), require("@/hooks/useInventory"), require("@/hooks/useUserAssets"), require("@/components/ui/progress"), require("@/components/ui/tooltip"), require("@/components/LearningTracksTab"), require("@/hooks/useUserRoleById"), require("@/hooks/useProfile"), require("@/hooks/useUserPhysicalLocations")) : typeof define === "function" && define.amd ? define(["exports", "react/jsx-runtime", "react", "react-router-dom", "@/components/ui/card", "@/components/ui/tabs", "@/components/ui/badge", "@/hooks/useUserProfiles", "@/hooks/useUserManagement", "@/hooks/useUserRole", "@/hooks/useViewPreference", "staysecure-notifications", "@/integrations/supabase/client", "@/components/ui/use-toast", "@/components/ui/toggle-group", "@/components/ui/input", "@/components/ui/button", "@/components/ui/select", "@/components/ui/delete-user-dialog", "@/hooks/use-toast", "@/components/ui/alert-dialog", "@/components/ui/avatar", "@/hooks/useUserDepartments", "@/hooks/useUserProfileRoles", "@/components/ui/editable-table", "@/components/ui/dialog", "@/components/ui/label", "@/components/ui/textarea", "@tanstack/react-query", "staysecure-auth", "@/components/ui/checkbox", "react-dropzone", "@/components/ui/alert", "@/components/ui/scroll-area", "@/components/ui/table", "@/components/ui/switch", "@/hooks/useManagerPermissions", "papaparse", "xlsx", "jspdf", "jspdf-autotable", "react-to-print", "@/components/ui/separator", "sonner", "@/lib/utils", "@/components/ui/command", "@/components/ui/popover", "@/components/HardwareInventory", "@/components/SoftwareAccounts", "@/hooks/useInventory", "@/hooks/useUserAssets", "@/components/ui/progress", "@/components/ui/tooltip", "@/components/LearningTracksTab", "@/hooks/useUserRoleById", "@/hooks/useProfile", "@/hooks/useUserPhysicalLocations"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global.OrganisationManagement = {}, global["react/jsx-runtime"], global.React, global.ReactRouterDOM, global.card, global.tabs, global.badge, global.useUserProfiles, global.useUserManagement, global.useUserRole, global.useViewPreference, global.StaySecureNotifications, global.client, global.useToast, global.toggleGroup, global.input, global.button, global.select, global.deleteUserDialog, global.useToast$1, global.alertDialog, global.avatar, global.useUserDepartments, global.useUserProfileRoles, global.editableTable, global.dialog, global.label, global.textarea, global.ReactQuery, global.StaySecureAuth, global.checkbox, global.reactDropzone, global.alert, global.scrollArea, global.table, global._switch, global.useManagerPermissions, global.Papa, global.XLSX, global.jsPDF, global.autoTable, global.reactToPrint, global.separator, global.sonner, global.utils, global.command, global.popover, global.HardwareInventory, global.SoftwareAccounts, global.useInventory, global.useUserAssets, global.progress, global.tooltip, global.LearningTracksTab, global.useUserRoleById, global.useProfile, global.useUserPhysicalLocations));
})(this, function(exports2, jsxRuntime, React, reactRouterDom, card, tabs, badge, useUserProfiles, useUserManagement, useUserRole, useViewPreference, staysecureNotifications, client, useToast, toggleGroup, input, button, select, deleteUserDialog, useToast$1, alertDialog, avatar, useUserDepartments, useUserProfileRoles, editableTable, dialog, label, textarea, reactQuery, staysecureAuth, checkbox, reactDropzone, alert, scrollArea, table, _switch, useManagerPermissions, Papa, XLSX, jsPDF, autoTable, reactToPrint, separator, sonner, utils, command, popover, HardwareInventory, SoftwareAccounts, useInventory, useUserAssets, progress, tooltip, LearningTracksTab, useUserRoleById, useProfile, useUserPhysicalLocations) {
  "use strict";
  function _interopNamespaceDefault(e) {
    const n = Object.create(null, { [Symbol.toStringTag]: { value: "Module" } });
    if (e) {
      for (const k in e) {
        if (k !== "default") {
          const d = Object.getOwnPropertyDescriptor(e, k);
          Object.defineProperty(n, k, d.get ? d : {
            enumerable: true,
            get: () => e[k]
          });
        }
      }
    }
    n.default = e;
    return Object.freeze(n);
  }
  const XLSX__namespace = /* @__PURE__ */ _interopNamespaceDefault(XLSX);
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
  const Icon = React.forwardRef(
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
      return React.createElement(
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
          ...iconNode.map(([tag, attrs]) => React.createElement(tag, attrs)),
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
    const Component = React.forwardRef(
      ({ className, ...props }, ref) => React.createElement(Icon, {
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
  const ChevronDown = createLucideIcon("ChevronDown", [
    ["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]
  ]);
  /**
   * @license lucide-react v0.462.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const ChevronLeft = createLucideIcon("ChevronLeft", [
    ["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]
  ]);
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
  const ChevronUp = createLucideIcon("ChevronUp", [["path", { d: "m18 15-6-6-6 6", key: "153udz" }]]);
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
  const CircleCheck = createLucideIcon("CircleCheck", [
    ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
    ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
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
  const FlaskConical = createLucideIcon("FlaskConical", [
    [
      "path",
      {
        d: "M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2",
        key: "pzvekw"
      }
    ],
    ["path", { d: "M8.5 2h7", key: "csnxdl" }],
    ["path", { d: "M7 16h10", key: "wp8him" }]
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
  const History = createLucideIcon("History", [
    ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
    ["path", { d: "M3 3v5h5", key: "1xhq8a" }],
    ["path", { d: "M12 7v5l4 2", key: "1fdv2h" }]
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
  const PenLine = createLucideIcon("PenLine", [
    ["path", { d: "M12 20h9", key: "t2du7b" }],
    [
      "path",
      {
        d: "M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z",
        key: "1ykcvy"
      }
    ]
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
  const OrganisationContext = React.createContext(null);
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
  const defaultEnabledTabs = ["users", "roles", "departments", "locations", "certificates", "licenses", "profile"];
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
    const context = React.useContext(OrganisationContext);
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
    state: (label2, value) => {
      if (isEnabled()) console.debug("[ORG:state]", label2, value);
    }
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
  const handleCreateUser = async (supabaseClient, newUser, updateProfile, onSuccess) => {
    var _a, _b;
    try {
      const clientId = client.getCurrentClientId();
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
        if (data.error === "LICENSE_SEATS_EXHAUSTED") {
          useToast.toast({
            title: "License seats exhausted",
            description: `All ${data.seats ?? "available"} license seats are in use. Visit license.raynsecure.com to add more seats before creating new users.`,
            variant: "destructive"
          });
          return;
        }
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
      useToast.toast({
        title: "User created successfully",
        description: "The activation email has been sent."
      });
      if (data.near_capacity) {
        setTimeout(() => {
          useToast.toast({
            title: "Approaching seat limit",
            description: "You are now using 80% or more of your license seats. Consider adding more seats soon."
          });
        }, 600);
        const { data: { session } } = await supabaseClient.auth.getSession();
        if ((_b = session == null ? void 0 : session.user) == null ? void 0 : _b.id) {
          const usedSeats = data.seats_used ?? "";
          const totalSeats = data.seats ?? "";
          const pctUsed = totalSeats ? Math.round(usedSeats / totalSeats * 100) : "";
          staysecureNotifications.sendNotificationByEvent(supabaseClient, "license_near_capacity", {
            user_id: session.user.id,
            used_seats: usedSeats,
            total_seats: totalSeats,
            pct_used: pctUsed,
            clientId: client.getCurrentClientId() ?? void 0
          }).catch((err) => {
            console.warn("license_near_capacity notification failed (non-fatal):", err);
          });
        }
      }
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
        useToast.toast({
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
        useToast.toast({
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
      useToast.toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      });
      return { success: false, error: errorMessage };
    }
  };
  const DepartmentRolePairsDisplay = ({ userId }) => {
    const { userDepartments, isLoading: deptLoading } = useUserDepartments.useUserDepartments(userId);
    const { userRoles, isLoading: rolesLoading } = useUserProfileRoles.useUserProfileRoles(userId);
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
      return /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-muted-foreground", children: "Loading..." });
    }
    if (!displayText) {
      return /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-muted-foreground", children: "No assignments" });
    }
    return /* @__PURE__ */ jsxRuntime.jsx(badge.Badge, { variant: "secondary", className: "text-xs", children: displayText });
  };
  const UserCard = ({ user, onDelete }) => {
    var _a;
    const navigate = reactRouterDom.useNavigate();
    const { basePath } = useOrganisationContext();
    const initials = user.full_name ? user.full_name.split(" ").map((n) => n.charAt(0)).join("").slice(0, 2) : ((_a = user.email) == null ? void 0 : _a.slice(0, 2)) || "U";
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
          /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-muted-foreground", children: user.email || "No email" })
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
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex gap-2 mt-4", onClick: (e) => e.stopPropagation(), children: [
        /* @__PURE__ */ jsxRuntime.jsx(button.Button, { size: "sm", variant: "outline", onClick: handleViewDetails, children: /* @__PURE__ */ jsxRuntime.jsx(SquarePen, { className: "h-3 w-3" }) }),
        /* @__PURE__ */ jsxRuntime.jsx(button.Button, { size: "sm", variant: "outline", onClick: () => onDelete(user.id), children: /* @__PURE__ */ jsxRuntime.jsx(Trash2, { className: "h-3 w-3" }) })
      ] })
    ] }) });
  };
  const UserList = ({ profiles, onDelete }) => {
    return /* @__PURE__ */ jsxRuntime.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: profiles.map((user) => /* @__PURE__ */ jsxRuntime.jsx(
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
    const navigate = reactRouterDom.useNavigate();
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
        key: "email",
        header: "Email",
        type: "text",
        editable: false,
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
        options: ["Pending", "Active", "Inactive", "OnLeave"],
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
    const { supabaseClient } = useOrganisationContext();
    const [isFullNameManuallyEdited, setIsFullNameManuallyEdited] = React.useState(false);
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
    const isAdmin = currentUserRole === "client_admin" || isSuperAdmin;
    const { data: hasAuthorSeats } = reactQuery.useQuery({
      queryKey: ["license-has-author-seats"],
      queryFn: async () => {
        const { data } = await supabaseClient.from("customer_product_licenses").select("seats_author").gt("seats_author", 0).limit(1).maybeSingle();
        return !!data;
      },
      enabled: isAdmin && !isSuperAdmin
    });
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
    const { data: profiles } = reactQuery.useQuery({
      queryKey: ["profiles-for-managers"],
      queryFn: async () => {
        const { data } = await supabaseClient.from("profiles").select("id, full_name, email").eq("status", "Active").order("full_name");
        return data || [];
      },
      enabled: isOpen
      // Only fetch when dialog is open
    });
    const { data: languages } = reactQuery.useQuery({
      queryKey: ["languages"],
      queryFn: async () => {
        const { data } = await supabaseClient.from("languages").select("code, display_name, native_name, flag_emoji").eq("is_active", true).order("sort_order", { ascending: true });
        return data || [];
      }
    });
    const validatePhoneInput = (input2) => {
      return input2.replace(/[^0-9+\s\-()]/g, "");
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
                  value: newUser.access_level || void 0,
                  onValueChange: (value) => {
                    const backendValue = value === "Admin" ? "client_admin" : value.toLowerCase();
                    updateField("access_level", backendValue);
                  },
                  required: true,
                  children: [
                    /* @__PURE__ */ jsxRuntime.jsx(select.SelectTrigger, { children: /* @__PURE__ */ jsxRuntime.jsx(select.SelectValue, { placeholder: "Select access level" }) }),
                    /* @__PURE__ */ jsxRuntime.jsxs(select.SelectContent, { children: [
                      /* @__PURE__ */ jsxRuntime.jsx(select.SelectItem, { value: "user", children: "User" }),
                      /* @__PURE__ */ jsxRuntime.jsx(select.SelectItem, { value: "client_admin", children: "Admin" }),
                      (isSuperAdmin || isAdmin && hasAuthorSeats) && /* @__PURE__ */ jsxRuntime.jsx(select.SelectItem, { value: "author", children: "Author" }),
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
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntime.jsx(label.Label, { htmlFor: "manager", children: "Manager" }),
              /* @__PURE__ */ jsxRuntime.jsxs(
                select.Select,
                {
                  value: newUser.manager || "none",
                  onValueChange: (value) => updateField("manager", value === "none" ? "" : value),
                  children: [
                    /* @__PURE__ */ jsxRuntime.jsx(select.SelectTrigger, { children: /* @__PURE__ */ jsxRuntime.jsx(select.SelectValue, { placeholder: "Select manager (optional)" }) }),
                    /* @__PURE__ */ jsxRuntime.jsxs(select.SelectContent, { children: [
                      /* @__PURE__ */ jsxRuntime.jsx(select.SelectItem, { value: "none", children: "No manager" }),
                      profiles == null ? void 0 : profiles.map((profile) => /* @__PURE__ */ jsxRuntime.jsx(select.SelectItem, { value: profile.id, children: profile.full_name || profile.email }, profile.id))
                    ] })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntime.jsx(label.Label, { htmlFor: "language", children: "Language" }),
              /* @__PURE__ */ jsxRuntime.jsxs(
                select.Select,
                {
                  value: newUser.language || "English",
                  onValueChange: (value) => updateField("language", value),
                  children: [
                    /* @__PURE__ */ jsxRuntime.jsx(select.SelectTrigger, { children: /* @__PURE__ */ jsxRuntime.jsx(select.SelectValue, { placeholder: "Select language" }) }),
                    /* @__PURE__ */ jsxRuntime.jsx(select.SelectContent, { children: languages == null ? void 0 : languages.map((language) => /* @__PURE__ */ jsxRuntime.jsxs(select.SelectItem, { value: language.display_name || language.code, children: [
                      language.flag_emoji && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "mr-2", children: language.flag_emoji }),
                      language.native_name || language.display_name || language.code
                    ] }, language.display_name || language.code)) })
                  ]
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
                rows: 3,
                className: "w-full"
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
  const USER_IMPORT_JOB_STORAGE_KEY = "staysecure:user-import-active-job";
  const IMPORT_POLL_CANCELLED = "IMPORT_POLL_CANCELLED";
  const ADDITIONS_BLOCK = "\n__ADDITIONS__\n";
  function parseImportJobRowMessage(msg) {
    if (!msg) return { warningPart: "", additions: [] };
    const idx = msg.indexOf(ADDITIONS_BLOCK);
    if (idx === -1) return { warningPart: msg, additions: [] };
    const warningPart = msg.slice(0, idx).trim();
    try {
      const parsed = JSON.parse(msg.slice(idx + ADDITIONS_BLOCK.length));
      return { warningPart, additions: Array.isArray(parsed) ? parsed : [] };
    } catch {
      return { warningPart: msg, additions: [] };
    }
  }
  async function pollUserImportJob(supabase, jobId, totalRows, onProgress, cancelled) {
    const deadline = Date.now() + 2 * 3600 * 1e3;
    while (Date.now() < deadline) {
      if (cancelled()) throw new Error(IMPORT_POLL_CANCELLED);
      const { data: job, error: jobErr } = await supabase.from("user_import_jobs").select("*").eq("id", jobId).maybeSingle();
      if (jobErr) throw new Error(jobErr.message);
      if (!job) {
        await new Promise((r) => setTimeout(r, 2e3));
        continue;
      }
      onProgress({
        processed: job.processed_rows ?? 0,
        total: job.total_rows ?? totalRows,
        status: job.status
      });
      if (job.status === "completed") {
        const { data: failRows } = await supabase.from("user_import_job_rows").select("row_index, row_payload, error_message").eq("job_id", jobId).eq("status", "failed");
        const { data: warnRows } = await supabase.from("user_import_job_rows").select("row_index, row_payload, error_message").eq("job_id", jobId).eq("status", "succeeded").not("error_message", "is", null);
        const errors = (failRows || []).map((fr) => {
          const row = fr.row_payload;
          return {
            rowNumber: fr.row_index + 2,
            identifier: row["Email"] || row["email"] || "Unknown",
            error: fr.error_message || "Failed",
            rawData: row
          };
        });
        const warnings = [];
        for (const wr of warnRows || []) {
          const row = wr.row_payload;
          const email = row["Email"] || row["email"] || "Unknown";
          const rowNumber = wr.row_index + 2;
          const { warningPart, additions } = parseImportJobRowMessage(wr.error_message);
          if (warningPart) {
            warnings.push({ rowNumber, identifier: email, field: "Assignment", error: warningPart, rawData: row });
          }
          for (const a of additions) {
            warnings.push({ rowNumber, identifier: email, field: a.field, error: a.value, type: "info", rawData: row });
          }
        }
        return { successCount: job.succeeded_rows ?? 0, total: job.total_rows ?? totalRows, errors, warnings };
      }
      if (job.status === "failed") {
        const { data: failRows } = await supabase.from("user_import_job_rows").select("row_index, row_payload, error_message").eq("job_id", jobId).eq("status", "failed");
        const errors = (failRows || []).map((fr) => {
          const row = fr.row_payload;
          return {
            rowNumber: fr.row_index + 2,
            identifier: row["Email"] || row["email"] || "Unknown",
            error: fr.error_message || "Failed",
            rawData: row
          };
        });
        return {
          successCount: job.succeeded_rows ?? 0,
          total: job.total_rows ?? totalRows,
          errors,
          warnings: [],
          failureMessage: job.last_error || "Import job failed"
        };
      }
      await new Promise((r) => setTimeout(r, 2e3));
    }
    throw new Error("Import timed out after 2 hours.");
  }
  function readPersistedImportJob() {
    try {
      const raw = sessionStorage.getItem(USER_IMPORT_JOB_STORAGE_KEY);
      if (!raw) return null;
      const p = JSON.parse(raw);
      if (!p.jobId || typeof p.totalRows !== "number") {
        sessionStorage.removeItem(USER_IMPORT_JOB_STORAGE_KEY);
        return null;
      }
      return p;
    } catch {
      sessionStorage.removeItem(USER_IMPORT_JOB_STORAGE_KEY);
      return null;
    }
  }
  function persistImportJob(p) {
    try {
      sessionStorage.setItem(USER_IMPORT_JOB_STORAGE_KEY, JSON.stringify(p));
    } catch {
    }
  }
  function clearPersistedImportJob() {
    try {
      sessionStorage.removeItem(USER_IMPORT_JOB_STORAGE_KEY);
    } catch {
    }
  }
  const ImportUsersDialog = ({ onImportStart }) => {
    const { supabaseClient: supabase } = useOrganisationContext();
    const [isOpen, setIsOpen] = React.useState(false);
    const [uploadedFile, setUploadedFile] = React.useState(null);
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [sendActivationEmails, setSendActivationEmails] = React.useState(false);
    const [importMode, setImportMode] = React.useState("create");
    const onDrop = React.useCallback((acceptedFiles) => {
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
        useToast$1.toast({ title: "File uploaded", description: `${file.name} is ready for import` });
      }
    }, []);
    const { getRootProps, getInputProps, isDragActive } = reactDropzone.useDropzone({
      onDrop,
      accept: { "text/csv": [".csv"] },
      multiple: false
    });
    const generateSampleCSV = () => {
      const csvContent = `"Email","Full Name","First Name","Last Name","Phone","Employee ID","Access Level","Location","Department","Role","Manager"
"john.doe@company.com","John Doe","John","Doe","+65-555-0123","EMP-2024-001","User","Main Office","Engineering","Software Engineer","jane.smith@company.com"
"jane.smith@company.com","Jane Smith","Jane","Smith","+65-555-0124","EMP-2024-002","Admin","Branch Office","Human Resources","HR Manager",""`;
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "user_import_template.csv";
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
    const handleImport = async () => {
      if (!uploadedFile) {
        useToast$1.toast({ title: "No file selected", description: "Please upload a file first", variant: "destructive" });
        return;
      }
      setIsSubmitting(true);
      try {
        const csvText = await uploadedFile.text();
        const clientId = client.getCurrentClientId();
        const clientPath = clientId ? `/${clientId}` : "";
        const activationEmailsRequested = sendActivationEmails;
        const mode = importMode;
        const { data, error } = await supabase.functions.invoke("user-import-submit", {
          body: {
            csv_text: csvText,
            original_filename: uploadedFile.name,
            options: {
              import_mode: mode,
              send_activation_email: activationEmailsRequested,
              client_path: clientPath
            }
          }
        });
        if (error) throw new Error(error.message || "Failed to start background import");
        if (!(data == null ? void 0 : data.ok) || !data.job_id) throw new Error((data == null ? void 0 : data.error) || "Failed to start background import");
        const job = {
          jobId: data.job_id,
          totalRows: data.total_rows ?? 0,
          importMode: mode,
          activationEmailsRequested
        };
        persistImportJob(job);
        debug.log("[ImportUsersDialog] job started", job);
        onImportStart == null ? void 0 : onImportStart(job);
        setUploadedFile(null);
        setSendActivationEmails(false);
        setImportMode("create");
        setIsOpen(false);
        useToast$1.toast({
          title: "Import started",
          description: `Processing ${job.totalRows} rows in the background. Progress is shown below the page header.`
        });
      } catch (err) {
        debug.error("[ImportUsersDialog] submit failed:", err);
        useToast$1.toast({
          title: "Import failed to start",
          description: (err == null ? void 0 : err.message) || "Try again or use a smaller file.",
          variant: "destructive"
        });
      } finally {
        setIsSubmitting(false);
      }
    };
    const handleDialogClose = (open) => {
      if (!open) {
        setUploadedFile(null);
        setSendActivationEmails(false);
        setImportMode("create");
      }
      setIsOpen(open);
    };
    return /* @__PURE__ */ jsxRuntime.jsxs(dialog.Dialog, { open: isOpen, onOpenChange: handleDialogClose, children: [
      /* @__PURE__ */ jsxRuntime.jsx(dialog.DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntime.jsx(button.Button, { variant: "outline", children: /* @__PURE__ */ jsxRuntime.jsx(Upload, { className: "h-4 w-4 mr-2" }) }) }),
      /* @__PURE__ */ jsxRuntime.jsxs(dialog.DialogContent, { className: "max-w-3xl max-h-[90vh] overflow-y-auto", children: [
        /* @__PURE__ */ jsxRuntime.jsxs(dialog.DialogHeader, { children: [
          /* @__PURE__ */ jsxRuntime.jsx(dialog.DialogTitle, { children: importMode === "update" ? "Update Existing Users" : "Import Users" }),
          /* @__PURE__ */ jsxRuntime.jsx(dialog.DialogDescription, { children: importMode === "update" ? 'Server-side background import (safe for large CSVs). Rows match users by email and update profile, locations, departments, and roles. Emails with no existing user create a new account; "Send activation emails" applies to those new users. A progress bar appears on the page once the job starts.' : "CSV import for new users runs on the server in the background (safe for large files). A progress bar appears on the page once the job starts. Locations, departments, and roles are created automatically if missing." })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex rounded-lg border overflow-hidden", children: [
            /* @__PURE__ */ jsxRuntime.jsx(
              "button",
              {
                type: "button",
                onClick: () => {
                  setImportMode("create");
                  setUploadedFile(null);
                },
                disabled: isSubmitting,
                className: `flex-1 py-2 text-sm font-medium transition-colors ${importMode === "create" ? "bg-primary text-primary-foreground" : "bg-background text-muted-foreground hover:bg-muted"}`,
                children: "Create new users"
              }
            ),
            /* @__PURE__ */ jsxRuntime.jsx(
              "button",
              {
                type: "button",
                onClick: () => {
                  setImportMode("update");
                  setUploadedFile(null);
                  setSendActivationEmails(false);
                },
                disabled: isSubmitting,
                className: `flex-1 py-2 text-sm font-medium transition-colors ${importMode === "update" ? "bg-primary text-primary-foreground" : "bg-background text-muted-foreground hover:bg-muted"}`,
                children: "Update existing users"
              }
            )
          ] }),
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
            uploadedFile && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-3", children: [
              /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-start gap-2", children: [
                /* @__PURE__ */ jsxRuntime.jsx(
                  checkbox.Checkbox,
                  {
                    id: "send-activation-emails",
                    checked: sendActivationEmails,
                    onCheckedChange: (checked) => setSendActivationEmails(checked === true),
                    disabled: isSubmitting,
                    className: "mt-1"
                  }
                ),
                /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntime.jsx(label.Label, { htmlFor: "send-activation-emails", className: "text-sm font-normal cursor-pointer", children: "Send activation emails to new users" }),
                  /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "When unchecked, accounts are created without sending mail; you can use Send Activation Emails on User Management when ready." })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex justify-end gap-3", children: [
                /* @__PURE__ */ jsxRuntime.jsx(button.Button, { onClick: handleImport, disabled: isSubmitting, size: "icon", "aria-label": "Start import", children: isSubmitting ? /* @__PURE__ */ jsxRuntime.jsx("div", { className: "animate-spin rounded-full h-4 w-4 border-b-2 border-white" }) : /* @__PURE__ */ jsxRuntime.jsx(Upload, { className: "h-4 w-4" }) }),
                /* @__PURE__ */ jsxRuntime.jsx(button.Button, { variant: "outline", size: "icon", onClick: () => setUploadedFile(null), disabled: isSubmitting, "aria-label": "Clear file", children: /* @__PURE__ */ jsxRuntime.jsx(X, { className: "h-4 w-4" }) })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "bg-yellow-50 border border-yellow-200 rounded-lg p-4", children: [
            /* @__PURE__ */ jsxRuntime.jsx("h4", { className: "text-sm font-medium text-yellow-800 mb-2", children: "User Import Template" }),
            /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-sm text-yellow-700 mb-3", children: "Download a template for importing users with sample data." }),
            /* @__PURE__ */ jsxRuntime.jsx("div", { className: "space-y-2", children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center justify-between p-2 bg-white rounded border", children: [
              /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntime.jsx(FileText, { className: "h-4 w-4" }),
                /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-sm font-medium", children: "Users Template (CSV)" })
              ] }),
              /* @__PURE__ */ jsxRuntime.jsx(button.Button, { size: "sm", variant: "outline", onClick: generateSampleCSV, className: "gap-2", children: /* @__PURE__ */ jsxRuntime.jsx(Download, { className: "h-4 w-4" }) })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "bg-blue-50 border border-blue-200 rounded-lg p-4", children: [
            /* @__PURE__ */ jsxRuntime.jsx("h4", { className: "font-semibold text-blue-900 mb-2", children: "Available Columns" }),
            /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex flex-wrap gap-2 mb-4", children: (importMode === "update" ? ["Email", "Full Name", "First Name", "Last Name", "Phone", "Employee ID", "Location", "Department", "Role", "Manager"] : ["Email", "Full Name", "First Name", "Last Name", "Phone", "Employee ID", "Access Level", "Location", "Department", "Role", "Manager"]).map((column) => /* @__PURE__ */ jsxRuntime.jsx(badge.Badge, { variant: "outline", className: "text-xs", children: column }, column)) }),
            importMode === "update" ? /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "text-sm text-blue-800 space-y-1", children: [
              /* @__PURE__ */ jsxRuntime.jsxs("p", { children: [
                "• ",
                /* @__PURE__ */ jsxRuntime.jsx("strong", { children: "Email" }),
                " is required — used to look up the existing user; if not found, the user will be created"
              ] }),
              /* @__PURE__ */ jsxRuntime.jsx("p", { children: "• All other columns are optional for existing users — only populated fields are updated" }),
              /* @__PURE__ */ jsxRuntime.jsxs("p", { children: [
                "• ",
                /* @__PURE__ */ jsxRuntime.jsx("strong", { children: "Location" }),
                " - must already exist in the system; updates the user's primary location and adds a physical access entry if not already present"
              ] }),
              /* @__PURE__ */ jsxRuntime.jsxs("p", { children: [
                "• ",
                /* @__PURE__ */ jsxRuntime.jsx("strong", { children: "Department" }),
                " - must already exist; added to the user's departments if not already assigned"
              ] }),
              /* @__PURE__ */ jsxRuntime.jsxs("p", { children: [
                "• ",
                /* @__PURE__ */ jsxRuntime.jsx("strong", { children: "Role" }),
                " - must already exist; added to the user's roles if not already assigned. If Department is also provided, role and department are linked with a pairing ID"
              ] }),
              /* @__PURE__ */ jsxRuntime.jsxs("p", { children: [
                "• ",
                /* @__PURE__ */ jsxRuntime.jsx("strong", { children: "Manager" }),
                " - must be specified by email address; updates the user's manager field"
              ] }),
              /* @__PURE__ */ jsxRuntime.jsx("p", { children: "• Existing assignments are never removed — this is an additive update" })
            ] }) : /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "text-sm text-blue-800 space-y-1", children: [
              /* @__PURE__ */ jsxRuntime.jsxs("p", { children: [
                "• ",
                /* @__PURE__ */ jsxRuntime.jsx("strong", { children: "Email" }),
                " is required for each user"
              ] }),
              /* @__PURE__ */ jsxRuntime.jsxs("p", { children: [
                "• ",
                /* @__PURE__ */ jsxRuntime.jsx("strong", { children: "Full Name" }),
                " is required for each user"
              ] }),
              /* @__PURE__ */ jsxRuntime.jsxs("p", { children: [
                "• ",
                /* @__PURE__ */ jsxRuntime.jsx("strong", { children: "First Name" }),
                " is required for each user"
              ] }),
              /* @__PURE__ */ jsxRuntime.jsxs("p", { children: [
                "• ",
                /* @__PURE__ */ jsxRuntime.jsx("strong", { children: "Last Name" }),
                " is required for each user"
              ] }),
              /* @__PURE__ */ jsxRuntime.jsx("p", { children: "• Users will be created with 'Pending' status; use the checkbox above to send (or not send) activation email as each account is created, or use Send Activation Emails in User Management later" }),
              /* @__PURE__ */ jsxRuntime.jsxs("p", { children: [
                "• ",
                /* @__PURE__ */ jsxRuntime.jsx("strong", { children: "Access Level" }),
                ' - must be "User" or "Admin". Other values are not allowed.'
              ] }),
              /* @__PURE__ */ jsxRuntime.jsxs("p", { children: [
                "• ",
                /* @__PURE__ */ jsxRuntime.jsx("strong", { children: "Location" }),
                " (optional) - created automatically if it doesn't exist"
              ] }),
              /* @__PURE__ */ jsxRuntime.jsxs("p", { children: [
                "• ",
                /* @__PURE__ */ jsxRuntime.jsx("strong", { children: "Department" }),
                " (optional) - created automatically if it doesn't exist"
              ] }),
              /* @__PURE__ */ jsxRuntime.jsxs("p", { children: [
                "• ",
                /* @__PURE__ */ jsxRuntime.jsx("strong", { children: "Role" }),
                " (optional) - created automatically if it doesn't exist. If Department is also provided, the role is linked to that department; otherwise it is created as a general role."
              ] }),
              /* @__PURE__ */ jsxRuntime.jsxs("p", { children: [
                "• ",
                /* @__PURE__ */ jsxRuntime.jsx("strong", { children: "Manager" }),
                " (optional) - must be specified by email address. If manager email doesn't exist, user will be created but a warning will be reported"
              ] }),
              /* @__PURE__ */ jsxRuntime.jsx("p", { children: "• All other fields (Phone, Employee ID, etc.) are optional and will use default values if not provided" })
            ] })
          ] })
        ] })
      ] })
    ] });
  };
  const firedJobIds = /* @__PURE__ */ new Set();
  const UserImportProgressBanner = ({
    job,
    onImportComplete,
    onImportError,
    onDismiss
  }) => {
    const [progress2, setProgress] = React.useState({ processed: 0, total: job.totalRows, status: "pending" });
    const cancelledRef = React.useRef(false);
    const onImportCompleteRef = React.useRef(onImportComplete);
    const onImportErrorRef = React.useRef(onImportError);
    const onDismissRef = React.useRef(onDismiss);
    const importModeRef = React.useRef(job.importMode);
    React.useEffect(() => {
      onImportCompleteRef.current = onImportComplete;
    }, [onImportComplete]);
    React.useEffect(() => {
      onImportErrorRef.current = onImportError;
    }, [onImportError]);
    React.useEffect(() => {
      onDismissRef.current = onDismiss;
    }, [onDismiss]);
    React.useEffect(() => {
      importModeRef.current = job.importMode;
    }, [job.importMode]);
    const { supabaseClient: supabase } = useOrganisationContext();
    const supabaseRef = React.useRef(supabase);
    React.useEffect(() => {
      supabaseRef.current = supabase;
    }, [supabase]);
    React.useEffect(() => {
      cancelledRef.current = false;
      void (async () => {
        try {
          const result = await pollUserImportJob(
            supabaseRef.current,
            job.jobId,
            job.totalRows,
            (p) => {
              if (!cancelledRef.current) setProgress(p);
            },
            () => cancelledRef.current
          );
          if (cancelledRef.current) return;
          if (firedJobIds.has(job.jobId)) return;
          firedJobIds.add(job.jobId);
          clearPersistedImportJob();
          const realWarnings = result.warnings.filter((w) => w.type !== "info");
          const infoItems = result.warnings.filter((w) => w.type === "info");
          const hasIssues = result.errors.length > 0 || realWarnings.length > 0 || result.failureMessage || importModeRef.current === "update" && infoItems.length > 0;
          onImportErrorRef.current(
            result.errors,
            result.warnings,
            { success: result.successCount, total: result.total }
          );
          void onImportCompleteRef.current();
          onDismissRef.current();
        } catch (err) {
          const errMsg = err instanceof Error ? err.message : String(err);
          if (errMsg === IMPORT_POLL_CANCELLED || cancelledRef.current) return;
          if (firedJobIds.has(job.jobId)) return;
          firedJobIds.add(job.jobId);
          clearPersistedImportJob();
          onImportErrorRef.current(
            [{ rowNumber: 0, identifier: "Import", error: errMsg }],
            [],
            { success: 0, total: job.totalRows }
          );
          void onImportCompleteRef.current();
          onDismissRef.current();
        }
      })();
      return () => {
        cancelledRef.current = true;
      };
    }, [job.jobId, job.totalRows]);
    const pct = progress2.total > 0 ? Math.round(progress2.processed / progress2.total * 100) : 0;
    return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "mx-0 mb-3 rounded-lg border border-primary/30 bg-primary/5 px-4 py-2.5 flex items-center gap-3 text-sm", children: [
      /* @__PURE__ */ jsxRuntime.jsx("div", { className: "h-4 w-4 shrink-0 rounded-full border-2 border-primary border-t-transparent animate-spin" }),
      /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex-1 min-w-0", children: [
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center justify-between mb-1", children: [
          /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "font-medium text-foreground tabular-nums", children: [
            "Importing users — ",
            progress2.processed,
            " / ",
            progress2.total,
            " rows"
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "text-primary tabular-nums ml-4", children: [
            pct,
            "%"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsx("div", { className: "h-1.5 rounded-full bg-primary/15 overflow-hidden", children: /* @__PURE__ */ jsxRuntime.jsx(
          "div",
          {
            className: "h-full rounded-full bg-primary transition-all duration-500",
            style: { width: `${pct}%` }
          }
        ) })
      ] })
    ] });
  };
  const ImportErrorReport = ({
    errors,
    warnings = [],
    successCount,
    totalCount,
    isOpen,
    onClose,
    importType,
    jobMeta
  }) => {
    const infoItems = warnings.filter((w) => w.type === "info");
    const realWarnings = warnings.filter((w) => w.type !== "info");
    const additionsByUser = infoItems.reduce(
      (acc, item) => {
        if (!acc[item.identifier]) acc[item.identifier] = {};
        if (!acc[item.identifier][item.rowNumber]) acc[item.identifier][item.rowNumber] = [];
        acc[item.identifier][item.rowNumber].push(item);
        return acc;
      },
      {}
    );
    const downloadErrorReport = () => {
      const headers = ["Row Number", "Identifier", "Field", "Type", "Message", "Raw Data"];
      const allIssues = [
        ...errors.map((err) => [err.rowNumber, err.identifier, err.field || "N/A", "Error", err.error, err.rawData ? JSON.stringify(err.rawData) : ""]),
        ...realWarnings.map((warn) => [warn.rowNumber, warn.identifier, warn.field || "N/A", "Warning", warn.error, warn.rawData ? JSON.stringify(warn.rawData) : ""]),
        ...infoItems.map((info) => [info.rowNumber, info.identifier, info.field || "N/A", "Added", info.error, info.rawData ? JSON.stringify(info.rawData) : ""])
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
          errors.length > 0 ? /* @__PURE__ */ jsxRuntime.jsx(CircleAlert, { className: "h-5 w-5 text-destructive" }) : realWarnings.length > 0 ? /* @__PURE__ */ jsxRuntime.jsx(TriangleAlert, { className: "h-5 w-5 text-yellow-600" }) : /* @__PURE__ */ jsxRuntime.jsx(CircleCheck, { className: "h-5 w-5 text-green-600" }),
          "Import Report: ",
          importType
        ] }),
        /* @__PURE__ */ jsxRuntime.jsx(dialog.DialogDescription, { children: "Review the import results and download detailed error and warning information" })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-4 overflow-y-auto", children: [
        jobMeta && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground border-b pb-3", children: [
          jobMeta.filename && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "font-medium text-foreground", children: jobMeta.filename }),
          jobMeta.importMode && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "capitalize", children: jobMeta.importMode === "update" ? "Update existing" : "Create new" }),
          jobMeta.status && /* @__PURE__ */ jsxRuntime.jsx(badge.Badge, { variant: "outline", className: jobMeta.status === "completed" ? "border-green-300 text-green-700" : jobMeta.status === "failed" ? "border-destructive text-destructive" : "border-muted text-muted-foreground", children: jobMeta.status }),
          jobMeta.createdByName && /* @__PURE__ */ jsxRuntime.jsxs("span", { children: [
            "by ",
            jobMeta.createdByName
          ] }),
          jobMeta.createdAt && /* @__PURE__ */ jsxRuntime.jsx("span", { children: new Date(jobMeta.createdAt).toLocaleString() })
        ] }),
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
            /* @__PURE__ */ jsxRuntime.jsx("div", { className: "text-2xl font-bold text-yellow-700", children: realWarnings.length }),
            /* @__PURE__ */ jsxRuntime.jsx("div", { className: "text-sm text-yellow-600", children: "Warnings" })
          ] }),
          infoItems.length > 0 ? /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "p-4 bg-emerald-50 border border-emerald-200 rounded-lg", children: [
            /* @__PURE__ */ jsxRuntime.jsx("div", { className: "text-2xl font-bold text-emerald-700", children: infoItems.length }),
            /* @__PURE__ */ jsxRuntime.jsx("div", { className: "text-sm text-emerald-600", children: "Changes" })
          ] }) : /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "p-4 bg-blue-50 border border-blue-200 rounded-lg", children: [
            /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "text-2xl font-bold text-blue-700", children: [
              errorRate,
              "%"
            ] }),
            /* @__PURE__ */ jsxRuntime.jsx("div", { className: "text-sm text-blue-600", children: "Error Rate" })
          ] })
        ] }),
        (errors.length > 0 || realWarnings.length > 0 || infoItems.length > 0) && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex gap-2", children: /* @__PURE__ */ jsxRuntime.jsx(button.Button, { onClick: downloadErrorReport, variant: "outline", size: "icon", children: /* @__PURE__ */ jsxRuntime.jsx(Download, { className: "h-4 w-4" }) }) }),
        infoItems.length > 0 && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntime.jsxs("h4", { className: "font-semibold text-sm text-emerald-800", children: [
            "Changes by user (",
            Object.keys(additionsByUser).length,
            " user",
            Object.keys(additionsByUser).length !== 1 ? "s" : "",
            ", ",
            infoItems.length,
            " change",
            infoItems.length !== 1 ? "s" : "",
            ")"
          ] }),
          /* @__PURE__ */ jsxRuntime.jsx(scrollArea.ScrollArea, { className: `border border-emerald-200 rounded-lg p-4 ${errors.length > 0 || realWarnings.length > 0 ? "h-[200px]" : "h-[300px]"}`, children: /* @__PURE__ */ jsxRuntime.jsx("div", { className: "space-y-3", children: Object.entries(additionsByUser).map(([email, rowMap]) => /* @__PURE__ */ jsxRuntime.jsxs(alert.Alert, { variant: "default", className: "bg-emerald-50 border-emerald-200", children: [
            /* @__PURE__ */ jsxRuntime.jsx(CircleCheck, { className: "h-4 w-4 text-emerald-600" }),
            /* @__PURE__ */ jsxRuntime.jsx(alert.AlertDescription, { children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntime.jsx("span", { className: "font-semibold text-sm text-emerald-900", children: email }),
              Object.entries(rowMap).map(([rowNum, items]) => /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                /* @__PURE__ */ jsxRuntime.jsxs(badge.Badge, { variant: "outline", className: "text-xs", children: [
                  "Row ",
                  rowNum
                ] }),
                items.map((item, i) => /* @__PURE__ */ jsxRuntime.jsxs(badge.Badge, { variant: "secondary", className: "text-xs bg-emerald-100 text-emerald-800", children: [
                  item.field,
                  ": ",
                  item.error
                ] }, i))
              ] }, rowNum))
            ] }) })
          ] }, email)) }) })
        ] }),
        errors.length > 0 || realWarnings.length > 0 ? /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntime.jsxs("h4", { className: "font-semibold text-sm", children: [
            "Issues (",
            errors.length + realWarnings.length,
            ")"
          ] }),
          /* @__PURE__ */ jsxRuntime.jsx(scrollArea.ScrollArea, { className: "h-[300px] border rounded-lg p-4", children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-3", children: [
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
            realWarnings.map((warning, index) => /* @__PURE__ */ jsxRuntime.jsxs(
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
        ] }) : infoItems.length === 0 ? /* @__PURE__ */ jsxRuntime.jsx(alert.Alert, { className: "bg-green-50 border-green-200", children: /* @__PURE__ */ jsxRuntime.jsx(alert.AlertDescription, { className: "text-green-800", children: "All rows imported successfully! No errors or warnings to report." }) }) : null,
        (errors.length > 0 || realWarnings.length > 0) && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "bg-yellow-50 border border-yellow-200 rounded-lg p-4", children: [
          /* @__PURE__ */ jsxRuntime.jsx("h4", { className: "font-semibold text-sm text-yellow-900 mb-2", children: "Troubleshooting Tips" }),
          /* @__PURE__ */ jsxRuntime.jsx("div", { className: "max-h-32 overflow-y-auto", children: /* @__PURE__ */ jsxRuntime.jsxs("ul", { className: "text-sm text-yellow-800 space-y-1 list-disc list-inside pr-2", children: [
            errors.length > 0 && /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
              /* @__PURE__ */ jsxRuntime.jsx("li", { children: "Verify that all required fields are present in your CSV" }),
              /* @__PURE__ */ jsxRuntime.jsx("li", { children: "Check for special characters or formatting issues" }),
              /* @__PURE__ */ jsxRuntime.jsx("li", { children: "Ensure email addresses are valid and not duplicates" }),
              /* @__PURE__ */ jsxRuntime.jsx("li", { children: "Review the error messages for specific guidance" })
            ] }),
            realWarnings.length > 0 && /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
              /* @__PURE__ */ jsxRuntime.jsx("li", { children: "Users with invalid locations were still created successfully" }),
              /* @__PURE__ */ jsxRuntime.jsx("li", { children: "You can assign locations manually after import using the user management interface" }),
              /* @__PURE__ */ jsxRuntime.jsx("li", { children: "Check the locations table to see available valid location names" }),
              /* @__PURE__ */ jsxRuntime.jsx("li", { children: "Consider updating your import template with correct location names" })
            ] }),
            /* @__PURE__ */ jsxRuntime.jsx("li", { children: "Download the report to fix issues in bulk" })
          ] }) })
        ] })
      ] })
    ] }) });
  };
  const PAGE_SIZE_STORAGE_KEY = "staysecure:user-management-page-size";
  const VALID_PAGE_SIZES = [50, 100, 200];
  function readStoredPageSize() {
    try {
      const raw = localStorage.getItem(PAGE_SIZE_STORAGE_KEY);
      const n = Number(raw);
      return VALID_PAGE_SIZES.includes(n) ? n : 50;
    } catch {
      return 50;
    }
  }
  const UserManagement = () => {
    const { supabaseClient } = useOrganisationContext();
    const { profiles, loading, updateProfile, refetch } = useUserProfiles.useUserProfiles();
    const { isSuperAdmin } = useUserRole.useUserRole();
    const { toast } = useToast$1.useToast();
    const visibleProfiles = isSuperAdmin ? profiles : profiles.filter((p) => p.access_level !== "super_admin");
    const [viewMode, setViewMode] = useViewPreference.useViewPreference("userManagement", "cards");
    const [searchTerm, setSearchTerm] = React.useState("");
    const [pageSize, setPageSize] = React.useState(readStoredPageSize);
    const [currentPage, setCurrentPage] = React.useState(1);
    React.useEffect(() => {
      setCurrentPage(1);
    }, [searchTerm, pageSize]);
    const filteredProfiles = visibleProfiles.filter((p) => {
      var _a, _b, _c, _d;
      if (!searchTerm) return true;
      const search = searchTerm.toLowerCase();
      return ((_a = p.full_name) == null ? void 0 : _a.toLowerCase().includes(search)) || ((_b = p.email) == null ? void 0 : _b.toLowerCase().includes(search)) || ((_c = p.location) == null ? void 0 : _c.toLowerCase().includes(search)) || ((_d = p.status) == null ? void 0 : _d.toLowerCase().includes(search));
    });
    const totalPages = Math.max(1, Math.ceil(filteredProfiles.length / pageSize));
    const safePage = Math.min(currentPage, totalPages);
    const paginatedProfiles = filteredProfiles.slice((safePage - 1) * pageSize, safePage * pageSize);
    const handlePageSizeChange = (val) => {
      const n = Number(val);
      setPageSize(n);
      try {
        localStorage.setItem(PAGE_SIZE_STORAGE_KEY, String(n));
      } catch {
      }
    };
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
    const [userToDelete, setUserToDelete] = React.useState(null);
    const [isDeleting, setIsDeleting] = React.useState(false);
    const [showImportErrorReport, setShowImportErrorReport] = React.useState(false);
    const [importErrors, setImportErrors] = React.useState([]);
    const [importWarnings, setImportWarnings] = React.useState([]);
    const [importStats, setImportStats] = React.useState({ success: 0, total: 0 });
    const [importJobMeta, setImportJobMeta] = React.useState(void 0);
    const [lastJobMeta, setLastJobMeta] = React.useState(null);
    const [isLoadingLastJob, setIsLoadingLastJob] = React.useState(false);
    const fetchLastJob = async () => {
      const { data } = await supabaseClient.from("user_import_jobs").select("id, original_filename, import_mode, status, succeeded_rows, failed_rows, total_rows, last_error, created_by, created_at").order("created_at", { ascending: false }).limit(1).maybeSingle();
      setLastJobMeta(data ?? null);
    };
    React.useEffect(() => {
      void fetchLastJob();
    }, []);
    const handleShowLastImport = async () => {
      if (!lastJobMeta) return;
      setIsLoadingLastJob(true);
      try {
        const { data: failRows } = await supabaseClient.from("user_import_job_rows").select("row_index, row_payload, error_message").eq("job_id", lastJobMeta.id).eq("status", "failed");
        const { data: warnRows } = await supabaseClient.from("user_import_job_rows").select("row_index, row_payload, error_message").eq("job_id", lastJobMeta.id).eq("status", "succeeded").not("error_message", "is", null);
        const errors = (failRows || []).map((fr) => {
          const row = fr.row_payload;
          return { rowNumber: fr.row_index + 2, identifier: row["Email"] || row["email"] || "Unknown", error: fr.error_message || "Failed", rawData: row };
        });
        const warnings = [];
        for (const wr of warnRows || []) {
          const row = wr.row_payload;
          const email = row["Email"] || row["email"] || "Unknown";
          const rowNumber = wr.row_index + 2;
          if (wr.error_message) warnings.push({ rowNumber, identifier: email, field: "Note", error: wr.error_message, rawData: row });
        }
        const creator = lastJobMeta.created_by ? profiles.find((p) => p.id === lastJobMeta.created_by || p["user_id"] === lastJobMeta.created_by) : null;
        setImportErrors(errors);
        setImportWarnings(warnings);
        setImportStats({ success: lastJobMeta.succeeded_rows, total: lastJobMeta.total_rows });
        setImportJobMeta({
          filename: lastJobMeta.original_filename,
          importMode: lastJobMeta.import_mode,
          status: lastJobMeta.status,
          createdByName: (creator == null ? void 0 : creator.full_name) || (creator == null ? void 0 : creator.email) || null,
          createdAt: lastJobMeta.created_at
        });
        setShowImportErrorReport(true);
      } finally {
        setIsLoadingLastJob(false);
      }
    };
    const [activeImportJob, setActiveImportJob] = React.useState(() => {
      return readPersistedImportJob();
    });
    const [isCreatingUser, setIsCreatingUser] = React.useState(false);
    const [isSendingActivations, setIsSendingActivations] = React.useState(false);
    const [showActivationConfirm, setShowActivationConfirm] = React.useState(false);
    const pendingProfiles = visibleProfiles.filter((p) => p.status === "Pending");
    const handleSendActivationEmails = async () => {
      if (pendingProfiles.length === 0) return;
      const pathParts = window.location.pathname.split("/").filter(Boolean);
      const reserved = ["admin", "activate-account", "reset-password", "forgot-password", "email-notifications"];
      const clientSegment = pathParts[0] && !reserved.includes(pathParts[0]) ? pathParts[0] : "";
      const redirectUrl = clientSegment ? `${window.location.origin}/${clientSegment}/activate-account` : `${window.location.origin}/activate-account`;
      debug.log("[UserManagement.sendActivationEmails] sending to", pendingProfiles.length, "pending users, redirectUrl:", redirectUrl);
      setIsSendingActivations(true);
      let sent = 0;
      let failed = 0;
      const BATCH_SIZE = 5;
      const BATCH_DELAY_MS = 1e3;
      for (let i = 0; i < pendingProfiles.length; i += BATCH_SIZE) {
        const batch = pendingProfiles.slice(i, i + BATCH_SIZE);
        await Promise.all(
          batch.map(async (profile) => {
            try {
              const { error } = await supabaseClient.functions.invoke("request-activation-link", {
                body: { email: profile.email, redirectUrl }
              });
              if (error) throw error;
              sent++;
            } catch (err) {
              debug.error("[UserManagement.sendActivationEmails] failed for", profile.email, err);
              failed++;
            }
          })
        );
        if (i + BATCH_SIZE < pendingProfiles.length) {
          await new Promise((resolve) => setTimeout(resolve, BATCH_DELAY_MS));
        }
      }
      setIsSendingActivations(false);
      toast({
        title: failed === 0 ? "Activation emails sent" : "Activation emails sent with errors",
        description: `${sent} sent${failed > 0 ? `, ${failed} failed` : ""} out of ${pendingProfiles.length} pending user${pendingProfiles.length !== 1 ? "s" : ""}`,
        variant: failed > 0 ? "destructive" : "default"
      });
    };
    const {
      isCreateDialogOpen,
      setIsCreateDialogOpen,
      newUser,
      setNewUser,
      resetNewUser
    } = useUserManagement.useUserManagement();
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
        ImportErrorReport,
        {
          errors: importErrors,
          warnings: importWarnings,
          successCount: importStats.success,
          totalCount: importStats.total,
          isOpen: showImportErrorReport,
          onClose: () => setShowImportErrorReport(false),
          importType: "Users",
          jobMeta: importJobMeta
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
              pendingProfiles.length > 0 && /* @__PURE__ */ jsxRuntime.jsxs(
                button.Button,
                {
                  variant: "outline",
                  size: "sm",
                  onClick: () => setShowActivationConfirm(true),
                  disabled: isSendingActivations,
                  className: "flex items-center gap-2",
                  children: [
                    /* @__PURE__ */ jsxRuntime.jsx(Mail, { className: "h-4 w-4" }),
                    isSendingActivations ? "Sending…" : `Send Activation Emails (${pendingProfiles.length})`
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntime.jsx(
                button.Button,
                {
                  variant: "outline",
                  size: "icon",
                  onClick: handleShowLastImport,
                  disabled: isLoadingLastJob || !lastJobMeta,
                  "aria-label": lastJobMeta ? `Last import: ${lastJobMeta.original_filename ?? "unknown"} (${lastJobMeta.status})` : "No import history",
                  title: lastJobMeta ? `${lastJobMeta.original_filename ?? "Import"} · ${lastJobMeta.import_mode} · ${lastJobMeta.succeeded_rows}/${lastJobMeta.total_rows} imported · ${lastJobMeta.status}` : "No import history",
                  children: /* @__PURE__ */ jsxRuntime.jsx(History, { className: "h-4 w-4" })
                }
              ),
              /* @__PURE__ */ jsxRuntime.jsx(
                ImportUsersDialog,
                {
                  onImportStart: (job) => {
                    setActiveImportJob(job);
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
          /* @__PURE__ */ jsxRuntime.jsxs(card.CardContent, { children: [
            activeImportJob && /* @__PURE__ */ jsxRuntime.jsx(
              UserImportProgressBanner,
              {
                job: activeImportJob,
                onImportComplete: async () => {
                  await refetch();
                  void fetchLastJob();
                },
                onImportError: (errors, warnings, stats) => {
                  setImportErrors(errors);
                  setImportWarnings(warnings);
                  setImportStats(stats);
                  setImportJobMeta(void 0);
                  setShowImportErrorReport(true);
                },
                onDismiss: () => {
                  clearPersistedImportJob();
                  setActiveImportJob(null);
                }
              },
              activeImportJob.jobId
            ),
            /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "relative mb-4", children: [
              /* @__PURE__ */ jsxRuntime.jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" }),
              /* @__PURE__ */ jsxRuntime.jsx(
                input.Input,
                {
                  placeholder: "Search users...",
                  value: searchTerm,
                  onChange: (e) => setSearchTerm(e.target.value),
                  className: "pl-10"
                }
              )
            ] }),
            viewMode === "cards" ? /* @__PURE__ */ jsxRuntime.jsx(UserList, { profiles: paginatedProfiles, onDelete: onDeleteUser }) : /* @__PURE__ */ jsxRuntime.jsx(UserTable, { profiles: paginatedProfiles, onDelete: onDeleteUser, onUpdate: onUpdateProfile }),
            filteredProfiles.length > 0 && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center justify-between mt-4 pt-4 border-t", children: [
              /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntime.jsx("span", { children: "Rows per page:" }),
                /* @__PURE__ */ jsxRuntime.jsxs(select.Select, { value: String(pageSize), onValueChange: handlePageSizeChange, children: [
                  /* @__PURE__ */ jsxRuntime.jsx(select.SelectTrigger, { className: "h-8 w-[70px]", children: /* @__PURE__ */ jsxRuntime.jsx(select.SelectValue, {}) }),
                  /* @__PURE__ */ jsxRuntime.jsx(select.SelectContent, { children: VALID_PAGE_SIZES.map((s) => /* @__PURE__ */ jsxRuntime.jsx(select.SelectItem, { value: String(s), children: s }, s)) })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-1 text-sm", children: [
                /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "text-muted-foreground mr-2", children: [
                  Math.min((safePage - 1) * pageSize + 1, filteredProfiles.length),
                  "–",
                  Math.min(safePage * pageSize, filteredProfiles.length),
                  " of ",
                  filteredProfiles.length
                ] }),
                /* @__PURE__ */ jsxRuntime.jsx(
                  button.Button,
                  {
                    variant: "outline",
                    size: "icon",
                    className: "h-8 w-8",
                    disabled: safePage <= 1,
                    onClick: () => setCurrentPage((p) => Math.max(1, p - 1)),
                    "aria-label": "Previous page",
                    children: /* @__PURE__ */ jsxRuntime.jsx(ChevronLeft, { className: "h-4 w-4" })
                  }
                ),
                /* @__PURE__ */ jsxRuntime.jsx(
                  button.Button,
                  {
                    variant: "outline",
                    size: "icon",
                    className: "h-8 w-8",
                    disabled: safePage >= totalPages,
                    onClick: () => setCurrentPage((p) => Math.min(totalPages, p + 1)),
                    "aria-label": "Next page",
                    children: /* @__PURE__ */ jsxRuntime.jsx(ChevronRight, { className: "h-4 w-4" })
                  }
                )
              ] })
            ] })
          ] })
        ] }),
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
      ] }),
      /* @__PURE__ */ jsxRuntime.jsx(alertDialog.AlertDialog, { open: showActivationConfirm, onOpenChange: setShowActivationConfirm, children: /* @__PURE__ */ jsxRuntime.jsxs(alertDialog.AlertDialogContent, { children: [
        /* @__PURE__ */ jsxRuntime.jsxs(alertDialog.AlertDialogHeader, { children: [
          /* @__PURE__ */ jsxRuntime.jsx(alertDialog.AlertDialogTitle, { children: "Send Activation Emails" }),
          /* @__PURE__ */ jsxRuntime.jsxs(alertDialog.AlertDialogDescription, { children: [
            "This will send an activation email to ",
            /* @__PURE__ */ jsxRuntime.jsx("strong", { children: pendingProfiles.length }),
            " pending user",
            pendingProfiles.length !== 1 ? "s" : "",
            ". They will receive a link to set their password and activate their account."
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs(alertDialog.AlertDialogFooter, { children: [
          /* @__PURE__ */ jsxRuntime.jsx(alertDialog.AlertDialogCancel, { children: "Cancel" }),
          /* @__PURE__ */ jsxRuntime.jsx(alertDialog.AlertDialogAction, { onClick: handleSendActivationEmails, children: "Send Emails" })
        ] })
      ] }) })
    ] });
  };
  const ImportRolesDialog = ({ onImportComplete, onImportError }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [uploadedFile, setUploadedFile] = React.useState(null);
    const [isProcessing, setIsProcessing] = React.useState(false);
    const { supabaseClient } = useOrganisationContext();
    const onDrop = React.useCallback((acceptedFiles) => {
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
  const RoleMembersDialog = ({
    isOpen,
    onOpenChange,
    roleId,
    roleName
  }) => {
    const { supabaseClient } = useOrganisationContext();
    const printRef = React.useRef(null);
    const { data: members = [], isLoading } = reactQuery.useQuery({
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
        const { data: profiles, error: profilesError } = await supabaseClient.from("profiles").select("id, full_name, email, status").in("id", userIds);
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
            email: (profile == null ? void 0 : profile.email) || "",
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
    const handlePrint = reactToPrint.useReactToPrint({
      content: () => printRef.current,
      documentTitle: roleName ? `${roleName} Members Report` : "All Role Members Report"
    });
    const handleExportExcel = () => {
      const worksheet = XLSX__namespace.utils.json_to_sheet(members.map((m) => ({
        Role: m.roleName,
        User: m.userName,
        Department: m.departmentName,
        Email: m.email,
        Status: m.status
      })));
      const workbook = XLSX__namespace.utils.book_new();
      XLSX__namespace.utils.book_append_sheet(workbook, worksheet, "Members");
      XLSX__namespace.writeFile(workbook, `${roleName ? roleName.replace(/\s/g, "_") : "All_Roles"}_Members_Report.xlsx`);
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
    return /* @__PURE__ */ jsxRuntime.jsx(dialog.Dialog, { open: isOpen, onOpenChange, children: /* @__PURE__ */ jsxRuntime.jsxs(dialog.DialogContent, { className: "max-w-4xl max-h-[90vh] overflow-y-auto", children: [
      /* @__PURE__ */ jsxRuntime.jsxs(dialog.DialogHeader, { children: [
        /* @__PURE__ */ jsxRuntime.jsxs(dialog.DialogTitle, { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntime.jsx(Users, { className: "h-5 w-5" }),
          roleName ? `${roleName} Members` : "All Role Members"
        ] }),
        /* @__PURE__ */ jsxRuntime.jsx(dialog.DialogDescription, { children: roleName ? `Users assigned to the ${roleName} role.` : "All users and their assigned roles." })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex justify-end gap-2 mb-4", children: [
        /* @__PURE__ */ jsxRuntime.jsxs(button.Button, { onClick: handlePrint, variant: "outline", size: "sm", children: [
          /* @__PURE__ */ jsxRuntime.jsx(Printer, { className: "h-4 w-4 mr-2" }),
          " Print"
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs(button.Button, { onClick: handleExportExcel, variant: "outline", size: "sm", children: [
          /* @__PURE__ */ jsxRuntime.jsx(Download, { className: "h-4 w-4 mr-2" }),
          " Export Excel"
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs(button.Button, { onClick: handleExportPDF, variant: "outline", size: "sm", children: [
          /* @__PURE__ */ jsxRuntime.jsx(Download, { className: "h-4 w-4 mr-2" }),
          " Export PDF"
        ] })
      ] }),
      isLoading ? /* @__PURE__ */ jsxRuntime.jsx("div", { className: "text-center py-8", children: "Loading members..." }) : members.length === 0 ? /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "text-center py-8 text-muted-foreground", children: [
        "No members found ",
        roleName ? `for ${roleName}` : "",
        "."
      ] }) : /* @__PURE__ */ jsxRuntime.jsx("div", { ref: printRef, children: /* @__PURE__ */ jsxRuntime.jsxs(table.Table, { children: [
        /* @__PURE__ */ jsxRuntime.jsx(table.TableHeader, { children: /* @__PURE__ */ jsxRuntime.jsxs(table.TableRow, { children: [
          /* @__PURE__ */ jsxRuntime.jsx(table.TableHead, { children: "Role" }),
          /* @__PURE__ */ jsxRuntime.jsx(table.TableHead, { children: "User" }),
          /* @__PURE__ */ jsxRuntime.jsx(table.TableHead, { children: "Department" }),
          /* @__PURE__ */ jsxRuntime.jsx(table.TableHead, { children: "Email" }),
          /* @__PURE__ */ jsxRuntime.jsx(table.TableHead, { children: "Status" })
        ] }) }),
        /* @__PURE__ */ jsxRuntime.jsx(table.TableBody, { children: members.map((member, index) => /* @__PURE__ */ jsxRuntime.jsxs(table.TableRow, { children: [
          /* @__PURE__ */ jsxRuntime.jsx(table.TableCell, { children: member.roleName }),
          /* @__PURE__ */ jsxRuntime.jsx(table.TableCell, { children: member.userName }),
          /* @__PURE__ */ jsxRuntime.jsx(table.TableCell, { children: member.departmentName }),
          /* @__PURE__ */ jsxRuntime.jsx(table.TableCell, { className: "text-muted-foreground", children: member.email }),
          /* @__PURE__ */ jsxRuntime.jsx(table.TableCell, { children: /* @__PURE__ */ jsxRuntime.jsx(badge.Badge, { variant: member.status === "Active" ? "default" : "secondary", children: member.status }) })
        ] }, index)) })
      ] }) })
    ] }) });
  };
  const RoleManagement = () => {
    const { supabaseClient, hasPermission } = useOrganisationContext();
    const { hasManagerAccess, hasAdminAccess, managedDepartments } = useManagerPermissions.useManagerPermissions();
    const isManagerOnly = hasManagerAccess && !hasAdminAccess;
    const managedDeptIds = React.useMemo(() => new Set(managedDepartments.map((d) => d.id)), [managedDepartments]);
    const queryClient = reactQuery.useQueryClient();
    const [isCreateDialogOpen, setIsCreateDialogOpen] = React.useState(false);
    const [editingRole, setEditingRole] = React.useState(null);
    const [showImportErrorReport, setShowImportErrorReport] = React.useState(false);
    const [importErrors, setImportErrors] = React.useState([]);
    const [importWarnings, setImportWarnings] = React.useState([]);
    const [importStats, setImportStats] = React.useState({ success: 0, total: 0 });
    const [formData, setFormData] = React.useState({
      name: "",
      description: "",
      department_id: "none",
      is_active: true
    });
    const [sortField, setSortField] = React.useState("name");
    const [sortDirection, setSortDirection] = React.useState("asc");
    const [isMembersDialogOpen, setIsMembersDialogOpen] = React.useState(false);
    const [selectedRoleForMembers, setSelectedRoleForMembers] = React.useState(null);
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
    const roles = React.useMemo(() => {
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
        ImportErrorReport,
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
            /* @__PURE__ */ jsxRuntime.jsx(
              button.Button,
              {
                onClick: () => {
                  setSelectedRoleForMembers(null);
                  setIsMembersDialogOpen(true);
                },
                size: "icon",
                variant: "outline",
                title: "View All Members",
                children: /* @__PURE__ */ jsxRuntime.jsx(Users, { className: "h-4 w-4" })
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
                    size: "icon",
                    onClick: () => {
                      setSelectedRoleForMembers({ id: role.role_id, name: role.name });
                      setIsMembersDialogOpen(true);
                    },
                    title: `View members with ${role.name} role`,
                    children: /* @__PURE__ */ jsxRuntime.jsx(Users, { className: "h-4 w-4" })
                  }
                ),
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
      /* @__PURE__ */ jsxRuntime.jsx(
        RoleMembersDialog,
        {
          isOpen: isMembersDialogOpen,
          onOpenChange: setIsMembersDialogOpen,
          roleId: selectedRoleForMembers == null ? void 0 : selectedRoleForMembers.id,
          roleName: selectedRoleForMembers == null ? void 0 : selectedRoleForMembers.name
        }
      ),
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
    const [isOpen, setIsOpen] = React.useState(false);
    const [uploadedFile, setUploadedFile] = React.useState(null);
    const [isProcessing, setIsProcessing] = React.useState(false);
    const { supabaseClient } = useOrganisationContext();
    const onDrop = React.useCallback((acceptedFiles) => {
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
  const DepartmentMembersDialog = ({
    isOpen,
    onOpenChange,
    departmentId,
    departmentName
  }) => {
    const { supabaseClient } = useOrganisationContext();
    const printRef = React.useRef(null);
    const { data: members = [], isLoading } = reactQuery.useQuery({
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
        const { data: profiles, error: profilesError } = await supabaseClient.from("profiles").select("id, full_name, email, status").in("id", userIds);
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
            email: (profile == null ? void 0 : profile.email) || "",
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
      const workbook = XLSX__namespace.utils.book_new();
      const worksheet = XLSX__namespace.utils.json_to_sheet(members.map((m) => ({
        "Department": m.departmentName,
        "User": m.userName,
        "Role": m.roleName,
        "Email": m.email,
        "Status": m.status
      })));
      XLSX__namespace.utils.book_append_sheet(workbook, worksheet, "Department Members");
      const fileName = departmentName ? `${departmentName.replace(/\s+/g, "_")}_members.xlsx` : "all_department_members.xlsx";
      XLSX__namespace.writeFile(workbook, fileName);
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
    return /* @__PURE__ */ jsxRuntime.jsx(dialog.Dialog, { open: isOpen, onOpenChange, children: /* @__PURE__ */ jsxRuntime.jsxs(dialog.DialogContent, { className: "max-w-4xl max-h-[80vh] overflow-hidden flex flex-col", children: [
      /* @__PURE__ */ jsxRuntime.jsxs(dialog.DialogHeader, { children: [
        /* @__PURE__ */ jsxRuntime.jsxs(dialog.DialogTitle, { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntime.jsx(Users, { className: "h-5 w-5" }),
          title
        ] }),
        /* @__PURE__ */ jsxRuntime.jsx(dialog.DialogDescription, { children: departmentName ? `Users assigned to ${departmentName}` : "All users grouped by department" })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex gap-2 py-2", children: [
        /* @__PURE__ */ jsxRuntime.jsxs(button.Button, { onClick: handlePrint, variant: "outline", size: "sm", children: [
          /* @__PURE__ */ jsxRuntime.jsx(Printer, { className: "h-4 w-4 mr-2" }),
          "Print"
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs(button.Button, { onClick: handleExportExcel, variant: "outline", size: "sm", children: [
          /* @__PURE__ */ jsxRuntime.jsx(Download, { className: "h-4 w-4 mr-2" }),
          "Excel"
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs(button.Button, { onClick: handleExportPDF, variant: "outline", size: "sm", children: [
          /* @__PURE__ */ jsxRuntime.jsx(FileText, { className: "h-4 w-4 mr-2" }),
          "PDF"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsx("div", { ref: printRef, className: "flex-1 overflow-auto", children: isLoading ? /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex items-center justify-center h-32", children: /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-muted-foreground", children: "Loading members..." }) }) : members.length === 0 ? /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex items-center justify-center h-32", children: /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-muted-foreground", children: "No members found" }) }) : /* @__PURE__ */ jsxRuntime.jsxs(table.Table, { children: [
        /* @__PURE__ */ jsxRuntime.jsx(table.TableHeader, { children: /* @__PURE__ */ jsxRuntime.jsxs(table.TableRow, { children: [
          !departmentId && /* @__PURE__ */ jsxRuntime.jsx(table.TableHead, { children: "Department" }),
          /* @__PURE__ */ jsxRuntime.jsx(table.TableHead, { children: "User" }),
          /* @__PURE__ */ jsxRuntime.jsx(table.TableHead, { children: "Role" }),
          /* @__PURE__ */ jsxRuntime.jsx(table.TableHead, { children: "Email" }),
          /* @__PURE__ */ jsxRuntime.jsx(table.TableHead, { children: "Status" })
        ] }) }),
        /* @__PURE__ */ jsxRuntime.jsx(table.TableBody, { children: members.map((member, index) => /* @__PURE__ */ jsxRuntime.jsxs(table.TableRow, { children: [
          !departmentId && /* @__PURE__ */ jsxRuntime.jsx(table.TableCell, { children: member.departmentName }),
          /* @__PURE__ */ jsxRuntime.jsx(table.TableCell, { className: "font-medium", children: member.userName }),
          /* @__PURE__ */ jsxRuntime.jsx(table.TableCell, { children: member.roleName }),
          /* @__PURE__ */ jsxRuntime.jsx(table.TableCell, { className: "text-muted-foreground", children: member.email }),
          /* @__PURE__ */ jsxRuntime.jsx(table.TableCell, { children: /* @__PURE__ */ jsxRuntime.jsx(badge.Badge, { variant: member.status === "Active" ? "default" : "secondary", children: member.status }) })
        ] }, index)) })
      ] }) }),
      /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "pt-2 border-t text-sm text-muted-foreground", children: [
        "Total: ",
        members.length,
        " member",
        members.length !== 1 ? "s" : ""
      ] })
    ] }) });
  };
  const DepartmentManagement = () => {
    const { supabaseClient, hasPermission } = useOrganisationContext();
    const { hasManagerAccess, hasAdminAccess, managedDepartments: managedDeptList } = useManagerPermissions.useManagerPermissions();
    const isManagerOnly = hasManagerAccess && !hasAdminAccess;
    const queryClient = reactQuery.useQueryClient();
    const [isCreateDialogOpen, setIsCreateDialogOpen] = React.useState(false);
    const [editingDepartment, setEditingDepartment] = React.useState(null);
    const [showImportErrorReport, setShowImportErrorReport] = React.useState(false);
    const [importErrors, setImportErrors] = React.useState([]);
    const [importWarnings, setImportWarnings] = React.useState([]);
    const [importStats, setImportStats] = React.useState({ success: 0, total: 0 });
    const [formData, setFormData] = React.useState({
      name: "",
      description: "",
      manager_id: "none"
    });
    const [sortField, setSortField] = React.useState("name");
    const [sortDirection, setSortDirection] = React.useState("asc");
    const [isMembersDialogOpen, setIsMembersDialogOpen] = React.useState(false);
    const [selectedDepartmentForMembers, setSelectedDepartmentForMembers] = React.useState(null);
    const { data: departmentsData, isLoading: departmentsLoading } = reactQuery.useQuery({
      queryKey: ["departments"],
      queryFn: async () => {
        const { data, error } = await supabaseClient.from("departments").select("*");
        if (error) throw error;
        return data;
      }
    });
    const departments = React.useMemo(() => {
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
        ImportErrorReport,
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
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntime.jsx(
              button.Button,
              {
                variant: "outline",
                size: "icon",
                onClick: () => {
                  setSelectedDepartmentForMembers(null);
                  setIsMembersDialogOpen(true);
                },
                title: "View all members",
                children: /* @__PURE__ */ jsxRuntime.jsx(Users, { className: "h-4 w-4" })
              }
            ),
            hasPermission("canManageDepartments") && /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
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
                    onClick: () => {
                      setSelectedDepartmentForMembers(department);
                      setIsMembersDialogOpen(true);
                    },
                    title: "View members",
                    children: /* @__PURE__ */ jsxRuntime.jsx(Users, { className: "h-4 w-4" })
                  }
                ),
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
      ] }) }),
      /* @__PURE__ */ jsxRuntime.jsx(
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
  const LocationMembersDialog = ({
    isOpen,
    onOpenChange,
    locationId,
    locationName
  }) => {
    const { supabaseClient } = useOrganisationContext();
    const printRef = React.useRef(null);
    const { data: members = [], isLoading } = reactQuery.useQuery({
      queryKey: ["location-members", locationId],
      queryFn: async () => {
        debug.log("[LocationMembersDialog] Fetching members, locationId:", locationId);
        let profileQuery = supabaseClient.from("profiles").select("id, full_name, email, status, location_id");
        if (locationId) {
          profileQuery = profileQuery.eq("location_id", locationId);
        } else {
          profileQuery = profileQuery.not("location_id", "is", null);
        }
        const { data: profiles, error: profilesError } = await profileQuery;
        debug.log("[LocationMembersDialog] profiles result:", { count: profiles == null ? void 0 : profiles.length, error: profilesError == null ? void 0 : profilesError.message });
        if (profilesError) throw profilesError;
        if (!profiles || profiles.length === 0) {
          debug.log("[LocationMembersDialog] No users found for location(s)");
          return [];
        }
        const userIds = profiles.map((p) => p.id);
        const locationIds = [...new Set(profiles.map((p) => p.location_id).filter(Boolean))];
        const locationNameMap = /* @__PURE__ */ new Map();
        if (locationIds.length > 0) {
          const { data: locationsData, error: locationsError } = await supabaseClient.from("locations").select("id, name").in("id", locationIds);
          debug.log("[LocationMembersDialog] locations result:", { count: locationsData == null ? void 0 : locationsData.length, error: locationsError == null ? void 0 : locationsError.message });
          if (locationsError) throw locationsError;
          (locationsData || []).forEach((l) => locationNameMap.set(l.id, l.name));
        }
        const { data: userProfileRoles, error: uprError } = await supabaseClient.from("user_profile_roles").select("user_id, role_id, is_primary").in("user_id", userIds);
        debug.log("[LocationMembersDialog] user_profile_roles result:", { count: userProfileRoles == null ? void 0 : userProfileRoles.length, error: uprError == null ? void 0 : uprError.message });
        if (uprError) throw uprError;
        const roleIds = [...new Set((userProfileRoles || []).map((upr) => upr.role_id).filter(Boolean))];
        let rolesData = [];
        if (roleIds.length > 0) {
          const { data: roles, error: rolesError } = await supabaseClient.from("roles").select("role_id, name").in("role_id", roleIds);
          debug.log("[LocationMembersDialog] roles result:", { count: roles == null ? void 0 : roles.length, error: rolesError == null ? void 0 : rolesError.message });
          if (rolesError) throw rolesError;
          rolesData = roles || [];
        }
        const { data: userDepts, error: userDeptsError } = await supabaseClient.from("user_departments").select("user_id, department_id, is_primary, departments(name)").in("user_id", userIds);
        debug.log("[LocationMembersDialog] user_departments result:", { count: userDepts == null ? void 0 : userDepts.length, error: userDeptsError == null ? void 0 : userDeptsError.message });
        if (userDeptsError) throw userDeptsError;
        const roleNameMap = /* @__PURE__ */ new Map();
        rolesData.forEach((r) => roleNameMap.set(r.role_id, r.name));
        const userRoleMap = /* @__PURE__ */ new Map();
        (userProfileRoles || []).forEach((upr) => {
          const roleName = roleNameMap.get(upr.role_id) || "No Role";
          if (upr.is_primary || !userRoleMap.has(upr.user_id)) {
            userRoleMap.set(upr.user_id, roleName);
          }
        });
        const userDeptMap = /* @__PURE__ */ new Map();
        (userDepts || []).forEach((ud) => {
          var _a;
          if (ud.is_primary || !userDeptMap.has(ud.user_id)) {
            userDeptMap.set(ud.user_id, ((_a = ud.departments) == null ? void 0 : _a.name) || "No Department");
          }
        });
        const memberData = profiles.map((p) => ({
          locationName: locationNameMap.get(p.location_id) || locationName || "Unknown",
          userName: p.full_name || "Unknown User",
          roleName: userRoleMap.get(p.id) || "No Role",
          departmentName: userDeptMap.get(p.id) || "No Department",
          email: p.email || "",
          status: p.status || "Unknown"
        }));
        memberData.sort((a, b) => {
          const locCompare = a.locationName.localeCompare(b.locationName);
          if (locCompare !== 0) return locCompare;
          return a.userName.localeCompare(b.userName);
        });
        debug.log("[LocationMembersDialog] Final member data:", memberData.length, "members");
        return memberData;
      },
      enabled: isOpen
    });
    const handlePrint = reactToPrint.useReactToPrint({
      content: () => printRef.current,
      documentTitle: locationName ? `${locationName} Members Report` : "All Location Members Report"
    });
    const handleExportExcel = () => {
      if (members.length === 0) return;
      const worksheet = XLSX__namespace.utils.json_to_sheet(members.map((m) => ({
        Location: m.locationName,
        User: m.userName,
        Role: m.roleName,
        Department: m.departmentName,
        Email: m.email,
        Status: m.status
      })));
      const workbook = XLSX__namespace.utils.book_new();
      XLSX__namespace.utils.book_append_sheet(workbook, worksheet, "Location Members");
      const fileName = locationName ? `${locationName.replace(/\s+/g, "_")}_members.xlsx` : "all_location_members.xlsx";
      XLSX__namespace.writeFile(workbook, fileName);
    };
    const handleExportPDF = () => {
      if (members.length === 0) return;
      const doc = new jsPDF();
      doc.setFontSize(18);
      doc.text(locationName ? `${locationName} Members` : "Location Members Report", 14, 20);
      doc.setFontSize(10);
      doc.text(`Generated: ${(/* @__PURE__ */ new Date()).toLocaleDateString()}`, 14, 28);
      doc.text(`Total Members: ${members.length}`, 14, 34);
      autoTable(doc, {
        head: [["Location", "User", "Role", "Department", "Email", "Status"]],
        body: members.map((m) => [
          m.locationName,
          m.userName,
          m.roleName,
          m.departmentName,
          m.email,
          m.status
        ]),
        startY: 40,
        styles: { fontSize: 9 },
        headStyles: { fillColor: [41, 128, 185] }
      });
      const fileName = locationName ? `${locationName.replace(/\s+/g, "_")}_members.pdf` : "all_location_members.pdf";
      doc.save(fileName);
    };
    const title = locationName ? `${locationName} Members` : "All Location Members";
    return /* @__PURE__ */ jsxRuntime.jsx(dialog.Dialog, { open: isOpen, onOpenChange, children: /* @__PURE__ */ jsxRuntime.jsxs(dialog.DialogContent, { className: "max-w-4xl max-h-[90vh] overflow-hidden flex flex-col", children: [
      /* @__PURE__ */ jsxRuntime.jsxs(dialog.DialogHeader, { children: [
        /* @__PURE__ */ jsxRuntime.jsxs(dialog.DialogTitle, { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntime.jsx(Users, { className: "h-5 w-5" }),
          title
        ] }),
        /* @__PURE__ */ jsxRuntime.jsx(dialog.DialogDescription, { children: locationName ? `Users assigned to ${locationName}` : "All users grouped by location" })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex gap-2 py-2", children: [
        /* @__PURE__ */ jsxRuntime.jsxs(button.Button, { onClick: handlePrint, variant: "outline", size: "sm", children: [
          /* @__PURE__ */ jsxRuntime.jsx(Printer, { className: "h-4 w-4 mr-2" }),
          "Print"
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs(button.Button, { onClick: handleExportExcel, variant: "outline", size: "sm", children: [
          /* @__PURE__ */ jsxRuntime.jsx(Download, { className: "h-4 w-4 mr-2" }),
          "Excel"
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs(button.Button, { onClick: handleExportPDF, variant: "outline", size: "sm", children: [
          /* @__PURE__ */ jsxRuntime.jsx(FileText, { className: "h-4 w-4 mr-2" }),
          "PDF"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsx("div", { ref: printRef, className: "flex-1 overflow-auto", children: isLoading ? /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex items-center justify-center h-32", children: /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-muted-foreground", children: "Loading members..." }) }) : members.length === 0 ? /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex items-center justify-center h-32", children: /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-muted-foreground", children: "No members found" }) }) : /* @__PURE__ */ jsxRuntime.jsxs(table.Table, { children: [
        /* @__PURE__ */ jsxRuntime.jsx(table.TableHeader, { children: /* @__PURE__ */ jsxRuntime.jsxs(table.TableRow, { children: [
          !locationId && /* @__PURE__ */ jsxRuntime.jsx(table.TableHead, { children: "Location" }),
          /* @__PURE__ */ jsxRuntime.jsx(table.TableHead, { children: "User" }),
          /* @__PURE__ */ jsxRuntime.jsx(table.TableHead, { children: "Role" }),
          /* @__PURE__ */ jsxRuntime.jsx(table.TableHead, { children: "Department" }),
          /* @__PURE__ */ jsxRuntime.jsx(table.TableHead, { children: "Email" }),
          /* @__PURE__ */ jsxRuntime.jsx(table.TableHead, { children: "Status" })
        ] }) }),
        /* @__PURE__ */ jsxRuntime.jsx(table.TableBody, { children: members.map((member, index) => /* @__PURE__ */ jsxRuntime.jsxs(table.TableRow, { children: [
          !locationId && /* @__PURE__ */ jsxRuntime.jsx(table.TableCell, { children: member.locationName }),
          /* @__PURE__ */ jsxRuntime.jsx(table.TableCell, { className: "font-medium", children: member.userName }),
          /* @__PURE__ */ jsxRuntime.jsx(table.TableCell, { children: member.roleName }),
          /* @__PURE__ */ jsxRuntime.jsx(table.TableCell, { children: member.departmentName }),
          /* @__PURE__ */ jsxRuntime.jsx(table.TableCell, { className: "text-muted-foreground", children: member.email }),
          /* @__PURE__ */ jsxRuntime.jsx(table.TableCell, { children: /* @__PURE__ */ jsxRuntime.jsx(badge.Badge, { variant: member.status === "Active" ? "default" : "secondary", children: member.status }) })
        ] }, index)) })
      ] }) }),
      /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "pt-2 border-t text-sm text-muted-foreground", children: [
        "Total: ",
        members.length,
        " member",
        members.length !== 1 ? "s" : ""
      ] })
    ] }) });
  };
  const LocationManagement = () => {
    const { supabaseClient, hasPermission } = useOrganisationContext();
    const queryClient = reactQuery.useQueryClient();
    const [isCreateDialogOpen, setIsCreateDialogOpen] = React.useState(false);
    const [editingLocation, setEditingLocation] = React.useState(null);
    const [formData, setFormData] = React.useState({
      name: "",
      description: "",
      building: "",
      floor: "",
      room: "",
      status: "Active"
    });
    const [sortField, setSortField] = React.useState("name");
    const [sortDirection, setSortDirection] = React.useState("asc");
    const [isMembersDialogOpen, setIsMembersDialogOpen] = React.useState(false);
    const [selectedLocationForMembers, setSelectedLocationForMembers] = React.useState(null);
    const { data: locationsData, isLoading: locationsLoading } = reactQuery.useQuery({
      queryKey: ["locations"],
      queryFn: async () => {
        const { data, error } = await supabaseClient.from("locations").select("*");
        if (error) throw error;
        return data;
      }
    });
    const locations = React.useMemo(() => {
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
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntime.jsx(
              button.Button,
              {
                variant: "outline",
                size: "icon",
                onClick: () => {
                  setSelectedLocationForMembers(null);
                  setIsMembersDialogOpen(true);
                },
                title: "View all members",
                children: /* @__PURE__ */ jsxRuntime.jsx(Users, { className: "h-4 w-4" })
              }
            ),
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
                    onClick: () => {
                      setSelectedLocationForMembers(location);
                      setIsMembersDialogOpen(true);
                    },
                    title: "View members",
                    children: /* @__PURE__ */ jsxRuntime.jsx(Users, { className: "h-4 w-4" })
                  }
                ),
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
      /* @__PURE__ */ jsxRuntime.jsx(
        LocationMembersDialog,
        {
          isOpen: isMembersDialogOpen,
          onOpenChange: setIsMembersDialogOpen,
          locationId: selectedLocationForMembers == null ? void 0 : selectedLocationForMembers.id,
          locationName: selectedLocationForMembers == null ? void 0 : selectedLocationForMembers.name
        }
      ),
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
    const [loading, setLoading] = React.useState(false);
    const [certFile, setCertFile] = React.useState(null);
    const fileInputRef = React.useRef(null);
    const [formData, setFormData] = React.useState({
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
            useToast.toast({
              title: "Certificate added",
              description: "Record saved but file upload failed. You can try uploading the file again later.",
              variant: "destructive"
            });
          } else {
            await supabaseClient.from("certificates").update({ certificate_url: storagePath }).eq("id", newCert.id);
          }
        }
        useToast.toast({
          title: "Organisation certificate added",
          description: "Certificate has been successfully added to the organisation."
        });
        onOpenChange(false);
        resetForm();
        onSuccess == null ? void 0 : onSuccess();
      } catch (error) {
        useToast.toast({ title: "Error", description: error.message, variant: "destructive" });
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
        /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntime.jsx(label.Label, { children: "Certificate File (optional)" }),
          /* @__PURE__ */ jsxRuntime.jsx(
            "div",
            {
              className: "mt-1 flex items-center gap-3 rounded-md border border-dashed border-muted-foreground/40 px-4 py-3 cursor-pointer hover:bg-muted/40 transition-colors",
              onClick: () => {
                var _a;
                return (_a = fileInputRef.current) == null ? void 0 : _a.click();
              },
              children: certFile ? /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
                /* @__PURE__ */ jsxRuntime.jsx(FileText, { className: "h-4 w-4 text-muted-foreground shrink-0" }),
                /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-sm truncate", children: certFile.name }),
                /* @__PURE__ */ jsxRuntime.jsx(
                  "button",
                  {
                    type: "button",
                    className: "ml-auto text-muted-foreground hover:text-destructive",
                    onClick: (e) => {
                      e.stopPropagation();
                      setCertFile(null);
                      if (fileInputRef.current) fileInputRef.current.value = "";
                    },
                    children: /* @__PURE__ */ jsxRuntime.jsx(X, { className: "h-4 w-4" })
                  }
                )
              ] }) : /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
                /* @__PURE__ */ jsxRuntime.jsx(Upload, { className: "h-4 w-4 text-muted-foreground shrink-0" }),
                /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-sm text-muted-foreground", children: "Upload PDF, JPG, or PNG" })
              ] })
            }
          ),
          /* @__PURE__ */ jsxRuntime.jsx(
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
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex gap-2 justify-end", children: [
          /* @__PURE__ */ jsxRuntime.jsx(button.Button, { type: "button", variant: "outline", onClick: () => onOpenChange(false), size: "icon", children: /* @__PURE__ */ jsxRuntime.jsx(X, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsxRuntime.jsx(button.Button, { type: "submit", disabled: loading || !formData.name || !formData.issued_by || !formData.date_acquired, size: "icon", children: loading ? /* @__PURE__ */ jsxRuntime.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntime.jsx(Plus, { className: "h-4 w-4" }) })
        ] })
      ] })
    ] }) });
  };
  const OrganisationCertificates = () => {
    const { supabaseClient } = useOrganisationContext();
    const [certificates, setCertificates] = React.useState([]);
    const [userProfiles, setUserProfiles] = React.useState({});
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
    const [isAddDialogOpen, setIsAddDialogOpen] = React.useState(false);
    const formatDate2 = (dateString) => {
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
      return (profile == null ? void 0 : profile.full_name) || (profile == null ? void 0 : profile.email) || "Unknown User";
    };
    const fetchOrganisationCertificates = async () => {
      try {
        setLoading(true);
        setError(null);
        const { data: certificatesData, error: certificatesError } = await supabaseClient.from("certificates").select("*").eq("org_cert", true).order("created_at", { ascending: false });
        if (certificatesError) throw certificatesError;
        const userIds = [...new Set((certificatesData == null ? void 0 : certificatesData.map((cert) => cert.user_id)) || [])];
        if (userIds.length > 0) {
          const { data: profilesData, error: profilesError } = await supabaseClient.from("profiles").select("id, full_name, email").in("id", userIds);
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
    React.useEffect(() => {
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
                /* @__PURE__ */ jsxRuntime.jsx("span", { className: "font-medium", children: formatDate2(cert.date_acquired) })
              ] }),
              /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntime.jsx(Calendar, { className: "h-4 w-4 text-muted-foreground" }),
                /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-muted-foreground", children: "Expires:" }),
                /* @__PURE__ */ jsxRuntime.jsx("span", { className: "font-medium", children: formatDate2(cert.expiry_date) })
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
  const SearchableProfileField = ({
    value,
    onSelect,
    placeholder = "Select profile...",
    disabled = false
  }) => {
    const [open, setOpen] = React.useState(false);
    const [profiles, setProfiles] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [searchTerm, setSearchTerm] = React.useState("");
    React.useEffect(() => {
      fetchProfiles();
    }, []);
    const fetchProfiles = async () => {
      try {
        setLoading(true);
        const { data, error } = await client.supabase.from("profiles").select("id, full_name, email").not("full_name", "is", null).order("full_name");
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
        return ((_a = profile.full_name) == null ? void 0 : _a.toLowerCase().includes(searchTerm.toLowerCase())) || ((_b = profile.email) == null ? void 0 : _b.toLowerCase().includes(searchTerm.toLowerCase()));
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
                  /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex flex-col", children: /* @__PURE__ */ jsxRuntime.jsx("span", { children: profile.full_name }) })
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
    const [isEditing, setIsEditing] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const [saving, setSaving] = React.useState(false);
    const [uploadingLogo, setUploadingLogo] = React.useState(false);
    const [organisationData, setOrganisationData] = React.useState({});
    const [signatoryData, setSignatoryData] = React.useState({});
    const logoFileInputRef = React.useRef(null);
    const { isSuperAdmin, hasAdminAccess } = useUserRole.useUserRole();
    const { supabaseClient } = useOrganisationContext();
    debug.state("[OrganisationProfile] role flags", { isSuperAdmin, hasAdminAccess });
    const [requireMfa, setRequireMfa] = React.useState(false);
    const [mfaSaving, setMfaSaving] = React.useState(false);
    const [showDisableMfaConfirm, setShowDisableMfaConfirm] = React.useState(false);
    const [entraEnabled, setEntraEnabled] = React.useState(false);
    const [entraSaving, setEntraSaving] = React.useState(false);
    const [deviceEnabled, setDeviceEnabled] = React.useState(false);
    const [deviceSaving, setDeviceSaving] = React.useState(false);
    const [testingConnection, setTestingConnection] = React.useState(false);
    const SECRET_PLACEHOLDER = "••••••••";
    const [intuneSecretDraft, setIntuneSecretDraft] = React.useState("");
    const [ateraKeyDraft, setAteraKeyDraft] = React.useState("");
    const isLearnMode = typeof window !== "undefined" && (window.location.hostname.includes("learn") || window.location.port.startsWith("80"));
    const validatePhoneInput = (input2) => {
      return input2.replace(/[^0-9+\s\-()]/g, "");
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
        sonner.toast.error("Please upload an image (JPEG, PNG, GIF, WebP, or SVG)");
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        sonner.toast.error("Logo must be smaller than 2 MB");
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
        sonner.toast.success("Logo uploaded — click Save to apply");
      } catch (err) {
        console.error("Logo upload error:", err);
        sonner.toast.error("Failed to upload logo: " + (err.message ?? "unknown error"));
      } finally {
        setUploadingLogo(false);
        if (logoFileInputRef.current) logoFileInputRef.current.value = "";
      }
    };
    React.useEffect(() => {
      fetchOrganisationData();
    }, [supabaseClient]);
    React.useEffect(() => {
      debug.state("[OrganisationProfile] MFA toggle visibility", { hasAdminAccess, requireMfa, willShowToggle: hasAdminAccess });
    }, [hasAdminAccess, requireMfa]);
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
          setEntraEnabled(orgProfile.entra_enabled ?? false);
          setDeviceEnabled(!!orgProfile.device_source);
          setIntuneSecretDraft(orgProfile.intune_client_secret ? SECRET_PLACEHOLDER : "");
          setAteraKeyDraft(orgProfile.atera_api_key ? SECRET_PLACEHOLDER : "");
          debug.state("[OrganisationProfile] org_profile loaded", { require_mfa: orgProfile.require_mfa, entra_enabled: orgProfile.entra_enabled, device_source: orgProfile.device_source });
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
        sonner.toast.error("Failed to load organisation data");
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
        sonner.toast.success("Organisation profile updated successfully");
        setIsEditing(false);
      } catch (error) {
        console.error("Error saving organisation data:", error);
        sonner.toast.error("Failed to save organisation data");
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
      debug.log("[OrganisationProfile.handleMfaToggle] toggled", { enabled, hasAdminAccess });
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
              sonner.toast.warning("MFA requirement disabled, but some enrolled users may still be challenged until they log out.");
            } else {
              sonner.toast.success(res.data.message);
            }
          } catch (fnErr) {
            console.error("Bulk MFA reset error:", fnErr);
            sonner.toast.warning("MFA requirement disabled. Note: existing enrolled users may need a manual reset.");
          }
        } else {
          sonner.toast.success("MFA required for all users. They will be prompted on next login.");
        }
      } catch (err) {
        console.error("MFA toggle error:", err);
        sonner.toast.error("Failed to update MFA setting: " + (err.message ?? "unknown error"));
      } finally {
        setMfaSaving(false);
      }
    };
    const handleEntraToggle = async (enabled) => {
      setEntraSaving(true);
      try {
        const orgId = organisationData.id;
        let error;
        if (orgId) {
          ({ error } = await supabaseClient.from("org_profile").update({ entra_enabled: enabled }).eq("id", orgId));
        } else {
          const { data: inserted, error: insertError } = await supabaseClient.from("org_profile").insert({ entra_enabled: enabled }).select("id").single();
          error = insertError;
          if (inserted) setOrganisationData((prev) => ({ ...prev, id: inserted.id }));
        }
        if (error) throw error;
        setEntraEnabled(enabled);
        setOrganisationData((prev) => ({ ...prev, entra_enabled: enabled }));
        sonner.toast.success(enabled ? "Microsoft SSO enabled." : "Microsoft SSO disabled.");
      } catch (err) {
        console.error("Entra toggle error:", err);
        sonner.toast.error("Failed to update SSO setting: " + (err.message ?? "unknown error"));
      } finally {
        setEntraSaving(false);
      }
    };
    const handleDeviceToggle = async (enabled) => {
      setDeviceSaving(true);
      try {
        const orgId = organisationData.id;
        const newSource = enabled ? organisationData.device_source || "intune" : null;
        if (orgId) {
          const { error } = await supabaseClient.from("org_profile").update({ device_source: newSource }).eq("id", orgId);
          if (error) throw error;
        } else {
          const { data: inserted, error: insertError } = await supabaseClient.from("org_profile").insert({ device_source: newSource }).select("id").single();
          if (insertError) throw insertError;
          if (inserted) setOrganisationData((prev) => ({ ...prev, id: inserted.id }));
        }
        setDeviceEnabled(enabled);
        setOrganisationData((prev) => ({ ...prev, device_source: newSource }));
        sonner.toast.success(enabled ? "Device management enabled." : "Device management disabled.");
      } catch (err) {
        console.error("Device toggle error:", err);
        sonner.toast.error("Failed to update device management setting: " + (err.message ?? "unknown error"));
      } finally {
        setDeviceSaving(false);
      }
    };
    const handleSaveDeviceCredentials = async () => {
      try {
        setSaving(true);
        const orgId = organisationData.id;
        if (!orgId) {
          sonner.toast.error("Save organisation profile first.");
          return;
        }
        const updates = {
          device_source: organisationData.device_source,
          intune_client_id: organisationData.intune_client_id ?? null,
          atera_customer_id: organisationData.atera_customer_id ?? null
        };
        if (organisationData.device_source === "intune" && intuneSecretDraft && intuneSecretDraft !== SECRET_PLACEHOLDER) {
          await supabaseClient.rpc("upsert_vault_secret", {
            secret_name: "intune-client-secret",
            secret_value: intuneSecretDraft
          });
          updates.intune_client_secret = "intune-client-secret";
          setIntuneSecretDraft(SECRET_PLACEHOLDER);
        }
        if (organisationData.device_source === "atera" && ateraKeyDraft && ateraKeyDraft !== SECRET_PLACEHOLDER) {
          await supabaseClient.rpc("upsert_vault_secret", {
            secret_name: "atera-api-key",
            secret_value: ateraKeyDraft
          });
          updates.atera_api_key = "atera-api-key";
          setAteraKeyDraft(SECRET_PLACEHOLDER);
        }
        const { error } = await supabaseClient.from("org_profile").update(updates).eq("id", orgId);
        if (error) throw error;
        setOrganisationData((prev) => ({ ...prev, ...updates }));
        sonner.toast.success("Device management settings saved.");
      } catch (err) {
        console.error("Device credentials save error:", err);
        sonner.toast.error("Failed to save device settings: " + (err.message ?? "unknown error"));
      } finally {
        setSaving(false);
      }
    };
    const handleTestConnection = async () => {
      setTestingConnection(true);
      try {
        const { data, error } = await supabaseClient.functions.invoke("device-ingest/v1/sync", {
          method: "POST",
          body: { dry_run: true }
        });
        if (error || !(data == null ? void 0 : data.success)) {
          sonner.toast.error(`Connection test failed: ${(data == null ? void 0 : data.error) ?? (error == null ? void 0 : error.message) ?? "unknown error"}`);
        } else {
          sonner.toast.success(`Connection successful — ${data.synced_count} device(s) found via ${data.source}.`);
        }
      } catch (err) {
        sonner.toast.error("Connection test error: " + (err.message ?? "unknown error"));
      } finally {
        setTestingConnection(false);
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
          ] }),
          /* @__PURE__ */ jsxRuntime.jsx(separator.Separator, {}),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntime.jsx(label.Label, { children: "Organisation Logo" }),
            /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-xs text-muted-foreground", children: "Used on generated certificates alongside the RAYN logo. Recommended: transparent PNG or SVG, max 2 MB." }),
            organisationData.org_logo_url && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntime.jsx(
                "img",
                {
                  src: organisationData.org_logo_url,
                  alt: "Organisation logo",
                  className: "h-14 max-w-[160px] object-contain border rounded p-1 bg-muted"
                }
              ),
              isEditing && /* @__PURE__ */ jsxRuntime.jsxs(
                button.Button,
                {
                  type: "button",
                  variant: "ghost",
                  size: "sm",
                  onClick: () => setOrganisationData((prev) => ({ ...prev, org_logo_url: "" })),
                  children: [
                    /* @__PURE__ */ jsxRuntime.jsx(X, { className: "h-4 w-4 mr-1" }),
                    " Remove"
                  ]
                }
              )
            ] }),
            isEditing && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntime.jsx("div", { className: "space-y-1 flex-1", children: /* @__PURE__ */ jsxRuntime.jsx(
                input.Input,
                {
                  placeholder: "https://... (paste a URL, or upload a file below)",
                  value: organisationData.org_logo_url || "",
                  onChange: (e) => setOrganisationData((prev) => ({ ...prev, org_logo_url: e.target.value }))
                }
              ) }),
              /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-xs text-muted-foreground", children: "or" }),
              /* @__PURE__ */ jsxRuntime.jsxs(
                button.Button,
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
                    uploadingLogo ? /* @__PURE__ */ jsxRuntime.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin mr-1" }) : /* @__PURE__ */ jsxRuntime.jsx(Upload, { className: "h-4 w-4 mr-1" }),
                    "Upload"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntime.jsx(
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
            !organisationData.org_logo_url && !isEditing && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-2 text-muted-foreground text-sm", children: [
              /* @__PURE__ */ jsxRuntime.jsx(Image, { className: "h-4 w-4" }),
              /* @__PURE__ */ jsxRuntime.jsx("span", { children: "No logo uploaded" })
            ] })
          ] })
        ] })
      ] }),
      hasAdminAccess && /* @__PURE__ */ jsxRuntime.jsxs(card.Card, { children: [
        /* @__PURE__ */ jsxRuntime.jsx(card.CardHeader, { children: /* @__PURE__ */ jsxRuntime.jsx(card.CardTitle, { children: "Sign In & Devices" }) }),
        /* @__PURE__ */ jsxRuntime.jsxs(card.CardContent, { className: "space-y-6", children: [
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-2", children: [
                requireMfa ? /* @__PURE__ */ jsxRuntime.jsx(ShieldCheck, { className: "h-4 w-4 text-primary" }) : /* @__PURE__ */ jsxRuntime.jsx(Shield, { className: "h-4 w-4 text-muted-foreground" }),
                /* @__PURE__ */ jsxRuntime.jsx(label.Label, { htmlFor: "require-mfa-toggle", className: "text-sm font-medium cursor-pointer", children: "Require MFA" })
              ] }),
              /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-xs text-muted-foreground pl-6", children: "Users must enrol an authenticator app before accessing the platform. Admins always require MFA regardless of this setting." })
            ] }),
            /* @__PURE__ */ jsxRuntime.jsx(
              _switch.Switch,
              {
                id: "require-mfa-toggle",
                checked: requireMfa,
                onCheckedChange: handleMfaToggle,
                disabled: mfaSaving,
                "aria-label": "Require MFA for all users"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntime.jsx(separator.Separator, {}),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsxRuntime.jsx(label.Label, { htmlFor: "entra-toggle", className: "text-sm font-medium cursor-pointer", children: "Sign in with Microsoft" }),
                /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-xs text-muted-foreground", children: 'Show the "Sign in with Microsoft" button on the login page. Requires a Directory (tenant) ID.' })
              ] }),
              /* @__PURE__ */ jsxRuntime.jsx(
                _switch.Switch,
                {
                  id: "entra-toggle",
                  checked: entraEnabled,
                  onCheckedChange: handleEntraToggle,
                  disabled: entraSaving || !organisationData.azure_tenant_id && !entraEnabled,
                  "aria-label": "Enable Microsoft SSO"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntime.jsx(label.Label, { htmlFor: "azure-tenant-id", className: "text-sm", children: "Directory (tenant) ID" }),
              /* @__PURE__ */ jsxRuntime.jsx(
                input.Input,
                {
                  id: "azure-tenant-id",
                  placeholder: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
                  value: organisationData.azure_tenant_id || "",
                  onChange: (e) => setOrganisationData((prev) => ({ ...prev, azure_tenant_id: e.target.value })),
                  disabled: !isEditing || !isSuperAdmin,
                  className: "font-mono text-sm"
                }
              ),
              !isSuperAdmin && /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-xs text-muted-foreground", children: "Contact your RAYN administrator to update the tenant ID." })
            ] })
          ] }),
          !isLearnMode && /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
            /* @__PURE__ */ jsxRuntime.jsx(separator.Separator, {}),
            /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntime.jsx(MonitorSmartphone, { className: "h-4 w-4 text-muted-foreground" }),
                    /* @__PURE__ */ jsxRuntime.jsx(label.Label, { htmlFor: "device-toggle", className: "text-sm font-medium cursor-pointer", children: "Device Management" })
                  ] }),
                  /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-xs text-muted-foreground pl-6", children: "Sync devices from Intune or Atera into the hardware inventory." })
                ] }),
                /* @__PURE__ */ jsxRuntime.jsx(
                  _switch.Switch,
                  {
                    id: "device-toggle",
                    checked: deviceEnabled,
                    onCheckedChange: handleDeviceToggle,
                    disabled: deviceSaving,
                    "aria-label": "Enable device management"
                  }
                )
              ] }),
              deviceEnabled && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-4 pl-6", children: [
                /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsxRuntime.jsx(label.Label, { className: "text-sm", children: "Source" }),
                  /* @__PURE__ */ jsxRuntime.jsxs(
                    select.Select,
                    {
                      value: organisationData.device_source ?? "",
                      onValueChange: (val) => setOrganisationData((prev) => ({ ...prev, device_source: val })),
                      disabled: !isSuperAdmin,
                      children: [
                        /* @__PURE__ */ jsxRuntime.jsx(select.SelectTrigger, { className: "w-48", children: /* @__PURE__ */ jsxRuntime.jsx(select.SelectValue, { placeholder: "Select source…" }) }),
                        /* @__PURE__ */ jsxRuntime.jsxs(select.SelectContent, { children: [
                          /* @__PURE__ */ jsxRuntime.jsx(select.SelectItem, { value: "intune", children: "Intune" }),
                          /* @__PURE__ */ jsxRuntime.jsx(select.SelectItem, { value: "atera", children: "Atera" })
                        ] })
                      ]
                    }
                  )
                ] }),
                organisationData.device_source === "intune" && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-3", children: [
                  /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-xs text-muted-foreground", children: "Uses the Directory (tenant) ID above. Provide the app registration credentials below." }),
                  /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsxRuntime.jsx(label.Label, { htmlFor: "intune-client-id", className: "text-sm", children: "Application (client) ID" }),
                    /* @__PURE__ */ jsxRuntime.jsx(
                      input.Input,
                      {
                        id: "intune-client-id",
                        placeholder: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
                        value: organisationData.intune_client_id || "",
                        onChange: (e) => setOrganisationData((prev) => ({ ...prev, intune_client_id: e.target.value })),
                        disabled: !isSuperAdmin,
                        className: "font-mono text-sm"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsxRuntime.jsx(label.Label, { htmlFor: "intune-client-secret", className: "text-sm", children: "Client Secret" }),
                    /* @__PURE__ */ jsxRuntime.jsx(
                      input.Input,
                      {
                        id: "intune-client-secret",
                        type: "password",
                        placeholder: intuneSecretDraft || "Enter client secret…",
                        value: intuneSecretDraft === SECRET_PLACEHOLDER ? "" : intuneSecretDraft,
                        onFocus: () => {
                          if (intuneSecretDraft === SECRET_PLACEHOLDER) setIntuneSecretDraft("");
                        },
                        onBlur: () => {
                          if (!intuneSecretDraft && organisationData.intune_client_secret) setIntuneSecretDraft(SECRET_PLACEHOLDER);
                        },
                        onChange: (e) => setIntuneSecretDraft(e.target.value),
                        disabled: !isSuperAdmin,
                        className: "font-mono text-sm"
                      }
                    ),
                    organisationData.intune_client_secret && /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-xs text-muted-foreground", children: "Secret is stored securely. Enter a new value to rotate it." })
                  ] })
                ] }),
                organisationData.device_source === "atera" && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-3", children: [
                  /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsxRuntime.jsx(label.Label, { htmlFor: "atera-api-key", className: "text-sm", children: "API Key" }),
                    /* @__PURE__ */ jsxRuntime.jsx(
                      input.Input,
                      {
                        id: "atera-api-key",
                        type: "password",
                        placeholder: ateraKeyDraft || "Enter API key…",
                        value: ateraKeyDraft === SECRET_PLACEHOLDER ? "" : ateraKeyDraft,
                        onFocus: () => {
                          if (ateraKeyDraft === SECRET_PLACEHOLDER) setAteraKeyDraft("");
                        },
                        onBlur: () => {
                          if (!ateraKeyDraft && organisationData.atera_api_key) setAteraKeyDraft(SECRET_PLACEHOLDER);
                        },
                        onChange: (e) => setAteraKeyDraft(e.target.value),
                        disabled: !isSuperAdmin,
                        className: "font-mono text-sm"
                      }
                    ),
                    organisationData.atera_api_key && /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-xs text-muted-foreground", children: "Key is stored securely. Enter a new value to rotate it." })
                  ] }),
                  /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsxRuntime.jsx(label.Label, { htmlFor: "atera-customer-id", className: "text-sm", children: "Customer ID" }),
                    /* @__PURE__ */ jsxRuntime.jsx(
                      input.Input,
                      {
                        id: "atera-customer-id",
                        type: "number",
                        placeholder: "12345",
                        value: organisationData.atera_customer_id ?? "",
                        onChange: (e) => setOrganisationData((prev) => ({ ...prev, atera_customer_id: parseInt(e.target.value) || null })),
                        disabled: !isSuperAdmin,
                        className: "font-mono text-sm w-48"
                      }
                    )
                  ] })
                ] }),
                organisationData.device_source && isSuperAdmin && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-3 pt-1", children: [
                  /* @__PURE__ */ jsxRuntime.jsxs(
                    button.Button,
                    {
                      size: "sm",
                      onClick: handleSaveDeviceCredentials,
                      disabled: saving,
                      children: [
                        saving ? /* @__PURE__ */ jsxRuntime.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin mr-2" }) : null,
                        "Save credentials"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntime.jsxs(
                    button.Button,
                    {
                      size: "sm",
                      variant: "outline",
                      onClick: handleTestConnection,
                      disabled: testingConnection,
                      children: [
                        testingConnection ? /* @__PURE__ */ jsxRuntime.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin mr-2" }) : /* @__PURE__ */ jsxRuntime.jsx(FlaskConical, { className: "h-4 w-4 mr-2" }),
                        "Test connection"
                      ]
                    }
                  ),
                  organisationData.device_last_synced_at && /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                    "Last synced: ",
                    new Date(organisationData.device_last_synced_at).toLocaleString()
                  ] })
                ] })
              ] })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs(card.Card, { children: [
        /* @__PURE__ */ jsxRuntime.jsx(card.CardHeader, { children: /* @__PURE__ */ jsxRuntime.jsx(card.CardTitle, { children: "Key People & Compliance" }) }),
        /* @__PURE__ */ jsxRuntime.jsxs(card.CardContent, { className: "space-y-6 text-left", children: [
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
          ] }),
          !isLearnMode && /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
            /* @__PURE__ */ jsxRuntime.jsx(separator.Separator, {}),
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
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsx(alertDialog.AlertDialog, { open: showDisableMfaConfirm, onOpenChange: setShowDisableMfaConfirm, children: /* @__PURE__ */ jsxRuntime.jsxs(alertDialog.AlertDialogContent, { children: [
        /* @__PURE__ */ jsxRuntime.jsxs(alertDialog.AlertDialogHeader, { children: [
          /* @__PURE__ */ jsxRuntime.jsx(alertDialog.AlertDialogTitle, { children: "Disable MFA requirement?" }),
          /* @__PURE__ */ jsxRuntime.jsx(alertDialog.AlertDialogDescription, { children: "This will remove the MFA requirement for all non-admin users and automatically unenrol anyone who has already set it up. Admin accounts will still require MFA regardless of this setting." })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs(alertDialog.AlertDialogFooter, { children: [
          /* @__PURE__ */ jsxRuntime.jsx(alertDialog.AlertDialogCancel, { children: "Cancel" }),
          /* @__PURE__ */ jsxRuntime.jsx(alertDialog.AlertDialogAction, { onClick: () => applyMfaChange(false), children: "Disable & unenrol users" })
        ] })
      ] }) })
    ] });
  };
  const NEAR_CAPACITY_THRESHOLD = 0.8;
  function useLicenseData() {
    const { supabaseClient } = useOrganisationContext();
    return reactQuery.useQuery({
      queryKey: ["license-data"],
      queryFn: async () => {
        const { data: licenses, error: licenseError } = await supabaseClient.from("customer_product_licenses").select("id, product_id, seats, seats_author, start_date, end_date, products(name)");
        if (licenseError) throw licenseError;
        if (!licenses || licenses.length === 0) return { products: [], assignments: [] };
        const licenseIds = licenses.map((l) => l.id);
        const { data: rawAssignments, error: assignError } = await supabaseClient.from("product_license_assignments").select("id, license_id, user_id, access_level, profiles(full_name, email)").in("license_id", licenseIds);
        if (assignError) throw assignError;
        const countByLicense = /* @__PURE__ */ new Map();
        const authorCountByLicense = /* @__PURE__ */ new Map();
        (rawAssignments ?? []).forEach((a) => {
          countByLicense.set(a.license_id, (countByLicense.get(a.license_id) ?? 0) + 1);
          if (a.access_level === "author") {
            authorCountByLicense.set(a.license_id, (authorCountByLicense.get(a.license_id) ?? 0) + 1);
          }
        });
        const msPerDay = 1e3 * 60 * 60 * 24;
        const products = licenses.map((l) => {
          var _a;
          const used = countByLicense.get(l.id) ?? 0;
          const total = l.seats ?? 0;
          const available = Math.max(total - used, 0);
          const pctUsed = total > 0 ? used / total : 0;
          const seatsAuthor = l.seats_author ?? 0;
          const usedAuthorSeats = authorCountByLicense.get(l.id) ?? 0;
          const daysUntilExpiry = l.end_date ? Math.ceil((new Date(l.end_date).getTime() - Date.now()) / msPerDay) : null;
          return {
            licenseId: l.id,
            productId: l.product_id,
            productName: ((_a = l.products) == null ? void 0 : _a.name) ?? "Unknown Product",
            seats: total,
            usedSeats: used,
            availableSeats: available,
            pctUsed,
            isNearCapacity: total > 0 && pctUsed >= NEAR_CAPACITY_THRESHOLD,
            isAtCapacity: total > 0 && used >= total,
            seatsAuthor,
            usedAuthorSeats,
            availableAuthorSeats: Math.max(seatsAuthor - usedAuthorSeats, 0),
            startDate: l.start_date ?? null,
            endDate: l.end_date ?? null,
            daysUntilExpiry
          };
        });
        const licenseProductMap = new Map(licenses.map((l) => {
          var _a;
          return [l.id, ((_a = l.products) == null ? void 0 : _a.name) ?? "Unknown Product"];
        }));
        const licenseProductIdMap = new Map(licenses.map((l) => [l.id, l.product_id]));
        const assignments = (rawAssignments ?? []).map((a) => {
          var _a, _b;
          return {
            userId: a.user_id,
            userName: ((_a = a.profiles) == null ? void 0 : _a.full_name) ?? null,
            userEmail: ((_b = a.profiles) == null ? void 0 : _b.email) ?? null,
            licenseId: a.license_id,
            productId: licenseProductIdMap.get(a.license_id) ?? "",
            productName: licenseProductMap.get(a.license_id) ?? "Unknown Product",
            accessLevel: a.access_level
          };
        });
        return { products, assignments };
      },
      staleTime: 1e3 * 60 * 2
    });
  }
  function formatDate(dateStr) {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleDateString(void 0, {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  }
  const RAYN_EMAIL = "sales@raynsecure.com";
  function buildMailto(subject, body) {
    return `mailto:${RAYN_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }
  function ExpiryBadge({ daysUntilExpiry }) {
    if (daysUntilExpiry === null) return null;
    if (daysUntilExpiry < 0)
      return /* @__PURE__ */ jsxRuntime.jsx(badge.Badge, { variant: "destructive", children: "Expired" });
    if (daysUntilExpiry <= 30)
      return /* @__PURE__ */ jsxRuntime.jsxs(badge.Badge, { variant: "outline", className: "border-amber-500 text-amber-700 bg-amber-50", children: [
        "Expires in ",
        daysUntilExpiry,
        "d"
      ] });
    return /* @__PURE__ */ jsxRuntime.jsxs(badge.Badge, { variant: "outline", className: "border-green-500 text-green-700 bg-green-50", children: [
      daysUntilExpiry,
      "d remaining"
    ] });
  }
  function ProductSummaryCard({ product, hasAdminAccess }) {
    const pct = Math.min(product.pctUsed * 100, 100);
    const barColor = product.isAtCapacity ? "bg-destructive" : product.isNearCapacity ? "bg-amber-500" : "bg-primary";
    return /* @__PURE__ */ jsxRuntime.jsxs(card.Card, { children: [
      /* @__PURE__ */ jsxRuntime.jsxs(card.CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [
        /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntime.jsxs(card.CardTitle, { className: "flex items-center gap-2 text-base", children: [
            /* @__PURE__ */ jsxRuntime.jsx(Key, { className: "h-4 w-4 text-muted-foreground" }),
            product.productName
          ] }),
          /* @__PURE__ */ jsxRuntime.jsx(card.CardDescription, { children: "Seat consumption" })
        ] }),
        hasAdminAccess && /* @__PURE__ */ jsxRuntime.jsxs(
          "a",
          {
            href: buildMailto(
              `License Management Request — ${product.productName}`,
              `Hi RAYN Team,

I'd like to discuss license management for ${product.productName}.

Current usage: ${product.usedSeats} of ${product.seats} seats (${Math.round(product.pctUsed * 100)}%)

Please get in touch at your earliest convenience.

Thank you`
            ),
            className: "inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors",
            children: [
              "Manage Licenses ",
              /* @__PURE__ */ jsxRuntime.jsx(Mail, { className: "h-3 w-3" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs(card.CardContent, { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center justify-between text-sm", children: [
            /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "font-medium flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntime.jsx(Users, { className: "h-4 w-4 text-muted-foreground" }),
              product.usedSeats,
              " of ",
              product.seats,
              " seats used"
            ] }),
            /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "text-muted-foreground", children: [
              product.availableSeats,
              " available"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntime.jsx("div", { className: "h-2 w-full rounded-full bg-muted overflow-hidden", children: /* @__PURE__ */ jsxRuntime.jsx("div", { className: `h-full rounded-full transition-all ${barColor}`, style: { width: `${pct}%` } }) }),
          /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex justify-end", children: product.isAtCapacity ? /* @__PURE__ */ jsxRuntime.jsx(badge.Badge, { variant: "destructive", children: "At capacity" }) : product.isNearCapacity ? /* @__PURE__ */ jsxRuntime.jsxs(badge.Badge, { variant: "outline", className: "border-amber-500 text-amber-700 bg-amber-50", children: [
            Math.round(pct),
            "% used"
          ] }) : /* @__PURE__ */ jsxRuntime.jsxs(badge.Badge, { variant: "outline", className: "border-primary text-primary bg-primary/5", children: [
            /* @__PURE__ */ jsxRuntime.jsx(CircleCheck, { className: "h-3 w-3 mr-1" }),
            Math.round(pct),
            "% used"
          ] }) })
        ] }),
        product.seatsAuthor > 0 && (() => {
          const authorPct = Math.min(product.usedAuthorSeats / product.seatsAuthor * 100, 100);
          const authorAtCap = product.usedAuthorSeats >= product.seatsAuthor;
          const authorNearCap = !authorAtCap && authorPct >= 80;
          const authorBarColor = authorAtCap ? "bg-destructive" : authorNearCap ? "bg-amber-500" : "bg-primary/60";
          return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-2 border-t pt-3", children: [
            /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center justify-between text-sm", children: [
              /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "font-medium flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntime.jsx(Users, { className: "h-4 w-4 text-muted-foreground" }),
                product.usedAuthorSeats,
                " of ",
                product.seatsAuthor,
                " author seats used"
              ] }),
              /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "text-muted-foreground", children: [
                product.availableAuthorSeats,
                " available"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntime.jsx("div", { className: "h-2 w-full rounded-full bg-muted overflow-hidden", children: /* @__PURE__ */ jsxRuntime.jsx("div", { className: `h-full rounded-full transition-all ${authorBarColor}`, style: { width: `${authorPct}%` } }) }),
            /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex justify-end", children: authorAtCap ? /* @__PURE__ */ jsxRuntime.jsx(badge.Badge, { variant: "destructive", children: "Author seats full" }) : authorNearCap ? /* @__PURE__ */ jsxRuntime.jsxs(badge.Badge, { variant: "outline", className: "border-amber-500 text-amber-700 bg-amber-50", children: [
              Math.round(authorPct),
              "% author seats used"
            ] }) : /* @__PURE__ */ jsxRuntime.jsxs(badge.Badge, { variant: "outline", className: "border-primary/60 text-primary bg-primary/5", children: [
              /* @__PURE__ */ jsxRuntime.jsx(CircleCheck, { className: "h-3 w-3 mr-1" }),
              Math.round(authorPct),
              "% author seats used"
            ] }) })
          ] });
        })(),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex flex-wrap gap-4 border-t pt-3", children: [
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-0.5", children: [
            /* @__PURE__ */ jsxRuntime.jsxs("p", { className: "text-xs text-muted-foreground uppercase tracking-wide flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntime.jsx(Calendar, { className: "h-3 w-3" }),
              " Start"
            ] }),
            /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-sm font-medium", children: formatDate(product.startDate) })
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-0.5", children: [
            /* @__PURE__ */ jsxRuntime.jsxs("p", { className: "text-xs text-muted-foreground uppercase tracking-wide flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntime.jsx(Calendar, { className: "h-3 w-3" }),
              " End"
            ] }),
            /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-sm font-medium", children: formatDate(product.endDate) })
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-0.5", children: [
            /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-wide", children: "Status" }),
            /* @__PURE__ */ jsxRuntime.jsx(ExpiryBadge, { daysUntilExpiry: product.daysUntilExpiry })
          ] })
        ] })
      ] })
    ] });
  }
  function SortIcon({ col, sortCol, sortDir }) {
    if (col !== sortCol) return /* @__PURE__ */ jsxRuntime.jsx(ChevronsUpDown, { className: "h-3 w-3 ml-1 opacity-40" });
    return sortDir === "asc" ? /* @__PURE__ */ jsxRuntime.jsx(ChevronUp, { className: "h-3 w-3 ml-1" }) : /* @__PURE__ */ jsxRuntime.jsx(ChevronDown, { className: "h-3 w-3 ml-1" });
  }
  const LicenseDashboard = () => {
    const { data, isLoading, error } = useLicenseData();
    const { hasAdminAccess } = useUserRole.useUserRole();
    const [sortCol, setSortCol] = React.useState("name");
    const [sortDir, setSortDir] = React.useState("asc");
    const toggleSort = (col) => {
      if (col === sortCol) {
        setSortDir((d) => d === "asc" ? "desc" : "asc");
      } else {
        setSortCol(col);
        setSortDir("asc");
      }
    };
    if (isLoading) {
      return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-2 py-12 text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntime.jsx(LoaderCircle, { className: "h-5 w-5 animate-spin" }),
        "Loading license information..."
      ] });
    }
    if (error) {
      return /* @__PURE__ */ jsxRuntime.jsxs(alert.Alert, { variant: "destructive", children: [
        /* @__PURE__ */ jsxRuntime.jsx(TriangleAlert, { className: "h-4 w-4" }),
        /* @__PURE__ */ jsxRuntime.jsx(alert.AlertTitle, { children: "Failed to load license data" }),
        /* @__PURE__ */ jsxRuntime.jsx(alert.AlertDescription, { children: error.message ?? "An unexpected error occurred." })
      ] });
    }
    if (!data || data.products.length === 0) {
      return /* @__PURE__ */ jsxRuntime.jsxs(alert.Alert, { children: [
        /* @__PURE__ */ jsxRuntime.jsx(Key, { className: "h-4 w-4" }),
        /* @__PURE__ */ jsxRuntime.jsx(alert.AlertTitle, { children: "No licenses found" }),
        /* @__PURE__ */ jsxRuntime.jsxs(alert.AlertDescription, { children: [
          "No product licenses are configured for this organisation.",
          " ",
          hasAdminAccess && /* @__PURE__ */ jsxRuntime.jsxs(
            "a",
            {
              href: buildMailto(
                "License Configuration Request",
                "Hi RAYN Team,\n\nNo product licenses appear to be configured for our organisation. Could you please assist?\n\nThank you"
              ),
              className: "underline inline-flex items-center gap-1",
              children: [
                "Manage Licenses ",
                /* @__PURE__ */ jsxRuntime.jsx(Mail, { className: "h-3 w-3" })
              ]
            }
          )
        ] })
      ] });
    }
    const atCapacity = data.products.filter((p) => p.isAtCapacity);
    const nearCapacity = data.products.filter((p) => !p.isAtCapacity && p.isNearCapacity);
    const userMap = /* @__PURE__ */ new Map();
    (data.assignments ?? []).forEach((a) => {
      if (!userMap.has(a.userId)) {
        userMap.set(a.userId, {
          userId: a.userId,
          userName: a.userName,
          userEmail: a.userEmail,
          licenses: []
        });
      }
      userMap.get(a.userId).licenses.push({
        productName: a.productName,
        accessLevel: a.accessLevel
      });
    });
    const userGroups = Array.from(userMap.values()).sort((a, b) => {
      var _a, _b, _c, _d;
      let cmp = 0;
      if (sortCol === "name") {
        cmp = (a.userName ?? "").localeCompare(b.userName ?? "");
      } else if (sortCol === "email") {
        cmp = (a.userEmail ?? "").localeCompare(b.userEmail ?? "");
      } else if (sortCol === "product") {
        cmp = (((_a = a.licenses[0]) == null ? void 0 : _a.productName) ?? "").localeCompare(((_b = b.licenses[0]) == null ? void 0 : _b.productName) ?? "");
      } else if (sortCol === "access") {
        cmp = (((_c = a.licenses[0]) == null ? void 0 : _c.accessLevel) ?? "").localeCompare(((_d = b.licenses[0]) == null ? void 0 : _d.accessLevel) ?? "");
      }
      return sortDir === "asc" ? cmp : -cmp;
    });
    return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-6", children: [
      atCapacity.map((p) => /* @__PURE__ */ jsxRuntime.jsxs(alert.Alert, { variant: "destructive", children: [
        /* @__PURE__ */ jsxRuntime.jsx(TriangleAlert, { className: "h-4 w-4" }),
        /* @__PURE__ */ jsxRuntime.jsxs(alert.AlertTitle, { children: [
          p.productName,
          " — All seats in use"
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs(alert.AlertDescription, { className: "flex items-center justify-between flex-wrap gap-2", children: [
          /* @__PURE__ */ jsxRuntime.jsxs("span", { children: [
            "All ",
            p.seats,
            " seats are in use. New users cannot be added until a seat is freed."
          ] }),
          hasAdminAccess && /* @__PURE__ */ jsxRuntime.jsxs(
            "a",
            {
              href: buildMailto(
                `Seat Increase Request — ${p.productName}`,
                `Hi RAYN Team,

We have reached our seat limit for ${p.productName} (${p.seats} of ${p.seats} seats in use) and are unable to add new users.

Could you please increase our seat allocation?

Requested additional seats: [please fill in]

Thank you`
              ),
              className: "underline inline-flex items-center gap-1 whitespace-nowrap",
              children: [
                "Add more seats ",
                /* @__PURE__ */ jsxRuntime.jsx(Mail, { className: "h-3 w-3" })
              ]
            }
          )
        ] })
      ] }, p.licenseId)),
      nearCapacity.map((p) => /* @__PURE__ */ jsxRuntime.jsxs(alert.Alert, { className: "border-amber-300 bg-amber-50 text-amber-900", children: [
        /* @__PURE__ */ jsxRuntime.jsx(TriangleAlert, { className: "h-4 w-4 text-amber-600" }),
        /* @__PURE__ */ jsxRuntime.jsxs(alert.AlertTitle, { className: "text-amber-800", children: [
          p.productName,
          " — Approaching seat limit"
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs(alert.AlertDescription, { className: "flex items-center justify-between flex-wrap gap-2 text-amber-700", children: [
          /* @__PURE__ */ jsxRuntime.jsxs("span", { children: [
            p.usedSeats,
            " of ",
            p.seats,
            " seats in use (",
            Math.round(p.pctUsed * 100),
            "%)."
          ] }),
          hasAdminAccess && /* @__PURE__ */ jsxRuntime.jsxs(
            "a",
            {
              href: buildMailto(
                `Seat Increase Request — ${p.productName}`,
                `Hi RAYN Team,

We are approaching our seat limit for ${p.productName}.

Current usage: ${p.usedSeats} of ${p.seats} seats (${Math.round(p.pctUsed * 100)}%)

Could you please increase our seat allocation?

Requested additional seats: [please fill in]

Thank you`
              ),
              className: "underline inline-flex items-center gap-1 whitespace-nowrap",
              children: [
                "Increase your limit ",
                /* @__PURE__ */ jsxRuntime.jsx(Mail, { className: "h-3 w-3" })
              ]
            }
          )
        ] })
      ] }, p.licenseId)),
      (() => {
        const ORDER = ["LEARN", "SHIELD", "GOVERN", "READY"];
        const sortedProducts = [...data.products].sort((a, b) => {
          const ai = ORDER.findIndex((k) => a.productName.toUpperCase().includes(k));
          const bi = ORDER.findIndex((k) => b.productName.toUpperCase().includes(k));
          return (ai === -1 ? ORDER.length : ai) - (bi === -1 ? ORDER.length : bi);
        });
        return /* @__PURE__ */ jsxRuntime.jsx("div", { className: `grid gap-4 ${sortedProducts.length > 1 ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1 max-w-lg"}`, children: sortedProducts.map((p) => /* @__PURE__ */ jsxRuntime.jsx(ProductSummaryCard, { product: p, hasAdminAccess }, p.licenseId)) });
      })(),
      /* @__PURE__ */ jsxRuntime.jsxs(card.Card, { children: [
        /* @__PURE__ */ jsxRuntime.jsxs(card.CardHeader, { children: [
          /* @__PURE__ */ jsxRuntime.jsx(card.CardTitle, { children: "Assigned Users" }),
          /* @__PURE__ */ jsxRuntime.jsx(card.CardDescription, { children: "Users who currently hold a license seat. Remove a user to free a seat." })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsx(card.CardContent, { children: userGroups.length === 0 ? /* @__PURE__ */ jsxRuntime.jsx("p", { className: "py-8 text-center text-muted-foreground", children: "No seats are currently assigned." }) : /* @__PURE__ */ jsxRuntime.jsx("div", { className: "border rounded-lg overflow-hidden", children: /* @__PURE__ */ jsxRuntime.jsx("div", { className: "max-h-[480px] overflow-y-auto", children: /* @__PURE__ */ jsxRuntime.jsxs("table", { className: "w-full text-sm", children: [
          /* @__PURE__ */ jsxRuntime.jsx("thead", { className: "sticky top-0 z-10 bg-muted", children: /* @__PURE__ */ jsxRuntime.jsx("tr", { className: "border-b", children: [
            { col: "name", label: "Name" },
            { col: "email", label: "Email / Username" },
            { col: "product", label: "Product" },
            { col: "access", label: "Access Level" }
          ].map(({ col, label: label2 }) => /* @__PURE__ */ jsxRuntime.jsx(
            "th",
            {
              className: "text-left p-2 font-medium text-muted-foreground select-none cursor-pointer hover:text-foreground",
              onClick: () => toggleSort(col),
              children: /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "inline-flex items-center", children: [
                label2,
                /* @__PURE__ */ jsxRuntime.jsx(SortIcon, { col, sortCol, sortDir })
              ] })
            },
            col
          )) }) }),
          /* @__PURE__ */ jsxRuntime.jsx("tbody", { children: userGroups.flatMap(
            (user) => user.licenses.map((lic, licIdx) => /* @__PURE__ */ jsxRuntime.jsxs("tr", { className: "border-b last:border-0", children: [
              licIdx === 0 && /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
                /* @__PURE__ */ jsxRuntime.jsx(
                  "td",
                  {
                    className: "p-2 font-medium align-top border-r",
                    rowSpan: user.licenses.length,
                    children: user.userName ?? "—"
                  }
                ),
                /* @__PURE__ */ jsxRuntime.jsx(
                  "td",
                  {
                    className: "p-2 text-muted-foreground align-top border-r",
                    rowSpan: user.licenses.length,
                    children: user.userEmail ?? "—"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntime.jsx("td", { className: "p-2", children: lic.productName }),
              /* @__PURE__ */ jsxRuntime.jsx("td", { className: "p-2", children: /* @__PURE__ */ jsxRuntime.jsx(badge.Badge, { variant: "outline", className: "capitalize", children: lic.accessLevel.replace("_", " ") }) })
            ] }, `${user.userId}-${licIdx}`))
          ) })
        ] }) }) }) })
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
    const [searchParams, setSearchParams] = reactRouterDom.useSearchParams();
    const getDefaultTab = () => {
      const defaultTabs = ["users", "roles", "departments", "locations", "certificates", "licenses", "profile"];
      return defaultTabs.find((tab) => isTabEnabled(tab)) || "users";
    };
    const [activeTab, setActiveTab] = React.useState(() => {
      const urlTab = searchParams.get("orgTab");
      if (urlTab && isTabEnabled(urlTab)) {
        return urlTab;
      }
      return getDefaultTab();
    });
    React.useEffect(() => {
      const urlTab = searchParams.get("orgTab");
      const defaultTabs = ["users", "roles", "departments", "locations", "certificates", "licenses", "profile"];
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
      { id: "licenses", label: "Licenses", icon: Key, component: LicenseDashboard },
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
  const OrganisationWrapper = ({ basePath }) => {
    const { hasAdminAccess, hasManagerAccess } = useUserRole.useUserRole();
    const enabledTabs = hasAdminAccess ? ["users", "roles", "departments", "locations", "certificates", "licenses", "profile"] : hasManagerAccess ? ["users", "departments", "roles"] : ["users"];
    const organisationConfig = {
      supabaseClient: client.supabase,
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
    const { supabaseClient } = useOrganisationContext();
    const printRef = React.useRef(null);
    const [downloadingId, setDownloadingId] = React.useState(null);
    const handlePrint = reactToPrint.useReactToPrint({ contentRef: printRef });
    const handleDownload = async (certId) => {
      var _a;
      setDownloadingId(certId);
      try {
        const { data: sessionData } = await supabaseClient.auth.getSession();
        const jwt = (_a = sessionData == null ? void 0 : sessionData.session) == null ? void 0 : _a.access_token;
        if (!jwt) {
          sonner.toast.error("Not authenticated");
          return;
        }
        const { data, error } = await supabaseClient.functions.invoke("get-certificate-url", {
          body: { certificate_id: certId },
          headers: { Authorization: `Bearer ${jwt}` }
        });
        if (error || !(data == null ? void 0 : data.url)) {
          console.error("[EditableCertificates] get-certificate-url error:", error);
          sonner.toast.error("Failed to get download link");
          return;
        }
        window.open(data.url, "_blank");
      } catch (err) {
        console.error("[EditableCertificates] download error:", err);
        sonner.toast.error("Failed to download certificate");
      } finally {
        setDownloadingId(null);
      }
    };
    const formatDate2 = (dateString) => {
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
    return /* @__PURE__ */ jsxRuntime.jsx("div", { className: "space-y-4 animate-fade-in", children: filteredCertificates.length === 0 ? /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-muted-foreground text-center py-8", children: "No certificates yet" }) : /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
      /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxRuntime.jsxs(button.Button, { variant: "outline", size: "sm", onClick: () => handlePrint(), className: "print:hidden", children: [
        /* @__PURE__ */ jsxRuntime.jsx(Printer, { className: "h-4 w-4 mr-2" }),
        "Print All"
      ] }) }),
      /* @__PURE__ */ jsxRuntime.jsx("div", { ref: printRef, className: "space-y-4", children: filteredCertificates.map((cert, index) => {
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
              /* @__PURE__ */ jsxRuntime.jsx("span", { className: "font-medium", children: formatDate2(cert.dateAcquired) })
            ] }),
            /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntime.jsx(Calendar, { className: "h-4 w-4 text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-muted-foreground", children: "Expires:" }),
              /* @__PURE__ */ jsxRuntime.jsx("span", { className: "font-medium", children: formatDate2(cert.expiryDate) })
            ] }),
            /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center justify-end gap-2", children: [
              /* @__PURE__ */ jsxRuntime.jsx(badge.Badge, { className: `${getValidityStatusColor(validityStatus)} text-white`, children: validityStatus }),
              cert.certificate_url && cert.id && /* @__PURE__ */ jsxRuntime.jsx(
                button.Button,
                {
                  variant: "outline",
                  size: "sm",
                  disabled: downloadingId === cert.id,
                  onClick: () => handleDownload(cert.id),
                  className: "print:hidden",
                  children: downloadingId === cert.id ? /* @__PURE__ */ jsxRuntime.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntime.jsx(Download, { className: "h-4 w-4" })
                }
              )
            ] })
          ] }),
          cert.credentialId && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "text-sm ml-8 mt-2", children: [
            /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-muted-foreground", children: "ID: " }),
            /* @__PURE__ */ jsxRuntime.jsx("span", { className: "font-medium", children: cert.credentialId })
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
    const [loading, setLoading] = React.useState(false);
    const [selectedUserId, setSelectedUserId] = React.useState("");
    const { profiles } = useUserProfiles.useUserProfiles();
    const { data: locations } = reactQuery.useQuery({
      queryKey: ["locations"],
      queryFn: async () => {
        const { data } = await client.supabase.from("locations").select("id, name").eq("status", "Active").order("name");
        return data || [];
      }
    });
    const [formData, setFormData] = React.useState({
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
                  profile.email || "No email",
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
  const PhysicalLocationTab = ({ profile, isAdmin = false }) => {
    const [isAssignDialogOpen, setIsAssignDialogOpen] = React.useState(false);
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
        /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-sm text-muted-foreground", children: isAdmin ? `Manage physical location access for ${profile.firstName} ${profile.lastName}` : `Physical location access for ${profile.firstName} ${profile.lastName}` }),
        isAdmin && /* @__PURE__ */ jsxRuntime.jsx(
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
          onUpdate: isAdmin ? handleUpdate : void 0,
          onDelete: isAdmin ? handleDelete : void 0,
          allowAdd: false,
          allowDelete: isAdmin
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
    const [loading, setLoading] = React.useState(false);
    const [selectedHardwareId, setSelectedHardwareId] = React.useState("");
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
        const { data, error } = await client.supabase.from("profiles").select("full_name, email").eq("id", userId).single();
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
        const userName = userProfile.full_name || userProfile.email || "Assigned User";
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
        /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex gap-2 justify-end", children: /* @__PURE__ */ jsxRuntime.jsx(button.Button, { type: "submit", size: "icon", disabled: loading || !selectedHardwareId, children: loading ? /* @__PURE__ */ jsxRuntime.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntime.jsx(Save, { className: "h-4 w-4" }) }) })
      ] })
    ] }) });
  };
  const AssignSoftwareDialog = ({
    isOpen,
    onOpenChange,
    userId,
    onSuccess
  }) => {
    const [loading, setLoading] = React.useState(false);
    const [selectedSoftwareId, setSelectedSoftwareId] = React.useState("");
    const [roleAccountType, setRoleAccountType] = React.useState("");
    const { softwareInventory } = useInventory.useInventory();
    const { addSoftware } = useUserAssets.useUserAssets();
    const availableSoftware = softwareInventory.filter(
      (item) => item.status === "Active"
    );
    const selectedSoftwareItem = softwareInventory.find((item) => item.id === selectedSoftwareId);
    const { data: userProfile, isLoading: profileLoading, error: profileError } = reactQuery.useQuery({
      queryKey: ["user-profile-by-id", userId],
      queryFn: async () => {
        debug.log("Querying profile for userId:", userId);
        const { data, error } = await client.supabase.from("profiles").select("id, full_name, email").eq("id", userId).single();
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
          email: userProfile.email || "",
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
        /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex gap-2 justify-end", children: /* @__PURE__ */ jsxRuntime.jsx(button.Button, { type: "submit", size: "icon", disabled: loading || !selectedSoftwareId || !roleAccountType, children: loading ? /* @__PURE__ */ jsxRuntime.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntime.jsx(Save, { className: "h-4 w-4" }) }) })
      ] })
    ] }) });
  };
  const AddEducationDialog = ({
    isOpen,
    onOpenChange,
    userId,
    onSuccess
  }) => {
    const [loading, setLoading] = React.useState(false);
    const [certFile, setCertFile] = React.useState(null);
    const fileInputRef = React.useRef(null);
    const [formData, setFormData] = React.useState({
      type: "Certificate",
      name: "",
      issued_by: "",
      date_acquired: "",
      expiry_date: "",
      credential_id: "",
      status: "Valid"
    });
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
      setCertFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    };
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!userProfile) {
        useToast$1.toast({ title: "Error", description: "User profile not found.", variant: "destructive" });
        return;
      }
      setLoading(true);
      try {
        const { data: newCert, error: insertError } = await client.supabase.from("certificates").insert([{
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
          const { error: uploadError } = await client.supabase.storage.from("certificates").upload(storagePath, certFile, { upsert: true });
          if (uploadError) {
            console.error("Error uploading certificate file:", uploadError);
            useToast$1.toast({
              title: "Certificate added",
              description: "Record saved but file upload failed. You can try uploading the file again later.",
              variant: "destructive"
            });
          } else {
            await client.supabase.from("certificates").update({ certificate_url: storagePath }).eq("id", newCert.id);
          }
        }
        useToast$1.toast({ title: "Certificate added", description: "Certificate has been successfully added." });
        onOpenChange(false);
        resetForm();
        onSuccess == null ? void 0 : onSuccess();
      } catch (error) {
        useToast$1.toast({ title: "Error", description: error.message, variant: "destructive" });
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
              placeholder: "e.g., RAYN, PDPC",
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
        /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntime.jsx(label.Label, { children: "Certificate File (optional)" }),
          /* @__PURE__ */ jsxRuntime.jsx(
            "div",
            {
              className: "mt-1 flex items-center gap-3 rounded-md border border-dashed border-muted-foreground/40 px-4 py-3 cursor-pointer hover:bg-muted/40 transition-colors",
              onClick: () => {
                var _a;
                return (_a = fileInputRef.current) == null ? void 0 : _a.click();
              },
              children: certFile ? /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
                /* @__PURE__ */ jsxRuntime.jsx(FileText, { className: "h-4 w-4 text-muted-foreground shrink-0" }),
                /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-sm truncate", children: certFile.name }),
                /* @__PURE__ */ jsxRuntime.jsx(
                  "button",
                  {
                    type: "button",
                    className: "ml-auto text-muted-foreground hover:text-destructive",
                    onClick: (e) => {
                      e.stopPropagation();
                      setCertFile(null);
                      if (fileInputRef.current) fileInputRef.current.value = "";
                    },
                    children: /* @__PURE__ */ jsxRuntime.jsx(X, { className: "h-4 w-4" })
                  }
                )
              ] }) : /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
                /* @__PURE__ */ jsxRuntime.jsx(Upload, { className: "h-4 w-4 text-muted-foreground shrink-0" }),
                /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-sm text-muted-foreground", children: "Upload PDF, JPG, or PNG" })
              ] })
            }
          ),
          /* @__PURE__ */ jsxRuntime.jsx(
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
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex gap-2 justify-end", children: [
          /* @__PURE__ */ jsxRuntime.jsx(button.Button, { type: "button", variant: "outline", onClick: () => onOpenChange(false), size: "icon", children: /* @__PURE__ */ jsxRuntime.jsx(X, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsxRuntime.jsx(button.Button, { type: "submit", disabled: loading || !formData.name || !formData.issued_by || !formData.date_acquired, size: "icon", children: loading ? /* @__PURE__ */ jsxRuntime.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntime.jsx(Plus, { className: "h-4 w-4" }) })
        ] })
      ] })
    ] }) });
  };
  const MyDocuments = ({ userId }) => {
    const { supabaseClient: supabase, basePath } = useOrganisationContext();
    const { user } = staysecureAuth.useAuth();
    const { hasAdminAccess, hasManagerAccess } = useUserRole.useUserRole();
    const queryClient = reactQuery.useQueryClient();
    const [searchTerm, setSearchTerm] = React.useState("");
    const [statusFilter, setStatusFilter] = React.useState("all");
    const [activeTab, setActiveTab] = React.useState("assigned");
    const [openingDocId, setOpeningDocId] = React.useState(null);
    const [acknowledgeTarget, setAcknowledgeTarget] = React.useState(null);
    const [agreedToTerms, setAgreedToTerms] = React.useState(false);
    const [typedName, setTypedName] = React.useState("");
    const [resetConfirmTarget, setResetConfirmTarget] = React.useState(null);
    const targetUserId = userId || (user == null ? void 0 : user.id);
    const isOwnDocuments = !userId || userId === (user == null ? void 0 : user.id);
    const { data: assignments, isLoading } = reactQuery.useQuery({
      queryKey: ["document-assignments", targetUserId],
      queryFn: async () => {
        const { data, error } = await supabase.from("document_assignments").select(`
          *,
          document:documents(*)
        `).eq("user_id", targetUserId).order("assigned_at", { ascending: false });
        if (error) throw error;
        return data;
      },
      enabled: !!targetUserId
    });
    const invalidateComplianceQueries = () => {
      queryClient.invalidateQueries({ queryKey: ["document-assignments"] });
      queryClient.invalidateQueries({ queryKey: ["compliance-stats"] });
      queryClient.invalidateQueries({ queryKey: ["document-compliance-stats"] });
      queryClient.invalidateQueries({ queryKey: ["user-compliance-stats"] });
      queryClient.invalidateQueries({ queryKey: ["department-compliance-stats"] });
      queryClient.invalidateQueries({ queryKey: ["document-assignments-overview"] });
    };
    const notifyManager = (documentTitle, completedAt) => {
      const clientId = basePath ? basePath.replace(/^\//, "") : "default";
      supabase.from("profiles").select("manager").eq("id", targetUserId).maybeSingle().then(({ data: profile }) => {
        if (profile == null ? void 0 : profile.manager) {
          staysecureNotifications.sendNotificationByEvent(supabase, "document_completed_manager", {
            user_id: profile.manager,
            employee_user_id: targetUserId,
            document_title: documentTitle,
            completed_at: completedAt,
            clientId
          }).catch((err) => console.error("[MyDocuments] manager notification error:", err));
        }
      });
    };
    const updateStatusMutation = reactQuery.useMutation({
      mutationFn: async ({
        assignmentId,
        status
      }) => {
        const { error } = await supabase.from("document_assignments").update({ status, completed_at: null }).eq("assignment_id", assignmentId);
        if (error) throw error;
      },
      onSuccess: () => {
        invalidateComplianceQueries();
        useToast.toast({ title: "Status updated", description: "Document status updated successfully." });
      },
      onError: (error) => {
        useToast.toast({
          title: "Error",
          description: error instanceof Error ? error.message : "Could not update status",
          variant: "destructive"
        });
      }
    });
    const acknowledgeMutation = reactQuery.useMutation({
      mutationFn: async ({ assignmentId }) => {
        const completedAt = (/* @__PURE__ */ new Date()).toISOString();
        const { error } = await supabase.from("document_assignments").update({ status: "Completed", completed_at: completedAt }).eq("assignment_id", assignmentId);
        if (error) throw error;
        return completedAt;
      },
      onSuccess: (completedAt, variables) => {
        invalidateComplianceQueries();
        useToast.toast({ title: "Acknowledged", description: "Document marked as completed." });
        notifyManager(variables.documentTitle, completedAt);
      },
      onError: (error) => {
        useToast.toast({
          title: "Error",
          description: error instanceof Error ? error.message : "Could not acknowledge document",
          variant: "destructive"
        });
      }
    });
    const signDocumentMutation = reactQuery.useMutation({
      mutationFn: async ({
        assignmentId,
        documentId
      }) => {
        const { error } = await supabase.functions.invoke("sign-document", {
          body: { document_id: documentId, assignment_id: assignmentId, typed_name: typedName }
        });
        if (error) throw error;
      },
      onSuccess: (_, variables) => {
        invalidateComplianceQueries();
        useToast.toast({ title: "Signed", description: "Document signed and marked as completed." });
        notifyManager(variables.documentTitle, (/* @__PURE__ */ new Date()).toISOString());
      },
      onError: (error) => {
        useToast.toast({
          title: "Error",
          description: error instanceof Error ? error.message : "Could not sign document",
          variant: "destructive"
        });
      }
    });
    const resetCompletionMutation = reactQuery.useMutation({
      mutationFn: async ({ assignmentId }) => {
        const { error } = await supabase.from("document_assignments").update({ status: "Not started", completed_at: null }).eq("assignment_id", assignmentId);
        if (error) throw error;
      },
      onSuccess: (_data, variables) => {
        invalidateComplianceQueries();
        useToast.toast({
          title: "Completion reset",
          description: `"${variables.documentTitle}" is set to Not started. The user will need to open and acknowledge it again.`
        });
      },
      onError: (error) => {
        useToast.toast({
          title: "Error",
          description: error instanceof Error ? error.message : "Could not reset completion",
          variant: "destructive"
        });
      }
    });
    const handleStatusChange = (assignmentId, newStatus) => {
      if (newStatus === "Not started" || newStatus === "In progress") {
        updateStatusMutation.mutate({ assignmentId, status: newStatus });
      }
    };
    const handleAdminResetCompletion = (assignmentId, documentTitle) => {
      setResetConfirmTarget({ assignmentId, documentTitle });
    };
    const confirmResetCompletion = () => {
      if (!resetConfirmTarget) return;
      const payload = resetConfirmTarget;
      setResetConfirmTarget(null);
      resetCompletionMutation.mutate(payload);
    };
    const handleOpenDocument = async (documentId, url, fileName) => {
      if (!fileName && url) {
        window.open(url, "_blank", "noopener,noreferrer");
        if (isOwnDocuments) {
          supabase.rpc("record_document_open_self", { p_document_id: documentId }).then(() => queryClient.invalidateQueries({ queryKey: ["document-assignments", targetUserId] })).catch((err) => console.error("[MyDocuments] external open tracking error:", err));
        }
        return;
      }
      if (!fileName) return;
      setOpeningDocId(documentId);
      try {
        const { data, error } = await supabase.functions.invoke("get-document-url", {
          body: { document_id: documentId }
        });
        if (error) throw error;
        window.open(data.url, "_blank", "noopener,noreferrer");
        queryClient.invalidateQueries({ queryKey: ["document-assignments", targetUserId] });
      } catch (err) {
        useToast.toast({
          title: "Error",
          description: err instanceof Error ? err.message : "Could not open document",
          variant: "destructive"
        });
      } finally {
        setOpeningDocId(null);
      }
    };
    const handleAcknowledge = (assignment) => {
      setAcknowledgeTarget({
        assignmentId: assignment.assignment_id,
        documentId: assignment.document_id,
        documentTitle: assignment.document.title,
        isRequired: assignment.document.required
      });
      setAgreedToTerms(false);
      setTypedName("");
    };
    const handleAcknowledgeConfirm = () => {
      if (!acknowledgeTarget) return;
      if (acknowledgeTarget.isRequired) {
        signDocumentMutation.mutate({
          assignmentId: acknowledgeTarget.assignmentId,
          documentId: acknowledgeTarget.documentId,
          documentTitle: acknowledgeTarget.documentTitle,
          typedName
        }, {
          onSettled: () => setAcknowledgeTarget(null)
        });
      } else {
        acknowledgeMutation.mutate({
          assignmentId: acknowledgeTarget.assignmentId,
          documentTitle: acknowledgeTarget.documentTitle
        }, {
          onSettled: () => setAcknowledgeTarget(null)
        });
      }
    };
    const isAcknowledgeConfirmDisabled = (acknowledgeTarget == null ? void 0 : acknowledgeTarget.isRequired) ? !agreedToTerms || !typedName.trim() || signDocumentMutation.isPending : !agreedToTerms || acknowledgeMutation.isPending;
    React.useEffect(() => {
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
      return /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex items-center justify-center h-64", children: /* @__PURE__ */ jsxRuntime.jsx("div", { className: "animate-spin rounded-full h-32 w-32 border-b-2 border-primary" }) });
    }
    const documentListProps = {
      onStatusChange: handleStatusChange,
      onOpenDocument: handleOpenDocument,
      onAcknowledge: handleAcknowledge,
      openingDocId,
      isReadOnly: !isOwnDocuments,
      canAdminResetCompletion: hasAdminAccess || hasManagerAccess,
      onAdminResetCompletion: handleAdminResetCompletion,
      resetCompletionPending: resetCompletionMutation.isPending
    };
    return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntime.jsxs(card.Card, { children: [
        /* @__PURE__ */ jsxRuntime.jsxs(card.CardHeader, { children: [
          /* @__PURE__ */ jsxRuntime.jsxs(card.CardTitle, { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntime.jsx(FileText, { className: "h-5 w-5" }),
            "Document Progress"
          ] }),
          /* @__PURE__ */ jsxRuntime.jsx(card.CardDescription, { children: "Your overall document reading progress" })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsx(card.CardContent, { children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-sm font-medium", children: "Overall Progress" }),
            /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "text-sm text-muted-foreground", children: [
              completedCount,
              " of ",
              totalCount,
              " documents completed"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntime.jsx(progress.Progress, { value: progressPercentage, className: "w-full" }),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex justify-between text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntime.jsxs("span", { children: [
              progressPercentage,
              "% Complete"
            ] }),
            /* @__PURE__ */ jsxRuntime.jsxs("span", { children: [
              totalCount - completedCount,
              " remaining"
            ] })
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex flex-col sm:flex-row gap-4", children: [
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxRuntime.jsx(label.Label, { htmlFor: "search", children: "Search Documents" }),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntime.jsx(Search, { className: "absolute left-3 top-3 h-4 w-4 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntime.jsx(
              input.Input,
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
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "w-full sm:w-48", children: [
          /* @__PURE__ */ jsxRuntime.jsx(label.Label, { children: "Filter by Status" }),
          /* @__PURE__ */ jsxRuntime.jsxs(select.Select, { value: statusFilter, onValueChange: setStatusFilter, children: [
            /* @__PURE__ */ jsxRuntime.jsx(select.SelectTrigger, { children: /* @__PURE__ */ jsxRuntime.jsx(select.SelectValue, { placeholder: "All statuses" }) }),
            /* @__PURE__ */ jsxRuntime.jsxs(select.SelectContent, { children: [
              /* @__PURE__ */ jsxRuntime.jsx(select.SelectItem, { value: "all", children: "All Statuses" }),
              /* @__PURE__ */ jsxRuntime.jsx(select.SelectItem, { value: "Not started", children: "Not Started" }),
              /* @__PURE__ */ jsxRuntime.jsx(select.SelectItem, { value: "In progress", children: "In Progress" }),
              /* @__PURE__ */ jsxRuntime.jsx(select.SelectItem, { value: "Completed", children: "Completed" })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs(tabs.Tabs, { value: activeTab, onValueChange: setActiveTab, children: [
        /* @__PURE__ */ jsxRuntime.jsxs(tabs.TabsList, { children: [
          /* @__PURE__ */ jsxRuntime.jsxs(tabs.TabsTrigger, { value: "assigned", children: [
            "All Assigned (",
            (filteredAssignments == null ? void 0 : filteredAssignments.length) || 0,
            ")"
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs(tabs.TabsTrigger, { value: "required", children: [
            "Required (",
            (requiredAssignments == null ? void 0 : requiredAssignments.length) || 0,
            ")"
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs(tabs.TabsTrigger, { value: "optional", children: [
            "Optional (",
            (optionalAssignments == null ? void 0 : optionalAssignments.length) || 0,
            ")"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsx(tabs.TabsContent, { value: "assigned", className: "space-y-4", children: /* @__PURE__ */ jsxRuntime.jsx(DocumentList, { assignments: filteredAssignments || [], ...documentListProps }) }),
        /* @__PURE__ */ jsxRuntime.jsx(tabs.TabsContent, { value: "required", className: "space-y-4", children: /* @__PURE__ */ jsxRuntime.jsx(DocumentList, { assignments: requiredAssignments || [], ...documentListProps }) }),
        /* @__PURE__ */ jsxRuntime.jsx(tabs.TabsContent, { value: "optional", className: "space-y-4", children: /* @__PURE__ */ jsxRuntime.jsx(DocumentList, { assignments: optionalAssignments || [], ...documentListProps }) })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsx(dialog.Dialog, { open: !!acknowledgeTarget, onOpenChange: (open) => {
        if (!open) setAcknowledgeTarget(null);
      }, children: /* @__PURE__ */ jsxRuntime.jsxs(dialog.DialogContent, { className: "sm:max-w-md", children: [
        /* @__PURE__ */ jsxRuntime.jsxs(dialog.DialogHeader, { children: [
          /* @__PURE__ */ jsxRuntime.jsx(dialog.DialogTitle, { className: "flex items-center gap-2", children: (acknowledgeTarget == null ? void 0 : acknowledgeTarget.isRequired) ? /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
            /* @__PURE__ */ jsxRuntime.jsx(PenLine, { className: "h-5 w-5" }),
            " Sign: ",
            acknowledgeTarget.documentTitle
          ] }) : /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
            /* @__PURE__ */ jsxRuntime.jsx(CircleCheckBig, { className: "h-5 w-5" }),
            " Acknowledge: ",
            acknowledgeTarget == null ? void 0 : acknowledgeTarget.documentTitle
          ] }) }),
          /* @__PURE__ */ jsxRuntime.jsx(dialog.DialogDescription, { children: (acknowledgeTarget == null ? void 0 : acknowledgeTarget.isRequired) ? "Type your full name and confirm to create a signed record that you have read and understood this policy." : "Confirm that you have read and understood this document." })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-4 py-2", children: [
          (acknowledgeTarget == null ? void 0 : acknowledgeTarget.isRequired) && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntime.jsx(label.Label, { htmlFor: "typed-name", children: "Full name" }),
            /* @__PURE__ */ jsxRuntime.jsx(
              input.Input,
              {
                id: "typed-name",
                placeholder: "Type your full name...",
                value: typedName,
                onChange: (e) => setTypedName(e.target.value),
                autoComplete: "name"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-start gap-3", children: [
            /* @__PURE__ */ jsxRuntime.jsx(
              checkbox.Checkbox,
              {
                id: "agree-terms",
                checked: agreedToTerms,
                onCheckedChange: (checked) => setAgreedToTerms(checked === true)
              }
            ),
            /* @__PURE__ */ jsxRuntime.jsx(label.Label, { htmlFor: "agree-terms", className: "leading-snug cursor-pointer", children: "I have read and understood this document and agree to comply with its requirements." })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs(dialog.DialogFooter, { children: [
          /* @__PURE__ */ jsxRuntime.jsx(button.Button, { variant: "outline", onClick: () => setAcknowledgeTarget(null), children: "Cancel" }),
          /* @__PURE__ */ jsxRuntime.jsxs(
            button.Button,
            {
              onClick: handleAcknowledgeConfirm,
              disabled: isAcknowledgeConfirmDisabled,
              children: [
                (acknowledgeMutation.isPending || signDocumentMutation.isPending) && /* @__PURE__ */ jsxRuntime.jsx(LoaderCircle, { className: "h-4 w-4 mr-1 animate-spin" }),
                (acknowledgeTarget == null ? void 0 : acknowledgeTarget.isRequired) ? "Sign & Submit" : "Acknowledge"
              ]
            }
          )
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntime.jsx(alertDialog.AlertDialog, { open: !!resetConfirmTarget, onOpenChange: (open) => !open && setResetConfirmTarget(null), children: /* @__PURE__ */ jsxRuntime.jsxs(alertDialog.AlertDialogContent, { children: [
        /* @__PURE__ */ jsxRuntime.jsxs(alertDialog.AlertDialogHeader, { children: [
          /* @__PURE__ */ jsxRuntime.jsxs(alertDialog.AlertDialogTitle, { children: [
            "Reset completion for “",
            resetConfirmTarget == null ? void 0 : resetConfirmTarget.documentTitle,
            "”?"
          ] }),
          /* @__PURE__ */ jsxRuntime.jsx(alertDialog.AlertDialogDescription, { children: "The assignment will return to Not started and completion will be cleared. The user must open this document again and acknowledge it." })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs(alertDialog.AlertDialogFooter, { children: [
          /* @__PURE__ */ jsxRuntime.jsx(alertDialog.AlertDialogCancel, { disabled: resetCompletionMutation.isPending, children: "Cancel" }),
          /* @__PURE__ */ jsxRuntime.jsxs(
            alertDialog.AlertDialogAction,
            {
              onClick: () => confirmResetCompletion(),
              disabled: resetCompletionMutation.isPending,
              className: "inline-flex items-center gap-2",
              children: [
                resetCompletionMutation.isPending && /* @__PURE__ */ jsxRuntime.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin shrink-0", "aria-hidden": true }),
                "Reset completion"
              ]
            }
          )
        ] })
      ] }) })
    ] });
  };
  const DocumentList = ({
    assignments,
    onStatusChange,
    onOpenDocument,
    onAcknowledge,
    openingDocId,
    isReadOnly = false,
    canAdminResetCompletion = false,
    onAdminResetCompletion,
    resetCompletionPending = false
  }) => {
    const getStatusIcon = (status) => {
      switch (status) {
        case "Completed":
          return /* @__PURE__ */ jsxRuntime.jsx(CircleCheckBig, { className: "h-4 w-4 text-green-500" });
        case "In progress":
          return /* @__PURE__ */ jsxRuntime.jsx(Clock, { className: "h-4 w-4 text-blue-500" });
        default:
          return /* @__PURE__ */ jsxRuntime.jsx(Circle, { className: "h-4 w-4 text-muted-foreground" });
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
      return /* @__PURE__ */ jsxRuntime.jsx(card.Card, { children: /* @__PURE__ */ jsxRuntime.jsxs(card.CardContent, { className: "py-8 text-center", children: [
        /* @__PURE__ */ jsxRuntime.jsx(FileText, { className: "h-12 w-12 mx-auto text-muted-foreground mb-4" }),
        /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-muted-foreground", children: "No documents found" })
      ] }) });
    }
    return /* @__PURE__ */ jsxRuntime.jsx("div", { className: "space-y-4", children: assignments.map((assignment) => {
      const hasBeenOpened = !!assignment.first_opened_at;
      const openCount = assignment.open_count ?? 0;
      return /* @__PURE__ */ jsxRuntime.jsxs(
        card.Card,
        {
          className: isOverdue(assignment.due_date, assignment.status) ? "border-red-200" : "",
          children: [
            /* @__PURE__ */ jsxRuntime.jsx(card.CardHeader, { children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-start justify-between", children: [
              /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex-1", children: [
                /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsxRuntime.jsx(card.CardTitle, { className: "text-lg", children: assignment.document.title }),
                  assignment.document.required && /* @__PURE__ */ jsxRuntime.jsx(badge.Badge, { variant: "destructive", className: "text-xs", children: "Required" }),
                  isOverdue(assignment.due_date, assignment.status) && /* @__PURE__ */ jsxRuntime.jsx(badge.Badge, { variant: "destructive", className: "text-xs", children: "Overdue" })
                ] }),
                assignment.document.description && /* @__PURE__ */ jsxRuntime.jsx(card.CardDescription, { className: "mt-2", children: assignment.document.description })
              ] }),
              /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex items-center gap-2", children: getStatusIcon(assignment.status) })
            ] }) }),
            /* @__PURE__ */ jsxRuntime.jsx(card.CardContent, { children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center justify-between flex-wrap gap-3", children: [
              /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex flex-wrap items-center gap-4 text-sm text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntime.jsx(Calendar, { className: "h-4 w-4 shrink-0" }),
                  "Due: ",
                  new Date(assignment.due_date).toLocaleDateString()
                ] }),
                assignment.status === "Completed" && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntime.jsx(CircleCheckBig, { className: "h-4 w-4 shrink-0 text-green-600" }),
                  /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "text-foreground", children: [
                    "Completed:",
                    " ",
                    assignment.completed_at ? new Date(assignment.completed_at).toLocaleDateString() : "—"
                  ] })
                ] }),
                assignment.status !== "Completed" && !isReadOnly && (hasBeenOpened ? /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                  "Opened ",
                  openCount > 1 ? `${openCount} times` : "once"
                ] }) : /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "flex items-center gap-1 text-xs text-amber-600", children: [
                  /* @__PURE__ */ jsxRuntime.jsx(EyeOff, { className: "h-3.5 w-3.5" }),
                  "Not yet opened"
                ] })),
                assignment.document.category && /* @__PURE__ */ jsxRuntime.jsx(badge.Badge, { variant: "outline", className: "text-xs", children: assignment.document.category })
              ] }),
              /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-2", children: [
                (assignment.document.url || assignment.document.file_name) && /* @__PURE__ */ jsxRuntime.jsxs(
                  button.Button,
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
                      openingDocId === assignment.document_id ? /* @__PURE__ */ jsxRuntime.jsx(LoaderCircle, { className: "h-4 w-4 mr-1 animate-spin" }) : /* @__PURE__ */ jsxRuntime.jsx(ExternalLink, { className: "h-4 w-4 mr-1" }),
                      "View"
                    ]
                  }
                ),
                isReadOnly ? /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex flex-wrap items-center justify-end gap-2", children: [
                  /* @__PURE__ */ jsxRuntime.jsx(badge.Badge, { className: getStatusColor(assignment.status), children: assignment.status }),
                  canAdminResetCompletion && assignment.status === "Completed" && onAdminResetCompletion && /* @__PURE__ */ jsxRuntime.jsxs(
                    button.Button,
                    {
                      type: "button",
                      variant: "outline",
                      size: "sm",
                      className: "text-muted-foreground",
                      onClick: () => onAdminResetCompletion(assignment.assignment_id, assignment.document.title),
                      disabled: resetCompletionPending,
                      children: [
                        /* @__PURE__ */ jsxRuntime.jsx(RotateCcw, { className: "h-3.5 w-3.5 mr-1" }),
                        "Reset completion"
                      ]
                    }
                  )
                ] }) : assignment.status === "Completed" ? /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex flex-wrap items-center justify-end gap-2", children: [
                  /* @__PURE__ */ jsxRuntime.jsx(badge.Badge, { className: getStatusColor("Completed"), children: "Completed" }),
                  canAdminResetCompletion && onAdminResetCompletion && /* @__PURE__ */ jsxRuntime.jsxs(
                    button.Button,
                    {
                      type: "button",
                      variant: "outline",
                      size: "sm",
                      className: "text-muted-foreground",
                      onClick: () => onAdminResetCompletion(assignment.assignment_id, assignment.document.title),
                      disabled: resetCompletionPending,
                      children: [
                        /* @__PURE__ */ jsxRuntime.jsx(RotateCcw, { className: "h-3.5 w-3.5 mr-1" }),
                        "Reset completion"
                      ]
                    }
                  )
                ] }) : /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntime.jsxs(
                    select.Select,
                    {
                      value: assignment.status,
                      onValueChange: (value) => onStatusChange(assignment.assignment_id, value),
                      children: [
                        /* @__PURE__ */ jsxRuntime.jsx(select.SelectTrigger, { className: "w-[140px]", children: /* @__PURE__ */ jsxRuntime.jsx(select.SelectValue, {}) }),
                        /* @__PURE__ */ jsxRuntime.jsxs(select.SelectContent, { children: [
                          /* @__PURE__ */ jsxRuntime.jsx(select.SelectItem, { value: "Not started", children: "Not Started" }),
                          /* @__PURE__ */ jsxRuntime.jsx(select.SelectItem, { value: "In progress", children: "In Progress" })
                        ] })
                      ]
                    }
                  ),
                  hasBeenOpened ? /* @__PURE__ */ jsxRuntime.jsx(
                    button.Button,
                    {
                      size: "sm",
                      variant: assignment.document.required ? "default" : "outline",
                      onClick: () => onAcknowledge(assignment),
                      children: assignment.document.required ? /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
                        /* @__PURE__ */ jsxRuntime.jsx(PenLine, { className: "h-4 w-4 mr-1" }),
                        " Sign"
                      ] }) : /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
                        /* @__PURE__ */ jsxRuntime.jsx(CircleCheckBig, { className: "h-4 w-4 mr-1" }),
                        " Acknowledge"
                      ] })
                    }
                  ) : /* @__PURE__ */ jsxRuntime.jsxs(tooltip.Tooltip, { children: [
                    /* @__PURE__ */ jsxRuntime.jsx(tooltip.TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntime.jsx("span", { children: /* @__PURE__ */ jsxRuntime.jsx(button.Button, { size: "sm", variant: "outline", disabled: true, children: assignment.document.required ? /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
                      /* @__PURE__ */ jsxRuntime.jsx(PenLine, { className: "h-4 w-4 mr-1" }),
                      " Sign"
                    ] }) : /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
                      /* @__PURE__ */ jsxRuntime.jsx(CircleCheckBig, { className: "h-4 w-4 mr-1" }),
                      " Acknowledge"
                    ] }) }) }) }),
                    /* @__PURE__ */ jsxRuntime.jsx(tooltip.TooltipContent, { children: "Open the document first to enable acknowledgment" })
                  ] })
                ] })
              ] })
            ] }) })
          ]
        },
        assignment.assignment_id
      );
    }) });
  };
  const UserDepartmentsRolesTable = React.forwardRef(({ userId }, ref) => {
    const [newRows, setNewRows] = React.useState([]);
    const queryClient = reactQuery.useQueryClient();
    const { user } = staysecureAuth.useAuth();
    const {
      userDepartments,
      addDepartment,
      removeDepartment
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
        debug.log("UserDepartmentsRolesTable: Fetching roles for user:", userId);
        const { data, error } = await client.supabase.from("user_profile_roles").select(`
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
    const assignmentsRef = React.useRef({
      pairs: [],
      deptIds: /* @__PURE__ */ new Set(),
      roleIds: /* @__PURE__ */ new Set()
    });
    React.useEffect(() => {
      const pairs = userDepartments.filter((d) => d.pairing_id).flatMap((d) => {
        const matched = userRoles.filter((r) => r.pairing_id === d.pairing_id);
        return matched.map((r) => ({ departmentId: d.department_id, roleId: r.role_id }));
      });
      assignmentsRef.current = {
        pairs,
        deptIds: new Set(userDepartments.map((d) => d.department_id)),
        roleIds: new Set(userRoles.map((r) => r.role_id))
      };
      debug.log("UserDepartmentsRolesTable: assignmentsRef synced — pairs:", pairs.length, "depts:", assignmentsRef.current.deptIds.size, "roles:", assignmentsRef.current.roleIds.size);
    }, [userDepartments, userRoles]);
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
        const { data, error } = await client.supabase.from("user_profile_roles").insert(insertData).select();
        debug.log("UserDepartmentsRolesTable: Insert result:", data);
        debug.log("UserDepartmentsRolesTable: Insert error:", error);
        if (error) throw error;
        return role;
      },
      onSuccess: (data) => {
        debug.log("UserDepartmentsRolesTable: Role assignment successful:", data);
        queryClient.invalidateQueries({ queryKey: ["user-roles", userId] });
        sonner.toast.success("Role assigned successfully");
      },
      onError: (error) => {
        console.error("UserDepartmentsRolesTable: Role assignment failed:", error);
        sonner.toast.error("Failed to assign role: " + error.message);
      }
    });
    const removeRoleMutation = reactQuery.useMutation({
      mutationFn: async (roleId) => {
        const { error } = await client.supabase.from("user_profile_roles").delete().eq("id", roleId);
        if (error) throw error;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["user-roles", userId] });
        sonner.toast.success("Role removed successfully");
      },
      onError: (error) => {
        sonner.toast.error("Failed to remove role: " + error.message);
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
        sonner.toast.success("Primary role updated");
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
    React.useImperativeHandle(ref, () => ({
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
        sonner.toast.error("Please select at least a department or role");
        return;
      }
      try {
        debug.log("UserDepartmentsRolesTable: ✅ v-assignmentsRef handleSaveNewRow called");
        const { pairs, deptIds, roleIds } = assignmentsRef.current;
        debug.log("UserDepartmentsRolesTable: assignmentsRef — pairs:", pairs, "deptIds:", [...deptIds], "roleIds:", [...roleIds]);
        if (row.departmentId && row.roleId) {
          const pairExists = pairs.some(
            (p) => p.departmentId === row.departmentId && p.roleId === row.roleId
          );
          debug.log("UserDepartmentsRolesTable: Paired add — pair already exists?", pairExists);
          if (pairExists) {
            sonner.toast.error("This department and role combination is already assigned");
            return;
          }
          const pairingId = crypto.randomUUID();
          const isPrimary = userDepartments.length === 0;
          await addDepartment({ userId, departmentId: row.departmentId, isPrimary, pairingId, assignedBy: user == null ? void 0 : user.id });
          await addRoleMutation.mutateAsync({ roleId: row.roleId, pairingId });
          assignmentsRef.current.pairs.push({ departmentId: row.departmentId, roleId: row.roleId });
          assignmentsRef.current.deptIds.add(row.departmentId);
          assignmentsRef.current.roleIds.add(row.roleId);
        } else if (row.departmentId) {
          const deptExists = deptIds.has(row.departmentId);
          debug.log("UserDepartmentsRolesTable: Standalone dept — already assigned?", deptExists);
          if (deptExists) {
            sonner.toast.error("This department is already assigned");
            return;
          }
          const isPrimary = userDepartments.length === 0;
          await addDepartment({ userId, departmentId: row.departmentId, isPrimary, pairingId: void 0, assignedBy: user == null ? void 0 : user.id });
          assignmentsRef.current.deptIds.add(row.departmentId);
        } else if (row.roleId) {
          const roleExists = roleIds.has(row.roleId);
          debug.log("UserDepartmentsRolesTable: Standalone role — already assigned?", roleExists);
          if (roleExists) {
            sonner.toast.error("This role is already assigned");
            return;
          }
          await addRoleMutation.mutateAsync({ roleId: row.roleId, pairingId: void 0 });
          assignmentsRef.current.roleIds.add(row.roleId);
        }
        setNewRows((prev) => prev.filter((_, i) => i !== index));
        sonner.toast.success("Assignment saved successfully");
      } catch (error) {
        console.error("Error saving assignment:", error);
        sonner.toast.error("Failed to save assignment");
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
        sonner.toast.error("Failed to delete assignment");
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
        queryClient.invalidateQueries({ queryKey: useUserDepartments.USER_DEPARTMENTS_KEY(userId) });
        queryClient.invalidateQueries({ queryKey: ["user-roles", userId] });
        sonner.toast.success("Primary assignment updated successfully");
      },
      onError: (error) => {
        sonner.toast.error("Failed to update primary assignment: " + error.message);
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
  const UserDepartmentsRolesManager = React.forwardRef(
    ({ userId }, ref) => {
      const tableRef = React.useRef(null);
      React.useImperativeHandle(ref, () => ({
        handleAddNewRow: () => {
          var _a, _b;
          return (_b = (_a = tableRef.current) == null ? void 0 : _a.handleAddNewRow) == null ? void 0 : _b.call(_a);
        }
      }));
      return /* @__PURE__ */ jsxRuntime.jsx(UserDepartmentsRolesTable, { userId, ref: tableRef });
    }
  );
  const PersonaDetailsTabs = ({ profile, userId, onUpdate }) => {
    const [isAssignHardwareOpen, setIsAssignHardwareOpen] = React.useState(false);
    const [isAssignSoftwareOpen, setIsAssignSoftwareOpen] = React.useState(false);
    const [isAddEducationOpen, setIsAddEducationOpen] = React.useState(false);
    const departmentRolesRef = React.useRef(null);
    const isLearnMode = typeof window !== "undefined" && (window.location.hostname.includes("learn") || window.location.port.startsWith("80"));
    const { hasAdminAccess } = useUserRole.useUserRole();
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
        return "grid-cols-6";
      }
      return "grid-cols-5";
    };
    return /* @__PURE__ */ jsxRuntime.jsx(card.Card, { className: "w-full", children: /* @__PURE__ */ jsxRuntime.jsxs(card.CardContent, { className: "p-6", children: [
      /* @__PURE__ */ jsxRuntime.jsxs(tabs.Tabs, { defaultValue: isLearnMode ? "knowledge" : "certification", className: "w-full", children: [
        /* @__PURE__ */ jsxRuntime.jsx(tabs.TabsList, { className: `grid w-full ${getGridClass()} mb-6`, children: isLearnMode ? /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
          /* @__PURE__ */ jsxRuntime.jsxs(tabs.TabsTrigger, { value: "knowledge", className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntime.jsx(BookOpen, { className: "h-4 w-4" }),
            /* @__PURE__ */ jsxRuntime.jsx("span", { className: "hidden sm:inline", children: "Knowledge" })
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs(tabs.TabsTrigger, { value: "certification", className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntime.jsx(GraduationCap, { className: "h-4 w-4" }),
            /* @__PURE__ */ jsxRuntime.jsx("span", { className: "hidden sm:inline", children: "Certificates" })
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs(tabs.TabsTrigger, { value: "departments", className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntime.jsx(Users, { className: "h-4 w-4" }),
            /* @__PURE__ */ jsxRuntime.jsx("span", { className: "hidden sm:inline", children: "Departments & Roles" })
          ] })
        ] }) : (
          /* ========== GOVERN MODE TABS ========== */
          /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
            /* @__PURE__ */ jsxRuntime.jsxs(tabs.TabsTrigger, { value: "certification", className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntime.jsx(GraduationCap, { className: "h-4 w-4" }),
              /* @__PURE__ */ jsxRuntime.jsx("span", { className: "hidden sm:inline", children: "Certificates" })
            ] }),
            /* @__PURE__ */ jsxRuntime.jsxs(tabs.TabsTrigger, { value: "departments", className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntime.jsx(Users, { className: "h-4 w-4" }),
              /* @__PURE__ */ jsxRuntime.jsx("span", { className: "hidden sm:inline", children: "Departments & Roles" })
            ] }),
            /* @__PURE__ */ jsxRuntime.jsxs(tabs.TabsTrigger, { value: "accounts", className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntime.jsx(MonitorSmartphone, { className: "h-4 w-4" }),
              /* @__PURE__ */ jsxRuntime.jsx("span", { className: "hidden sm:inline", children: "Accounts" })
            ] }),
            /* @__PURE__ */ jsxRuntime.jsxs(tabs.TabsTrigger, { value: "hardware", className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntime.jsx(Laptop, { className: "h-4 w-4" }),
              /* @__PURE__ */ jsxRuntime.jsx("span", { className: "hidden sm:inline", children: "Hardware" })
            ] }),
            /* @__PURE__ */ jsxRuntime.jsxs(tabs.TabsTrigger, { value: "location", className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntime.jsx(MapPin, { className: "h-4 w-4" }),
              /* @__PURE__ */ jsxRuntime.jsx("span", { className: "hidden sm:inline", children: "Physical Location" })
            ] }),
            (profile == null ? void 0 : profile.cyber_learner) && /* @__PURE__ */ jsxRuntime.jsxs(tabs.TabsTrigger, { value: "learn", className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntime.jsx(Play, { className: "h-4 w-4" }),
              /* @__PURE__ */ jsxRuntime.jsx("span", { className: "hidden sm:inline", children: "StaySecure LEARN" })
            ] })
          ] })
        ) }),
        isLearnMode ? /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
          /* @__PURE__ */ jsxRuntime.jsx(tabs.TabsContent, { value: "knowledge", className: "space-y-4 animate-fade-in", children: /* @__PURE__ */ jsxRuntime.jsx(MyDocuments, { userId: typeof profile.id === "string" ? profile.id : userId }) }),
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
          ] })
        ] }) : (
          /* ========== GOVERN MODE TAB CONTENT ========== */
          /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
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
            /* @__PURE__ */ jsxRuntime.jsxs(tabs.TabsContent, { value: "accounts", className: "space-y-4 animate-fade-in", children: [
              hasAdminAccess && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxRuntime.jsx(
                button.Button,
                {
                  onClick: () => setIsAssignSoftwareOpen(true),
                  size: "icon",
                  children: /* @__PURE__ */ jsxRuntime.jsx(Plus, { className: "h-4 w-4" })
                }
              ) }),
              /* @__PURE__ */ jsxRuntime.jsx(SoftwareAccounts, { profile })
            ] }),
            /* @__PURE__ */ jsxRuntime.jsxs(tabs.TabsContent, { value: "hardware", className: "space-y-4 animate-fade-in", children: [
              hasAdminAccess && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxRuntime.jsx(
                button.Button,
                {
                  onClick: () => setIsAssignHardwareOpen(true),
                  size: "icon",
                  children: /* @__PURE__ */ jsxRuntime.jsx(Plus, { className: "h-4 w-4" })
                }
              ) }),
              /* @__PURE__ */ jsxRuntime.jsx(HardwareInventory, { profile, onUpdate: handleDataChange })
            ] }),
            /* @__PURE__ */ jsxRuntime.jsx(tabs.TabsContent, { value: "location", className: "space-y-4 animate-fade-in", children: /* @__PURE__ */ jsxRuntime.jsx(PhysicalLocationTab, { profile, isAdmin: hasAdminAccess }) }),
            (profile == null ? void 0 : profile.cyber_learner) && /* @__PURE__ */ jsxRuntime.jsx(tabs.TabsContent, { value: "learn", className: "space-y-4 animate-fade-in", children: /* @__PURE__ */ jsxRuntime.jsx(LearningTracksTab, { userId: typeof profile.id === "string" ? profile.id : userId }) })
          ] })
        )
      ] }),
      !isLearnMode && /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
        /* @__PURE__ */ jsxRuntime.jsx(
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
        /* @__PURE__ */ jsxRuntime.jsx(
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
      /* @__PURE__ */ jsxRuntime.jsx(
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
    const fileInputRef = React.useRef(null);
    const [uploading, setUploading] = React.useState(false);
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
        const { data: _data, error } = await client.supabase.storage.from("avatars").upload(fileName, file, {
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
          onAvatarUpdate(urlData.publicUrl);
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
        /* @__PURE__ */ jsxRuntime.jsx(avatar.AvatarImage, { src: avatarUrl, alt: `${firstName} ${lastName}` }),
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
    const [isEditing, setIsEditing] = React.useState(false);
    const { role, isLoading, updateRole, isUpdating, getRoleDisplayName, getRoleBadgeVariant } = useUserRoleById.useUserRoleById(userId);
    const { hasAdminAccess } = useUserRole.useUserRole();
    const { supabaseClient } = useOrganisationContext();
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
    const isAdmin = currentUserRole === "client_admin" || isSuperAdmin;
    const { data: hasAuthorSeats } = reactQuery.useQuery({
      queryKey: ["license-has-author-seats"],
      queryFn: async () => {
        const { data } = await supabaseClient.from("customer_product_licenses").select("seats_author").gt("seats_author", 0).limit(1).maybeSingle();
        return !!data;
      },
      enabled: isAdmin && !isSuperAdmin
    });
    const allRoleOptions = [
      { value: "user", label: "User" },
      { value: "author", label: "Author" },
      { value: "client_admin", label: "Admin" },
      { value: "super_admin", label: "Super Admin" }
    ];
    const roleOptions = allRoleOptions.filter((option) => {
      if (option.value === "super_admin") return isSuperAdmin;
      if (option.value === "author") return isSuperAdmin || isAdmin && !!hasAuthorSeats;
      return true;
    });
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
    accessLevel: _accessLevel,
    lastLogin,
    passwordLastChanged: _passwordLastChanged,
    twoFactorEnabled
  }) => {
    const formatDate2 = (dateString) => {
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
          formatDate2(startDate)
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
        /* @__PURE__ */ jsxRuntime.jsx(Clock, { className: "h-4 w-4 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntime.jsxs("span", { children: [
          "Last login: ",
          lastLogin ? formatDateAndTime(lastLogin) : "Never"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
        /* @__PURE__ */ jsxRuntime.jsx(ShieldCheck, { className: `h-4 w-4 ${twoFactorEnabled ? "text-green-500" : "text-muted-foreground"}` }),
        /* @__PURE__ */ jsxRuntime.jsx(badge.Badge, { variant: twoFactorEnabled ? "default" : "secondary", children: twoFactorEnabled ? "2FA enabled" : "2FA not set up" })
      ] })
    ] });
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
    const [editValue, setEditValue] = React.useState(value);
    React.useEffect(() => {
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
  const MIN_PASSWORD_LENGTH = 12;
  function getPasswordStrength(password) {
    if (!password) return { score: 0, label: "" };
    let score = 0;
    if (password.length >= MIN_PASSWORD_LENGTH) score += 40;
    if (password.length >= 16) score += 10;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score += 20;
    if (/\d/.test(password)) score += 20;
    if (/[^a-zA-Z0-9]/.test(password)) score += 20;
    const label2 = score >= 60 ? "Strong" : score >= 40 ? "Fair" : score >= 20 ? "Weak" : "Very weak";
    return { score: Math.min(100, score), label: label2 };
  }
  const ChangePasswordDialog = ({
    isOpen,
    onClose,
    onSuccess
  }) => {
    const { user, signIn } = staysecureAuth.useAuth();
    const { supabaseClient } = useOrganisationContext();
    const [currentPassword, setCurrentPassword] = React.useState("");
    const [newPassword, setNewPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [showCurrentPassword, setShowCurrentPassword] = React.useState(false);
    const [showNewPassword, setShowNewPassword] = React.useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
    const strength = getPasswordStrength(newPassword);
    const resetForm = React.useCallback(() => {
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setError(null);
    }, []);
    const handleClose = React.useCallback(() => {
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
        useToast.toast({
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
    return /* @__PURE__ */ jsxRuntime.jsx(dialog.Dialog, { open: isOpen, onOpenChange: (open) => !open && handleClose(), children: /* @__PURE__ */ jsxRuntime.jsxs(dialog.DialogContent, { className: "sm:max-w-md", children: [
      /* @__PURE__ */ jsxRuntime.jsxs(dialog.DialogHeader, { children: [
        /* @__PURE__ */ jsxRuntime.jsx(dialog.DialogTitle, { children: "Change password" }),
        /* @__PURE__ */ jsxRuntime.jsx(dialog.DialogDescription, { children: "Enter your current password and choose a new one. You will receive a confirmation email." })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
        error && /* @__PURE__ */ jsxRuntime.jsx(alert.Alert, { variant: "destructive", children: /* @__PURE__ */ jsxRuntime.jsx(alert.AlertDescription, { children: error }) }),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntime.jsx(label.Label, { htmlFor: "current-password", children: "Current password" }),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntime.jsx(
              input.Input,
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
            /* @__PURE__ */ jsxRuntime.jsx(
              button.Button,
              {
                type: "button",
                variant: "ghost",
                size: "sm",
                className: "absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent",
                onClick: () => setShowCurrentPassword(!showCurrentPassword),
                children: showCurrentPassword ? /* @__PURE__ */ jsxRuntime.jsx(EyeOff, { className: "h-4 w-4 text-muted-foreground" }) : /* @__PURE__ */ jsxRuntime.jsx(Eye, { className: "h-4 w-4 text-muted-foreground" })
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntime.jsx(label.Label, { htmlFor: "new-password", children: "New password" }),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntime.jsx(
              input.Input,
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
            /* @__PURE__ */ jsxRuntime.jsx(
              button.Button,
              {
                type: "button",
                variant: "ghost",
                size: "sm",
                className: "absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent",
                onClick: () => setShowNewPassword(!showNewPassword),
                children: showNewPassword ? /* @__PURE__ */ jsxRuntime.jsx(EyeOff, { className: "h-4 w-4 text-muted-foreground" }) : /* @__PURE__ */ jsxRuntime.jsx(Eye, { className: "h-4 w-4 text-muted-foreground" })
              }
            )
          ] }),
          newPassword && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntime.jsx(progress.Progress, { value: strength.score, className: "h-1.5" }),
            /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-xs text-muted-foreground", children: strength.label })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntime.jsx(label.Label, { htmlFor: "confirm-password", children: "Confirm new password" }),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntime.jsx(
              input.Input,
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
            /* @__PURE__ */ jsxRuntime.jsx(
              button.Button,
              {
                type: "button",
                variant: "ghost",
                size: "sm",
                className: "absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent",
                onClick: () => setShowConfirmPassword(!showConfirmPassword),
                children: showConfirmPassword ? /* @__PURE__ */ jsxRuntime.jsx(EyeOff, { className: "h-4 w-4 text-muted-foreground" }) : /* @__PURE__ */ jsxRuntime.jsx(Eye, { className: "h-4 w-4 text-muted-foreground" })
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsx(dialog.DialogFooter, { children: /* @__PURE__ */ jsxRuntime.jsx(button.Button, { type: "submit", size: "icon", disabled: loading, children: loading ? /* @__PURE__ */ jsxRuntime.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntime.jsx(Save, { className: "h-4 w-4" }) }) })
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
    const { user } = staysecureAuth.useAuth();
    const { profiles, updateProfile } = useUserProfiles.useUserProfiles();
    const { supabaseClient, hasPermission, basePath } = useOrganisationContext();
    const isAdmin = hasPermission("canEditUsers");
    const [editingField, setEditingField] = React.useState(null);
    const [saving, setSaving] = React.useState(false);
    const [savingLanguage, setSavingLanguage] = React.useState(false);
    const [_managerValue, setManagerValue] = React.useState(profile.manager || "");
    const [isFullNameManuallyEdited, setIsFullNameManuallyEdited] = React.useState(false);
    const [isChangePasswordOpen, setIsChangePasswordOpen] = React.useState(false);
    const [isResetPasswordOpen, setIsResetPasswordOpen] = React.useState(false);
    const [isSendingReset, setIsSendingReset] = React.useState(false);
    const isCurrentUserProfile = !!(user == null ? void 0 : user.id) && profile.id === user.id;
    const handleSendPasswordReset = async () => {
      const account = profile.account;
      const email = (account == null ? void 0 : account.email) || profile.email;
      if (!email) {
        sonner.toast.error("No email address found for this user.");
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
        sonner.toast.success("Password reset sent", { description: `A password reset link has been sent to ${email}.` });
      } catch (err) {
        sonner.toast.error("Failed to send password reset", { description: err.message });
      } finally {
        setIsSendingReset(false);
        setIsResetPasswordOpen(false);
      }
    };
    React.useEffect(() => {
      setIsFullNameManuallyEdited(false);
    }, [profile.id]);
    const { data: languages } = reactQuery.useQuery({
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
          sonner.toast.error("Profile ID is missing. Cannot update profile.");
          return;
        }
        await updateProfile(profile.id, updateData);
        sonner.toast.success("Profile updated");
        setEditingField(null);
        if (onOptimisticUpdate) {
          onOptimisticUpdate(field, value);
        }
        onProfileUpdate();
      } catch (error) {
        console.error("Save error:", error);
        const errorMessage = error instanceof Error ? error.message : "Failed to update profile";
        sonner.toast.error(errorMessage);
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
          sonner.toast.error("Profile ID is missing. Cannot update profile.");
          return;
        }
        await updateProfile(profile.id, updateData);
        sonner.toast.success("Profile updated");
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
        sonner.toast.error(errorMessage);
      } finally {
        setSaving(false);
      }
    };
    const handleFullNameChange = async (value) => {
      setIsFullNameManuallyEdited(true);
      await handleFieldSave("full_name", value);
    };
    const { isSuperAdmin } = useUserRole.useUserRole();
    const filteredProfiles = profiles.filter((user2) => {
      if (user2.id === profile.id) return false;
      if (user2.access_level === "super_admin" && !isSuperAdmin) return false;
      return true;
    });
    const managerProfile = profiles.find((u) => u.id === profile.manager);
    const managerName = managerProfile ? managerProfile.full_name || managerProfile.email : "Not assigned";
    const { userDepartments } = useUserDepartments.useUserDepartments(profile.id);
    const { primaryRole } = useUserProfileRoles.useUserProfileRoles(profile.id);
    const { data: physicalLocations, isLoading: locationsLoading } = reactQuery.useQuery({
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
    return /* @__PURE__ */ jsxRuntime.jsx(card.Card, { className: "w-full", children: /* @__PURE__ */ jsxRuntime.jsx(card.CardContent, { className: "p-6 lg:p-8", children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-6 lg:gap-8", children: [
      /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex justify-center md:justify-start", children: /* @__PURE__ */ jsxRuntime.jsx(
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
        ((_a = profile.account) == null ? void 0 : _a.email) && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntime.jsx(User, { className: "h-4 w-4 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-foreground", children: profile.account.email })
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
          isAdmin ? /* @__PURE__ */ jsxRuntime.jsxs(
            select.Select,
            {
              value: profile.manager,
              onValueChange: handleManagerChange,
              children: [
                /* @__PURE__ */ jsxRuntime.jsx(select.SelectTrigger, { className: "w-48 h-6 text-sm", children: /* @__PURE__ */ jsxRuntime.jsx(select.SelectValue, { placeholder: "Not assigned", children: managerName !== "Not assigned" ? managerName : void 0 }) }),
                /* @__PURE__ */ jsxRuntime.jsx(select.SelectContent, { children: filteredProfiles.map((user2) => /* @__PURE__ */ jsxRuntime.jsx(select.SelectItem, { value: user2.id, children: user2.full_name || user2.email || "Unnamed User" }, user2.id)) })
              ]
            }
          ) : /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-foreground", children: managerName })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntime.jsx(MapPin, { className: "h-4 w-4 text-muted-foreground" }),
          isAdmin ? /* @__PURE__ */ jsxRuntime.jsxs(
            select.Select,
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
                /* @__PURE__ */ jsxRuntime.jsx(select.SelectTrigger, { className: "w-48 h-6 text-sm", children: /* @__PURE__ */ jsxRuntime.jsx(select.SelectValue, { placeholder: locationsLoading ? "Loading..." : "Not specified" }) }),
                /* @__PURE__ */ jsxRuntime.jsx(select.SelectContent, { children: physicalLocations == null ? void 0 : physicalLocations.map((loc) => /* @__PURE__ */ jsxRuntime.jsx(select.SelectItem, { value: loc.name, children: loc.name }, loc.id)) })
              ]
            }
          ) : /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-foreground", children: profile.location || "Not specified" })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntime.jsx(Globe, { className: "h-4 w-4 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntime.jsxs(
            select.Select,
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
                /* @__PURE__ */ jsxRuntime.jsx(select.SelectTrigger, { className: "w-48 h-6 text-sm", children: /* @__PURE__ */ jsxRuntime.jsx(select.SelectValue, { placeholder: "Select language" }) }),
                /* @__PURE__ */ jsxRuntime.jsx(select.SelectContent, { children: languages == null ? void 0 : languages.map((lang) => {
                  const langValue = lang.display_name || lang.code;
                  const langLabel = lang.native_name || lang.display_name || lang.code;
                  debug.log("[EditableProfileHeader] langValue:", langValue, "langLabel:", langLabel);
                  return /* @__PURE__ */ jsxRuntime.jsx(select.SelectItem, { value: langValue, children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-2", children: [
                    lang.flag_emoji && /* @__PURE__ */ jsxRuntime.jsx("span", { children: lang.flag_emoji }),
                    /* @__PURE__ */ jsxRuntime.jsx("span", { children: langLabel })
                  ] }) }, langValue);
                }) })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-4 w-full", children: [
          /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsxRuntime.jsx(Star, { className: "h-3 w-3 fill-current text-yellow-500" }) }),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-2", children: [
            primaryDepartment && /* @__PURE__ */ jsxRuntime.jsxs(
              badge.Badge,
              {
                className: "text-white flex items-center gap-1",
                style: { backgroundColor: "#026473" },
                children: [
                  /* @__PURE__ */ jsxRuntime.jsx(Building2, { className: "h-3 w-3" }),
                  primaryDepartment.department_name
                ]
              }
            ),
            primaryRole && /* @__PURE__ */ jsxRuntime.jsxs(
              badge.Badge,
              {
                className: "text-white flex items-center gap-1",
                style: { backgroundColor: "#359D8A" },
                children: [
                  /* @__PURE__ */ jsxRuntime.jsx(Briefcase, { className: "h-3 w-3" }),
                  primaryRole.role_name
                ]
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntime.jsx(
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
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-end justify-end gap-2 pt-2 text-sm", children: [
          isCurrentUserProfile && /* @__PURE__ */ jsxRuntime.jsx(
            button.Button,
            {
              type: "button",
              variant: "outline",
              size: "sm",
              onClick: () => setIsChangePasswordOpen(true),
              className: "flex items-center justify-center",
              "aria-label": "Change password",
              title: "Change password",
              children: /* @__PURE__ */ jsxRuntime.jsx(KeyRound, { className: "h-5 w-5" })
            }
          ),
          !isCurrentUserProfile && isAdmin && /* @__PURE__ */ jsxRuntime.jsx(
            button.Button,
            {
              type: "button",
              variant: "outline",
              size: "sm",
              onClick: () => setIsResetPasswordOpen(true),
              disabled: isSendingReset,
              className: "flex items-center justify-center",
              "aria-label": "Send password reset",
              title: "Send password reset email",
              children: isSendingReset ? /* @__PURE__ */ jsxRuntime.jsx(LoaderCircle, { className: "h-5 w-5 animate-spin" }) : /* @__PURE__ */ jsxRuntime.jsx(KeyRound, { className: "h-5 w-5" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntime.jsx(
          ChangePasswordDialog,
          {
            isOpen: isChangePasswordOpen,
            onClose: () => setIsChangePasswordOpen(false),
            onSuccess: () => setIsChangePasswordOpen(false)
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsx(alertDialog.AlertDialog, { open: isResetPasswordOpen, onOpenChange: setIsResetPasswordOpen, children: /* @__PURE__ */ jsxRuntime.jsxs(alertDialog.AlertDialogContent, { children: [
          /* @__PURE__ */ jsxRuntime.jsxs(alertDialog.AlertDialogHeader, { children: [
            /* @__PURE__ */ jsxRuntime.jsx(alertDialog.AlertDialogTitle, { children: "Send password reset?" }),
            /* @__PURE__ */ jsxRuntime.jsxs(alertDialog.AlertDialogDescription, { children: [
              "A password reset link will be emailed to ",
              /* @__PURE__ */ jsxRuntime.jsx("strong", { children: ((_h = profile.account) == null ? void 0 : _h.email) || profile.email || "this user" }),
              ". They will be able to set a new password using that link."
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs(alertDialog.AlertDialogFooter, { children: [
            /* @__PURE__ */ jsxRuntime.jsx(alertDialog.AlertDialogCancel, { disabled: isSendingReset, children: "Cancel" }),
            /* @__PURE__ */ jsxRuntime.jsxs(alertDialog.AlertDialogAction, { onClick: handleSendPasswordReset, disabled: isSendingReset, children: [
              isSendingReset ? /* @__PURE__ */ jsxRuntime.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin mr-2" }) : null,
              "Send reset email"
            ] })
          ] })
        ] }) })
      ] })
    ] }) }) });
  };
  const PersonaProfile = () => {
    const { user } = staysecureAuth.useAuth();
    const { hasAdminAccess } = useUserRole.useUserRole();
    const { profile, loading: profileLoading, refetch: refetchProfile } = useProfile.useProfile();
    const { hardware, software, certificates, loading: assetsLoading, refetch: refetchAssets } = useUserAssets.useUserAssets(user == null ? void 0 : user.id);
    const userEmail = user == null ? void 0 : user.email;
    const [optimisticData, setOptimisticData] = React.useState(null);
    const personaData = React.useMemo(() => ({
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
        email: (profile == null ? void 0 : profile.email) || "Not set",
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
      return /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex items-center justify-center min-h-screen", children: /* @__PURE__ */ jsxRuntime.jsx(LoaderCircle, { className: "h-8 w-8 animate-spin" }) });
    }
    if (!profile) {
      return /* @__PURE__ */ jsxRuntime.jsx("div", { className: "text-center py-8", children: /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-muted-foreground", children: "No profile found. Please update your profile information." }) });
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
    return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-6", children: [
      !hasAdminAccess && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex justify-between items-center", children: /* @__PURE__ */ jsxRuntime.jsx("h1", { className: "text-3xl font-bold", children: "My Profile" }) }),
      /* @__PURE__ */ jsxRuntime.jsx(EditableProfileHeader, { profile: displayData, onProfileUpdate: refetchProfile, onOptimisticUpdate: handleOptimisticUpdate }),
      /* @__PURE__ */ jsxRuntime.jsx(PersonaDetailsTabs, { profile: displayData, userId: (user == null ? void 0 : user.id) || "", onUpdate: handleProfileUpdate })
    ] });
  };
  const UserDetailView = () => {
    var _a;
    const { userId } = reactRouterDom.useParams();
    const navigate = reactRouterDom.useNavigate();
    const { supabaseClient, basePath } = useOrganisationContext();
    const { hasAdminAccess } = useUserRole.useUserRole();
    const { toast } = useToast$1.useToast();
    const [showResetMfaConfirm, setShowResetMfaConfirm] = React.useState(false);
    const [resettingMfa, setResettingMfa] = React.useState(false);
    const { profiles, loading: profilesLoading } = useUserProfiles.useUserProfiles();
    const { hardware, software, certificates, loading: assetsLoading } = useUserAssets.useUserAssets(userId);
    const { data: lastSignIn } = reactQuery.useQuery({
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
        email: profileObj.email || "Not set",
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
        toast({ title: "MFA reset", description: "The user will be able to log in without MFA on their next login." });
      } catch (err) {
        console.error("Reset MFA error:", err);
        toast({ title: "Failed to reset MFA", description: err == null ? void 0 : err.message, variant: "destructive" });
      }
      setResettingMfa(false);
    };
    if (profilesLoading || assetsLoading) {
      return /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex items-center justify-center min-h-screen", children: /* @__PURE__ */ jsxRuntime.jsx(LoaderCircle, { className: "h-8 w-8 animate-spin" }) });
    }
    const userProfile = profiles.find((p) => p.id === userId);
    if (!userProfile) {
      return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex flex-col items-center justify-center min-h-screen gap-4", children: [
        /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-muted-foreground", children: "User not found" }),
        /* @__PURE__ */ jsxRuntime.jsxs(button.Button, { onClick: () => navigate(`${basePath || ""}/admin`), variant: "outline", children: [
          /* @__PURE__ */ jsxRuntime.jsx(ArrowLeft, { className: "h-4 w-4 mr-2" }),
          "Back to Admin"
        ] })
      ] });
    }
    if (!personaData) {
      return /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex items-center justify-center min-h-screen", children: /* @__PURE__ */ jsxRuntime.jsx(LoaderCircle, { className: "h-8 w-8 animate-spin" }) });
    }
    return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "max-w-6xl mx-auto py-6 px-4 space-y-6", children: [
      /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsxRuntime.jsx(button.Button, { onClick: handleBackToUsers, variant: "outline", size: "icon", children: /* @__PURE__ */ jsxRuntime.jsx(ArrowLeft, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsxRuntime.jsxs("h1", { className: "text-2xl font-bold", children: [
            "User Profile: ",
            userProfile.full_name || "Unnamed User"
          ] })
        ] }),
        hasAdminAccess && ((_a = personaData.account) == null ? void 0 : _a.twoFactorEnabled) && /* @__PURE__ */ jsxRuntime.jsxs(
          button.Button,
          {
            variant: "outline",
            size: "sm",
            onClick: () => setShowResetMfaConfirm(true),
            disabled: resettingMfa,
            className: "flex items-center gap-2 text-destructive border-destructive hover:bg-destructive/10",
            children: [
              resettingMfa ? /* @__PURE__ */ jsxRuntime.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntime.jsx(ShieldOff, { className: "h-4 w-4" }),
              "Reset MFA"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntime.jsx(
        EditableProfileHeader,
        {
          profile: personaData,
          onProfileUpdate: handleProfileUpdate,
          onOptimisticUpdate: handleOptimisticUpdate
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsx(PersonaDetailsTabs, { profile: personaData, userId }),
      /* @__PURE__ */ jsxRuntime.jsx(alertDialog.AlertDialog, { open: showResetMfaConfirm, onOpenChange: setShowResetMfaConfirm, children: /* @__PURE__ */ jsxRuntime.jsxs(alertDialog.AlertDialogContent, { children: [
        /* @__PURE__ */ jsxRuntime.jsxs(alertDialog.AlertDialogHeader, { children: [
          /* @__PURE__ */ jsxRuntime.jsxs(alertDialog.AlertDialogTitle, { children: [
            "Reset MFA for ",
            userProfile.full_name || "this user",
            "?"
          ] }),
          /* @__PURE__ */ jsxRuntime.jsx(alertDialog.AlertDialogDescription, { children: "This will remove their enrolled authenticator. They will be able to log in without MFA on their next login and will need to re-enrol if MFA is required for their account." })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs(alertDialog.AlertDialogFooter, { children: [
          /* @__PURE__ */ jsxRuntime.jsx(alertDialog.AlertDialogCancel, { children: "Cancel" }),
          /* @__PURE__ */ jsxRuntime.jsx(alertDialog.AlertDialogAction, { onClick: handleResetMfa, children: "Reset MFA" })
        ] })
      ] }) })
    ] });
  };
  const Certificates = ({ profile }) => {
    const { certificates } = profile;
    const { supabaseClient } = useOrganisationContext();
    const printRef = React.useRef(null);
    const [downloadingId, setDownloadingId] = React.useState(null);
    const handlePrint = reactToPrint.useReactToPrint({ contentRef: printRef });
    const handleDownload = async (certId) => {
      var _a;
      if (!certId) {
        sonner.toast.error("Certificate ID is missing");
        return;
      }
      setDownloadingId(certId);
      try {
        const { data: sessionData } = await supabaseClient.auth.getSession();
        const jwt = (_a = sessionData == null ? void 0 : sessionData.session) == null ? void 0 : _a.access_token;
        if (!jwt) {
          sonner.toast.error("Not authenticated");
          return;
        }
        const { data, error } = await supabaseClient.functions.invoke("get-certificate-url", {
          body: { certificate_id: certId },
          headers: { Authorization: `Bearer ${jwt}` }
        });
        if (error || !(data == null ? void 0 : data.url)) {
          console.error("[Certificates] get-certificate-url error:", error);
          sonner.toast.error("Failed to get download link");
          return;
        }
        window.open(data.url, "_blank");
      } catch (err) {
        console.error("[Certificates] download error:", err);
        sonner.toast.error("Failed to download certificate");
      } finally {
        setDownloadingId(null);
      }
    };
    const formatDate2 = (dateString) => {
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
    return /* @__PURE__ */ jsxRuntime.jsx("div", { className: "space-y-4 animate-fade-in", children: filteredCertificates.length === 0 ? /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-muted-foreground text-center py-8", children: "No certificates yet" }) : /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
      /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxRuntime.jsxs(button.Button, { variant: "outline", size: "sm", onClick: () => handlePrint(), children: [
        /* @__PURE__ */ jsxRuntime.jsx(Printer, { className: "h-4 w-4 mr-2" }),
        "Print All"
      ] }) }),
      /* @__PURE__ */ jsxRuntime.jsx("div", { ref: printRef, className: "space-y-4", children: filteredCertificates.map((cert, index) => /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "border rounded-lg p-4", children: [
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center justify-between gap-3 mb-3", children: [
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-3 min-w-0 flex-1", children: [
            getTypeIcon(cert.type),
            /* @__PURE__ */ jsxRuntime.jsx("h3", { className: "font-semibold text-lg truncate", children: cert.name })
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-3", children: [
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
            /* @__PURE__ */ jsxRuntime.jsx("span", { className: "font-medium", children: formatDate2(cert.dateAcquired) })
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntime.jsx(Calendar, { className: "h-4 w-4 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-muted-foreground", children: "Expires:" }),
            /* @__PURE__ */ jsxRuntime.jsx("span", { className: "font-medium", children: formatDate2(cert.expiryDate) })
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center justify-end gap-2", children: [
            /* @__PURE__ */ jsxRuntime.jsx(badge.Badge, { className: `${getStatusColor(cert.status)} text-white`, children: cert.status }),
            cert.certificate_url && cert.id && /* @__PURE__ */ jsxRuntime.jsx(
              button.Button,
              {
                variant: "outline",
                size: "sm",
                disabled: downloadingId === cert.id,
                onClick: () => handleDownload(cert.id),
                className: "print:hidden",
                children: downloadingId === cert.id ? /* @__PURE__ */ jsxRuntime.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntime.jsx(Download, { className: "h-4 w-4" })
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
    const [loading, setLoading] = React.useState(false);
    const [selectedUserId, setSelectedUserId] = React.useState("");
    const { profiles } = useUserProfiles.useUserProfiles();
    const [formData, setFormData] = React.useState({
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
                  profile.email || "No email",
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
    email,
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
    const { userDepartments } = useUserDepartments.useUserDepartments(userId);
    const { primaryRole } = useUserProfileRoles.useUserProfileRoles(userId);
    const { data: physicalLocations, isLoading: locationsLoading } = useUserPhysicalLocations.useUserPhysicalLocations(userId);
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
    const managerName = managerProfile ? managerProfile.full_name || managerProfile.email : "Not assigned";
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
          email && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
            /* @__PURE__ */ jsxRuntime.jsx(User, { className: "h-4 w-4 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-foreground", children: email })
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
                  /* @__PURE__ */ jsxRuntime.jsx(select.SelectContent, { children: filteredProfiles.map((user) => /* @__PURE__ */ jsxRuntime.jsx(select.SelectItem, { value: user.id, children: user.full_name || user.email || "Unnamed User" }, user.id)) })
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
    isEditing
  }) => {
    const [isAddingRole, setIsAddingRole] = React.useState(false);
    const [selectedRole, setSelectedRole] = React.useState("");
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
            /* @__PURE__ */ jsxRuntime.jsx(button.Button, { variant: "outline", size: "icon", onClick: () => setIsAddingRole(false), children: /* @__PURE__ */ jsxRuntime.jsx(X, { className: "w-4 h-4" }) }),
            /* @__PURE__ */ jsxRuntime.jsx(
              button.Button,
              {
                size: "icon",
                onClick: handleAddRole,
                disabled: !selectedRole || addRoleMutation.isPending,
                children: /* @__PURE__ */ jsxRuntime.jsx(Save, { className: "w-4 h-4" })
              }
            )
          ] })
        ] })
      ] }) })
    ] });
  };
  const DocumentManagement = ({ onNavigateToAssignments: _onNavigateToAssignments }) => {
    const { supabaseClient: supabase } = useOrganisationContext();
    const queryClient = reactQuery.useQueryClient();
    const [searchTerm, setSearchTerm] = React.useState("");
    const [categoryFilter, setCategoryFilter] = React.useState("all");
    const [isCreateDialogOpen, setIsCreateDialogOpen] = React.useState(false);
    const [editingDocument, setEditingDocument] = React.useState(null);
    const [openingDocId, setOpeningDocId] = React.useState(null);
    const [documentPendingDelete, setDocumentPendingDelete] = React.useState(null);
    const { data: documents, isLoading } = reactQuery.useQuery({
      queryKey: ["documents"],
      queryFn: async () => {
        const { data, error } = await supabase.from("documents").select("*").order("created_at", { ascending: false });
        if (error) throw error;
        return data;
      }
    });
    const createDocumentMutation = reactQuery.useMutation({
      mutationFn: async (documentData) => {
        const { error } = await supabase.from("documents").insert([documentData]);
        if (error) throw error;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["documents"] });
        setIsCreateDialogOpen(false);
        useToast.toast({ title: "Success", description: "Document created successfully" });
      },
      onError: (error) => {
        useToast.toast({ title: "Error", description: error.message, variant: "destructive" });
      }
    });
    const updateDocumentMutation = reactQuery.useMutation({
      mutationFn: async (documentData) => {
        const { error } = await supabase.from("documents").update(documentData).eq("document_id", documentData.document_id);
        if (error) throw error;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["documents"] });
        setEditingDocument(null);
        useToast.toast({ title: "Success", description: "Document updated successfully" });
      },
      onError: (error) => {
        useToast.toast({ title: "Error", description: error.message, variant: "destructive" });
      }
    });
    const deleteDocumentMutation = reactQuery.useMutation({
      mutationFn: async (doc) => {
        if (doc.file_name) {
          await supabase.storage.from("documents").remove([doc.file_name]);
        }
        const { error } = await supabase.from("documents").delete().eq("document_id", doc.document_id);
        if (error) throw error;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["documents"] });
        useToast.toast({ title: "Success", description: "Document deleted successfully" });
      },
      onError: (error) => {
        useToast.toast({ title: "Error", description: error.message, variant: "destructive" });
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
        const { data: { session } } = await supabase.auth.getSession();
        debug.log("[DocumentManagement.handleOpenDocument] session present:", !!session);
        debug.log("[DocumentManagement.handleOpenDocument] token prefix:", ((_a = session == null ? void 0 : session.access_token) == null ? void 0 : _a.substring(0, 20)) ?? "none");
        debug.log("[DocumentManagement.handleOpenDocument] supabase.functions available:", !!supabase.functions);
        debug.log("[DocumentManagement.handleOpenDocument] document_id:", doc.document_id);
        const { data, error } = await supabase.functions.invoke("get-document-url", {
          body: { document_id: doc.document_id }
        });
        debug.log("[DocumentManagement.handleOpenDocument] invoke result — data:", data, "| error:", error);
        if (error) throw error;
        window.open(data.url, "_blank", "noopener,noreferrer");
      } catch (err) {
        debug.error("[DocumentManagement.handleOpenDocument] error:", err);
        useToast.toast({ title: "Error", description: err.message, variant: "destructive" });
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
      return /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex items-center justify-center h-64", children: /* @__PURE__ */ jsxRuntime.jsx("div", { className: "animate-spin rounded-full h-32 w-32 border-b-2 border-primary" }) });
    }
    return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntime.jsx("h2", { className: "text-2xl font-bold", children: "Document Management" }),
          /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-muted-foreground", children: "Create and manage organizational documents" })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs(dialog.Dialog, { open: isCreateDialogOpen, onOpenChange: setIsCreateDialogOpen, children: [
          /* @__PURE__ */ jsxRuntime.jsx(dialog.DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntime.jsx(button.Button, { size: "icon", className: "flex items-center gap-2", children: /* @__PURE__ */ jsxRuntime.jsx(Plus, { className: "h-4 w-4 mr-2" }) }) }),
          /* @__PURE__ */ jsxRuntime.jsxs(dialog.DialogContent, { className: "max-w-2xl", children: [
            /* @__PURE__ */ jsxRuntime.jsxs(dialog.DialogHeader, { children: [
              /* @__PURE__ */ jsxRuntime.jsx(dialog.DialogTitle, { children: "Create New Document" }),
              /* @__PURE__ */ jsxRuntime.jsx(dialog.DialogDescription, { children: "Add a new document to the knowledge base" })
            ] }),
            /* @__PURE__ */ jsxRuntime.jsx(
              DocumentForm,
              {
                supabase,
                onSubmit: (data) => createDocumentMutation.mutate(data),
                isSubmitting: createDocumentMutation.isPending
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex flex-col sm:flex-row gap-4", children: [
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxRuntime.jsx(label.Label, { htmlFor: "search", children: "Search Documents" }),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntime.jsx(Search, { className: "absolute left-3 top-3 h-4 w-4 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntime.jsx(
              input.Input,
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
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "w-full sm:w-48", children: [
          /* @__PURE__ */ jsxRuntime.jsx(label.Label, { children: "Filter by Category" }),
          /* @__PURE__ */ jsxRuntime.jsxs(select.Select, { value: categoryFilter, onValueChange: setCategoryFilter, children: [
            /* @__PURE__ */ jsxRuntime.jsx(select.SelectTrigger, { children: /* @__PURE__ */ jsxRuntime.jsx(select.SelectValue, { placeholder: "All categories" }) }),
            /* @__PURE__ */ jsxRuntime.jsxs(select.SelectContent, { children: [
              /* @__PURE__ */ jsxRuntime.jsx(select.SelectItem, { value: "all", children: "All Categories" }),
              categories.map((category) => /* @__PURE__ */ jsxRuntime.jsx(select.SelectItem, { value: category, children: category }, category))
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsx("div", { className: "grid gap-4", children: filteredDocuments == null ? void 0 : filteredDocuments.map((document2) => /* @__PURE__ */ jsxRuntime.jsxs(card.Card, { children: [
        /* @__PURE__ */ jsxRuntime.jsx(card.CardHeader, { children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-start justify-between", children: [
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntime.jsx(card.CardTitle, { className: "text-lg", children: document2.title }),
              document2.required && /* @__PURE__ */ jsxRuntime.jsx(badge.Badge, { variant: "destructive", className: "text-xs", children: "Required" }),
              /* @__PURE__ */ jsxRuntime.jsxs(badge.Badge, { variant: "outline", className: "text-xs", children: [
                "v",
                document2.version
              ] }),
              document2.file_name ? /* @__PURE__ */ jsxRuntime.jsxs(badge.Badge, { variant: "secondary", className: "text-xs gap-1", children: [
                /* @__PURE__ */ jsxRuntime.jsx(FileText, { className: "h-3 w-3" }),
                "File"
              ] }) : document2.url ? /* @__PURE__ */ jsxRuntime.jsxs(badge.Badge, { variant: "secondary", className: "text-xs gap-1", children: [
                /* @__PURE__ */ jsxRuntime.jsx(Link, { className: "h-3 w-3" }),
                "URL"
              ] }) : null
            ] }),
            document2.description && /* @__PURE__ */ jsxRuntime.jsx(card.CardDescription, { className: "mt-2", children: document2.description })
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-2", children: [
            (document2.url || document2.file_name) && /* @__PURE__ */ jsxRuntime.jsx(
              button.Button,
              {
                variant: "outline",
                size: "icon",
                onClick: () => handleOpenDocument(document2),
                disabled: openingDocId === document2.document_id,
                title: "View document",
                children: openingDocId === document2.document_id ? /* @__PURE__ */ jsxRuntime.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntime.jsx(Eye, { className: "h-4 w-4" })
              }
            ),
            /* @__PURE__ */ jsxRuntime.jsx(
              button.Button,
              {
                variant: "outline",
                size: "icon",
                onClick: () => setEditingDocument(document2),
                title: "Edit document",
                children: /* @__PURE__ */ jsxRuntime.jsx(SquarePen, { className: "h-4 w-4" })
              }
            ),
            /* @__PURE__ */ jsxRuntime.jsx(
              button.Button,
              {
                variant: "outline",
                size: "icon",
                disabled: !!document2.is_system,
                onClick: () => setDocumentPendingDelete(document2),
                title: document2.is_system ? "System document — cannot be deleted" : "Delete document",
                children: /* @__PURE__ */ jsxRuntime.jsx(Trash2, { className: "h-4 w-4" })
              }
            )
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntime.jsx(card.CardContent, { children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-4 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntime.jsx(Calendar, { className: "h-4 w-4" }),
            "Due in ",
            document2.due_days,
            " days"
          ] }),
          document2.category && /* @__PURE__ */ jsxRuntime.jsx(badge.Badge, { variant: "outline", className: "text-xs", children: document2.category })
        ] }) })
      ] }, document2.document_id)) }),
      /* @__PURE__ */ jsxRuntime.jsx(alertDialog.AlertDialog, { open: !!documentPendingDelete, onOpenChange: (open) => !open && setDocumentPendingDelete(null), children: /* @__PURE__ */ jsxRuntime.jsxs(alertDialog.AlertDialogContent, { children: [
        /* @__PURE__ */ jsxRuntime.jsxs(alertDialog.AlertDialogHeader, { children: [
          /* @__PURE__ */ jsxRuntime.jsx(alertDialog.AlertDialogTitle, { children: "Delete document?" }),
          /* @__PURE__ */ jsxRuntime.jsxs(alertDialog.AlertDialogDescription, { children: [
            "This will permanently remove",
            " ",
            /* @__PURE__ */ jsxRuntime.jsx("span", { className: "font-medium", children: (documentPendingDelete == null ? void 0 : documentPendingDelete.title) ?? "this document" }),
            " from the library."
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs(alertDialog.AlertDialogFooter, { children: [
          /* @__PURE__ */ jsxRuntime.jsx(alertDialog.AlertDialogCancel, { disabled: deleteDocumentMutation.isPending, children: "Cancel" }),
          /* @__PURE__ */ jsxRuntime.jsx(
            alertDialog.AlertDialogAction,
            {
              className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
              disabled: deleteDocumentMutation.isPending,
              onClick: () => {
                if (documentPendingDelete) {
                  deleteDocumentMutation.mutate(documentPendingDelete);
                }
                setDocumentPendingDelete(null);
              },
              children: "Delete"
            }
          )
        ] })
      ] }) }),
      editingDocument && /* @__PURE__ */ jsxRuntime.jsx(dialog.Dialog, { open: !!editingDocument, onOpenChange: () => setEditingDocument(null), children: /* @__PURE__ */ jsxRuntime.jsxs(dialog.DialogContent, { className: "max-w-2xl", children: [
        /* @__PURE__ */ jsxRuntime.jsxs(dialog.DialogHeader, { children: [
          /* @__PURE__ */ jsxRuntime.jsx(dialog.DialogTitle, { children: "Edit Document" }),
          /* @__PURE__ */ jsxRuntime.jsx(dialog.DialogDescription, { children: "Update document information" })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsx(
          DocumentForm,
          {
            supabase,
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
  const DocumentForm = ({ supabase, initialData, onSubmit, isSubmitting }) => {
    const [title, setTitle] = React.useState((initialData == null ? void 0 : initialData.title) ?? "");
    const [description, setDescription] = React.useState((initialData == null ? void 0 : initialData.description) ?? "");
    const [category, setCategory] = React.useState((initialData == null ? void 0 : initialData.category) ?? "");
    const [required, setRequired] = React.useState((initialData == null ? void 0 : initialData.required) ?? false);
    const [version, setVersion] = React.useState((initialData == null ? void 0 : initialData.version) ?? 1);
    const [dueDays, setDueDays] = React.useState((initialData == null ? void 0 : initialData.due_days) ?? 30);
    const [sourceType, setSourceType] = React.useState(
      (initialData == null ? void 0 : initialData.file_name) ? "file" : "url"
    );
    const [url, setUrl] = React.useState((initialData == null ? void 0 : initialData.url) ?? "");
    const [selectedFile, setSelectedFile] = React.useState(null);
    const existingFileName = initialData == null ? void 0 : initialData.file_name;
    const [isUploading, setIsUploading] = React.useState(false);
    const fileInputRef = React.useRef(null);
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
            await supabase.storage.from("documents").remove([existingFileName]);
          }
          const ext = selectedFile.name.split(".").pop();
          const storagePath = `${crypto.randomUUID()}.${ext}`;
          debug.log("[DocumentForm] uploading to storage path:", storagePath);
          const { error: uploadError } = await supabase.storage.from("documents").upload(storagePath, selectedFile, {
            contentType: selectedFile.type,
            upsert: false
          });
          if (uploadError) throw uploadError;
          file_name = storagePath;
          file_type = selectedFile.type;
          finalUrl = void 0;
        } catch (err) {
          debug.error("[DocumentForm] upload error:", err);
          useToast.toast({ title: "Upload failed", description: err.message, variant: "destructive" });
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
    return /* @__PURE__ */ jsxRuntime.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntime.jsx(label.Label, { htmlFor: "title", children: "Title *" }),
        /* @__PURE__ */ jsxRuntime.jsx(
          input.Input,
          {
            id: "title",
            value: title,
            onChange: (e) => setTitle(e.target.value),
            required: true
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntime.jsx(label.Label, { htmlFor: "description", children: "Description" }),
        /* @__PURE__ */ jsxRuntime.jsx(
          textarea.Textarea,
          {
            id: "description",
            value: description,
            onChange: (e) => setDescription(e.target.value)
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntime.jsx(label.Label, { htmlFor: "category", children: "Category" }),
          /* @__PURE__ */ jsxRuntime.jsx(
            input.Input,
            {
              id: "category",
              list: "category-options",
              value: category,
              onChange: (e) => setCategory(e.target.value),
              placeholder: "e.g., Policy, Handbook"
            }
          ),
          /* @__PURE__ */ jsxRuntime.jsxs("datalist", { id: "category-options", children: [
            /* @__PURE__ */ jsxRuntime.jsx("option", { value: "policy" }),
            /* @__PURE__ */ jsxRuntime.jsx("option", { value: "handbook" }),
            /* @__PURE__ */ jsxRuntime.jsx("option", { value: "procedure" }),
            /* @__PURE__ */ jsxRuntime.jsx("option", { value: "guideline" }),
            /* @__PURE__ */ jsxRuntime.jsx("option", { value: "template" }),
            /* @__PURE__ */ jsxRuntime.jsx("option", { value: "report" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntime.jsx(label.Label, { htmlFor: "version", children: "Version" }),
          /* @__PURE__ */ jsxRuntime.jsx(
            input.Input,
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
      /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntime.jsx(label.Label, { children: "Document Source" }),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex gap-2 mt-1", children: [
          /* @__PURE__ */ jsxRuntime.jsxs(
            button.Button,
            {
              type: "button",
              variant: sourceType === "url" ? "default" : "outline",
              size: "sm",
              onClick: () => setSourceType("url"),
              children: [
                /* @__PURE__ */ jsxRuntime.jsx(Link, { className: "h-4 w-4 mr-1" }),
                "External URL"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntime.jsxs(
            button.Button,
            {
              type: "button",
              variant: sourceType === "file" ? "default" : "outline",
              size: "sm",
              onClick: () => setSourceType("file"),
              children: [
                /* @__PURE__ */ jsxRuntime.jsx(Upload, { className: "h-4 w-4 mr-1" }),
                "Upload File"
              ]
            }
          )
        ] })
      ] }),
      sourceType === "url" ? /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntime.jsx(label.Label, { htmlFor: "url", children: "Document URL" }),
        /* @__PURE__ */ jsxRuntime.jsx(
          input.Input,
          {
            id: "url",
            type: "url",
            value: url,
            onChange: (e) => setUrl(e.target.value),
            placeholder: "https://example.com/document.pdf"
          }
        )
      ] }) : /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntime.jsx(label.Label, { htmlFor: "file", children: "Upload File" }),
        existingFileName && !selectedFile && /* @__PURE__ */ jsxRuntime.jsxs("p", { className: "text-sm text-muted-foreground mb-1 flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntime.jsx(FileText, { className: "h-4 w-4" }),
          "Current file: ",
          existingFileName.split("/").pop()
        ] }),
        /* @__PURE__ */ jsxRuntime.jsx(
          "div",
          {
            className: "border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:border-primary transition-colors",
            onClick: () => {
              var _a;
              return (_a = fileInputRef.current) == null ? void 0 : _a.click();
            },
            children: selectedFile ? /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-sm font-medium", children: selectedFile.name }) : /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntime.jsx(Upload, { className: "h-8 w-8 mx-auto text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-sm text-muted-foreground", children: "Click to select a file" }),
              /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-xs text-muted-foreground", children: "PDF, Word, Excel, PowerPoint, TXT, CSV (max 50 MB)" })
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsx(
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
      /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntime.jsx(label.Label, { htmlFor: "due_days", children: "Due Days" }),
        /* @__PURE__ */ jsxRuntime.jsx(
          input.Input,
          {
            id: "due_days",
            type: "number",
            min: "1",
            value: dueDays,
            onChange: (e) => setDueDays(parseInt(e.target.value) || 30)
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center space-x-2", children: [
        /* @__PURE__ */ jsxRuntime.jsx(
          checkbox.Checkbox,
          {
            id: "required",
            checked: required,
            onCheckedChange: (val) => setRequired(!!val)
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsx(label.Label, { htmlFor: "required", children: "Required reading" })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex justify-end space-x-2 pt-4", children: /* @__PURE__ */ jsxRuntime.jsxs(button.Button, { type: "submit", size: "sm", disabled: busy, children: [
        busy ? /* @__PURE__ */ jsxRuntime.jsx(LoaderCircle, { className: "h-4 w-4 mr-1 animate-spin" }) : /* @__PURE__ */ jsxRuntime.jsx(Save, { className: "h-4 w-4 mr-1" }),
        isUploading ? "Uploading…" : "Save"
      ] }) })
    ] });
  };
  const DocumentAssignmentsDrillDown = ({
    documentId,
    documentTitle,
    onBack
  }) => {
    const { supabaseClient: supabase } = useOrganisationContext();
    const [drillDownPath, setDrillDownPath] = React.useState([]);
    const { data: profiles = [] } = reactQuery.useQuery({
      queryKey: ["profiles"],
      queryFn: async () => {
        const { data, error } = await supabase.from("profiles").select("*");
        if (error) throw error;
        return data || [];
      }
    });
    const { data: documentAssignments = [], isLoading: assignmentsLoading } = reactQuery.useQuery({
      queryKey: ["document-assignments", documentId],
      queryFn: async () => {
        if (!documentId) return [];
        const { data, error } = await supabase.from("document_assignments").select("*").eq("document_id", documentId);
        if (error) throw error;
        return data || [];
      },
      enabled: !!documentId
    });
    const { data: userDepartments = [] } = reactQuery.useQuery({
      queryKey: ["user-departments"],
      queryFn: async () => {
        const { data, error } = await supabase.from("user_departments").select("*").eq("is_primary", true);
        if (error) throw error;
        return data || [];
      }
    });
    const { data: departmentsList = [] } = reactQuery.useQuery({
      queryKey: ["departments"],
      queryFn: async () => {
        const { data, error } = await supabase.from("departments").select("*");
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
    React.useEffect(() => {
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
    const renderBreadcrumb = () => /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex items-center gap-2 mb-6", children: drillDownPath.map((level, index) => /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntime.jsx(
        button.Button,
        {
          variant: "ghost",
          size: "sm",
          onClick: () => onBreadcrumbClick(index),
          className: index === drillDownPath.length - 1 ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground",
          children: level.title
        }
      ),
      index < drillDownPath.length - 1 && /* @__PURE__ */ jsxRuntime.jsx(ChevronRight, { className: "h-4 w-4 text-muted-foreground" })
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
      const locationCards = [...locationGroups.entries()].map(([locName, profs]) => /* @__PURE__ */ jsxRuntime.jsxs(
        card.Card,
        {
          className: "cursor-pointer hover:shadow-lg transition-shadow",
          onClick: () => onDrillDown(profs, locName, "location", profs.length),
          children: [
            /* @__PURE__ */ jsxRuntime.jsxs(card.CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [
              /* @__PURE__ */ jsxRuntime.jsx(card.CardTitle, { className: "text-sm font-medium", children: locName }),
              /* @__PURE__ */ jsxRuntime.jsx(MapPin, { className: "h-4 w-4 text-muted-foreground" })
            ] }),
            /* @__PURE__ */ jsxRuntime.jsx(card.CardContent, { children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntime.jsx("div", { className: "text-xl font-bold text-blue-600", children: profs.length }),
              /* @__PURE__ */ jsxRuntime.jsx("div", { className: "text-xs text-muted-foreground", children: "assigned staff" })
            ] }) })
          ]
        },
        locName
      ));
      const noDeptProfiles = deptGroups.get("__no_dept__") || [];
      const departmentCards = [
        ...[...deptGroups.entries()].filter(([key]) => key !== "__no_dept__").map(([deptName, profs]) => /* @__PURE__ */ jsxRuntime.jsxs(
          card.Card,
          {
            className: "cursor-pointer hover:shadow-lg transition-shadow",
            onClick: () => onDrillDown(profs, deptName, "department", profs.length),
            children: [
              /* @__PURE__ */ jsxRuntime.jsxs(card.CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [
                /* @__PURE__ */ jsxRuntime.jsx(card.CardTitle, { className: "text-sm font-medium", children: deptName }),
                /* @__PURE__ */ jsxRuntime.jsx(Building, { className: "h-4 w-4 text-muted-foreground" })
              ] }),
              /* @__PURE__ */ jsxRuntime.jsx(card.CardContent, { children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntime.jsx("div", { className: "text-xl font-bold text-blue-600", children: profs.length }),
                /* @__PURE__ */ jsxRuntime.jsx("div", { className: "text-xs text-muted-foreground", children: "assigned staff" })
              ] }) })
            ]
          },
          deptName
        )),
        noDeptProfiles.length > 0 && /* @__PURE__ */ jsxRuntime.jsxs(
          card.Card,
          {
            className: "cursor-pointer hover:shadow-lg transition-shadow",
            onClick: () => onDrillDown(noDeptProfiles, "No Department", "department", noDeptProfiles.length),
            children: [
              /* @__PURE__ */ jsxRuntime.jsxs(card.CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [
                /* @__PURE__ */ jsxRuntime.jsx(card.CardTitle, { className: "text-sm font-medium text-muted-foreground", children: "No Department" }),
                /* @__PURE__ */ jsxRuntime.jsx(Building, { className: "h-4 w-4 text-muted-foreground" })
              ] }),
              /* @__PURE__ */ jsxRuntime.jsx(card.CardContent, { children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntime.jsx("div", { className: "text-xl font-bold text-blue-600", children: noDeptProfiles.length }),
                /* @__PURE__ */ jsxRuntime.jsx("div", { className: "text-xs text-muted-foreground", children: "assigned staff" })
              ] }) })
            ]
          },
          "no-department"
        )
      ].filter(Boolean);
      return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntime.jsxs(card.Card, { children: [
          /* @__PURE__ */ jsxRuntime.jsx(card.CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: /* @__PURE__ */ jsxRuntime.jsxs(card.CardTitle, { className: "text-sm font-medium flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntime.jsx(Building, { className: "h-4 w-4" }),
            "Organization Overview"
          ] }) }),
          /* @__PURE__ */ jsxRuntime.jsxs(card.CardContent, { children: [
            /* @__PURE__ */ jsxRuntime.jsx("div", { className: "text-xl font-bold text-blue-600", children: currentLevel.value ?? currentLevel.data.length }),
            /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-xs text-muted-foreground", children: "Total assigned staff" })
          ] })
        ] }),
        locationCards.length > 0 && /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
          /* @__PURE__ */ jsxRuntime.jsx("h3", { className: "text-lg font-semibold", children: "Locations" }),
          /* @__PURE__ */ jsxRuntime.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: locationCards })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsx("h3", { className: "text-lg font-semibold", children: "Departments" }),
        /* @__PURE__ */ jsxRuntime.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: departmentCards })
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
          return /* @__PURE__ */ jsxRuntime.jsxs(
            card.Card,
            {
              className: "cursor-pointer hover:shadow-lg transition-shadow",
              onClick: () => onDrillDown(departmentProfiles, departmentName, "department", departmentProfiles.length),
              children: [
                /* @__PURE__ */ jsxRuntime.jsxs(card.CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [
                  /* @__PURE__ */ jsxRuntime.jsx(card.CardTitle, { className: "text-sm font-medium", children: departmentName }),
                  /* @__PURE__ */ jsxRuntime.jsx(Building, { className: "h-4 w-4 text-muted-foreground" })
                ] }),
                /* @__PURE__ */ jsxRuntime.jsx(card.CardContent, { children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center justify-between", children: [
                  /* @__PURE__ */ jsxRuntime.jsx("div", { className: "text-xl font-bold text-blue-600", children: departmentProfiles.length }),
                  /* @__PURE__ */ jsxRuntime.jsx("div", { className: "text-xs text-muted-foreground", children: "assigned staff" })
                ] }) })
              ]
            },
            departmentName
          );
        }).filter(Boolean),
        noDeptProfiles.length > 0 && /* @__PURE__ */ jsxRuntime.jsxs(
          card.Card,
          {
            className: "cursor-pointer hover:shadow-lg transition-shadow",
            onClick: () => onDrillDown(noDeptProfiles, "No Department", "department", noDeptProfiles.length),
            children: [
              /* @__PURE__ */ jsxRuntime.jsxs(card.CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [
                /* @__PURE__ */ jsxRuntime.jsx(card.CardTitle, { className: "text-sm font-medium text-muted-foreground", children: "No Department" }),
                /* @__PURE__ */ jsxRuntime.jsx(Building, { className: "h-4 w-4 text-muted-foreground" })
              ] }),
              /* @__PURE__ */ jsxRuntime.jsx(card.CardContent, { children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntime.jsx("div", { className: "text-xl font-bold text-blue-600", children: noDeptProfiles.length }),
                /* @__PURE__ */ jsxRuntime.jsx("div", { className: "text-xs text-muted-foreground", children: "assigned staff" })
              ] }) })
            ]
          },
          "no-department"
        )
      ].filter(Boolean);
      return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntime.jsxs(card.Card, { children: [
          /* @__PURE__ */ jsxRuntime.jsx(card.CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: /* @__PURE__ */ jsxRuntime.jsxs(card.CardTitle, { className: "text-sm font-medium flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntime.jsx(MapPin, { className: "h-4 w-4" }),
            currentLevel.title,
            " Overview"
          ] }) }),
          /* @__PURE__ */ jsxRuntime.jsxs(card.CardContent, { children: [
            /* @__PURE__ */ jsxRuntime.jsx("div", { className: "text-xl font-bold text-blue-600", children: currentLevel.value ?? currentLevel.data.length }),
            /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-xs text-muted-foreground", children: "Total assigned staff" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsx("h3", { className: "text-lg font-semibold", children: "Departments" }),
        /* @__PURE__ */ jsxRuntime.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: departmentCards })
      ] });
    };
    const renderDepartmentLevel = () => {
      const currentLevel = drillDownPath[drillDownPath.length - 1];
      return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntime.jsxs(card.Card, { children: [
          /* @__PURE__ */ jsxRuntime.jsx(card.CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: /* @__PURE__ */ jsxRuntime.jsxs(card.CardTitle, { className: "text-sm font-medium flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntime.jsx(Building, { className: "h-4 w-4" }),
            currentLevel.title,
            " Overview"
          ] }) }),
          /* @__PURE__ */ jsxRuntime.jsxs(card.CardContent, { children: [
            /* @__PURE__ */ jsxRuntime.jsx("div", { className: "text-xl font-bold text-blue-600", children: currentLevel.value ?? currentLevel.data.length }),
            /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-xs text-muted-foreground", children: "Total assigned staff" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsx("h3", { className: "text-lg font-semibold", children: "Staff" }),
        renderStaffList()
      ] });
    };
    const renderStaffList = () => {
      const currentLevel = drillDownPath[drillDownPath.length - 1];
      const allProfilesInLevel = currentLevel.data;
      return /* @__PURE__ */ jsxRuntime.jsx("div", { className: "space-y-4", children: /* @__PURE__ */ jsxRuntime.jsx("div", { className: "grid grid-cols-1 gap-3", children: allProfilesInLevel.map((profile) => {
        const status = getAssignmentStatus(profile.id);
        const badgeProps = getStatusBadgeProps(status);
        const userDepts = userDeptMap.get(profile.id) || [];
        const primaryDept = userDepts.find((ud) => ud.is_primary);
        const deptName = primaryDept ? departmentMap.get(primaryDept.department_id) : "No Department";
        return /* @__PURE__ */ jsxRuntime.jsx(card.Card, { children: /* @__PURE__ */ jsxRuntime.jsx(card.CardContent, { className: "p-4", children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntime.jsx(Users, { className: "h-4 w-4 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntime.jsx("div", { className: "font-medium", children: profile.full_name || "Unknown Name" }),
              /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "text-sm text-muted-foreground", children: [
                profile.location,
                " • ",
                deptName,
                " • ",
                profile.primary_role || "No Role"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntime.jsx(badge.Badge, { variant: badgeProps.variant, className: badgeProps.className, children: status })
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
      return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "w-full space-y-6", children: [
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsxRuntime.jsx(button.Button, { variant: "outline", size: "icon", onClick: onBack, children: /* @__PURE__ */ jsxRuntime.jsx(ArrowLeft, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntime.jsx("h1", { className: "text-2xl font-bold", children: documentTitle }),
            /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-muted-foreground", children: "Document assignment breakdown" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex items-center justify-center py-8", children: /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-muted-foreground", children: "Loading assignment data..." }) })
      ] });
    }
    return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "w-full space-y-6", children: [
      /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntime.jsx(button.Button, { variant: "outline", size: "icon", onClick: onBack, children: /* @__PURE__ */ jsxRuntime.jsx(ArrowLeft, { className: "h-4 w-4" }) }),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntime.jsx("h1", { className: "text-2xl font-bold", children: documentTitle }),
          /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-muted-foreground", children: "Document assignment breakdown" })
        ] })
      ] }),
      renderBreadcrumb(),
      renderContent()
    ] });
  };
  const DocumentAssignments = () => {
    const { supabaseClient: supabase, basePath } = useOrganisationContext();
    const clientId = basePath ? basePath.replace(/^\//, "") : "default";
    const queryClient = reactQuery.useQueryClient();
    const { user } = staysecureAuth.useAuth();
    const [searchTerm, setSearchTerm] = React.useState("");
    const [isAssignDialogOpen, setIsAssignDialogOpen] = React.useState(false);
    const [selectedDocument, setSelectedDocument] = React.useState(null);
    const [assignmentType, setAssignmentType] = React.useState("departments");
    const [selectedTargets, setSelectedTargets] = React.useState([]);
    const [selectedDocumentForDrillDown, setSelectedDocumentForDrillDown] = React.useState(null);
    const { data: currentUserRoles } = reactQuery.useQuery({
      queryKey: ["current-user-roles-doc", user == null ? void 0 : user.id],
      queryFn: async () => {
        const { data } = await supabase.from("user_roles").select("role").eq("user_id", user.id);
        return (data == null ? void 0 : data.map((r) => r.role)) || [];
      },
      enabled: !!(user == null ? void 0 : user.id)
    });
    const hasAdminAccess = currentUserRoles ? currentUserRoles.some((r) => ["super_admin", "client_admin"].includes(r)) : true;
    const { data: managedDepartmentIds } = reactQuery.useQuery({
      queryKey: ["manager-dept-ids", user == null ? void 0 : user.id],
      queryFn: async () => {
        const { data } = await supabase.from("departments").select("id").eq("manager_id", user.id);
        return (data == null ? void 0 : data.map((d) => d.id)) || [];
      },
      enabled: !!(user == null ? void 0 : user.id)
    });
    const { data: managedUserIds } = reactQuery.useQuery({
      queryKey: ["manager-user-ids", user == null ? void 0 : user.id, managedDepartmentIds],
      queryFn: async () => {
        const ids = /* @__PURE__ */ new Set();
        if (user == null ? void 0 : user.id) ids.add(user.id);
        if (managedDepartmentIds && managedDepartmentIds.length > 0) {
          const { data: udData } = await supabase.from("user_departments").select("user_id").in("department_id", managedDepartmentIds);
          (udData || []).forEach((r) => ids.add(r.user_id));
        }
        const { data: directReports } = await supabase.from("profiles").select("id").eq("manager", user.id);
        (directReports || []).forEach((r) => ids.add(r.id));
        return [...ids];
      },
      enabled: !!(user == null ? void 0 : user.id)
    });
    const { data: managedRoleIds } = reactQuery.useQuery({
      queryKey: ["manager-role-ids", user == null ? void 0 : user.id, managedDepartmentIds],
      queryFn: async () => {
        if (!managedDepartmentIds || managedDepartmentIds.length === 0) return [];
        const { data } = await supabase.from("roles").select("role_id").in("department_id", managedDepartmentIds);
        return (data == null ? void 0 : data.map((r) => r.role_id)) || [];
      },
      enabled: !!(user == null ? void 0 : user.id)
    });
    const isManagerOnly = !hasAdminAccess && (((managedDepartmentIds == null ? void 0 : managedDepartmentIds.length) ?? 0) > 0 || ((managedUserIds == null ? void 0 : managedUserIds.length) ?? 0) > 1);
    const { data: documents } = reactQuery.useQuery({
      queryKey: ["documents"],
      queryFn: async () => {
        const { data, error } = await supabase.from("documents").select("*").order("title");
        if (error) throw error;
        return data;
      }
    });
    const { data: departments } = reactQuery.useQuery({
      queryKey: ["departments"],
      queryFn: async () => {
        const { data, error } = await supabase.from("departments").select("*").order("name");
        if (error) throw error;
        return data;
      }
    });
    const { data: roles } = reactQuery.useQuery({
      queryKey: ["roles"],
      queryFn: async () => {
        const { data, error } = await supabase.from("roles").select("*").order("name");
        if (error) throw error;
        return data;
      }
    });
    const { data: users } = reactQuery.useQuery({
      queryKey: ["users"],
      queryFn: async () => {
        const { data, error } = await supabase.from("profiles").select("id, full_name").order("full_name");
        if (error) throw error;
        return data;
      }
    });
    const { data: assignments } = reactQuery.useQuery({
      queryKey: ["document-assignments-overview"],
      queryFn: async () => {
        const { data: assignmentsData, error: assignmentsError } = await supabase.from("document_assignments").select("*").order("assigned_at", { ascending: false });
        if (assignmentsError) {
          console.error("Error fetching assignments:", assignmentsError);
          throw assignmentsError;
        }
        if (!assignmentsData || assignmentsData.length === 0) {
          return [];
        }
        const documentIds = [...new Set(assignmentsData.map((a) => a.document_id))];
        const userIds = [...new Set(assignmentsData.map((a) => a.user_id))];
        const { data: documentsData, error: documentsError } = await supabase.from("documents").select("document_id, title").in("document_id", documentIds);
        if (documentsError) {
          console.error("Error fetching documents:", documentsError);
          throw documentsError;
        }
        const { data: profilesData, error: profilesError } = await supabase.from("profiles").select("id, full_name").in("id", userIds);
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
    const createAssignmentMutation = reactQuery.useMutation({
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
            const result = await supabase.from("document_roles").upsert({
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
            const result = await supabase.from("document_departments").upsert({
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
            const result = await supabase.from("document_users").upsert({
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
              const { data } = await supabase.from("user_departments").select("user_id").in("department_id", targets);
              userIds = (data || []).map((r) => r.user_id);
            } else if (type === "roles") {
              const { data } = await supabase.from("user_departments").select("user_id").in("role_id", targets);
              userIds = (data || []).map((r) => r.user_id);
            }
            await Promise.all(
              [...new Set(userIds)].map(
                (userId) => staysecureNotifications.sendNotificationByEvent(supabase, "document_assigned", {
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
        useToast.toast({
          title: "Success",
          description: "Document assignments created successfully"
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
    const handleAssign = () => {
      if (!selectedDocument || selectedTargets.length === 0) return;
      createAssignmentMutation.mutate();
    };
    const handleTargetToggle = (targetId) => {
      setSelectedTargets(
        (prev) => prev.includes(targetId) ? prev.filter((id) => id !== targetId) : [...prev, targetId]
      );
    };
    const visibleDepartments = React.useMemo(() => {
      if (isManagerOnly && managedDepartmentIds) {
        return (departments || []).filter((d) => managedDepartmentIds.includes(d.id));
      }
      return departments || [];
    }, [departments, isManagerOnly, managedDepartmentIds]);
    const visibleRoles = React.useMemo(() => {
      if (isManagerOnly && managedRoleIds) {
        return (roles || []).filter((r) => managedRoleIds.includes(r.role_id));
      }
      return roles || [];
    }, [roles, isManagerOnly, managedRoleIds]);
    const visibleUsers = React.useMemo(() => {
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
      return /* @__PURE__ */ jsxRuntime.jsx(
        DocumentAssignmentsDrillDown,
        {
          documentId: selectedDocumentForDrillDown.id,
          documentTitle: selectedDocumentForDrillDown.title,
          onBack: () => setSelectedDocumentForDrillDown(null)
        }
      );
    }
    return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntime.jsx("h2", { className: "text-2xl font-bold", children: "Document Assignments" }),
          /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-muted-foreground", children: "Assign documents to roles, departments, or specific users" })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs(dialog.Dialog, { open: isAssignDialogOpen, onOpenChange: setIsAssignDialogOpen, children: [
          /* @__PURE__ */ jsxRuntime.jsx(dialog.DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntime.jsxs(button.Button, { children: [
            /* @__PURE__ */ jsxRuntime.jsx(Plus, { className: "h-4 w-4 mr-2" }),
            "Create Assignment"
          ] }) }),
          /* @__PURE__ */ jsxRuntime.jsxs(dialog.DialogContent, { className: "max-w-2xl", children: [
            /* @__PURE__ */ jsxRuntime.jsxs(dialog.DialogHeader, { children: [
              /* @__PURE__ */ jsxRuntime.jsx(dialog.DialogTitle, { children: "Create Document Assignment" }),
              /* @__PURE__ */ jsxRuntime.jsx(dialog.DialogDescription, { children: "Assign a document to roles, departments, or specific users" })
            ] }),
            /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntime.jsx(label.Label, { htmlFor: "document", children: "Select Document" }),
                /* @__PURE__ */ jsxRuntime.jsxs(select.Select, { onValueChange: (value) => {
                  const doc = documents == null ? void 0 : documents.find((d) => d.document_id === value);
                  setSelectedDocument(doc || null);
                }, children: [
                  /* @__PURE__ */ jsxRuntime.jsx(select.SelectTrigger, { children: /* @__PURE__ */ jsxRuntime.jsx(select.SelectValue, { placeholder: "Choose a document" }) }),
                  /* @__PURE__ */ jsxRuntime.jsx(select.SelectContent, { children: documents == null ? void 0 : documents.map((doc) => /* @__PURE__ */ jsxRuntime.jsxs(select.SelectItem, { value: doc.document_id, children: [
                    doc.title,
                    " (v",
                    doc.version,
                    ")"
                  ] }, doc.document_id)) })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-1.5 mb-1", children: [
                  /* @__PURE__ */ jsxRuntime.jsx(label.Label, { children: "Assignment Type" }),
                  /* @__PURE__ */ jsxRuntime.jsxs(popover.Popover, { children: [
                    /* @__PURE__ */ jsxRuntime.jsx(popover.PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntime.jsx(Info, { className: "w-3.5 h-3.5 text-muted-foreground cursor-pointer" }) }),
                    /* @__PURE__ */ jsxRuntime.jsxs(popover.PopoverContent, { className: "w-72 text-sm space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntime.jsxs("p", { children: [
                        /* @__PURE__ */ jsxRuntime.jsx("strong", { children: "Departments" }),
                        " — assigns to all current and future members of the department."
                      ] }),
                      /* @__PURE__ */ jsxRuntime.jsxs("p", { children: [
                        /* @__PURE__ */ jsxRuntime.jsx("strong", { children: "Roles" }),
                        " — assigns to all users with that role, across departments."
                      ] }),
                      /* @__PURE__ */ jsxRuntime.jsxs("p", { children: [
                        /* @__PURE__ */ jsxRuntime.jsx("strong", { children: "Users" }),
                        " — assigns to specific individuals only."
                      ] })
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntime.jsx(tabs.Tabs, { value: assignmentType, onValueChange: (value) => {
                  setAssignmentType(value);
                  setSelectedTargets([]);
                }, children: /* @__PURE__ */ jsxRuntime.jsxs(tabs.TabsList, { className: "grid w-full grid-cols-3", children: [
                  /* @__PURE__ */ jsxRuntime.jsxs(tabs.TabsTrigger, { value: "departments", children: [
                    /* @__PURE__ */ jsxRuntime.jsx(Building2, { className: "h-4 w-4 mr-1" }),
                    "Departments"
                  ] }),
                  /* @__PURE__ */ jsxRuntime.jsxs(tabs.TabsTrigger, { value: "roles", children: [
                    /* @__PURE__ */ jsxRuntime.jsx(Shield, { className: "h-4 w-4 mr-1" }),
                    "Roles"
                  ] }),
                  /* @__PURE__ */ jsxRuntime.jsxs(tabs.TabsTrigger, { value: "users", children: [
                    /* @__PURE__ */ jsxRuntime.jsx(Users, { className: "h-4 w-4 mr-1" }),
                    "Users"
                  ] })
                ] }) })
              ] }),
              /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntime.jsx(label.Label, { children: "Select Targets" }),
                /* @__PURE__ */ jsxRuntime.jsx("div", { className: "max-h-48 overflow-y-auto border rounded-md p-2 space-y-2", children: getAssignmentTargets().map((target) => /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center space-x-2", children: [
                  /* @__PURE__ */ jsxRuntime.jsx(
                    checkbox.Checkbox,
                    {
                      id: getTargetId(target),
                      checked: selectedTargets.includes(getTargetId(target)),
                      onCheckedChange: () => handleTargetToggle(getTargetId(target))
                    }
                  ),
                  /* @__PURE__ */ jsxRuntime.jsx(label.Label, { htmlFor: getTargetId(target), className: "text-sm", children: getTargetLabel(target) })
                ] }, getTargetId(target))) })
              ] }),
              /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex justify-end pt-4", children: /* @__PURE__ */ jsxRuntime.jsx(
                button.Button,
                {
                  size: "icon",
                  onClick: handleAssign,
                  disabled: !selectedDocument || selectedTargets.length === 0,
                  children: /* @__PURE__ */ jsxRuntime.jsx(Save, { className: "w-4 h-4" })
                }
              ) })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center space-x-2", children: [
        /* @__PURE__ */ jsxRuntime.jsx(Search, { className: "h-4 w-4 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntime.jsx(
          input.Input,
          {
            placeholder: "Search documents...",
            value: searchTerm,
            onChange: (e) => setSearchTerm(e.target.value),
            className: "max-w-sm"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntime.jsx("div", { className: "grid gap-4", children: (() => {
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
          return /* @__PURE__ */ jsxRuntime.jsxs(card.Card, { children: [
            /* @__PURE__ */ jsxRuntime.jsx(card.CardHeader, { children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-start justify-between", children: [
              /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntime.jsx(card.CardTitle, { className: "text-lg", children: group.document.title }),
                /* @__PURE__ */ jsxRuntime.jsxs(card.CardDescription, { className: "flex items-center gap-2 mt-1", children: [
                  /* @__PURE__ */ jsxRuntime.jsx(Users, { className: "h-4 w-4" }),
                  group.assignments.length,
                  " staff assigned"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex gap-2", children: /* @__PURE__ */ jsxRuntime.jsx(
                button.Button,
                {
                  variant: "outline",
                  size: "sm",
                  onClick: () => setSelectedDocumentForDrillDown({
                    id: group.document.document_id,
                    title: group.document.title
                  }),
                  className: "flex items-center gap-2",
                  children: /* @__PURE__ */ jsxRuntime.jsx(ChartColumn, { className: "h-4 w-4" })
                }
              ) })
            ] }) }),
            /* @__PURE__ */ jsxRuntime.jsx(card.CardContent, { children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex gap-4 text-sm", children: [
                /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntime.jsx("div", { className: "w-2 h-2 rounded-full bg-green-500" }),
                  /* @__PURE__ */ jsxRuntime.jsxs("span", { children: [
                    group.assignments.filter((a) => a.status === "Completed").length,
                    " Completed"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntime.jsx("div", { className: "w-2 h-2 rounded-full bg-blue-500" }),
                  /* @__PURE__ */ jsxRuntime.jsxs("span", { children: [
                    group.assignments.filter((a) => a.status === "In progress").length,
                    " In Progress"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntime.jsx("div", { className: "w-2 h-2 rounded-full bg-orange-500" }),
                  /* @__PURE__ */ jsxRuntime.jsxs("span", { children: [
                    group.assignments.filter((a) => a.status === "Not started").length,
                    " Not Started"
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntime.jsx("div", { className: "text-sm text-muted-foreground", children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntime.jsx(Calendar, { className: "h-4 w-4" }),
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
  function warnOrThrowProtectedError(token, format2, input2) {
    const _message = message(token, format2, input2);
    console.warn(_message);
    if (throwTokens.includes(token)) throw new RangeError(_message);
  }
  function message(token, format2, input2) {
    const subject = token[0] === "Y" ? "years" : "days of the month";
    return `Use \`${token.toLowerCase()}\` instead of \`${token}\` (in \`${format2}\`) for formatting ${subject} to the input \`${input2}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
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
  function cleanEscapedString(input2) {
    const matched = input2.match(escapedStringRegExp);
    if (!matched) {
      return input2;
    }
    return matched[1].replace(doubleQuoteRegExp, "'");
  }
  const ComplianceUserDetail = ({ userId, userName, department, onBack }) => {
    const { supabaseClient: supabase } = useOrganisationContext();
    const { data: userAssignments, isLoading } = reactQuery.useQuery({
      queryKey: ["user-assignments", userId],
      queryFn: async () => {
        const { data, error } = await supabase.from("document_assignments").select(`
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
        return /* @__PURE__ */ jsxRuntime.jsx(CircleCheckBig, { className: "h-4 w-4 text-green-600" });
      } else if (assignment.days_overdue > 0) {
        return /* @__PURE__ */ jsxRuntime.jsx(CircleAlert, { className: "h-4 w-4 text-red-600" });
      } else {
        return /* @__PURE__ */ jsxRuntime.jsx(Clock, { className: "h-4 w-4 text-yellow-600" });
      }
    };
    const getStatusBadge = (assignment) => {
      if (assignment.status === "Completed") {
        return /* @__PURE__ */ jsxRuntime.jsx(badge.Badge, { className: "bg-green-100 text-green-800", children: "Completed" });
      } else if (assignment.days_overdue > 0) {
        return /* @__PURE__ */ jsxRuntime.jsxs(badge.Badge, { className: "bg-red-100 text-red-800", children: [
          assignment.days_overdue,
          "d overdue"
        ] });
      } else {
        return /* @__PURE__ */ jsxRuntime.jsx(badge.Badge, { className: "bg-yellow-100 text-yellow-800", children: "Pending" });
      }
    };
    if (isLoading) {
      return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntime.jsx(button.Button, { variant: "ghost", size: "sm", onClick: onBack, children: /* @__PURE__ */ jsxRuntime.jsx(ArrowLeft, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsxRuntime.jsx("div", { className: "h-8 w-32 bg-muted animate-pulse rounded" })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsx("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4", children: [...Array(4)].map((_, i) => /* @__PURE__ */ jsxRuntime.jsx("div", { className: "h-24 bg-muted animate-pulse rounded" }, i)) })
      ] });
    }
    return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntime.jsxs(button.Button, { variant: "ghost", size: "sm", onClick: onBack, children: [
          /* @__PURE__ */ jsxRuntime.jsx(ArrowLeft, { className: "h-4 w-4" }),
          "Back"
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntime.jsx("h3", { className: "text-2xl font-bold", children: userName }),
          /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-muted-foreground", children: department })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4", children: [
        /* @__PURE__ */ jsxRuntime.jsxs(card.Card, { children: [
          /* @__PURE__ */ jsxRuntime.jsx(card.CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntime.jsx(card.CardTitle, { className: "text-sm font-medium", children: "Total Assignments" }) }),
          /* @__PURE__ */ jsxRuntime.jsx(card.CardContent, { children: /* @__PURE__ */ jsxRuntime.jsx("div", { className: "text-2xl font-bold", children: stats.total }) })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs(card.Card, { children: [
          /* @__PURE__ */ jsxRuntime.jsx(card.CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntime.jsx(card.CardTitle, { className: "text-sm font-medium", children: "Completed" }) }),
          /* @__PURE__ */ jsxRuntime.jsx(card.CardContent, { children: /* @__PURE__ */ jsxRuntime.jsx("div", { className: "text-2xl font-bold text-green-600", children: stats.completed }) })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs(card.Card, { children: [
          /* @__PURE__ */ jsxRuntime.jsx(card.CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntime.jsx(card.CardTitle, { className: "text-sm font-medium", children: "Overdue" }) }),
          /* @__PURE__ */ jsxRuntime.jsx(card.CardContent, { children: /* @__PURE__ */ jsxRuntime.jsx("div", { className: "text-2xl font-bold text-red-600", children: stats.overdue }) })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs(card.Card, { children: [
          /* @__PURE__ */ jsxRuntime.jsx(card.CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntime.jsx(card.CardTitle, { className: "text-sm font-medium", children: "Compliance Rate" }) }),
          /* @__PURE__ */ jsxRuntime.jsx(card.CardContent, { children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: `text-2xl font-bold ${complianceRate >= 90 ? "text-green-600" : complianceRate >= 70 ? "text-yellow-600" : "text-red-600"}`, children: [
            Math.round(complianceRate),
            "%"
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs(card.Card, { children: [
        /* @__PURE__ */ jsxRuntime.jsx(card.CardHeader, { children: /* @__PURE__ */ jsxRuntime.jsx(card.CardTitle, { children: "Overall Progress" }) }),
        /* @__PURE__ */ jsxRuntime.jsx(card.CardContent, { children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex justify-between text-sm", children: [
            /* @__PURE__ */ jsxRuntime.jsx("span", { children: "Progress" }),
            /* @__PURE__ */ jsxRuntime.jsxs("span", { children: [
              stats.completed,
              " / ",
              stats.total,
              " completed"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntime.jsx(progress.Progress, { value: complianceRate, className: "w-full" })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs(card.Card, { children: [
        /* @__PURE__ */ jsxRuntime.jsxs(card.CardHeader, { children: [
          /* @__PURE__ */ jsxRuntime.jsxs(card.CardTitle, { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntime.jsx(FileText, { className: "h-5 w-5" }),
            "Document Assignments"
          ] }),
          /* @__PURE__ */ jsxRuntime.jsx(card.CardDescription, { children: "Detailed view of all document assignments for this user" })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs(card.CardContent, { children: [
          /* @__PURE__ */ jsxRuntime.jsxs(table.Table, { children: [
            /* @__PURE__ */ jsxRuntime.jsx(table.TableHeader, { children: /* @__PURE__ */ jsxRuntime.jsxs(table.TableRow, { children: [
              /* @__PURE__ */ jsxRuntime.jsx(table.TableHead, { children: "Status" }),
              /* @__PURE__ */ jsxRuntime.jsx(table.TableHead, { children: "Document" }),
              /* @__PURE__ */ jsxRuntime.jsx(table.TableHead, { children: "Category" }),
              /* @__PURE__ */ jsxRuntime.jsx(table.TableHead, { children: "Due Date" }),
              /* @__PURE__ */ jsxRuntime.jsx(table.TableHead, { children: "Completed" }),
              /* @__PURE__ */ jsxRuntime.jsx(table.TableHead, { children: "Assigned" })
            ] }) }),
            /* @__PURE__ */ jsxRuntime.jsx(table.TableBody, { children: userAssignments == null ? void 0 : userAssignments.map((assignment) => /* @__PURE__ */ jsxRuntime.jsxs(table.TableRow, { children: [
              /* @__PURE__ */ jsxRuntime.jsx(table.TableCell, { children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-2", children: [
                getStatusIcon(assignment),
                getStatusBadge(assignment)
              ] }) }),
              /* @__PURE__ */ jsxRuntime.jsx(table.TableCell, { className: "font-medium", children: assignment.document_title }),
              /* @__PURE__ */ jsxRuntime.jsx(table.TableCell, { children: /* @__PURE__ */ jsxRuntime.jsx(badge.Badge, { variant: "outline", children: assignment.document_category }) }),
              /* @__PURE__ */ jsxRuntime.jsx(table.TableCell, { children: format(new Date(assignment.due_date), "MMM dd, yyyy") }),
              /* @__PURE__ */ jsxRuntime.jsx(table.TableCell, { children: assignment.completed_at ? format(new Date(assignment.completed_at), "MMM dd, yyyy") : "-" }),
              /* @__PURE__ */ jsxRuntime.jsx(table.TableCell, { className: "text-muted-foreground", children: format(new Date(assignment.assigned_at), "MMM dd, yyyy") })
            ] }, assignment.assignment_id)) })
          ] }),
          (!userAssignments || userAssignments.length === 0) && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "text-center py-8 text-muted-foreground", children: "No document assignments found for this user." })
        ] })
      ] })
    ] });
  };
  const ComplianceDocumentDetail = ({ documentId, documentTitle, onBack }) => {
    const { supabaseClient: supabase } = useOrganisationContext();
    const { data: documentAssignments, isLoading } = reactQuery.useQuery({
      queryKey: ["document-assignments", documentId],
      queryFn: async () => {
        const { data: assignments, error } = await supabase.from("document_assignments").select(`
          assignment_id,
          user_id,
          status,
          due_date,
          completed_at,
          assigned_at
        `).eq("document_id", documentId).order("due_date", { ascending: true });
        if (error) throw error;
        const { data: profiles } = await supabase.from("profiles").select("id, full_name");
        const { data: userDepartments } = await supabase.from("user_departments").select(`
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
    const { data: documentInfo } = reactQuery.useQuery({
      queryKey: ["document-info", documentId],
      queryFn: async () => {
        const { data, error } = await supabase.from("documents").select("title, description, category, required, due_days").eq("document_id", documentId).single();
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
        return /* @__PURE__ */ jsxRuntime.jsx(CircleCheckBig, { className: "h-4 w-4 text-green-600" });
      } else if (assignment.days_overdue > 0) {
        return /* @__PURE__ */ jsxRuntime.jsx(CircleAlert, { className: "h-4 w-4 text-red-600" });
      } else {
        return /* @__PURE__ */ jsxRuntime.jsx(Clock, { className: "h-4 w-4 text-yellow-600" });
      }
    };
    const getStatusBadge = (assignment) => {
      if (assignment.status === "Completed") {
        return /* @__PURE__ */ jsxRuntime.jsx(badge.Badge, { className: "bg-green-100 text-green-800", children: "Completed" });
      } else if (assignment.days_overdue > 0) {
        return /* @__PURE__ */ jsxRuntime.jsxs(badge.Badge, { className: "bg-red-100 text-red-800", children: [
          assignment.days_overdue,
          "d overdue"
        ] });
      } else {
        return /* @__PURE__ */ jsxRuntime.jsx(badge.Badge, { className: "bg-yellow-100 text-yellow-800", children: "Pending" });
      }
    };
    if (isLoading) {
      return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntime.jsx(button.Button, { variant: "ghost", size: "sm", onClick: onBack, children: /* @__PURE__ */ jsxRuntime.jsx(ArrowLeft, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsxRuntime.jsx("div", { className: "h-8 w-48 bg-muted animate-pulse rounded" })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsx("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4", children: [...Array(4)].map((_, i) => /* @__PURE__ */ jsxRuntime.jsx("div", { className: "h-24 bg-muted animate-pulse rounded" }, i)) })
      ] });
    }
    return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntime.jsxs(button.Button, { variant: "ghost", size: "sm", onClick: onBack, children: [
          /* @__PURE__ */ jsxRuntime.jsx(ArrowLeft, { className: "h-4 w-4" }),
          "Back"
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntime.jsx("h3", { className: "text-2xl font-bold", children: documentTitle }),
          documentInfo && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-2 mt-1", children: [
            /* @__PURE__ */ jsxRuntime.jsx(badge.Badge, { variant: "outline", children: documentInfo.category }),
            documentInfo.required && /* @__PURE__ */ jsxRuntime.jsx(badge.Badge, { className: "bg-red-100 text-red-800", children: "Required" }),
            /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "text-sm text-muted-foreground", children: [
              "Due in ",
              documentInfo.due_days,
              " days"
            ] })
          ] })
        ] })
      ] }),
      (documentInfo == null ? void 0 : documentInfo.description) && /* @__PURE__ */ jsxRuntime.jsxs(card.Card, { children: [
        /* @__PURE__ */ jsxRuntime.jsx(card.CardHeader, { children: /* @__PURE__ */ jsxRuntime.jsxs(card.CardTitle, { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntime.jsx(FileText, { className: "h-5 w-5" }),
          "Document Information"
        ] }) }),
        /* @__PURE__ */ jsxRuntime.jsx(card.CardContent, { children: /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-muted-foreground", children: documentInfo.description }) })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4", children: [
        /* @__PURE__ */ jsxRuntime.jsxs(card.Card, { children: [
          /* @__PURE__ */ jsxRuntime.jsx(card.CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntime.jsx(card.CardTitle, { className: "text-sm font-medium", children: "Total Assignments" }) }),
          /* @__PURE__ */ jsxRuntime.jsx(card.CardContent, { children: /* @__PURE__ */ jsxRuntime.jsx("div", { className: "text-2xl font-bold", children: stats.total }) })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs(card.Card, { children: [
          /* @__PURE__ */ jsxRuntime.jsx(card.CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntime.jsx(card.CardTitle, { className: "text-sm font-medium", children: "Completed" }) }),
          /* @__PURE__ */ jsxRuntime.jsx(card.CardContent, { children: /* @__PURE__ */ jsxRuntime.jsx("div", { className: "text-2xl font-bold text-green-600", children: stats.completed }) })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs(card.Card, { children: [
          /* @__PURE__ */ jsxRuntime.jsx(card.CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntime.jsx(card.CardTitle, { className: "text-sm font-medium", children: "Overdue" }) }),
          /* @__PURE__ */ jsxRuntime.jsx(card.CardContent, { children: /* @__PURE__ */ jsxRuntime.jsx("div", { className: "text-2xl font-bold text-red-600", children: stats.overdue }) })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs(card.Card, { children: [
          /* @__PURE__ */ jsxRuntime.jsx(card.CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntime.jsx(card.CardTitle, { className: "text-sm font-medium", children: "Compliance Rate" }) }),
          /* @__PURE__ */ jsxRuntime.jsx(card.CardContent, { children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: `text-2xl font-bold ${complianceRate >= 90 ? "text-green-600" : complianceRate >= 70 ? "text-yellow-600" : "text-red-600"}`, children: [
            Math.round(complianceRate),
            "%"
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs(card.Card, { children: [
        /* @__PURE__ */ jsxRuntime.jsx(card.CardHeader, { children: /* @__PURE__ */ jsxRuntime.jsx(card.CardTitle, { children: "Overall Progress" }) }),
        /* @__PURE__ */ jsxRuntime.jsx(card.CardContent, { children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex justify-between text-sm", children: [
            /* @__PURE__ */ jsxRuntime.jsx("span", { children: "Progress" }),
            /* @__PURE__ */ jsxRuntime.jsxs("span", { children: [
              stats.completed,
              " / ",
              stats.total,
              " completed"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntime.jsx(progress.Progress, { value: complianceRate, className: "w-full" })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs(card.Card, { children: [
        /* @__PURE__ */ jsxRuntime.jsxs(card.CardHeader, { children: [
          /* @__PURE__ */ jsxRuntime.jsxs(card.CardTitle, { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntime.jsx(Users, { className: "h-5 w-5" }),
            "User Assignments"
          ] }),
          /* @__PURE__ */ jsxRuntime.jsx(card.CardDescription, { children: "Status of all users assigned to read this document" })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs(card.CardContent, { children: [
          /* @__PURE__ */ jsxRuntime.jsxs(table.Table, { children: [
            /* @__PURE__ */ jsxRuntime.jsx(table.TableHeader, { children: /* @__PURE__ */ jsxRuntime.jsxs(table.TableRow, { children: [
              /* @__PURE__ */ jsxRuntime.jsx(table.TableHead, { children: "Status" }),
              /* @__PURE__ */ jsxRuntime.jsx(table.TableHead, { children: "User" }),
              /* @__PURE__ */ jsxRuntime.jsx(table.TableHead, { children: "Department" }),
              /* @__PURE__ */ jsxRuntime.jsx(table.TableHead, { children: "Due Date" }),
              /* @__PURE__ */ jsxRuntime.jsx(table.TableHead, { children: "Completed" }),
              /* @__PURE__ */ jsxRuntime.jsx(table.TableHead, { children: "Assigned" })
            ] }) }),
            /* @__PURE__ */ jsxRuntime.jsx(table.TableBody, { children: documentAssignments == null ? void 0 : documentAssignments.map((assignment) => /* @__PURE__ */ jsxRuntime.jsxs(table.TableRow, { children: [
              /* @__PURE__ */ jsxRuntime.jsx(table.TableCell, { children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-2", children: [
                getStatusIcon(assignment),
                getStatusBadge(assignment)
              ] }) }),
              /* @__PURE__ */ jsxRuntime.jsx(table.TableCell, { className: "font-medium", children: assignment.user_name }),
              /* @__PURE__ */ jsxRuntime.jsx(table.TableCell, { children: /* @__PURE__ */ jsxRuntime.jsx(badge.Badge, { variant: "outline", children: assignment.department }) }),
              /* @__PURE__ */ jsxRuntime.jsx(table.TableCell, { children: format(new Date(assignment.due_date), "MMM dd, yyyy") }),
              /* @__PURE__ */ jsxRuntime.jsx(table.TableCell, { children: assignment.completed_at ? format(new Date(assignment.completed_at), "MMM dd, yyyy") : "-" }),
              /* @__PURE__ */ jsxRuntime.jsx(table.TableCell, { className: "text-muted-foreground", children: format(new Date(assignment.assigned_at), "MMM dd, yyyy") })
            ] }, assignment.assignment_id)) })
          ] }),
          (!documentAssignments || documentAssignments.length === 0) && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "text-center py-8 text-muted-foreground", children: "No assignments found for this document." })
        ] })
      ] })
    ] });
  };
  const ComplianceDepartmentDetail = ({ department, onBack }) => {
    const { supabaseClient: supabase } = useOrganisationContext();
    const { data: departmentAssignments, isLoading } = reactQuery.useQuery({
      queryKey: ["department-assignments", department],
      queryFn: async () => {
        const { data: userDepartments } = await supabase.from("user_departments").select(`
          user_id,
          departments!inner(name)
        `).eq("departments.name", department);
        if (!userDepartments || userDepartments.length === 0) {
          return [];
        }
        const userIds = userDepartments.map((ud) => ud.user_id);
        const { data: assignments, error } = await supabase.from("document_assignments").select(`
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
        const { data: profiles } = await supabase.from("profiles").select("id, full_name");
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
    const { data: departmentUsers } = reactQuery.useQuery({
      queryKey: ["department-users", department],
      queryFn: async () => {
        const { data, error } = await supabase.from("user_departments").select(`
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
        return /* @__PURE__ */ jsxRuntime.jsx(CircleCheckBig, { className: "h-4 w-4 text-green-600" });
      } else if (assignment.days_overdue > 0) {
        return /* @__PURE__ */ jsxRuntime.jsx(CircleAlert, { className: "h-4 w-4 text-red-600" });
      } else {
        return /* @__PURE__ */ jsxRuntime.jsx(Clock, { className: "h-4 w-4 text-yellow-600" });
      }
    };
    const getStatusBadge = (assignment) => {
      if (assignment.status === "Completed") {
        return /* @__PURE__ */ jsxRuntime.jsx(badge.Badge, { className: "bg-green-100 text-green-800", children: "Completed" });
      } else if (assignment.days_overdue > 0) {
        return /* @__PURE__ */ jsxRuntime.jsxs(badge.Badge, { className: "bg-red-100 text-red-800", children: [
          assignment.days_overdue,
          "d overdue"
        ] });
      } else {
        return /* @__PURE__ */ jsxRuntime.jsx(badge.Badge, { className: "bg-yellow-100 text-yellow-800", children: "Pending" });
      }
    };
    if (isLoading) {
      return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntime.jsx(button.Button, { variant: "ghost", size: "sm", onClick: onBack, children: /* @__PURE__ */ jsxRuntime.jsx(ArrowLeft, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsxRuntime.jsx("div", { className: "h-8 w-48 bg-muted animate-pulse rounded" })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsx("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4", children: [...Array(4)].map((_, i) => /* @__PURE__ */ jsxRuntime.jsx("div", { className: "h-24 bg-muted animate-pulse rounded" }, i)) })
      ] });
    }
    return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntime.jsxs(button.Button, { variant: "ghost", size: "sm", onClick: onBack, children: [
          /* @__PURE__ */ jsxRuntime.jsx(ArrowLeft, { className: "h-4 w-4" }),
          "Back"
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntime.jsx("h3", { className: "text-2xl font-bold", children: department }),
          /* @__PURE__ */ jsxRuntime.jsxs("p", { className: "text-muted-foreground", children: [
            (departmentUsers == null ? void 0 : departmentUsers.length) || 0,
            " users in department"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4", children: [
        /* @__PURE__ */ jsxRuntime.jsxs(card.Card, { children: [
          /* @__PURE__ */ jsxRuntime.jsx(card.CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntime.jsx(card.CardTitle, { className: "text-sm font-medium", children: "Total Assignments" }) }),
          /* @__PURE__ */ jsxRuntime.jsx(card.CardContent, { children: /* @__PURE__ */ jsxRuntime.jsx("div", { className: "text-2xl font-bold", children: stats.total }) })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs(card.Card, { children: [
          /* @__PURE__ */ jsxRuntime.jsx(card.CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntime.jsx(card.CardTitle, { className: "text-sm font-medium", children: "Completed" }) }),
          /* @__PURE__ */ jsxRuntime.jsx(card.CardContent, { children: /* @__PURE__ */ jsxRuntime.jsx("div", { className: "text-2xl font-bold text-green-600", children: stats.completed }) })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs(card.Card, { children: [
          /* @__PURE__ */ jsxRuntime.jsx(card.CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntime.jsx(card.CardTitle, { className: "text-sm font-medium", children: "Overdue" }) }),
          /* @__PURE__ */ jsxRuntime.jsx(card.CardContent, { children: /* @__PURE__ */ jsxRuntime.jsx("div", { className: "text-2xl font-bold text-red-600", children: stats.overdue }) })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs(card.Card, { children: [
          /* @__PURE__ */ jsxRuntime.jsx(card.CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntime.jsx(card.CardTitle, { className: "text-sm font-medium", children: "Compliance Rate" }) }),
          /* @__PURE__ */ jsxRuntime.jsx(card.CardContent, { children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: `text-2xl font-bold ${complianceRate >= 90 ? "text-green-600" : complianceRate >= 70 ? "text-yellow-600" : "text-red-600"}`, children: [
            Math.round(complianceRate),
            "%"
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs(card.Card, { children: [
        /* @__PURE__ */ jsxRuntime.jsx(card.CardHeader, { children: /* @__PURE__ */ jsxRuntime.jsx(card.CardTitle, { children: "Department Progress" }) }),
        /* @__PURE__ */ jsxRuntime.jsx(card.CardContent, { children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex justify-between text-sm", children: [
            /* @__PURE__ */ jsxRuntime.jsx("span", { children: "Progress" }),
            /* @__PURE__ */ jsxRuntime.jsxs("span", { children: [
              stats.completed,
              " / ",
              stats.total,
              " completed"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntime.jsx(progress.Progress, { value: complianceRate, className: "w-full" })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs(card.Card, { children: [
        /* @__PURE__ */ jsxRuntime.jsxs(card.CardHeader, { children: [
          /* @__PURE__ */ jsxRuntime.jsxs(card.CardTitle, { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntime.jsx(Users, { className: "h-5 w-5" }),
            "User Performance"
          ] }),
          /* @__PURE__ */ jsxRuntime.jsx(card.CardDescription, { children: "Individual compliance performance for users in this department" })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs(card.CardContent, { children: [
          /* @__PURE__ */ jsxRuntime.jsx("div", { className: "grid gap-4", children: userStats.map((user) => /* @__PURE__ */ jsxRuntime.jsxs(card.Card, { children: [
            /* @__PURE__ */ jsxRuntime.jsx(card.CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntime.jsx(card.CardTitle, { className: "text-lg", children: user.user_name }),
              /* @__PURE__ */ jsxRuntime.jsxs(badge.Badge, { className: user.compliance_rate >= 90 ? "bg-green-100 text-green-800" : user.compliance_rate >= 70 ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800", children: [
                Math.round(user.compliance_rate),
                "% Complete"
              ] })
            ] }) }),
            /* @__PURE__ */ jsxRuntime.jsx(card.CardContent, { children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex justify-between text-sm", children: [
                /* @__PURE__ */ jsxRuntime.jsx("span", { children: "Progress" }),
                /* @__PURE__ */ jsxRuntime.jsxs("span", { children: [
                  user.completed_assignments,
                  " / ",
                  user.total_assignments
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntime.jsx(progress.Progress, { value: user.compliance_rate, className: "w-full" }),
              /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex justify-between text-sm text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntime.jsxs("span", { children: [
                  "Completed: ",
                  user.completed_assignments
                ] }),
                /* @__PURE__ */ jsxRuntime.jsxs("span", { children: [
                  "Overdue: ",
                  user.overdue_assignments
                ] })
              ] })
            ] }) })
          ] }, user.user_id)) }),
          userStats.length === 0 && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "text-center py-8 text-muted-foreground", children: "No users found in this department." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs(card.Card, { children: [
        /* @__PURE__ */ jsxRuntime.jsxs(card.CardHeader, { children: [
          /* @__PURE__ */ jsxRuntime.jsxs(card.CardTitle, { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntime.jsx(Building, { className: "h-5 w-5" }),
            "All Assignments"
          ] }),
          /* @__PURE__ */ jsxRuntime.jsx(card.CardDescription, { children: "Detailed view of all document assignments in this department" })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs(card.CardContent, { children: [
          /* @__PURE__ */ jsxRuntime.jsxs(table.Table, { children: [
            /* @__PURE__ */ jsxRuntime.jsx(table.TableHeader, { children: /* @__PURE__ */ jsxRuntime.jsxs(table.TableRow, { children: [
              /* @__PURE__ */ jsxRuntime.jsx(table.TableHead, { children: "Status" }),
              /* @__PURE__ */ jsxRuntime.jsx(table.TableHead, { children: "User" }),
              /* @__PURE__ */ jsxRuntime.jsx(table.TableHead, { children: "Document" }),
              /* @__PURE__ */ jsxRuntime.jsx(table.TableHead, { children: "Category" }),
              /* @__PURE__ */ jsxRuntime.jsx(table.TableHead, { children: "Due Date" }),
              /* @__PURE__ */ jsxRuntime.jsx(table.TableHead, { children: "Completed" })
            ] }) }),
            /* @__PURE__ */ jsxRuntime.jsx(table.TableBody, { children: departmentAssignments == null ? void 0 : departmentAssignments.map((assignment) => /* @__PURE__ */ jsxRuntime.jsxs(table.TableRow, { children: [
              /* @__PURE__ */ jsxRuntime.jsx(table.TableCell, { children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-2", children: [
                getStatusIcon(assignment),
                getStatusBadge(assignment)
              ] }) }),
              /* @__PURE__ */ jsxRuntime.jsx(table.TableCell, { className: "font-medium", children: assignment.user_name }),
              /* @__PURE__ */ jsxRuntime.jsx(table.TableCell, { children: assignment.document_title }),
              /* @__PURE__ */ jsxRuntime.jsx(table.TableCell, { children: /* @__PURE__ */ jsxRuntime.jsx(badge.Badge, { variant: "outline", children: assignment.document_category }) }),
              /* @__PURE__ */ jsxRuntime.jsx(table.TableCell, { children: format(new Date(assignment.due_date), "MMM dd, yyyy") }),
              /* @__PURE__ */ jsxRuntime.jsx(table.TableCell, { children: assignment.completed_at ? format(new Date(assignment.completed_at), "MMM dd, yyyy") : "-" })
            ] }, assignment.assignment_id)) })
          ] }),
          (!departmentAssignments || departmentAssignments.length === 0) && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "text-center py-8 text-muted-foreground", children: "No assignments found for this department." })
        ] })
      ] })
    ] });
  };
  const ComplianceRoleDetail = ({ role, onBack }) => {
    const { supabaseClient: supabase } = useOrganisationContext();
    const { data: roleAssignments, isLoading } = reactQuery.useQuery({
      queryKey: ["role-assignments", role],
      queryFn: async () => {
        const { data: userRoles } = await supabase.from("user_profile_roles").select(`
          user_id,
          roles!inner(name)
        `).eq("roles.name", role);
        if (!userRoles || userRoles.length === 0) {
          return [];
        }
        const userIds = userRoles.map((ur) => ur.user_id);
        const { data: assignments, error } = await supabase.from("document_assignments").select(`
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
        const { data: profiles } = await supabase.from("profiles").select("id, full_name");
        const { data: userDepartments } = await supabase.from("user_departments").select(`
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
    const { data: roleUsers } = reactQuery.useQuery({
      queryKey: ["role-users", role],
      queryFn: async () => {
        const { data, error } = await supabase.from("user_profile_roles").select(`
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
        return /* @__PURE__ */ jsxRuntime.jsx(CircleCheckBig, { className: "h-4 w-4 text-green-600" });
      } else if (assignment.days_overdue > 0) {
        return /* @__PURE__ */ jsxRuntime.jsx(CircleAlert, { className: "h-4 w-4 text-red-600" });
      } else {
        return /* @__PURE__ */ jsxRuntime.jsx(Clock, { className: "h-4 w-4 text-yellow-600" });
      }
    };
    const getStatusBadge = (assignment) => {
      if (assignment.status === "Completed") {
        return /* @__PURE__ */ jsxRuntime.jsx(badge.Badge, { className: "bg-green-100 text-green-800", children: "Completed" });
      } else if (assignment.days_overdue > 0) {
        return /* @__PURE__ */ jsxRuntime.jsxs(badge.Badge, { className: "bg-red-100 text-red-800", children: [
          assignment.days_overdue,
          "d overdue"
        ] });
      } else {
        return /* @__PURE__ */ jsxRuntime.jsx(badge.Badge, { className: "bg-yellow-100 text-yellow-800", children: "Pending" });
      }
    };
    if (isLoading) {
      return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntime.jsx(button.Button, { variant: "ghost", size: "sm", onClick: onBack, children: /* @__PURE__ */ jsxRuntime.jsx(ArrowLeft, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsxRuntime.jsx("div", { className: "h-8 w-48 bg-muted animate-pulse rounded" })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsx("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4", children: [...Array(4)].map((_, i) => /* @__PURE__ */ jsxRuntime.jsx("div", { className: "h-24 bg-muted animate-pulse rounded" }, i)) })
      ] });
    }
    return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntime.jsxs(button.Button, { variant: "ghost", size: "sm", onClick: onBack, children: [
          /* @__PURE__ */ jsxRuntime.jsx(ArrowLeft, { className: "h-4 w-4" }),
          "Back"
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntime.jsx("h3", { className: "text-2xl font-bold", children: role }),
          /* @__PURE__ */ jsxRuntime.jsxs("p", { className: "text-muted-foreground", children: [
            (roleUsers == null ? void 0 : roleUsers.length) || 0,
            " users with this role"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4", children: [
        /* @__PURE__ */ jsxRuntime.jsxs(card.Card, { children: [
          /* @__PURE__ */ jsxRuntime.jsx(card.CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntime.jsx(card.CardTitle, { className: "text-sm font-medium", children: "Total Assignments" }) }),
          /* @__PURE__ */ jsxRuntime.jsx(card.CardContent, { children: /* @__PURE__ */ jsxRuntime.jsx("div", { className: "text-2xl font-bold", children: stats.total }) })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs(card.Card, { children: [
          /* @__PURE__ */ jsxRuntime.jsx(card.CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntime.jsx(card.CardTitle, { className: "text-sm font-medium", children: "Completed" }) }),
          /* @__PURE__ */ jsxRuntime.jsx(card.CardContent, { children: /* @__PURE__ */ jsxRuntime.jsx("div", { className: "text-2xl font-bold text-green-600", children: stats.completed }) })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs(card.Card, { children: [
          /* @__PURE__ */ jsxRuntime.jsx(card.CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntime.jsx(card.CardTitle, { className: "text-sm font-medium", children: "Overdue" }) }),
          /* @__PURE__ */ jsxRuntime.jsx(card.CardContent, { children: /* @__PURE__ */ jsxRuntime.jsx("div", { className: "text-2xl font-bold text-red-600", children: stats.overdue }) })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs(card.Card, { children: [
          /* @__PURE__ */ jsxRuntime.jsx(card.CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntime.jsx(card.CardTitle, { className: "text-sm font-medium", children: "Compliance Rate" }) }),
          /* @__PURE__ */ jsxRuntime.jsx(card.CardContent, { children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: `text-2xl font-bold ${complianceRate >= 90 ? "text-green-600" : complianceRate >= 70 ? "text-yellow-600" : "text-red-600"}`, children: [
            Math.round(complianceRate),
            "%"
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs(card.Card, { children: [
        /* @__PURE__ */ jsxRuntime.jsx(card.CardHeader, { children: /* @__PURE__ */ jsxRuntime.jsx(card.CardTitle, { children: "Role Progress" }) }),
        /* @__PURE__ */ jsxRuntime.jsx(card.CardContent, { children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex justify-between text-sm", children: [
            /* @__PURE__ */ jsxRuntime.jsx("span", { children: "Progress" }),
            /* @__PURE__ */ jsxRuntime.jsxs("span", { children: [
              stats.completed,
              " / ",
              stats.total,
              " completed"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntime.jsx(progress.Progress, { value: complianceRate, className: "w-full" })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs(card.Card, { children: [
        /* @__PURE__ */ jsxRuntime.jsxs(card.CardHeader, { children: [
          /* @__PURE__ */ jsxRuntime.jsxs(card.CardTitle, { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntime.jsx(Users, { className: "h-5 w-5" }),
            "User Performance"
          ] }),
          /* @__PURE__ */ jsxRuntime.jsx(card.CardDescription, { children: "Individual compliance performance for users with this role" })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs(card.CardContent, { children: [
          /* @__PURE__ */ jsxRuntime.jsx("div", { className: "grid gap-4", children: userStats.map((user) => /* @__PURE__ */ jsxRuntime.jsxs(card.Card, { children: [
            /* @__PURE__ */ jsxRuntime.jsx(card.CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntime.jsx(card.CardTitle, { className: "text-lg", children: user.user_name }),
                /* @__PURE__ */ jsxRuntime.jsx(card.CardDescription, { children: user.department })
              ] }),
              /* @__PURE__ */ jsxRuntime.jsxs(badge.Badge, { className: user.compliance_rate >= 90 ? "bg-green-100 text-green-800" : user.compliance_rate >= 70 ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800", children: [
                Math.round(user.compliance_rate),
                "% Complete"
              ] })
            ] }) }),
            /* @__PURE__ */ jsxRuntime.jsx(card.CardContent, { children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex justify-between text-sm", children: [
                /* @__PURE__ */ jsxRuntime.jsx("span", { children: "Progress" }),
                /* @__PURE__ */ jsxRuntime.jsxs("span", { children: [
                  user.completed_assignments,
                  " / ",
                  user.total_assignments
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntime.jsx(progress.Progress, { value: user.compliance_rate, className: "w-full" }),
              /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex justify-between text-sm text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntime.jsxs("span", { children: [
                  "Completed: ",
                  user.completed_assignments
                ] }),
                /* @__PURE__ */ jsxRuntime.jsxs("span", { children: [
                  "Overdue: ",
                  user.overdue_assignments
                ] })
              ] })
            ] }) })
          ] }, user.user_id)) }),
          userStats.length === 0 && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "text-center py-8 text-muted-foreground", children: "No users found with this role." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs(card.Card, { children: [
        /* @__PURE__ */ jsxRuntime.jsxs(card.CardHeader, { children: [
          /* @__PURE__ */ jsxRuntime.jsxs(card.CardTitle, { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntime.jsx(UserCheck, { className: "h-5 w-5" }),
            "All Assignments"
          ] }),
          /* @__PURE__ */ jsxRuntime.jsx(card.CardDescription, { children: "Detailed view of all document assignments for this role" })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs(card.CardContent, { children: [
          /* @__PURE__ */ jsxRuntime.jsxs(table.Table, { children: [
            /* @__PURE__ */ jsxRuntime.jsx(table.TableHeader, { children: /* @__PURE__ */ jsxRuntime.jsxs(table.TableRow, { children: [
              /* @__PURE__ */ jsxRuntime.jsx(table.TableHead, { children: "Status" }),
              /* @__PURE__ */ jsxRuntime.jsx(table.TableHead, { children: "User" }),
              /* @__PURE__ */ jsxRuntime.jsx(table.TableHead, { children: "Department" }),
              /* @__PURE__ */ jsxRuntime.jsx(table.TableHead, { children: "Document" }),
              /* @__PURE__ */ jsxRuntime.jsx(table.TableHead, { children: "Category" }),
              /* @__PURE__ */ jsxRuntime.jsx(table.TableHead, { children: "Due Date" }),
              /* @__PURE__ */ jsxRuntime.jsx(table.TableHead, { children: "Completed" })
            ] }) }),
            /* @__PURE__ */ jsxRuntime.jsx(table.TableBody, { children: roleAssignments == null ? void 0 : roleAssignments.map((assignment) => /* @__PURE__ */ jsxRuntime.jsxs(table.TableRow, { children: [
              /* @__PURE__ */ jsxRuntime.jsx(table.TableCell, { children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-2", children: [
                getStatusIcon(assignment),
                getStatusBadge(assignment)
              ] }) }),
              /* @__PURE__ */ jsxRuntime.jsx(table.TableCell, { className: "font-medium", children: assignment.user_name }),
              /* @__PURE__ */ jsxRuntime.jsx(table.TableCell, { children: /* @__PURE__ */ jsxRuntime.jsx(badge.Badge, { variant: "outline", children: assignment.department }) }),
              /* @__PURE__ */ jsxRuntime.jsx(table.TableCell, { children: assignment.document_title }),
              /* @__PURE__ */ jsxRuntime.jsx(table.TableCell, { children: /* @__PURE__ */ jsxRuntime.jsx(badge.Badge, { variant: "outline", children: assignment.document_category }) }),
              /* @__PURE__ */ jsxRuntime.jsx(table.TableCell, { children: format(new Date(assignment.due_date), "MMM dd, yyyy") }),
              /* @__PURE__ */ jsxRuntime.jsx(table.TableCell, { children: assignment.completed_at ? format(new Date(assignment.completed_at), "MMM dd, yyyy") : "-" })
            ] }, assignment.assignment_id)) })
          ] }),
          (!roleAssignments || roleAssignments.length === 0) && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "text-center py-8 text-muted-foreground", children: "No assignments found for this role." })
        ] })
      ] })
    ] });
  };
  const ComplianceTracking = () => {
    const { supabaseClient: supabase } = useOrganisationContext();
    const [searchTerm, setSearchTerm] = React.useState("");
    const [departmentFilter, setDepartmentFilter] = React.useState("all");
    const [statusFilter, setStatusFilter] = React.useState("all");
    const [locationFilter, setLocationFilter] = React.useState("all");
    const [activeTab, setActiveTab] = React.useState("users");
    const [showCompletedDetails, setShowCompletedDetails] = React.useState(false);
    const [showOverdueDetails, setShowOverdueDetails] = React.useState(false);
    const [selectedUserDetail, setSelectedUserDetail] = React.useState(null);
    const [selectedDocumentDetail, setSelectedDocumentDetail] = React.useState(null);
    const [selectedDepartmentDetail, setSelectedDepartmentDetail] = React.useState(null);
    const [selectedRoleDetail, setSelectedRoleDetail] = React.useState(null);
    const { data: overallStats } = reactQuery.useQuery({
      queryKey: ["compliance-stats"],
      queryFn: async () => {
        const { data, error } = await supabase.from("document_assignments").select("status, due_date");
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
    const { data: documentStats } = reactQuery.useQuery({
      queryKey: ["document-compliance-stats"],
      queryFn: async () => {
        const { data, error } = await supabase.from("document_assignments").select(`
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
    const { data: userStats } = reactQuery.useQuery({
      queryKey: ["user-compliance-stats"],
      queryFn: async () => {
        const { data, error } = await supabase.from("document_assignments").select(`
          user_id,
          status,
          due_date
        `);
        if (error) throw error;
        const statsMap = /* @__PURE__ */ new Map();
        const { data: profiles } = await supabase.from("profiles").select("id, full_name, location_id");
        const { data: userDepartments } = await supabase.from("user_departments").select(`
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
    const { data: departmentStats } = reactQuery.useQuery({
      queryKey: ["department-compliance-stats"],
      queryFn: async () => {
        const { data, error } = await supabase.from("document_assignments").select(`
          user_id,
          status,
          due_date
        `);
        if (error) throw error;
        const statsMap = /* @__PURE__ */ new Map();
        const { data: userDepartments } = await supabase.from("user_departments").select(`
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
    const { data: roleStats } = reactQuery.useQuery({
      queryKey: ["role-compliance-stats"],
      queryFn: async () => {
        const { data, error } = await supabase.from("document_assignments").select(`
          user_id,
          status,
          due_date
        `);
        if (error) throw error;
        const statsMap = /* @__PURE__ */ new Map();
        const { data: userRoles } = await supabase.from("user_profile_roles").select(`
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
    const { data: locations = [] } = reactQuery.useQuery({
      queryKey: ["compliance-locations"],
      queryFn: async () => {
        const { data } = await supabase.from("locations").select("id, name").order("name");
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
    const { data: completedDetails } = reactQuery.useQuery({
      queryKey: ["completed-document-details"],
      queryFn: async () => {
        const { data: assignments, error } = await supabase.from("document_assignments").select(`
          document_id,
          user_id,
          completed_at,
          documents(title)
        `).eq("status", "Completed");
        if (error) throw error;
        const { data: profiles } = await supabase.from("profiles").select("id, full_name");
        const { data: userDepartments } = await supabase.from("user_departments").select(`
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
    const { data: overdueDetails } = reactQuery.useQuery({
      queryKey: ["overdue-document-details"],
      queryFn: async () => {
        const { data: assignments, error } = await supabase.from("document_assignments").select(`
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
        const { data: profiles } = await supabase.from("profiles").select("id, full_name");
        const { data: userDepartments } = await supabase.from("user_departments").select(`
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
      return /* @__PURE__ */ jsxRuntime.jsx(
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
      return /* @__PURE__ */ jsxRuntime.jsx(
        ComplianceDocumentDetail,
        {
          documentId: selectedDocumentDetail.documentId,
          documentTitle: selectedDocumentDetail.documentTitle,
          onBack: () => setSelectedDocumentDetail(null)
        }
      );
    }
    if (selectedDepartmentDetail) {
      return /* @__PURE__ */ jsxRuntime.jsx(
        ComplianceDepartmentDetail,
        {
          department: selectedDepartmentDetail,
          onBack: () => setSelectedDepartmentDetail(null)
        }
      );
    }
    if (selectedRoleDetail) {
      return /* @__PURE__ */ jsxRuntime.jsx(
        ComplianceRoleDetail,
        {
          role: selectedRoleDetail,
          onBack: () => setSelectedRoleDetail(null)
        }
      );
    }
    return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntime.jsx("h2", { className: "text-2xl font-bold", children: "Compliance Tracking" }),
          /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-muted-foreground", children: "Monitor document reading compliance across the organization" })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs(button.Button, { variant: "outline", children: [
          /* @__PURE__ */ jsxRuntime.jsx(Download, { className: "h-4 w-4 mr-2" }),
          "Export Report"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4", children: [
        /* @__PURE__ */ jsxRuntime.jsxs(card.Card, { children: [
          /* @__PURE__ */ jsxRuntime.jsxs(card.CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [
            /* @__PURE__ */ jsxRuntime.jsx(card.CardTitle, { className: "text-sm font-medium", children: "Total Assignments" }),
            /* @__PURE__ */ jsxRuntime.jsx(FileText, { className: "h-4 w-4 text-muted-foreground" })
          ] }),
          /* @__PURE__ */ jsxRuntime.jsx(card.CardContent, { children: /* @__PURE__ */ jsxRuntime.jsx("div", { className: "text-2xl font-bold", children: (overallStats == null ? void 0 : overallStats.totalAssignments) || 0 }) })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs(card.Card, { className: "cursor-pointer hover:bg-accent/50 transition-colors", onClick: () => {
          setShowCompletedDetails(true);
          setActiveTab("completed-details");
        }, children: [
          /* @__PURE__ */ jsxRuntime.jsxs(card.CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [
            /* @__PURE__ */ jsxRuntime.jsx(card.CardTitle, { className: "text-sm font-medium", children: "Completed" }),
            /* @__PURE__ */ jsxRuntime.jsx(CircleCheckBig, { className: "h-4 w-4 text-green-600" })
          ] }),
          /* @__PURE__ */ jsxRuntime.jsx(card.CardContent, { children: /* @__PURE__ */ jsxRuntime.jsx("div", { className: "text-2xl font-bold text-green-600", children: (overallStats == null ? void 0 : overallStats.completedAssignments) || 0 }) })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs(card.Card, { className: "cursor-pointer hover:bg-accent/50 transition-colors", onClick: () => {
          if (((overallStats == null ? void 0 : overallStats.overdueAssignments) || 0) > 0) {
            setShowOverdueDetails(true);
            setActiveTab("overdue-details");
          } else {
            setStatusFilter("overdue");
            setDepartmentFilter("all");
            setActiveTab("users");
            sonner.toast.info("No overdue assignments found", {
              description: "All assignments are currently on time or completed."
            });
          }
        }, children: [
          /* @__PURE__ */ jsxRuntime.jsxs(card.CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [
            /* @__PURE__ */ jsxRuntime.jsx(card.CardTitle, { className: "text-sm font-medium", children: "Overdue" }),
            /* @__PURE__ */ jsxRuntime.jsx(CircleAlert, { className: "h-4 w-4 text-red-600" })
          ] }),
          /* @__PURE__ */ jsxRuntime.jsx(card.CardContent, { children: /* @__PURE__ */ jsxRuntime.jsx("div", { className: "text-2xl font-bold text-red-600", children: (overallStats == null ? void 0 : overallStats.overdueAssignments) || 0 }) })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs(card.Card, { children: [
          /* @__PURE__ */ jsxRuntime.jsxs(card.CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [
            /* @__PURE__ */ jsxRuntime.jsx(card.CardTitle, { className: "text-sm font-medium", children: "Compliance Rate" }),
            /* @__PURE__ */ jsxRuntime.jsx(TrendingUp, { className: "h-4 w-4 text-muted-foreground" })
          ] }),
          /* @__PURE__ */ jsxRuntime.jsx(card.CardContent, { children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: `text-2xl font-bold ${getComplianceColor((overallStats == null ? void 0 : overallStats.complianceRate) || 0)}`, children: [
            Math.round((overallStats == null ? void 0 : overallStats.complianceRate) || 0),
            "%"
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs(tabs.Tabs, { value: activeTab, onValueChange: setActiveTab, className: "w-full", children: [
        /* @__PURE__ */ jsxRuntime.jsxs(tabs.TabsList, { children: [
          /* @__PURE__ */ jsxRuntime.jsx(tabs.TabsTrigger, { value: "users", "data-value": "users", children: "Users" }),
          /* @__PURE__ */ jsxRuntime.jsx(tabs.TabsTrigger, { value: "documents", children: "Documents" }),
          /* @__PURE__ */ jsxRuntime.jsx(tabs.TabsTrigger, { value: "departments", children: "Departments" }),
          /* @__PURE__ */ jsxRuntime.jsx(tabs.TabsTrigger, { value: "roles", children: "Roles" }),
          showCompletedDetails && /* @__PURE__ */ jsxRuntime.jsx(tabs.TabsTrigger, { value: "completed-details", children: "Completed Details" }),
          showOverdueDetails && /* @__PURE__ */ jsxRuntime.jsx(tabs.TabsTrigger, { value: "overdue-details", children: "Overdue Details" })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs(tabs.TabsContent, { value: "users", className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex flex-col sm:flex-row gap-3", children: [
            /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex-1", children: /* @__PURE__ */ jsxRuntime.jsx(
              input.Input,
              {
                placeholder: "Search by name...",
                value: searchTerm,
                onChange: (e) => setSearchTerm(e.target.value)
              }
            ) }),
            /* @__PURE__ */ jsxRuntime.jsxs(select.Select, { value: locationFilter, onValueChange: setLocationFilter, children: [
              /* @__PURE__ */ jsxRuntime.jsxs(select.SelectTrigger, { className: "w-full sm:w-44", children: [
                /* @__PURE__ */ jsxRuntime.jsx(MapPin, { className: "h-3.5 w-3.5 mr-1 text-muted-foreground" }),
                /* @__PURE__ */ jsxRuntime.jsx(select.SelectValue, { placeholder: "All Locations" })
              ] }),
              /* @__PURE__ */ jsxRuntime.jsxs(select.SelectContent, { children: [
                /* @__PURE__ */ jsxRuntime.jsx(select.SelectItem, { value: "all", children: "All Locations" }),
                locations.map((loc) => /* @__PURE__ */ jsxRuntime.jsx(select.SelectItem, { value: loc.id, children: loc.name }, loc.id))
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntime.jsxs(select.Select, { value: departmentFilter, onValueChange: setDepartmentFilter, children: [
              /* @__PURE__ */ jsxRuntime.jsx(select.SelectTrigger, { className: "w-full sm:w-44", children: /* @__PURE__ */ jsxRuntime.jsx(select.SelectValue, { placeholder: "All Departments" }) }),
              /* @__PURE__ */ jsxRuntime.jsxs(select.SelectContent, { children: [
                /* @__PURE__ */ jsxRuntime.jsx(select.SelectItem, { value: "all", children: "All Departments" }),
                departments.map((dept) => /* @__PURE__ */ jsxRuntime.jsx(select.SelectItem, { value: dept, children: dept }, dept))
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntime.jsxs(select.Select, { value: statusFilter, onValueChange: setStatusFilter, children: [
              /* @__PURE__ */ jsxRuntime.jsx(select.SelectTrigger, { className: "w-full sm:w-36", children: /* @__PURE__ */ jsxRuntime.jsx(select.SelectValue, { placeholder: "All Status" }) }),
              /* @__PURE__ */ jsxRuntime.jsxs(select.SelectContent, { children: [
                /* @__PURE__ */ jsxRuntime.jsx(select.SelectItem, { value: "all", children: "All Status" }),
                /* @__PURE__ */ jsxRuntime.jsx(select.SelectItem, { value: "Completed", children: "Completed" }),
                /* @__PURE__ */ jsxRuntime.jsx(select.SelectItem, { value: "overdue", children: "Overdue" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntime.jsx(
              button.Button,
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
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "text-xs text-muted-foreground", children: [
            "Showing ",
            (filteredUserStats == null ? void 0 : filteredUserStats.length) || 0,
            " of ",
            (userStats == null ? void 0 : userStats.length) || 0,
            " users"
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "divide-y rounded-lg border", children: [
            filteredUserStats == null ? void 0 : filteredUserStats.map((user) => /* @__PURE__ */ jsxRuntime.jsxs(
              "div",
              {
                className: "flex items-center gap-4 px-4 py-3 cursor-pointer hover:bg-accent/50 transition-colors",
                onClick: () => setSelectedUserDetail({ userId: user.user_id, userName: user.user_name, department: user.department }),
                children: [
                  /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex-1 min-w-0", children: [
                    /* @__PURE__ */ jsxRuntime.jsx("div", { className: "font-medium truncate", children: user.user_name }),
                    /* @__PURE__ */ jsxRuntime.jsx("div", { className: "text-xs text-muted-foreground truncate", children: user.department })
                  ] }),
                  /* @__PURE__ */ jsxRuntime.jsx("div", { className: "w-32 hidden sm:block", children: /* @__PURE__ */ jsxRuntime.jsx(progress.Progress, { value: user.compliance_rate, className: "h-1.5" }) }),
                  /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "text-sm text-muted-foreground whitespace-nowrap w-16 text-right", children: [
                    user.completed_assignments,
                    "/",
                    user.total_assignments
                  ] }),
                  /* @__PURE__ */ jsxRuntime.jsxs(badge.Badge, { className: `${getComplianceBadge(user.compliance_rate)} whitespace-nowrap`, children: [
                    Math.round(user.compliance_rate),
                    "%"
                  ] }),
                  /* @__PURE__ */ jsxRuntime.jsx(ChevronRight, { className: "h-4 w-4 text-muted-foreground flex-shrink-0" })
                ]
              },
              user.user_id
            )),
            (filteredUserStats == null ? void 0 : filteredUserStats.length) === 0 && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "px-4 py-8 text-center text-sm text-muted-foreground", children: "No users match the current filters." })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs(tabs.TabsContent, { value: "documents", className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex flex-col sm:flex-row gap-3", children: [
            /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex-1", children: /* @__PURE__ */ jsxRuntime.jsx(
              input.Input,
              {
                placeholder: "Search by document title...",
                value: searchTerm,
                onChange: (e) => setSearchTerm(e.target.value)
              }
            ) }),
            /* @__PURE__ */ jsxRuntime.jsxs(select.Select, { value: statusFilter, onValueChange: setStatusFilter, children: [
              /* @__PURE__ */ jsxRuntime.jsx(select.SelectTrigger, { className: "w-full sm:w-36", children: /* @__PURE__ */ jsxRuntime.jsx(select.SelectValue, { placeholder: "All Status" }) }),
              /* @__PURE__ */ jsxRuntime.jsxs(select.SelectContent, { children: [
                /* @__PURE__ */ jsxRuntime.jsx(select.SelectItem, { value: "all", children: "All Status" }),
                /* @__PURE__ */ jsxRuntime.jsx(select.SelectItem, { value: "Completed", children: "Completed" }),
                /* @__PURE__ */ jsxRuntime.jsx(select.SelectItem, { value: "overdue", children: "Overdue" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntime.jsx(button.Button, { variant: "outline", onClick: () => {
              setSearchTerm("");
              setStatusFilter("all");
            }, children: "Clear" })
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "text-xs text-muted-foreground", children: [
            "Showing ",
            (filteredDocumentStats == null ? void 0 : filteredDocumentStats.length) || 0,
            " of ",
            (documentStats == null ? void 0 : documentStats.length) || 0,
            " documents"
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "divide-y rounded-lg border", children: [
            filteredDocumentStats == null ? void 0 : filteredDocumentStats.map((doc) => /* @__PURE__ */ jsxRuntime.jsxs(
              "div",
              {
                className: "flex items-center gap-4 px-4 py-3 cursor-pointer hover:bg-accent/50 transition-colors",
                onClick: () => setSelectedDocumentDetail({ documentId: doc.document_id, documentTitle: doc.document_title }),
                children: [
                  /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex-1 min-w-0", children: [
                    /* @__PURE__ */ jsxRuntime.jsx("div", { className: "font-medium truncate", children: doc.document_title }),
                    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "text-xs text-muted-foreground", children: [
                      doc.total_assignments,
                      " assignments"
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntime.jsx("div", { className: "w-32 hidden sm:block", children: /* @__PURE__ */ jsxRuntime.jsx(progress.Progress, { value: doc.compliance_rate, className: "h-1.5" }) }),
                  /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "text-sm text-muted-foreground whitespace-nowrap w-16 text-right", children: [
                    doc.completed_assignments,
                    "/",
                    doc.total_assignments
                  ] }),
                  /* @__PURE__ */ jsxRuntime.jsxs(badge.Badge, { className: `${getComplianceBadge(doc.compliance_rate)} whitespace-nowrap`, children: [
                    Math.round(doc.compliance_rate),
                    "%"
                  ] }),
                  /* @__PURE__ */ jsxRuntime.jsx(ChevronRight, { className: "h-4 w-4 text-muted-foreground flex-shrink-0" })
                ]
              },
              doc.document_id
            )),
            (filteredDocumentStats == null ? void 0 : filteredDocumentStats.length) === 0 && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "px-4 py-8 text-center text-sm text-muted-foreground", children: "No documents match the current filters." })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs(tabs.TabsContent, { value: "departments", className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex flex-col sm:flex-row gap-3", children: [
            /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex-1", children: /* @__PURE__ */ jsxRuntime.jsx(
              input.Input,
              {
                placeholder: "Search by department name...",
                value: searchTerm,
                onChange: (e) => setSearchTerm(e.target.value)
              }
            ) }),
            /* @__PURE__ */ jsxRuntime.jsxs(select.Select, { value: statusFilter, onValueChange: setStatusFilter, children: [
              /* @__PURE__ */ jsxRuntime.jsx(select.SelectTrigger, { className: "w-full sm:w-36", children: /* @__PURE__ */ jsxRuntime.jsx(select.SelectValue, { placeholder: "All Status" }) }),
              /* @__PURE__ */ jsxRuntime.jsxs(select.SelectContent, { children: [
                /* @__PURE__ */ jsxRuntime.jsx(select.SelectItem, { value: "all", children: "All Status" }),
                /* @__PURE__ */ jsxRuntime.jsx(select.SelectItem, { value: "Completed", children: "Completed" }),
                /* @__PURE__ */ jsxRuntime.jsx(select.SelectItem, { value: "overdue", children: "Overdue" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntime.jsx(button.Button, { variant: "outline", onClick: () => {
              setSearchTerm("");
              setDepartmentFilter("all");
              setStatusFilter("all");
            }, children: "Clear" })
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "text-xs text-muted-foreground", children: [
            "Showing ",
            (filteredDepartmentStats == null ? void 0 : filteredDepartmentStats.length) || 0,
            " of ",
            (departmentStats == null ? void 0 : departmentStats.length) || 0,
            " departments"
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "divide-y rounded-lg border", children: [
            filteredDepartmentStats == null ? void 0 : filteredDepartmentStats.map((dept) => /* @__PURE__ */ jsxRuntime.jsxs(
              "div",
              {
                className: "flex items-center gap-4 px-4 py-3 cursor-pointer hover:bg-accent/50 transition-colors",
                onClick: () => setSelectedDepartmentDetail(dept.department),
                children: [
                  /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex-1 min-w-0", children: [
                    /* @__PURE__ */ jsxRuntime.jsx("div", { className: "font-medium truncate", children: dept.department }),
                    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "text-xs text-muted-foreground", children: [
                      dept.total_assignments,
                      " assignments"
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntime.jsx("div", { className: "w-32 hidden sm:block", children: /* @__PURE__ */ jsxRuntime.jsx(progress.Progress, { value: dept.compliance_rate, className: "h-1.5" }) }),
                  /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "text-sm text-muted-foreground whitespace-nowrap w-16 text-right", children: [
                    dept.completed_assignments,
                    "/",
                    dept.total_assignments
                  ] }),
                  /* @__PURE__ */ jsxRuntime.jsxs(badge.Badge, { className: `${getComplianceBadge(dept.compliance_rate)} whitespace-nowrap`, children: [
                    Math.round(dept.compliance_rate),
                    "%"
                  ] }),
                  /* @__PURE__ */ jsxRuntime.jsx(ChevronRight, { className: "h-4 w-4 text-muted-foreground flex-shrink-0" })
                ]
              },
              dept.department
            )),
            (filteredDepartmentStats == null ? void 0 : filteredDepartmentStats.length) === 0 && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "px-4 py-8 text-center text-sm text-muted-foreground", children: "No departments match the current filters." })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs(tabs.TabsContent, { value: "roles", className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex flex-col sm:flex-row gap-3", children: [
            /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex-1", children: /* @__PURE__ */ jsxRuntime.jsx(
              input.Input,
              {
                placeholder: "Search by role name...",
                value: searchTerm,
                onChange: (e) => setSearchTerm(e.target.value)
              }
            ) }),
            /* @__PURE__ */ jsxRuntime.jsxs(select.Select, { value: statusFilter, onValueChange: setStatusFilter, children: [
              /* @__PURE__ */ jsxRuntime.jsx(select.SelectTrigger, { className: "w-full sm:w-36", children: /* @__PURE__ */ jsxRuntime.jsx(select.SelectValue, { placeholder: "All Status" }) }),
              /* @__PURE__ */ jsxRuntime.jsxs(select.SelectContent, { children: [
                /* @__PURE__ */ jsxRuntime.jsx(select.SelectItem, { value: "all", children: "All Status" }),
                /* @__PURE__ */ jsxRuntime.jsx(select.SelectItem, { value: "Completed", children: "Completed" }),
                /* @__PURE__ */ jsxRuntime.jsx(select.SelectItem, { value: "overdue", children: "Overdue" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntime.jsx(button.Button, { variant: "outline", onClick: () => {
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
            return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
              /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "text-xs text-muted-foreground", children: [
                "Showing ",
                (filteredRoleStats == null ? void 0 : filteredRoleStats.length) || 0,
                " of ",
                (roleStats == null ? void 0 : roleStats.length) || 0,
                " roles"
              ] }),
              /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "divide-y rounded-lg border", children: [
                filteredRoleStats == null ? void 0 : filteredRoleStats.map((role) => /* @__PURE__ */ jsxRuntime.jsxs(
                  "div",
                  {
                    className: "flex items-center gap-4 px-4 py-3 cursor-pointer hover:bg-accent/50 transition-colors",
                    onClick: () => setSelectedRoleDetail(role.role),
                    children: [
                      /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex-1 min-w-0", children: [
                        /* @__PURE__ */ jsxRuntime.jsx("div", { className: "font-medium truncate", children: role.role }),
                        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "text-xs text-muted-foreground", children: [
                          role.total_assignments,
                          " assignments"
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntime.jsx("div", { className: "w-32 hidden sm:block", children: /* @__PURE__ */ jsxRuntime.jsx(progress.Progress, { value: role.compliance_rate, className: "h-1.5" }) }),
                      /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "text-sm text-muted-foreground whitespace-nowrap w-16 text-right", children: [
                        role.completed_assignments,
                        "/",
                        role.total_assignments
                      ] }),
                      /* @__PURE__ */ jsxRuntime.jsxs(badge.Badge, { className: `${getComplianceBadge(role.compliance_rate)} whitespace-nowrap`, children: [
                        Math.round(role.compliance_rate),
                        "%"
                      ] }),
                      /* @__PURE__ */ jsxRuntime.jsx(ChevronRight, { className: "h-4 w-4 text-muted-foreground flex-shrink-0" })
                    ]
                  },
                  role.role
                )),
                (filteredRoleStats == null ? void 0 : filteredRoleStats.length) === 0 && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "px-4 py-8 text-center text-sm text-muted-foreground", children: "No roles match the current filters." })
              ] })
            ] });
          })()
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs(tabs.TabsContent, { value: "completed-details", className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntime.jsx("h3", { className: "text-lg font-semibold", children: "Completed Document Details" }),
              /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-sm text-muted-foreground", children: "View which documents have been completed by which users" })
            ] }),
            /* @__PURE__ */ jsxRuntime.jsx(
              button.Button,
              {
                variant: "outline",
                size: "icon",
                onClick: () => {
                  setShowCompletedDetails(false);
                  setActiveTab("users");
                },
                children: /* @__PURE__ */ jsxRuntime.jsx(ArrowLeft, { className: "h-4 w-4" })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntime.jsx("div", { className: "grid gap-4", children: completedDetails == null ? void 0 : completedDetails.map((detail, index) => /* @__PURE__ */ jsxRuntime.jsxs(card.Card, { children: [
            /* @__PURE__ */ jsxRuntime.jsx(card.CardHeader, { children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntime.jsx(card.CardTitle, { className: "text-lg", children: detail.document_title }),
                /* @__PURE__ */ jsxRuntime.jsxs(card.CardDescription, { children: [
                  "Completed by ",
                  detail.user_name,
                  " (",
                  detail.department,
                  ")"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntime.jsxs(badge.Badge, { className: "bg-green-100 text-green-800", children: [
                /* @__PURE__ */ jsxRuntime.jsx(CircleCheckBig, { className: "h-3 w-3 mr-1" }),
                "Completed"
              ] })
            ] }) }),
            /* @__PURE__ */ jsxRuntime.jsx(card.CardContent, { children: /* @__PURE__ */ jsxRuntime.jsx("div", { className: "text-sm text-muted-foreground", children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntime.jsx(Calendar, { className: "h-4 w-4" }),
              /* @__PURE__ */ jsxRuntime.jsxs("span", { children: [
                "Completed on: ",
                detail.completed_at ? new Date(detail.completed_at).toLocaleDateString() : "Date not recorded"
              ] })
            ] }) }) })
          ] }, `${detail.user_id}-${detail.document_id}-${index}`)) }),
          (completedDetails == null ? void 0 : completedDetails.length) === 0 && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "text-center py-8 text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntime.jsx(FileText, { className: "h-12 w-12 mx-auto mb-4 opacity-50" }),
            /* @__PURE__ */ jsxRuntime.jsx("p", { children: "No completed documents found." })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs(tabs.TabsContent, { value: "overdue-details", className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntime.jsx("h3", { className: "text-lg font-semibold", children: "Overdue Document Details" }),
              /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-sm text-muted-foreground", children: "View which documents are overdue and by which users" })
            ] }),
            /* @__PURE__ */ jsxRuntime.jsx(
              button.Button,
              {
                variant: "outline",
                size: "icon",
                onClick: () => {
                  setShowOverdueDetails(false);
                  setActiveTab("users");
                },
                children: /* @__PURE__ */ jsxRuntime.jsx(ArrowLeft, { className: "h-4 w-4" })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntime.jsx("div", { className: "grid gap-4", children: overdueDetails == null ? void 0 : overdueDetails.map((detail, index) => /* @__PURE__ */ jsxRuntime.jsxs(card.Card, { children: [
            /* @__PURE__ */ jsxRuntime.jsx(card.CardHeader, { children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntime.jsx(card.CardTitle, { className: "text-lg", children: detail.document_title }),
                /* @__PURE__ */ jsxRuntime.jsxs(card.CardDescription, { children: [
                  "Assigned to ",
                  detail.user_name,
                  " (",
                  detail.department,
                  ")"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntime.jsxs(badge.Badge, { className: "bg-red-100 text-red-800", children: [
                /* @__PURE__ */ jsxRuntime.jsx(CircleAlert, { className: "h-3 w-3 mr-1" }),
                detail.days_overdue,
                " days overdue"
              ] })
            ] }) }),
            /* @__PURE__ */ jsxRuntime.jsx(card.CardContent, { children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "text-sm text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntime.jsx(Calendar, { className: "h-4 w-4" }),
                /* @__PURE__ */ jsxRuntime.jsxs("span", { children: [
                  "Due date: ",
                  new Date(detail.due_date).toLocaleDateString()
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-2 mt-1", children: [
                /* @__PURE__ */ jsxRuntime.jsx(Clock, { className: "h-4 w-4" }),
                /* @__PURE__ */ jsxRuntime.jsxs("span", { children: [
                  "Status: ",
                  detail.status
                ] })
              ] })
            ] }) })
          ] }, `${detail.user_id}-${detail.document_id}-${index}`)) }),
          (overdueDetails == null ? void 0 : overdueDetails.length) === 0 && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "text-center py-8 text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntime.jsx(FileText, { className: "h-12 w-12 mx-auto mb-4 opacity-50" }),
            /* @__PURE__ */ jsxRuntime.jsx("p", { children: "No overdue documents found." })
          ] })
        ] })
      ] })
    ] });
  };
  const KnowledgePanelInner = () => {
    const [activeTab, setActiveTab] = React.useState("documents");
    return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntime.jsx("h1", { className: "text-3xl font-bold tracking-tight", children: "Knowledge Management" }),
        /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-muted-foreground", children: "Manage organizational documents, policies, and compliance tracking" })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs(tabs.Tabs, { value: activeTab, onValueChange: setActiveTab, className: "w-full", children: [
        /* @__PURE__ */ jsxRuntime.jsxs(tabs.TabsList, { className: "grid w-full grid-cols-3", children: [
          /* @__PURE__ */ jsxRuntime.jsxs(tabs.TabsTrigger, { value: "documents", className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntime.jsx(FileText, { className: "h-4 w-4" }),
            "Documents"
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs(tabs.TabsTrigger, { value: "assignments", className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntime.jsx(Users, { className: "h-4 w-4" }),
            "Assignments"
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs(tabs.TabsTrigger, { value: "compliance", className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntime.jsx(CircleCheckBig, { className: "h-4 w-4" }),
            "Document Compliance"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsx(tabs.TabsContent, { value: "documents", className: "space-y-4", children: /* @__PURE__ */ jsxRuntime.jsx(DocumentManagement, { onNavigateToAssignments: () => setActiveTab("assignments") }) }),
        /* @__PURE__ */ jsxRuntime.jsx(tabs.TabsContent, { value: "assignments", className: "space-y-4", children: /* @__PURE__ */ jsxRuntime.jsx(DocumentAssignments, {}) }),
        /* @__PURE__ */ jsxRuntime.jsx(tabs.TabsContent, { value: "compliance", className: "space-y-4", children: /* @__PURE__ */ jsxRuntime.jsx(ComplianceTracking, {}) })
      ] })
    ] });
  };
  const KnowledgePanel = ({ basePath }) => {
    const { hasAdminAccess } = useUserRole.useUserRole();
    const config = {
      supabaseClient: client.supabase,
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
    return /* @__PURE__ */ jsxRuntime.jsx(OrganisationProvider, { config, children: /* @__PURE__ */ jsxRuntime.jsx(KnowledgePanelInner, {}) });
  };
  Object.defineProperty(exports2, "useUserProfiles", {
    enumerable: true,
    get: () => useUserProfiles.useUserProfiles
  });
  Object.defineProperty(exports2, "useUserManagement", {
    enumerable: true,
    get: () => useUserManagement.useUserManagement
  });
  Object.defineProperty(exports2, "useUserRole", {
    enumerable: true,
    get: () => useUserRole.useUserRole
  });
  Object.defineProperty(exports2, "useViewPreference", {
    enumerable: true,
    get: () => useViewPreference.useViewPreference
  });
  Object.defineProperty(exports2, "useUserDepartments", {
    enumerable: true,
    get: () => useUserDepartments.useUserDepartments
  });
  Object.defineProperty(exports2, "useUserProfileRoles", {
    enumerable: true,
    get: () => useUserProfileRoles.useUserProfileRoles
  });
  Object.defineProperty(exports2, "useUserAssets", {
    enumerable: true,
    get: () => useUserAssets.useUserAssets
  });
  exports2.AddCertificatesDialog = AddEducationDialog;
  exports2.AddOrganisationCertificateDialog = AddOrganisationCertificateDialog;
  exports2.AddPhysicalLocationDialog = AddPhysicalLocationDialog;
  exports2.AssignHardwareDialog = AssignHardwareDialog;
  exports2.AssignPhysicalLocationDialog = AssignPhysicalLocationDialog;
  exports2.AssignSoftwareDialog = AssignSoftwareDialog;
  exports2.Certificates = Certificates;
  exports2.ChangePasswordDialog = ChangePasswordDialog;
  exports2.CreateUserDialog = CreateUserDialog;
  exports2.DepartmentManagement = DepartmentManagement;
  exports2.DepartmentRolePairsDisplay = DepartmentRolePairsDisplay;
  exports2.EditableField = EditableField;
  exports2.EditableProfileHeader = EditableProfileHeader;
  exports2.ImportErrorReport = ImportErrorReport;
  exports2.ImportUsersDialog = ImportUsersDialog;
  exports2.KnowledgePanel = KnowledgePanel;
  exports2.LicenseDashboard = LicenseDashboard;
  exports2.LocationManagement = LocationManagement;
  exports2.MultipleRolesField = MultipleRolesField;
  exports2.MyDocuments = MyDocuments;
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
  exports2.UserImportProgressBanner = UserImportProgressBanner;
  exports2.UserList = UserList;
  exports2.UserManagement = UserManagement;
  exports2.UserTable = UserTable;
  exports2.handleCreateUser = handleCreateUser;
  exports2.handleDeleteUser = handleDeleteUser;
  exports2.handleSaveUser = handleSaveUser;
  exports2.useLicenseData = useLicenseData;
  exports2.useOrganisationContext = useOrganisationContext;
  Object.defineProperty(exports2, Symbol.toStringTag, { value: "Module" });
});
//# sourceMappingURL=index.umd.js.map
