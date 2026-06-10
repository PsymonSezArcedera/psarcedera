import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";

const EMAIL = "psarcedera@gmail.com";
const LINKEDIN = "https://www.linkedin.com/in/psymonsezarcedera/";
const GITHUB = "https://github.com/PsymonSezArcedera";

function MailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-14 w-14 max-[860px]:h-12 max-[860px]:w-12"
    >
      <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
      <path d="M3 6l9 7 9-7" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-14 w-14 max-[860px]:h-12 max-[860px]:w-12"
    >
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.4c0-1.29-.02-2.95-1.8-2.95-1.8 0-2.08 1.4-2.08 2.85V21H9z" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-14 w-14 max-[860px]:h-12 max-[860px]:w-12"
    >
      <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49l-.01-1.7c-2.78.62-3.37-1.22-3.37-1.22-.46-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.36 1.12 2.93.85.09-.66.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.27 2.75 1.05a9.4 9.4 0 0 1 5 0c1.91-1.32 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.79-4.57 5.05.36.32.68.94.68 1.9l-.01 2.82c0 .27.18.6.69.49A10.03 10.03 0 0 0 22 12.25C22 6.58 17.52 2 12 2z" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5 transition-transform duration-500 group-hover/btn:animate-[dl-bounce_0.9s_ease_infinite]"
    >
      <path d="M12 3v12" />
      <path d="M7 11l5 5 5-5" />
      <path d="M5 21h14" />
    </svg>
  );
}

export function Contact() {
  return (
    <section id="contact" className="border-t border-line bg-band-alt pb-[clamp(36px,5vw,56px)] pt-[clamp(64px,11vw,110px)]">
      <div className="wrap">
        <SectionHeader title="Contact" />

        <div className="mt-9 grid grid-cols-[1.1fr_1fr] items-center gap-14 max-[860px]:grid-cols-1 max-[860px]:gap-10">
          <Reveal>
            <div className="text-[clamp(40px,7vw,96px)] font-semibold leading-[0.96] tracking-[-0.04em]">
              <Link
                href={`mailto:${EMAIL}`}
                className="group inline-block transition-transform duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:translate-x-3.5"
              >
                Let&apos;s work
                <br />
                together{" "}
                <span className="inline-block transition-transform duration-[400ms] group-hover:translate-x-2.5 group-hover:-translate-y-2.5">
                  ↗
                </span>
              </Link>
            </div>
            <p className="mt-[22px] max-w-[380px] text-[16px] text-ink-2">
              Open to full-time and internship software roles. The fastest way
              to reach me is email — or pick a channel.
            </p>
          </Reveal>

          <Reveal>
            <div className="group/grid flex max-w-[430px] items-center justify-center gap-10 max-[860px]:gap-7">
              <Link
                href={`mailto:${EMAIL}`}
                aria-label="Email"
                title="Email"
                className="inline-flex text-ink opacity-100 transition-[transform,opacity] duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:scale-105 hover:!opacity-100 group-hover/grid:opacity-[0.38]"
              >
                <MailIcon />
              </Link>
              <a
                href={LINKEDIN}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                title="LinkedIn"
                className="inline-flex text-ink opacity-100 transition-[transform,opacity] duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:scale-105 hover:!opacity-100 group-hover/grid:opacity-[0.38]"
              >
                <LinkedInIcon />
              </a>
              <a
                href={GITHUB}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                title="GitHub"
                className="inline-flex text-ink opacity-100 transition-[transform,opacity] duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:scale-105 hover:!opacity-100 group-hover/grid:opacity-[0.38]"
              >
                <GithubIcon />
              </a>
            </div>

            <Link
              href="/Psymon-Arcedera-Resume.pdf"
              download
              className="group/btn relative mt-10 flex max-w-[430px] items-center justify-between gap-4 overflow-hidden rounded-[20px] border border-ink bg-ink p-5 pl-6 text-white transition-transform duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1"
            >
              <span
                className="pointer-events-none absolute left-[-60%] top-0 z-[1] h-full w-[50%] -skew-x-[18deg] bg-gradient-to-r from-transparent via-white/15 to-transparent group-hover/btn:animate-[sheen_1.1s_ease_forwards]"
                aria-hidden
              />
              <span className="relative z-[2] text-[19px] font-semibold tracking-[-0.01em]">
                Download my résumé
              </span>
              <span className="relative z-2 flex h-11.5 w-11.5 shrink-0 items-center justify-center rounded-full bg-white text-ink">
                <DownloadIcon />
              </span>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
