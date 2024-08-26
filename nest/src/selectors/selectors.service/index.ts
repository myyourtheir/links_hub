import { Injectable } from '@nestjs/common'

@Injectable()
export class SelectorsService {
	getSelectors(site: string) {
		switch (site) {
			case 'ozon':
				return {
					titleSelector: '.tsHeadline550Medium',
					imageSelector: 'img.mk3_27.b916-a',
					priceSelector: '.o0m_27.mo1_27.o4m_27',
					currencySelector: null
				}
		}
	}
}
