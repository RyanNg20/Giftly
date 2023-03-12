import { Inter, Kalam, Josefin_Sans } from '@next/font/google'

export const inter = Inter({
  variable: '--inter-font',
  subsets: ['latin']
})

export const kalam = Kalam({
  variable: '--kalam-font',
  subsets: ['latin'],
  weight: '700',
});

export const josefinSans = Josefin_Sans({
  variable: '--josefin-sans-font',
  subsets: ['latin'],
});