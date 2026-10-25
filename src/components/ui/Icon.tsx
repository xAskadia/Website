import type { SVGProps } from 'react'

const paths: Record<string, string> = {
  eye: 'M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z',
  shield: 'M12 3 4 6v6c0 4.5 3.4 8.3 8 9 4.6-.7 8-4.5 8-9V6Z M9 12l2 2 4-4',
  search: 'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14Z M20 20l-4-4',
  layers: 'M12 3 2 8l10 5 10-5Z M2 13l10 5 10-5',
  pointer: 'M5 3l6 16 2.4-6.6L20 10Z',
  spark: 'M12 2v5M12 17v5M2 12h5M17 12h5M5 5l3.5 3.5M15.5 15.5 19 19M5 19l3.5-3.5M15.5 8.5 19 5',
  phone: 'M7 2h10a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1Z M11 18h2',
  bolt: 'M13 2 4 14h7l-1 8 9-12h-7Z',
  access: 'M12 4a2 2 0 1 0 0 .01 M5 8l7 1 7-1 M12 9v5l-3 6 M12 14l3 6',
  lock: 'M6 11h12v10H6Z M8.5 11V7.5a3.5 3.5 0 0 1 7 0V11',
  handshake: 'M3 12l4-4 4 2 3-2 7 5-4 4-3-2-2 2-3-2Z',
  compass: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z M15.5 8.5 13.5 13.5 8.5 15.5 10.5 10.5Z',
  pen: 'M4 20l4-1L19 8l-3-3L5 16Z M14 6l3 3',
  code: 'M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16',
  rocket: 'M12 15c-2-2-3-5-1-9 2-2 6-3 9-3 0 3-1 7-3 9-4 2-7 1-9 1Z M8 13l-4 1 2-4 M11 16l-1 4 4-2 M15 7a1 1 0 1 0 0 .01',
  refresh: 'M4 12a8 8 0 0 1 14-5l2 2M20 4v5h-5 M20 12a8 8 0 0 1-14 5l-2-2M4 20v-5h5',
  chat: 'M4 5h16v11H9l-5 4Z',
  target: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Z M12 11a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z',
  calendar: 'M4 6h16v14H4Z M4 10h16 M8 3v4M16 3v4',
  users: 'M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z M2.5 20c.5-3.5 3.2-6 6.5-6s6 2.5 6.5 6 M16 4.5a3.5 3.5 0 0 1 0 6.5 M18 14c2 .7 3.3 2.9 3.5 6',
  map: 'M3 6l6-2 6 2 6-2v14l-6 2-6-2-6 2Z M9 4v14M15 6v14',
  palette: 'M12 3a9 9 0 1 0 0 18c1 0 1.5-.8 1.2-1.6-.4-1 .3-2 1.3-2H17a4 4 0 0 0 4-4c0-5-4-10.4-9-10.4Z',
  type: 'M4 7V5h16v2 M12 5v14 M9 19h6',
  chart: 'M4 20V10M10 20V4M16 20v-7M22 20H2',
  check: 'M5 12.5l4.5 4.5L19 7.5',
}

export type IconName = keyof typeof paths

export function Icon({ name, ...props }: { name: IconName } & SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      {paths[name].split(' M').map((d, i) => (
        <path key={i} d={i === 0 ? d : 'M' + d} />
      ))}
    </svg>
  )
}
