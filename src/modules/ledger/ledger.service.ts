import { Injectable } from '@nestjs/common';
import {LedgerRepository} from '@/modules/ledger/ledger.repository';
import {ASSET, LIABILITY} from '@/constants/constants';

@Injectable()
export class LedgerService {
    constructor(private ledgerRepository: LedgerRepository) {
    }

    async insertBalance (type:string, id: string, debitAmount: number, creditAmount: number, user_id = null) {
        let balance = 0
        //fetch last balance of that account by account_id
        const lastRow = await this.ledgerRepository.fetchLastRowByAccountId({account_id: id});
        if (lastRow) {
            balance = lastRow.balance
        }

        if (type === ASSET) {
            return await this.ledgerRepository.createRecord({account_id: id, debit: debitAmount, credit: creditAmount, balance: (balance + creditAmount) - debitAmount});
        } else if (type === LIABILITY) {
            return await this.ledgerRepository.createRecord({account_id: id, debit: debitAmount, credit: creditAmount, balance: (balance + debitAmount) - creditAmount});
        }

        console.log(balance)
    }

}
