import {Command} from 'nestjs-command';
import {Injectable} from '@nestjs/common';
import {ReasoningService} from '@/modules/reasoning/reasoning.service';

@Injectable()
export class ReasoningSeed {
  constructor(private readonly reasoningService: ReasoningService) {
  }

  @Command({
    command: 'create:reasoning',
    describe: 'create reasoning',
  })
  async create(): Promise<string | void> {
    const reasonOne = await this.reasoningService.findOneAndUpdate({name: 'Lack of relevant experience or expertise in the desired coaching niche or industry'} , {
      name: 'Lack of relevant experience or expertise in the desired coaching niche or industry',
    });

    const reasonTwo = await this.reasoningService.findOneAndUpdate({name: 'Incompatibility between your stated profile and the TrueCoach Assessment'} , {
      name: 'Incompatibility between your stated profile and the TrueCoach Assessment',
    });

    const reasonThree = await this.reasoningService.findOneAndUpdate({name: 'Incomplete or inaccurate application materials or coaching portfolio'} , {
      name: 'Incomplete or inaccurate application materials or coaching portfolio',
    });

    const reasonFour = await this.reasoningService.findOneAndUpdate({name: 'Lack of professional qualifications or certifications'} , {
      name: 'Lack of professional qualifications or certifications',
    });

    const reasonFive = await this.reasoningService.findOneAndUpdate({name: 'Poor fit with the platform’s values or mission'} , {
      name: 'Poor fit with the platform’s values or mission',
    });

    const reasonSix = await this.reasoningService.findOneAndUpdate({name: 'Insufficient evidence of success in helping clients achieve their goals'} , {
      name: 'Insufficient evidence of success in helping clients achieve their goals',
    });

    const reasonSeven = await this.reasoningService.findOneAndUpdate({name: 'Inability to provide adequate references or examples of successful coaching engagements'} , {
      name: 'Inability to provide adequate references or examples of successful coaching engagements',
    });

    const reasonEight = await this.reasoningService.findOneAndUpdate({name: 'Incompatibility with the coaching platform’s terms of service or contractual obligations'} , {
      name: 'Incompatibility with the coaching platform’s terms of service or contractual obligations',
    });

    const reasonNine = await this.reasoningService.findOneAndUpdate({name: 'Inadequate insurance coverage or protection for clients'} , {
      name: 'Inadequate insurance coverage or protection for clients',
    });

    const reasonTen = await this.reasoningService.findOneAndUpdate({name: 'Limited availability to participate in promotional or marketing activities'} , {
      name: 'Limited availability to participate in promotional or marketing activities',
    });

    const reasonEleven = await this.reasoningService.findOneAndUpdate({name: 'Inability to provide evidence of ongoing professional development or training'} , {
      name: 'Inability to provide evidence of ongoing professional development or training',
    });

    const reasonTwelve  = await this.reasoningService.findOneAndUpdate({name: 'Unwillingness to undergo background checks or other vetting processes'} , {
      name: 'Unwillingness to undergo background checks or other vetting processes',
    });

    const reasonThirteen  = await this.reasoningService.findOneAndUpdate({name: 'Limited availability or unwillingness to offer free or discounted coaching sessions to potential clients'} , {
      name: 'Limited availability or unwillingness to offer free or discounted coaching sessions to potential clients',
    });

    const reasonFourteen  = await this.reasoningService.findOneAndUpdate({name: 'Limited availability or unwillingness to adhere to the platform’s pricing and payment policies'} , {
      name: 'Limited availability or unwillingness to adhere to the platform’s pricing and payment policies',
    });

    console.log('Reasoning Seeding Success');
  }
}
