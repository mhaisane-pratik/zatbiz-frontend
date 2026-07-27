'use client';

import React, { useRef } from 'react';

export type EditFn = (path: string, value: any) => void;

interface EdProps {
  /** Dotted path into the override object, e.g. "classes.0.name" */
  path: string;
  value: string;
  edit?: boolean;
  onEdit?: EditFn;
  as?: any;
  className?: string;
  style?: React.CSSProperties;
  /** Allow line breaks (headlines use \n) */
  multiline?: boolean;
}

/**
 * Inline-editable text. In edit mode the element becomes contentEditable and
 * commits on blur, so React never fights the caret mid-typing.
 */
export function Ed({
  path,
  value,
  edit,
  onEdit,
  as: Tag = 'span',
  className,
  style,
  multiline,
}: EdProps) {
  const ref = useRef<HTMLElement>(null);

  if (!edit) {
    return (
      <Tag className={className} style={style}>
        {value}
      </Tag>
    );
  }

  return (
    <Tag
      ref={ref}
      className={`${className || ''} zb-ed`}
      style={style}
      contentEditable
      suppressContentEditableWarning
      spellCheck={false}
      data-edit-path={path}
      onFocus={(e: React.FocusEvent<HTMLElement>) => e.currentTarget.classList.add('zb-ed-on')}
      onBlur={(e: React.FocusEvent<HTMLElement>) => {
        e.currentTarget.classList.remove('zb-ed-on');
        const next = e.currentTarget.innerText.replace(/ /g, ' ');
        if (next !== value) onEdit?.(path, next);
      }}
      onKeyDown={(e: React.KeyboardEvent<HTMLElement>) => {
        if (e.key === 'Escape') {
          e.currentTarget.innerText = value;
          e.currentTarget.blur();
        }
        if (e.key === 'Enter' && !multiline) {
          e.preventDefault();
          e.currentTarget.blur();
        }
      }}
    >
      {value}
    </Tag>
  );
}

interface EdImgProps {
  path: string;
  src: string;
  alt?: string;
  edit?: boolean;
  onEdit?: EditFn;
  /** Called with the file so the host can upload and return a URL */
  onPickFile?: (path: string, file: File) => void;
  className?: string;
}

/** Click-to-replace image. Shows a pencil overlay while in edit mode. */
export function EdImg({ path, src, alt, edit, onEdit, onPickFile, className }: EdImgProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  if (!edit) return <img src={src} alt={alt} className={className} />;

  return (
    <>
      <img src={src} alt={alt} className={className} />
      <button
        type="button"
        title="Replace image"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          inputRef.current?.click();
        }}
        className="zb-img-btn"
      >
        🖼 Replace
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (!f) return;
          if (onPickFile) onPickFile(path, f);
          else {
            const reader = new FileReader();
            reader.onloadend = () => onEdit?.(path, reader.result as string);
            reader.readAsDataURL(f);
          }
          e.target.value = '';
        }}
      />
    </>
  );
}

/** Styles injected once by the storefront when edit mode is on. */
export const EDIT_STYLES = `
  .zb-ed{outline:1px dashed transparent;outline-offset:3px;border-radius:3px;transition:outline-color .15s,background-color .15s}
  .zb-ed:hover{outline-color:currentColor;background-color:rgba(127,127,127,.12)}
  .zb-ed-on{outline:2px solid #38bdf8 !important;background-color:rgba(56,189,248,.12) !important}
  .zb-img-wrap{position:relative}
  .zb-img-btn{
    position:absolute;top:8px;right:8px;z-index:40;
    background:rgba(15,23,42,.88);color:#fff;border:1px solid rgba(255,255,255,.25);
    font-size:9px;font-weight:900;letter-spacing:.06em;text-transform:uppercase;
    padding:4px 8px;border-radius:6px;cursor:pointer;opacity:0;transition:opacity .15s;
    font-family:ui-sans-serif,system-ui,sans-serif;
  }
  .zb-img-wrap:hover .zb-img-btn{opacity:1}
`;
