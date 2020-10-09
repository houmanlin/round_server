import defaultSettings from '@/settings'

const title = defaultSettings.title || '宏远集团'

export default function getPageTitle(pageTitle) {

  return `${title}`
}
