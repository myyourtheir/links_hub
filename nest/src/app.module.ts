import { Module } from '@nestjs/common'
import { ParseUrlModule } from './parse_url/parse_url.module'
import { SelectorsModule } from './selectors/selectors.module';

@Module({
	imports: [ParseUrlModule, SelectorsModule],
})
export class AppModule { }
