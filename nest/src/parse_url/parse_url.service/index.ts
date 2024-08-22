import { HttpException, HttpStatus, Injectable, OnApplicationBootstrap, OnApplicationShutdown } from '@nestjs/common'
import { ParseUrlDto } from '../parse_url.dto/dto'
import { parseWbProduct } from './wb.product'
import { parseYaProduct } from './ya.product'
import { parseOzonProduct } from './ozon.product'
import { parseYoutubeVideo } from './youtube.video'
import puppeteer from 'puppeteer-extra'
import { Browser } from 'puppeteer'
import { parseDefault } from './parseDefault'
const StealthPlugin = require("puppeteer-extra-plugin-stealth")


@Injectable()
export class ParseUrlService implements OnApplicationBootstrap, OnApplicationShutdown {
	private browser: Browser

	async onApplicationBootstrap() {
		puppeteer.use(StealthPlugin())
		this.browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] })
	}


	async onApplicationShutdown() {
		if (this.browser) {
			await this.browser.close()
		}
	}
	parseUrl(body: ParseUrlDto) {
		switch (true) {
			case body.url.includes('wildberries.ru/catalog'):
				return parseWbProduct(body.url, this.browser)
			case body.url.includes('market.yandex.ru/product') || body.url.includes('market.yandex.ru/cc'):
				return parseYaProduct(body.url, this.browser)
			case body.url.includes('ozon.ru/product'):
				return parseOzonProduct(body.url, this.browser)
			case body.url.includes('youtube.com/watch'):
				return parseYoutubeVideo(body.url, this.browser)
			default:
				return parseDefault(body.url, this.browser)
			// throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND)
		}
	}
}
