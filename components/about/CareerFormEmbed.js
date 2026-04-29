"use client";

import React, { useEffect, useMemo } from "react";
import Image from "next/image";

const CareerFormEmbed = ({
  containerId = "hubspotForm",
  title = "Apply Now",
  showLogo = true,
  intro,
  hiddenFields,
  portalId,
  formId,
  region,
}) => {
  const targetId = useMemo(() => `#${containerId}`, [containerId]);
  const resolvedPortalId = portalId || process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID;
  const resolvedFormId = formId || process.env.NEXT_PUBLIC_HUBSPOT_CAREER_FORM_ID;
  const scriptSrc = region
    ? `https://js-${region}.hsforms.net/forms/embed/v2.js`
    : "https://js.hsforms.net/forms/v2.js";

  useEffect(() => {
    const resolvedHiddenFields = hiddenFields || {};
    const hasHiddenFields = Object.keys(resolvedHiddenFields).length > 0;

    const applyHiddenValuesToForm = ($form) => {
      if (!hasHiddenFields || !$form || !$form.length) {
        return;
      }

      const formElement = $form.get(0);
      if (!formElement) {
        return;
      }

      // Clear previously injected hidden inputs for a clean re-apply.
      formElement
        .querySelectorAll('input[data-gdc-hidden-field="true"]')
        .forEach((node) => node.remove());

      Object.entries(resolvedHiddenFields).forEach(([fieldName, fieldValue]) => {
        if (fieldValue === undefined || fieldValue === null || fieldValue === "") {
          return;
        }

        const normalizedValues = Array.isArray(fieldValue)
          ? fieldValue
          : [fieldValue];

        const existingField = $form.find(`[name="${fieldName}"]`);
        if (existingField.length) {
          const inputType = existingField.first().attr("type");
          if (inputType === "checkbox" || inputType === "radio") {
            existingField.each((_, input) => {
              input.checked = normalizedValues.includes(input.value);
              input.dispatchEvent(new Event("change", { bubbles: true }));
            });
          } else {
            existingField.val(String(normalizedValues[0])).trigger("change");
          }
          return;
        }

        // Fallback for fields not rendered in the form DOM.
        normalizedValues.forEach((value) => {
          const hiddenInput = document.createElement("input");
          hiddenInput.type = "hidden";
          hiddenInput.name = fieldName;
          hiddenInput.value = String(value);
          hiddenInput.setAttribute("data-gdc-hidden-field", "true");
          formElement.appendChild(hiddenInput);
        });
      });
    };

    const script = document.createElement("script");
    script.src = scriptSrc;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.hbspt) {
        window.hbspt.forms.create({
          portalId: resolvedPortalId,
          formId: resolvedFormId,
          ...(region ? { region } : {}),
          formInstanceId: containerId,
          target: targetId,
          cssRequired: false,
          overrideDefaultStyles: true,
          cssClass: "custom-hs-form",
          ...(hasHiddenFields ? { hidden: resolvedHiddenFields } : {}),
          onFormReady: ($form) => {
            applyHiddenValuesToForm($form);
          },
          onBeforeFormSubmit: ($form) => {
            applyHiddenValuesToForm($form);
          },
        });
      }
    };

    return () => {
      const formContainer = document.querySelector(targetId);
      if (formContainer) {
        formContainer.innerHTML = "";
      }
    };
  }, [containerId, hiddenFields, region, resolvedFormId, resolvedPortalId, scriptSrc, targetId]);

  return (
    <div className="flex justify-center w-full px-4">
      <div className="career-form-container w-full max-w-2xl">
        <div className="flex flex-col items-center mb-6">
          {showLogo ? (
            <Image
              src="/images/GDC LOGOS 2024 BLUE.webp"
              alt="Logo"
              className="mb-4 w-60"
              width={240}
              height={96}
            />
          ) : null}
          <h2 className="text-2xl text-customBlue font-semibold">{title}</h2>
          {intro ? (
            <p className="mt-2 text-center text-sm text-gray-600">{intro}</p>
          ) : null}
        </div>
        <div id={containerId} className="w-full"></div>
      </div>
    </div>
  );
};

export default CareerFormEmbed;