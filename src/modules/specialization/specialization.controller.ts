import {Controller, Get, UseGuards} from '@nestjs/common';
import {ApiBearerAuth, ApiOkResponse, ApiUnauthorizedResponse} from '@nestjs/swagger';
import {JwtAuthGuard} from '@auth/guards/jwt-auth.guard';
import {specializationData} from '@helpers/specialization.helper';

@Controller('specialization')
export class SpecializationController {
    constructor() {
    }

    @ApiOkResponse({
        schema: {
            type: 'object',
            example:
                {
                    status: 200,
                    data: [
                        {
                            "Physical": [
                                {
                                    "label": "Exercise / Fitness",
                                    "value": "exercise"
                                },
                                {
                                    "label": "Weight Management",
                                    "value": "weight"
                                },
                                {
                                    "label": "Sleep",
                                    "value": "sleep"
                                },
                                {
                                    "label": "Other Style",
                                    "value": "other style"
                                },
                                {
                                    "label": "Women Health",
                                    "value": "women health"
                                },
                                {
                                    "label": "Alternative Medicine",
                                    "value": "alternative medicine"
                                },
                                {
                                    "label": "Strength",
                                    "value": "strength"
                                },
                                {
                                    "label": "Energy and Performance",
                                    "value": "energy and performance"
                                },
                                {
                                    "label": "Running",
                                    "value": "running"
                                },
                                {
                                    "label": "Other Physical Wellness",
                                    "value": "other physical wellness"
                                }
                            ]
                        },
                        {
                            "Mental": [
                                {
                                    "label": "Stress",
                                    "value": "stress"
                                },
                                {
                                    "label": "Anxiety",
                                    "value": "anxiety"
                                },
                                {
                                    "label": "Mood Balance",
                                    "value": "mood balance"
                                },
                                {
                                    "label": "Depression",
                                    "value": "depression"
                                },
                                {
                                    "label": "Meditation",
                                    "value": "meditation"
                                },
                                {
                                    "label": "Breathwork",
                                    "value": "breathwork"
                                },
                                {
                                    "label": "Therapy",
                                    "value": "therapy"
                                },
                                {
                                    "label": "Nutrition for Mental Health",
                                    "value": "nutrition for mental health"
                                },
                                {
                                    "label": "Grief Coaching",
                                    "value": "grief coaching"
                                },
                                {
                                    "label": "Happiness",
                                    "value": "happiness"
                                },
                                {
                                    "label": "ADHD",
                                    "value": "ADHD"
                                },
                                {
                                    "label": "Other Mental Wellness",
                                    "value": "other mental wellness"
                                }
                            ]
                        },
                        {
                            "Social": [
                                {
                                    "label": "Intimate Relationships",
                                    "value": "intimate relationships"
                                },
                                {
                                    "label": "Platonic Relationships",
                                    "value": "platonic relationships"
                                },
                                {
                                    "label": "Making Connections",
                                    "value": "making connections"
                                },
                                {
                                    "label": "Self-Confidence",
                                    "value": "self-confidence"
                                },
                                {
                                    "label": "Conflict Resolution",
                                    "value": "conflict resolution"
                                },
                                {
                                    "label": "Parenting",
                                    "value": "parenting"
                                },
                                {
                                    "label": "Body Language",
                                    "value": "body language"
                                },
                                {
                                    "label": "Building Influence",
                                    "value": "building influence"
                                },
                                {
                                    "label": "Lifestyle Coaching ",
                                    "value": "lifestyle coaching "
                                },
                                {
                                    "label": "Family Coaching",
                                    "value": "family coaching"
                                },
                                {
                                    "label": "Birth Coaching",
                                    "value": "birth coaching"
                                },
                                {
                                    "label": "Life Transition Coaching",
                                    "value": "life transition coaching"
                                },
                                {
                                    "label": "Social Skills",
                                    "value": "social skills"
                                },
                                {
                                    "label": "Effective Communication",
                                    "value": "effective communication"
                                },
                                {
                                    "label": "Social Skills",
                                    "value": "social skills"
                                },
                                {
                                    "label": "Other Social Wellness",
                                    "value": "other social wellness"
                                }
                            ]
                        },
                        {
                            "Professional": [
                                {
                                    "label": "Leadership",
                                    "value": "leadership"
                                },
                                {
                                    "label": "Management",
                                    "value": "management"
                                },
                                {
                                    "label": "Work/Life Balance",
                                    "value": "work/life balance"
                                },
                                {
                                    "label": "Work Satisfaction",
                                    "value": "work satisfaction"
                                },
                                {
                                    "label": "Interview Skills",
                                    "value": "interview skills"
                                },
                                {
                                    "label": "Networking Skills",
                                    "value": "networking skills"
                                },
                                {
                                    "label": "Time Management",
                                    "value": "time management"
                                },
                                {
                                    "label": "Organizational Skills",
                                    "value": "organizational skills"
                                },
                                {
                                    "label": "Professional Confidence",
                                    "value": "professional confidence"
                                },
                                {
                                    "label": "Career Counseling",
                                    "value": "career counseling"
                                },
                                {
                                    "label": "Public Speaking",
                                    "value": "public speaking"
                                },
                                {
                                    "label": "Productivity",
                                    "value": "productivity"
                                },
                                {
                                    "label": "Freelance Skills",
                                    "value": "freelance skills"
                                },
                                {
                                    "label": "Personal Branding",
                                    "value": "personal branding"
                                },
                                {
                                    "label": "Marketing ",
                                    "value": "marketing "
                                },
                                {
                                    "label": "Sales",
                                    "value": "sales"
                                },
                                {
                                    "label": "Team Management",
                                    "value": "team management"
                                },
                                {
                                    "label": "Agile Coaching",
                                    "value": "agile coaching"
                                },
                                {
                                    "label": "Organizational Structuring",
                                    "value": "organizational structuring"
                                },
                                {
                                    "label": "Organization Development",
                                    "value": "organization development"
                                },
                                {
                                    "label": "Workplace Sustainability ",
                                    "value": "workplace sustainability "
                                },
                                {
                                    "label": "Workplace Culture",
                                    "value": "workplace culture"
                                },
                                {
                                    "label": "Executive Coaching",
                                    "value": "executive coaching"
                                },
                                {
                                    "label": "Career Development",
                                    "value": "career development"
                                },
                                {
                                    "label": "Other Workplace Wellness",
                                    "value": "other workplace wellness"
                                }
                            ]
                        },
                        {
                            "Financial": [
                                {
                                    "label": "Money Management",
                                    "value": "money management"
                                },
                                {
                                    "label": "Investing",
                                    "value": "investing"
                                },
                                {
                                    "label": "Budgeting",
                                    "value": "budgeting"
                                },
                                {
                                    "label": "Getting Out of Debt",
                                    "value": "getting out of debt"
                                },
                                {
                                    "label": "Preparing for Retirement",
                                    "value": "preparing for retirement"
                                },
                                {
                                    "label": "Psychology of Money",
                                    "value": "psychology of money"
                                },
                                {
                                    "label": "Mindfulness & Money",
                                    "value": "mindfulness & money"
                                },
                                {
                                    "label": "Goal Setting",
                                    "value": "goal setting"
                                },
                                {
                                    "label": "Building Credit",
                                    "value": "building credit"
                                },
                                {
                                    "label": "Wealth Creation",
                                    "value": "wealth creation"
                                },
                                {
                                    "label": "Negotiation",
                                    "value": "negotiation"
                                },
                                {
                                    "label": "Other Financial Wellness",
                                    "value": "other financial wellness"
                                }
                            ]
                        },
                        {
                            "Intellectual": [
                                {
                                    "label": "Creativity",
                                    "value": "creativity"
                                },
                                {
                                    "label": "Brain Health",
                                    "value": "brain health"
                                },
                                {
                                    "label": "Learning & Growing",
                                    "value": "learning & growing"
                                },
                                {
                                    "label": "Other Intellectual Wellness",
                                    "value": "other intellectual wellness"
                                },
                                {
                                    "label": "Memory",
                                    "value": "memory"
                                },
                                {
                                    "label": "Spritual",
                                    "value": "spritual"
                                },
                                {
                                    "label": "Healing",
                                    "value": "healing"
                                },
                                {
                                    "label": "Empathy",
                                    "value": "empathy"
                                },
                                {
                                    "label": "Analytical Skills",
                                    "value": "analytical skills"
                                },
                                {
                                    "label": "Goal-Setting",
                                    "value": "goal-setting"
                                },
                                {
                                    "label": "Emotional Freedom Technique (EFT)",
                                    "value": "emotional freedom technique (EFT)"
                                },
                                {
                                    "label": "Self Discovery",
                                    "value": "self discovery"
                                },
                                {
                                    "label": "Life Purpose",
                                    "value": "life purpose"
                                },
                                {
                                    "label": "Focus",
                                    "value": "focus"
                                },
                                {
                                    "label": "Habits",
                                    "value": "habits"
                                },
                                {
                                    "label": "Accountability",
                                    "value": "accountability"
                                },
                                {
                                    "label": "Mindset and Perspective",
                                    "value": "mindset and perspective"
                                }
                            ]
                        }
                    ]
                },
        },
        description: '200, Return all specialization',
    })
    @ApiUnauthorizedResponse({
        schema: {
            type: 'object',
            example: {
                status: 401, message: 'string',
            },
        },
        description: 'Token has been expired',
    })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get('specializations')
    async specializations() {
        let res = {
            status: 200,
            data: specializationData()
        }
        return res
    }
}
