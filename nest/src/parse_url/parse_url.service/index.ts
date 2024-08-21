import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { ParseUrlDto } from '../parse_url.dto/dto'
import parseOther from './parseOther'
import { parseWbProduct } from './wb.product'
import { parseYaProduct } from './ya.product'
import { parseOzonProduct } from './ozon.product'
import { parseYoutubeVideo } from './youtube.video'
import puppeteer from 'puppeteer-extra'
import { Browser } from 'puppeteer'
const StealthPlugin = require("puppeteer-extra-plugin-stealth")


@Injectable()
export class ParseUrlService implements OnModuleInit, OnModuleDestroy {
	private browser: Browser

	async onModuleInit() {
		puppeteer.use(StealthPlugin())
		this.browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] })
	}

	async onModuleDestroy() {
		if (this.browser) {
			await this.browser.close()
		}
	}
	parseUrl(body: ParseUrlDto) {
		switch (true) {
			case body.url.includes('www.wildberries.ru/catalog'):
				return parseWbProduct(body.url, this.browser)
			case body.url.includes('market.yandex.ru/product'):
				return parseYaProduct(body.url, this.browser)
			case body.url.includes('www.ozon.ru/product'):
				return parseOzonProduct(body.url, this.browser)
			case body.url.includes('www.youtube.com/watch'):
				return parseYoutubeVideo(body.url, this.browser)
			default:
				return parseOther(body.url)
		}
	}
}
