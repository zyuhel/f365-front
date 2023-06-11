import { App, Plugin } from 'vue';

export const MyLightBox: Plugin = {
    install (app: App) {
        app.prototype.$myLightbox = function (items, index) {
            globalThis.lightbox = {
                items,
                index: 0
            }
            globalThis.lightbox.items = items
            globalThis.lightbox.download = () => {
                try {
                    const a = document.createElement('a')
                    const lightbox = globalThis.lightbox
                    const index = lightbox.index
                    const items = lightbox.items
                    const item = items[index]
                    const source = item.source
                    const URL = globalThis.URL
                    const instance = new URL(source)
                    const pathname = instance.pathname
                    const match = pathname.match(/(?<URN>[^/]+)$/)
                    const groups = match.groups
                    const URN = groups.URN
                    a.download = URN
                    a.href = source
                    a.click()
                } catch (error) {
                    console.debug(error)
                }
            }
            globalThis.lightbox.imgInfo = () => {
                try {
                    const lightbox = globalThis.lightbox
                    const index = lightbox.index
                    const items = lightbox.items
                    const item = items[index]
                    const source = item.source
                    globalThis.imgInfo(source)
                } catch (error) {
                    console.debug(error)
                }
            }

            const SHOW_IMAGE_INFO_TITLE = 'general.show-image-info'
            const DOWNLOAD_TITLE = 'general.download'
            globalThis.myLightboxPanel = UIkit
                .lightboxPanel({
                    container: '#lightboxPanel',
                    items,
                    template: `
          <div class="uk-lightbox uk-overflow-hidden">
            <ul class="uk-lightbox-items"></ul>
            <div class="uk-lightbox-toolbar uk-position-top uk-text-right uk-transition-slide-top uk-transition-opaque">
              <button id="lightboxImgInfo" class="uk-lightbox-toolbar-icon" type="button" uk-icon="icon: info;" title="${SHOW_IMAGE_INFO_TITLE}"></button>              
              <button id="lightboxDownload" class="uk-lightbox-toolbar-icon" type="button" uk-icon="icon: download;" title="${DOWNLOAD_TITLE}"></button>
              <button class="uk-lightbox-toolbar-icon uk-close-large" type="button" uk-close></button>
           </div>
            <a class="uk-lightbox-button uk-position-center-left uk-position-medium uk-transition-fade" href uk-slidenav-previous uk-lightbox-item="previous"></a>
            <a class="uk-lightbox-button uk-position-center-right uk-position-medium uk-transition-fade" href uk-slidenav-next uk-lightbox-item="next"></a>
            <div class="uk-lightbox-toolbar uk-lightbox-caption uk-position-bottom uk-text-center uk-transition-slide-bottom uk-transition-opaque"></div>
        </div>`
                })
            globalThis.myLightboxPanel.show(index)
            UIkit.util.on('#lightboxPanel', 'shown', () => {
                const lightboxImgInfoButton = document.querySelector('#lightboxImgInfo')
                const lightboxDownloadButton = document.querySelector('#lightboxDownload')
                if (lightboxImgInfoButton) {
                    lightboxImgInfoButton.onclick =  globalThis.lightbox.imgInfo
                }
                if (lightboxDownloadButton) {
                    lightboxDownloadButton.onclick = globalThis.lightbox.download
                }
            })
            UIkit.util.on('#lightboxPanel', 'itemshow', event => {
                try {
                    const detail = event.detail
                    const lightbox = detail[0]
                    const index = lightbox.index
                    globalThis.lightbox.index = index
                } catch (error) {
                    console.debug(error)
                }
            })
        }
    }
}
import UIkit from 'uikit'

