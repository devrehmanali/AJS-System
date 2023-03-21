import {Command} from 'nestjs-command';
import {Injectable} from '@nestjs/common';
import {WellnessDimensionsService} from '@/modules/wellness-dimensions/wellness-dimensions.service';

@Injectable()
export class WellnessDimensionsSeed {
    constructor(private readonly wellnessDimensionsService: WellnessDimensionsService) {
    }

    @Command({
        command: 'create:wellness-dimension',
        describe: 'create wellness-dimension',
    })
    async create(): Promise<string | void> {
        //Physical Dimension
        await this.wellnessDimensionsService.findOneAndUpdate({
            dimension_name: 'Physical Dimension',
            focus_area: 'Nutrition and Behavioral Change'
        }, {
            dimension_name: 'Physical Dimension',
            focus_area: 'Nutrition and Behavioral Change',
            description: 'Learn how to make healthier food choices and develop new habits that help you avoid junk food and sweets. We will work on strategies to overcome cravings and create sustainable lifestyle changes that support your overall health and wellness.',
            leading_questions: ['How can I make healthier choices when eating out?', 'How can I manage my cravings for unhealthy foods?', 'What are some effective meal planning strategies?', 'How can I overcome emotional eating?', 'What are some ways to make healthier substitutions in recipes?'],
        });

        await this.wellnessDimensionsService.findOneAndUpdate({
            dimension_name: 'Physical Dimension',
            focus_area: 'Weight Loss and Nutrition'
        }, {
            dimension_name: 'Physical Dimension',
            focus_area: 'Weight Loss and Nutrition',
            description: 'Discover the latest science-backed strategies for losing weight quickly and safely while still enjoying your favorite foods. We will focus on developing a sustainable nutrition plan that works for you and your lifestyle, and incorporate exercise and other healthy habits to support your weight loss goals.',
            leading_questions: ['How can I set realistic weight loss goals?', 'What are some effective weight loss strategies?', 'What are some healthy and sustainable ways to lose weight?', 'How can I stay motivated during the weight loss journey?', 'How can I avoid weight loss plateaus?'],
        });

        await this.wellnessDimensionsService.findOneAndUpdate({
            dimension_name: 'Physical Dimension',
            focus_area: 'Pain Management and Holistic Health'
        }, {
            dimension_name: 'Physical Dimension',
            focus_area: 'Pain Management and Holistic Health',
            description: 'Learn effective strategies for managing pain, both with and without medication. We will explore holistic approaches to pain relief, including mind-body techniques, physical therapy, and other alternative therapies. We will work together to find the best treatment options for your unique needs and goals.',
            leading_questions: ['How can I manage chronic pain naturally?', 'What are some effective ways to reduce inflammation in my body?', 'What are some holistic remedies for common ailments?', 'What are some natural ways to boost my immune system?', 'How can I reduce stress to improve my overall health?'],
        });

        await this.wellnessDimensionsService.findOneAndUpdate({
            dimension_name: 'Physical Dimension',
            focus_area: 'Behavioral Change and Addiction'
        }, {
            dimension_name: 'Physical Dimension',
            focus_area: 'Behavioral Change and Addiction',
            description: 'Quitting smoking or any other addictive behavior can be challenging, but its not impossible. We will work on developing a personalized plan to help you quit for good, incorporating behavioral change strategies, coping skills, and other tools to help you take back control of your life.',
            leading_questions: ['How can I break unhealthy habits?', 'What are some effective strategies to overcome addiction?', 'How can I change my mindset to support positive behavioral change?', 'What are some healthy ways to cope with stress instead of turning to addictive behaviors?', 'What are some resources for support during the journey to recovery?'],
        });

        await this.wellnessDimensionsService.findOneAndUpdate({
            dimension_name: 'Physical Dimension',
            focus_area: 'Sleep Hygiene and Stress Management'
        }, {
            dimension_name: 'Physical Dimension',
            focus_area: 'Sleep Hygiene and Stress Management',
            description: 'Improve the quality and quantity of your sleep by focusing on good sleep hygiene habits and stress management techniques. We will work on creating a relaxing bedtime routine, establishing a regular sleep schedule, and developing strategies for managing stress that can interfere with sleep.',
            leading_questions: ['How can I improve the quality of my sleep?', 'What are some effective ways to relax before bed?', 'How can I manage my stress to improve my sleep?', 'What are some healthy sleep habits?', 'What are some natural remedies to help me sleep better?'],
        });

        await this.wellnessDimensionsService.findOneAndUpdate({
            dimension_name: 'Physical Dimension',
            focus_area: 'Personal Growth and Development'
        }, {
            dimension_name: 'Physical Dimension',
            focus_area: 'Personal Growth and Development',
            description: 'Achieve your full potential by focusing on personal growth and development. We will work on identifying your strengths and weaknesses, setting goals, and creating an action plan to help you reach your full potential. We will also work on developing the mindset and skills needed to overcome obstacles and achieve success.',
            leading_questions: ['What are some effective ways to improve my self-awareness?', 'How can I identify my strengths and weaknesses?', 'What are some strategies to overcome my limitations?', 'What are some ways to build a growth mindset?', 'How can I continue to learn and develop as a person?'],
        });

        await this.wellnessDimensionsService.findOneAndUpdate({
            dimension_name: 'Physical Dimension',
            focus_area: 'Fitness and Stress Management'
        }, {
            dimension_name: 'Physical Dimension',
            focus_area: 'Fitness and Stress Management',
            description: 'Boost your physical and mental resilience by incorporating fitness and stress management techniques into your daily routine. We will work on developing an exercise plan that supports your fitness goals, while also incorporating mindfulness and other stress reduction strategies to help you build stamina and resilience.',
            leading_questions: ['How can I use exercise to manage my stress?', 'What are some effective fitness strategies for beginners?', 'How can I make exercise a habit?', 'What are some fun ways to stay active?', 'What are some ways to hold myself accountable to my fitness goals?'],
        });

        await this.wellnessDimensionsService.findOneAndUpdate({
            dimension_name: 'Physical Dimension',
            focus_area: 'Nutrition and Fitness'
        }, {
            dimension_name: 'Physical Dimension',
            focus_area: 'Nutrition and Fitness',
            description: 'Understand the critical role that nutrition plays in supporting your fitness goals. We will work on developing a personalized nutrition plan that supports your exercise regimen and helps you achieve optimal health and wellness. We will also explore the latest research and trends in nutrition and fitness to help you stay up-to-date and informed.',
            leading_questions: ['How can I fuel my body for optimal performance during workouts?', 'What are some healthy pre- and post-workout snacks?', 'What are some effective strategies for building muscle?', 'What are some ways to maintain a healthy weight while building muscle?', 'What are some ways to vary my workout routine to avoid plateaus?'],
        });

        await this.wellnessDimensionsService.findOneAndUpdate({
            dimension_name: 'Physical Dimension',
            focus_area: 'Energy Management and Nutrition'
        }, {
            dimension_name: 'Physical Dimension',
            focus_area: 'Energy Management and Nutrition',
            description: 'Learn how to manage your energy levels and combat fatigue by focusing on nutrition and other lifestyle factors that can impact your energy levels. We will work on developing strategies to optimize your sleep, diet, exercise, and stress management habits to help you feel more energized and focused throughout the day.',
            leading_questions: ['How can I increase my energy levels naturally?', 'What are some foods that can boost my energy?', 'What are some healthy snacks for sustained energy?', 'What are some effective strategies to combat fatigue?', 'What are some ways to prioritize rest and recovery for improved energy?'],
        });

        await this.wellnessDimensionsService.findOneAndUpdate({
            dimension_name: 'Physical Dimension',
            focus_area: 'Body Positivity and Self-Love'
        }, {
            dimension_name: 'Physical Dimension',
            focus_area: 'Body Positivity and Self-Love',
            description: 'Build a more positive relationship with your body by focusing on body positivity and self-love. We will work on developing a more positive body image, exploring strategies to increase self-acceptance and self-esteem, and cultivating a mindset of self-compassion and self-care.',
            leading_questions: ['How can I improve my body image?', 'What are some ways to cultivate self-love?', 'How can I silence my inner critic?', 'What are some ways to embrace my imperfections?', 'What are some resources for support during the journey to body positivity?'],
        });

        await this.wellnessDimensionsService.findOneAndUpdate({
            dimension_name: 'Physical Dimension',
            focus_area: 'Fitness and Nutrition'
        }, {
            dimension_name: 'Physical Dimension',
            focus_area: 'Fitness and Nutrition',
            description: 'Get expert advice and guidance on how to achieve your fitness goals and become more active. We will work on developing a personalized fitness and nutrition plan that supports your unique needs and goals, incorporating the latest research and techniques to help you get in shape faster and stay motivated along the way.',
            leading_questions: ['How can I combine fitness and nutrition for optimal health?', 'What are some ways to fuel my workouts effectively?', 'What are some healthy post-workout meals?', 'How can I make nutrition a part of my overall fitness plan?', 'What are some ways to balance my macronutrients for optimal fitness results?'],
        });

        await this.wellnessDimensionsService.findOneAndUpdate({
            dimension_name: 'Physical Dimension',
            focus_area: 'Flexibility and Fitness'
        }, {
            dimension_name: 'Physical Dimension',
            focus_area: 'Flexibility and Fitness',
            description: 'Improve your flexibility and mobility with a customized workout plan designed to help you increase range of motion and prevent injury. We will focus on developing a stretching and flexibility routine that works for your body, incorporating exercises and techniques to help you achieve optimal flexibility and range of motion.',
            leading_questions: ['What are some specific stretches or exercises that can help improve my flexibility?', 'How can I incorporate flexibility training into my existing fitness routine?', 'What are some common mistakes people make when trying to improve their flexibility?', 'What role does proper breathing technique play in improving flexibility?', 'How can I track my progress in terms of flexibility gains and set realistic goals for myself?'],
        });

        //Intellectual Dimension
        await this.wellnessDimensionsService.findOneAndUpdate({
            dimension_name: 'Intellectual Dimension',
            focus_area: 'Organization, Productivity'
        }, {
            dimension_name: 'Intellectual Dimension',
            focus_area: 'Organization, Productivity',
            description: 'Wellavi recommends developing organizational skills for both home and work. Discover how to create systems and routines that maximize productivity and make daily tasks more manageable, while also making the process fun and enjoyable.',
            leading_questions: ['How can I create an efficient daily routine to accomplish my goals?', 'What strategies can I use to better manage my time and stay focused?', 'How can I prioritize tasks to increase productivity?', 'What tools can I use to streamline my workflow and stay organized?', 'How can I avoid procrastination and stay motivated?'],
        });

        await this.wellnessDimensionsService.findOneAndUpdate({
            dimension_name: 'Intellectual Dimension',
            focus_area: 'Social Media, Marketing'
        }, {
            dimension_name: 'Intellectual Dimension',
            focus_area: 'Social Media, Marketing',
            description: 'Stay ahead of the curve with Wellavi recommended focus on upcoming social media trends. Discover new and innovative ways to market your brand or business, while also learning how to leverage social media platforms to their fullest potential.',
            leading_questions: ['How can I develop a strong social media presence for my business or personal brand?', 'What are the best marketing strategies for my target audience?', 'How can I effectively use social media platforms to promote my products or services?', 'What are some effective ways to increase engagement with my audience?', 'What are the best practices for creating compelling content that resonates with my followers?'],
        });

        await this.wellnessDimensionsService.findOneAndUpdate({
            dimension_name: 'Intellectual Dimension',
            focus_area: 'Conflict Resolution, Communication'
        }, {
            dimension_name: 'Intellectual Dimension',
            focus_area: 'Conflict Resolution, Communication',
            description: 'Wellavi recommends focusing on conflict resolution techniques that emphasize peaceful resolution. Learn best practices for communicating effectively in tense situations, and develop techniques for de-escalating conflict and reaching mutually beneficial solutions.',
            leading_questions: ['What techniques can I use to effectively communicate my needs and ideas?', 'How can I develop active listening skills to better understand others?', 'What are some effective conflict resolution strategies?', 'How can I improve my nonverbal communication skills?', 'What techniques can I use to handle difficult conversations with grace and confidence?'],
        });

        await this.wellnessDimensionsService.findOneAndUpdate({
            dimension_name: 'Intellectual Dimension',
            focus_area: 'Entrepreneurship, Funding'
        }, {
            dimension_name: 'Intellectual Dimension',
            focus_area: 'Entrepreneurship, Funding',
            description: 'Wellavi recommends developing a plan for entrepreneurship when starting with little or no funding. Learn practical strategies for launching a business, finding funding sources, and creating a sustainable and profitable venture, even on a limited budget.',
            leading_questions: ['How can I develop a successful business plan?', 'What are the best ways to secure funding for my business?', 'How can I develop a strong business network to help me succeed?', 'What are some effective ways to differentiate my business from competitors?', 'What are some key metrics I should track to measure the success of my business?'],
        });

        await this.wellnessDimensionsService.findOneAndUpdate({
            dimension_name: 'Intellectual Dimension',
            focus_area: 'Self-Confidence, Self-Esteem'
        }, {
            dimension_name: 'Intellectual Dimension',
            focus_area: 'Self-Confidence, Self-Esteem',
            description: 'Wellavi recommends focusing on increasing self-confidence and self-esteem. Learn techniques for improving self-image and developing self-acceptance, while also building skills for positive self-talk and assertiveness.',
            leading_questions: ['How can I develop a positive self-image?', 'What techniques can I use to build self-confidence?', 'How can I overcome negative self-talk?', 'What are some effective ways to practice self-care?', 'What are some strategies to maintain a positive outlook and boost self-esteem?'],
        });

        await this.wellnessDimensionsService.findOneAndUpdate({
            dimension_name: 'Intellectual Dimension',
            focus_area: 'Self-Discovery, Personal Growth'
        }, {
            dimension_name: 'Intellectual Dimension',
            focus_area: 'Self-Discovery, Personal Growth',
            description: 'Wellavi recommends focusing on self-discovery and personal growth to create value for yourself and others. Explore your strengths and values, and develop techniques for building healthy relationships and cultivating a sense of purpose and meaning in your life.',
            leading_questions: ['How can I better understand my strengths and weaknesses?', 'What are some effective ways to explore my passions and interests?', 'How can I set achievable goals to facilitate personal growth?', 'What techniques can I use to overcome limiting beliefs and self-doubt?', 'What are some effective ways to track progress and celebrate personal growth milestones?'],
        });

        await this.wellnessDimensionsService.findOneAndUpdate({
            dimension_name: 'Intellectual Dimension',
            focus_area: 'Productivity, Time Management'
        }, {
            dimension_name: 'Intellectual Dimension',
            focus_area: 'Productivity, Time Management',
            description: 'Wellavi recommends developing techniques to manage a heavy workload effectively. Discover how to prioritize tasks, set realistic deadlines, and avoid procrastination while also maintaining a healthy work-life balance.',
            leading_questions: ['How can I prioritize my daily tasks effectively?', 'What are some time management techniques that can help me increase productivity?', 'How can I avoid procrastination and stay motivated?', 'How can I create a schedule that works for me?', 'What are some ways to optimize my work environment for maximum productivity?'],
        });

        await this.wellnessDimensionsService.findOneAndUpdate({
            dimension_name: 'Intellectual Dimension',
            focus_area: 'Communication, Writing'
        }, {
            dimension_name: 'Intellectual Dimension',
            focus_area: 'Communication, Writing',
            description: 'Wellavi recommends focusing on improving verbal and written communication skills. Learn techniques for effective communication, including active listening, clear and concise writing, and persuasive public speaking, to achieve greater success in both personal and professional relationships.',
            leading_questions: ['How can I improve my written communication skills?', 'What are some ways to make sure my writing is clear and concise?', 'How can I become a better listener?', 'What are some tips for effective verbal communication?', 'How can I tailor my communication style to different audiences?'],
        });

        await this.wellnessDimensionsService.findOneAndUpdate({
            dimension_name: 'Intellectual Dimension',
            focus_area: 'Memory, Concentration'
        }, {
            dimension_name: 'Intellectual Dimension',
            focus_area: 'Memory, Concentration',
            description: 'Wellavi recommends developing relaxed methods to improve memory and concentration. Discover techniques such as meditation and mindfulness, which help enhance focus, memory retention, and overall cognitive function, while also promoting a sense of calm and relaxation.',
            leading_questions: ['What are some exercises I can do to improve my memory?', 'How can I improve my concentration and focus?', 'What are some techniques to retain information better?', 'How can I avoid distractions and interruptions when trying to focus?', 'What are some memory aids that can help me remember important information?'],
        });

        await this.wellnessDimensionsService.findOneAndUpdate({
            dimension_name: 'Intellectual Dimension',
            focus_area: 'Stress Management, Public Speaking'
        }, {
            dimension_name: 'Intellectual Dimension',
            focus_area: 'Stress Management, Public Speaking',
            description: 'Wellavi recommends focusing on managing stress and overcoming fears, such as public speaking. Learn practical strategies for reducing anxiety and building confidence, including visualization techniques, cognitive-behavioral therapy, and exposure therapy, to achieve success in challenging situations.',
            leading_questions: ['What are some techniques to manage stress effectively?', 'How can I create a work-life balance that reduces stress?', 'What are some strategies to overcome fear of public speaking?', 'How can I prepare and deliver a successful presentation?', 'What are some tips for effective public speaking and engaging with the audience?'],
        });

        await this.wellnessDimensionsService.findOneAndUpdate({
            dimension_name: 'Intellectual Dimension',
            focus_area: 'Creativity, Innovation'
        }, {
            dimension_name: 'Intellectual Dimension',
            focus_area: 'Creativity, Innovation',
            description: 'Wellavi recommends exploring new ways to increase creativity efficiently. Discover techniques such as brainstorming, mind mapping, and role-playing, which help generate new ideas, stimulate innovation, and boost productivity in personal and professional pursuits.',
            leading_questions: ['How can I cultivate a more creative mindset?', 'What are some techniques to generate new ideas?', 'How can I overcome creative blocks?', 'What are some ways to encourage innovation in the workplace?', 'How can I turn my creative ideas into tangible results?'],
        });

        await this.wellnessDimensionsService.findOneAndUpdate({
            dimension_name: 'Intellectual Dimension',
            focus_area: 'Public Speaking, Presentation Skills'
        }, {
            dimension_name: 'Intellectual Dimension',
            focus_area: 'Public Speaking, Presentation Skills',
            description: 'Wellavi recommends developing techniques for making killer presentations that win and engage your audience. Learn practical strategies for structuring presentations, creating compelling visuals, and delivering speeches with confidence, to achieve success in public speaking and presentation skills.',
            leading_questions: ['How can I prepare for a presentation effectively?', 'What are some tips for engaging with the audience during a presentation?', 'How can I overcome stage fright and speak confidently?', 'What are some ways to structure a presentation for maximum impact?', 'How can I handle difficult questions from the audience during a presentation?'],
        });

        //Professional Dimension
        await this.wellnessDimensionsService.findOneAndUpdate({
            dimension_name: 'Professional Dimension',
            focus_area: 'Boost Motivation and Recognition at Work'
        }, {
            dimension_name: 'Professional Dimension',
            focus_area: 'Boost Motivation and Recognition at Work',
            description: 'Develop effective strategies to increase recognition and motivation in your workplace, and learn techniques to help you feel more valued and empowered.',
            leading_questions: ['How can I stay motivated at work even when faced with challenges?', 'How can I increase my visibility and get recognized for my work?', 'What are some strategies to stay motivated when the work seems mundane or repetitive?', 'How can I effectively communicate my achievements to my superiors?', 'How can I get feedback from my colleagues and superiors to improve my performance?'],
        });

        await this.wellnessDimensionsService.findOneAndUpdate({
            dimension_name: 'Professional Dimension',
            focus_area: 'Make a Great First Impression'
        }, {
            dimension_name: 'Professional Dimension',
            focus_area: 'Make a Great First Impression',
            description: 'Learn tips and tricks from a happiness coach to make a lasting and positive impression during job interviews, whether in person or online.',
            leading_questions: ['What are some effective ways to make a good first impression in a professional setting?', 'How can I tailor my approach to different personalities and situations?', 'What are some common mistakes to avoid when trying to make a good impression?', 'How can I project confidence and professionalism?', 'What are some ways to quickly build rapport with new colleagues or clients?'],
        });

        await this.wellnessDimensionsService.findOneAndUpdate({
            dimension_name: 'Professional Dimension',
            focus_area: 'Achieve a Better Work-Life Balance'
        }, {
            dimension_name: 'Professional Dimension',
            focus_area: 'Achieve a Better Work-Life Balance',
            description: 'Develop a personalized plan to help you manage your work and personal life more effectively, so you can reduce stress and find more time for the things you enjoy.',
            leading_questions: ['How can I prioritize my time effectively to achieve a better work-life balance?', 'What are some strategies for setting healthy boundaries at work?', 'How can I better manage my workload to reduce stress and achieve balance?', 'What are some healthy habits and routines that can improve my overall well-being?', 'How can I effectively communicate my needs and limitations to my colleagues and superiors?'],
        });

        await this.wellnessDimensionsService.findOneAndUpdate({
            dimension_name: 'Professional Dimension',
            focus_area: 'Combat Overwork and Practice Saying No'
        }, {
            dimension_name: 'Professional Dimension',
            focus_area: 'Combat Overwork and Practice Saying No',
            description: 'Develop the confidence and skills to say "no" when necessary and set boundaries to avoid overworking and burnout.',
            leading_questions: ['How can I say "no" to additional work without jeopardizing my job or reputation?', 'What are some strategies for delegating tasks and sharing workload with colleagues?', 'How can I better manage my time to prevent overwork and burnout?', 'How can I prioritize tasks effectively to focus on high-priority work?', 'What are some signs of overwork and how can I identify and address them?'],
        });

        await this.wellnessDimensionsService.findOneAndUpdate({
            dimension_name: 'Professional Dimension',
            focus_area: 'Navigate a Toxic Work Environment'
        }, {
            dimension_name: 'Professional Dimension',
            focus_area: 'Navigate a Toxic Work Environment',
            description: 'Learn how to identify and cope with toxic work environments, and develop strategies to protect your mental and emotional wellbeing.',
            leading_questions: ['What are some strategies for dealing with difficult colleagues or a toxic work environment?', 'How can I maintain a positive attitude and mindset in a negative environment?', 'What are some ways to effectively communicate with difficult colleagues or superiors?', 'How can I set healthy boundaries and protect my emotional well-being in a toxic environment?', 'When is it appropriate to seek support or intervention from a higher authority?'],
        });

        await this.wellnessDimensionsService.findOneAndUpdate({
            dimension_name: 'Professional Dimension',
            focus_area: 'Improve Workplace Energy'
        }, {
            dimension_name: 'Professional Dimension',
            focus_area: 'Improve Workplace Energy',
            description: 'Discover how to create a more positive and harmonious energy in your workplace, which can boost productivity and happiness.',
            leading_questions: ['What are some ways to create a positive and energized workplace environment?', 'How can I promote positivity and collaboration among my colleagues?', 'What are some strategies for reducing workplace stress and tension?', 'How can I contribute to a culture of appreciation and recognition in the workplace?', 'How can I incorporate wellness practices into the workplace, such as mindfulness or exercise breaks?'],
        });

        await this.wellnessDimensionsService.findOneAndUpdate({
            dimension_name: 'Professional Dimension',
            focus_area: 'Build a Sustainable and Fulfilling Career'
        }, {
            dimension_name: 'Professional Dimension',
            focus_area: 'Build a Sustainable and Fulfilling Career',
            description: 'Explore ways to align your career with your personal values and create positive change in so',
            leading_questions: ['How can I identify my passions and strengths to find a career that aligns with my values?', 'What steps can I take to make a career change?', 'How can I develop new skills to enhance my career prospects?', 'What are some ways to stay motivated and engaged in my current job?', 'How can I network effectively to find new career opportunities?'],
        });

        await this.wellnessDimensionsService.findOneAndUpdate({
            dimension_name: 'Professional Dimension',
            focus_area: 'Promotion and Salary Raise in an Appraisal'
        }, {
            dimension_name: 'Professional Dimension',
            focus_area: 'Promotion and Salary Raise in an Appraisal',
            description: 'Learn how to ask for a promotion or salary raise in your next appraisal and maximize your chances of success',
            leading_questions: ['What are the key skills and achievements I should highlight during an appraisal?', 'How can I negotiate a salary raise effectively?', 'What are some strategies to demonstrate my value to the company?', 'How can I show leadership potential to my manager?', 'What can I do to prepare for a promotion?'],
        });

        await this.wellnessDimensionsService.findOneAndUpdate({
            dimension_name: 'Professional Dimension',
            focus_area: 'Achieving a Better Work-Life Balance'
        }, {
            dimension_name: 'Professional Dimension',
            focus_area: 'Achieving a Better Work-Life Balance',
            description: 'Discover practical strategies and tools for balancing your work and personal life to increase your overall well-being and satisfaction',
            leading_questions: ['What are the key factors contributing to my work-life imbalance?', 'How can I set boundaries to achieve a better balance?', 'What are some time-management techniques that can help me?', 'What can I do to manage work-related stress?', 'How can I prioritize self-care to enhance my well-being?'],
        });

        await this.wellnessDimensionsService.findOneAndUpdate({
            dimension_name: 'Professional Dimension',
            focus_area: 'Dealing with Job Stress'
        }, {
            dimension_name: 'Professional Dimension',
            focus_area: 'Dealing with Job Stress',
            description: 'Identify the causes of your job stress and learn effective techniques to manage and reduce stress levels',
            leading_questions: ['What are the main sources of stress in my job?', 'How can I manage work-related stress effectively?', 'What are some relaxation techniques that can help me?', 'How can I improve my sleep quality?', 'What can I do to prevent burnout?'],
        });

        await this.wellnessDimensionsService.findOneAndUpdate({
            dimension_name: 'Professional Dimension',
            focus_area: 'Running a Successful Business'
        }, {
            dimension_name: 'Professional Dimension',
            focus_area: 'Running a Successful Business',
            description: 'Learn the essential elements to run a successful business and gain a competitive edge in your industry',
            leading_questions: ['What are the key steps to starting a successful business?', 'How can I develop a business plan?', 'What are some effective marketing strategies?', 'How can I manage my finances effectively?', 'What can I do to attract and retain customers?'],
        });

        await this.wellnessDimensionsService.findOneAndUpdate({
            dimension_name: 'Professional Dimension',
            focus_area: 'Achieving Career Goals Quickly'
        }, {
            dimension_name: 'Professional Dimension',
            focus_area: 'Achieving Career Goals Quickly',
            description: 'Discover the best tips, tools, and resources to achieve your career goals as quickly and efficiently as possible',
            leading_questions: ['What are my career goals?', 'How can I break down my goals into actionable steps?', 'What skills do I need to develop to achieve my goals?', 'What can I do to stay motivated and focused?', 'What are some resources that can help me achieve my goals faster?'],
        });

        //Financial Dimension
        await this.wellnessDimensionsService.findOneAndUpdate({
            dimension_name: 'Financial Dimension',
            focus_area: 'Smart Debt Management'
        }, {
            dimension_name: 'Financial Dimension',
            focus_area: 'Smart Debt Management',
            description: 'Learn smart ways to get out of debt faster and avoid financial setbacks.',
            leading_questions: ['How can you create a budget and stick to it?', 'What are the best strategies for paying off debt quickly?', 'How to avoid debt traps and manage debt in emergencies?', 'How can you negotiate better interest rates on loans?', 'What are the pros and cons of debt consolidation?'],
        });


        await this.wellnessDimensionsService.findOneAndUpdate({
            dimension_name: 'Financial Dimension',
            focus_area: 'Personalized Financial Planning'
        }, {
            dimension_name: 'Financial Dimension',
            focus_area: 'Personalized Financial Planning',
            description: 'Get expert advice on how to best live life in your current financial situation.',
            leading_questions: ['How to identify your financial goals and priorities?', 'What are the best ways to create a personalized financial plan?', 'How to track your spending and budget effectively?', 'How to balance spending, saving, and investing for your goals?', 'How to adjust your plan for life changes and unexpected events?'],
        });

        await this.wellnessDimensionsService.findOneAndUpdate({
            dimension_name: 'Financial Dimension',
            focus_area: 'Financial Recovery Strategies'
        }, {
            dimension_name: 'Financial Dimension',
            focus_area: 'Financial Recovery Strategies',
            description: 'Learn the best financial recovery strategies to start fresh after setbacks or financial challenges.',
            leading_questions: ['How to recover from financial setbacks or bankruptcy?', 'What are the best ways to rebuild credit?', 'How to negotiate payment plans and settlements with creditors?', 'How to prioritize bills and expenses during financial hardship?', 'What are the best strategies for managing collection agencies?'],
        });

        await this.wellnessDimensionsService.findOneAndUpdate({
            dimension_name: 'Financial Dimension',
            focus_area: 'Investment Planning and Management'
        }, {
            dimension_name: 'Financial Dimension',
            focus_area: 'Investment Planning and Management',
            description: 'Discover the current best investments with the highest return for every age and income, and learn how to manage them.',
            leading_questions: ['How to set investment goals and risk tolerance?', 'What are the best ways to research and select investments?', 'How to manage your investment portfolio for growth and stability?', 'How to adjust your investment plan as you get older or as the market changes?', 'How to balance short-term and long-term investment strategies?'],
        });

        await this.wellnessDimensionsService.findOneAndUpdate({
            dimension_name: 'Financial Dimension',
            focus_area: 'Emergency Fund Planning'
        }, {
            dimension_name: 'Financial Dimension',
            focus_area: 'Emergency Fund Planning',
            description: 'Best ways to plan ahead for emergencies and irregular expenses to avoid financial stress.',
            leading_questions: ['Why is an emergency fund important and how much should you save?', 'What are the best ways to build an emergency fund?', 'How to determine what constitutes an emergency?', 'What are the best strategies for accessing emergency funds?', 'How to balance saving for emergencies with other financial goals?'],
        });

        await this.wellnessDimensionsService.findOneAndUpdate({
            dimension_name: 'Financial Dimension',
            focus_area: 'Personal and Family Financial Future'
        }, {
            dimension_name: 'Financial Dimension',
            focus_area: 'Personal and Family Financial Future',
            description: 'Learn how to secure your personal and family financial future through effective financial planning and management.',
            leading_questions: ['How to plan for your and your family financial future?', 'What are the best ways to save for your children education?', 'How to protect your family with insurance and estate planning?', 'How to balance saving for retirement and other financial goals?', 'How to pass on wealth and financial values to future generations?'],
        });

        await this.wellnessDimensionsService.findOneAndUpdate({
            dimension_name: 'Financial Dimension',
            focus_area: 'Short-term vs Long-term Financial Planning'
        }, {
            dimension_name: 'Financial Dimension',
            focus_area: 'Short-term vs Long-term Financial Planning',
            description: 'Learn how to balance your short-term needs with long-term goals for financial stability and success',
            leading_questions: ['How to balance short-term and long-term financial goals?', 'What are the best strategies for saving for a down payment?', 'How to manage your finances during a career transition?', 'How to balance spending and saving during different life stages?', 'How to balance retirement savings with other financial goals?'],
        });

        await this.wellnessDimensionsService.findOneAndUpdate({
            dimension_name: 'Financial Dimension',
            focus_area: 'Building Financial Strength'
        }, {
            dimension_name: 'Financial Dimension',
            focus_area: 'Building Financial Strength',
            description: 'Discover strategies for building lasting financial strength and stability, including saving and investing wisely, and avoiding debt',
            leading_questions: ['How to build a strong financial foundation?', 'What are the best ways to increase your income?', 'How to reduce expenses and create a sustainable lifestyle?', 'How to improve your credit score and financial health?', 'What are the best strategies for managing financial stress and anxiety?'],
        });

        await this.wellnessDimensionsService.findOneAndUpdate({
            dimension_name: 'Financial Dimension',
            focus_area: 'Retirement Planning'
        }, {
            dimension_name: 'Financial Dimension',
            focus_area: 'Retirement Planning',
            description: 'Get expert guidance on planning for a worry-free retirement, with tailored tips for your specific age and financial situation',
            leading_questions: ['How to determine your retirement goals and timeline?', 'What are the best ways to save for retirement?', 'How to estimate and plan for retirement expenses?', 'How to maximize social security and other retirement benefits?', 'What are the best strategies for managing retirement income and withdrawals?'],
        });

        await this.wellnessDimensionsService.findOneAndUpdate({
            dimension_name: 'Financial Dimension',
            focus_area: 'Low-Risk Investing'
        }, {
            dimension_name: 'Financial Dimension',
            focus_area: 'Low-Risk Investing',
            description: 'Explore low-risk investment options that offer high returns, so you can make smart financial decisions with confidence',
            leading_questions: ['What are low-risk investment options and strategies?', 'How to balance risk and return in your investment portfolio?', 'How to invest for income and stability?', 'How to manage your investments during market downturns?', 'How to choose the right investment advisor or broker?'],
        });

        await this.wellnessDimensionsService.findOneAndUpdate({
            dimension_name: 'Financial Dimension',
            focus_area: 'Health and Wellness Tax Planning'
        }, {
            dimension_name: 'Financial Dimension',
            focus_area: 'Health and Wellness Tax Planning',
            description: 'Learn how to make health and wellness programs tax deductible.',
            leading_questions: ['What are the tax benefits of health and wellness expenses?', 'How to maximize your tax deductions and credits for healthcare?', 'How to navigate healthcare expenses during retirement?', 'How to plan for long-term care and end-of-life expenses?', 'How to balance healthcare expenses with other financial priorities?'],
        });

        await this.wellnessDimensionsService.findOneAndUpdate({
            dimension_name: 'Financial Dimension',
            focus_area: 'Financial Wellness Insider Tips'
        }, {
            dimension_name: 'Financial Dimension',
            focus_area: 'Financial Wellness Insider Tips',
            description: 'Get inside information and tools to make successful financial decisions for the future.',
            leading_questions: ['What are some lesser-known strategies for improving your credit score?', 'How can you take advantage of tax breaks and deductions to maximize your savings?', 'What are some common financial myths and misconceptions, and how can you avoid falling for them?', 'What are some key habits or practices that financially successful people tend to have in common?', 'How can you stay up-to-date on the latest financial news and trends to make informed decisions?'],
        });

        //Social Dimensions
        await this.wellnessDimensionsService.findOneAndUpdate({
            dimension_name: 'Social Dimension',
            focus_area: 'Building Social Confidence'
        }, {
            dimension_name: 'Social Dimension',
            focus_area: 'Building Social Confidence',
            description: 'Feeling confident in social situations can make a big difference in building new friendships. Through practicing assertiveness, positive self-talk, and body language, you can learn to overcome social anxiety and make genuine connections with others.',
            leading_questions: ['How to overcome social anxiety and fear of rejection?', 'How to start and maintain a conversation?', 'How to develop positive body language and nonverbal communication?', 'How to handle difficult social situations?', 'How to expand your social circle and meet new people?'],
        });

        await this.wellnessDimensionsService.findOneAndUpdate({
            dimension_name: 'Social Dimension',
            focus_area: 'Practicing Gratitude and Appreciation'
        }, {
            dimension_name: 'Social Dimension',
            focus_area: 'Practicing Gratitude and Appreciation',
            description: 'Focusing on what you have to be grateful for can improve your overall well-being and help you cultivate deeper connections with others. By taking the time to appreciate the positive things in your life and expressing gratitude towards others, you can create a more positive and fulfilling social experience.',
            leading_questions: ['How to develop a daily gratitude practice?', 'How to find something positive in difficult situations?', 'How to express gratitude and appreciation to others?', 'How to stay grateful and appreciative even during tough times?', 'How to use gratitude to improve your mental health and well-being?'],
        });

        await this.wellnessDimensionsService.findOneAndUpdate({
            dimension_name: 'Social Dimension',
            focus_area: 'Building and Maintaining Trust and Communication Skills in Relationships and at Work'
        }, {
            dimension_name: 'Social Dimension',
            focus_area: 'Building and Maintaining Trust and Communication Skills in Relationships and at Work',
            description: 'Building trust is a crucial aspect of any relationship, whether it with friends or colleagues. By developing communication skills such as active listening, empathy, and conflict resolution, you can establish trust and build stronger, more fulfilling connections with others.',
            leading_questions: ['How to build trust and rapport with others?', 'How to communicate assertively and effectively?', 'How to handle conflicts and disagreements?', 'How to give and receive feedback?', 'How to establish boundaries and maintain them in relationships and at work?'],
        });

        await this.wellnessDimensionsService.findOneAndUpdate({
            dimension_name: 'Social Dimension',
            focus_area: 'Strengthening Emotional Bonds and Developing a Sense of Belonging'
        }, {
            dimension_name: 'Social Dimension',
            focus_area: 'Strengthening Emotional Bonds and Developing a Sense of Belonging',
            description: 'Feeling a sense of belonging is essential for our overall happiness and well-being. By fostering emotional connections and deepening your relationships through shared experiences, vulnerability, and active listening, you can build a sense of community and belonging.',
            leading_questions: ['How to deepen emotional connections with others?', 'How to build a sense of community and belonging?', 'How to cultivate empathy and compassion?', 'How to enhance emotional intelligence?', 'How to strengthen family relationships and bonds?'],
        });

        await this.wellnessDimensionsService.findOneAndUpdate({
            dimension_name: 'Social Dimension',
            focus_area: 'Nurturing Long-Term Relationships'
        }, {
            dimension_name: 'Social Dimension',
            focus_area: 'Nurturing Long-Term Relationships',
            description: 'Long-term relationships require consistent effort and care. By prioritizing communication, shared values, and quality time, you can develop strong, lasting connections with others and create a supportive and fulfilling social network.',
            leading_questions: ['How to keep the spark alive in long-term relationships?', 'How to maintain emotional and physical intimacy?', 'How to deal with changing priorities and roles in relationships?', 'How to support each other\'s personal growth and development?', 'How to navigate major life transitions together?'],
        });

        await this.wellnessDimensionsService.findOneAndUpdate({
            dimension_name: 'Social Dimension',
            focus_area: 'Developing Public Speaking Skills for Introverts'
        }, {
            dimension_name: 'Social Dimension',
            focus_area: 'Developing Public Speaking Skills for Introverts',
            description: 'Public speaking can be intimidating, especially for introverts. By developing techniques such as deep breathing, visualization, and practicing in safe environments, you can overcome your fears and develop the skills needed to deliver effective and confident presentations.',
            leading_questions: ['How to overcome fear of public speaking?', 'How to prepare and rehearse for a speech?', 'How to connect with your audience and engage them?', 'How to handle unexpected challenges or interruptions during a speech?', 'How to use your introverted strengths to become a powerful public speaker?'],
        });

        await this.wellnessDimensionsService.findOneAndUpdate({
            dimension_name: 'Social Dimension',
            focus_area: 'Enhancing Personal Attractiveness'
        }, {
            dimension_name: 'Social Dimension',
            focus_area: 'Enhancing Personal Attractiveness',
            description: 'Coaching for personal grooming, self-care, and positive self-image to improve physical and emotional attractiveness.',
            leading_questions: ['How to improve your physical appearance?', 'How to develop a personal style that reflects your personality and values?', 'How to boost your confidence and self-esteem?', 'How to take care of your physical and mental health?', 'How to attract and maintain healthy and fulfilling relationships?'],
        });

        await this.wellnessDimensionsService.findOneAndUpdate({
            dimension_name: 'Social Dimension',
            focus_area: 'Community Involvement Coaching'
        }, {
            dimension_name: 'Social Dimension',
            focus_area: 'Community Involvement Coaching',
            description: 'Finding purpose and meaning in contributing to society, identifying opportunities to volunteer and ways to make a positive impact.',
            leading_questions: ['How to identify and join community organizations or groups that align with your values and interests?', 'How to make meaningful contributions to your community?', 'How to build relationships and networks through community involvement?', 'How to develop leadership and collaboration skills through community service?', 'How to enhance your personal growth and well-being through community involvement?'],
        });

        await this.wellnessDimensionsService.findOneAndUpdate({
            dimension_name: 'Social Dimension',
            focus_area: 'Relationship Strengthening Coaching'
        }, {
            dimension_name: 'Social Dimension',
            focus_area: 'Relationship Strengthening Coaching',
            description: 'Developing communication skills, cultivating intimacy, and exploring strategies to increase feelings of love and connectedness.',
            leading_questions: ['How to identify and communicate your needs and expectations in a relationship?', 'How to foster intimacy and emotional connection?', 'How to handle conflicts and disagreements in a healthy and respectful way?', 'How to support each other\'s personal growth and development?', 'How to create shared goals and aspirations for the future?'],
        });

        await this.wellnessDimensionsService.findOneAndUpdate({
            dimension_name: 'Social Dimension',
            focus_area: 'Social Confidence Coaching'
        }, {
            dimension_name: 'Social Dimension',
            focus_area: 'Social Confidence Coaching',
            description: 'Addressing social anxiety, identifying triggers, and developing coping mechanisms to feel more comfortable and confident in social settings.',
            leading_questions: ['Identify situations where you feel social anxiety and develop coping strategies to manage them.', 'Explore and challenge negative self-talk and beliefs that contribute to social anxiety.', 'Practice assertiveness skills to set boundaries and communicate effectively in social situations.', 'Identify your personal values and strengths and use them to increase confidence in social interactions.', 'Practice relaxation and mindfulness techniques to reduce anxiety and improve overall well-being.'],
        });

        await this.wellnessDimensionsService.findOneAndUpdate({
            dimension_name: 'Social Dimension',
            focus_area: 'Relationship Goal Setting Coaching'
        }, {
            dimension_name: 'Social Dimension',
            focus_area: 'Relationship Goal Setting Coaching',
            description: 'Establishing clear relationship goals, exploring the ideal partner traits, and identifying areas of compatibility and potential challenges.',
            leading_questions: ['Identify and clarify your personal and relationship goals to create a clear vision for your future.', 'Develop a plan to work towards your relationship goals with measurable and achievable steps.', 'Explore and challenge any limiting beliefs or behaviors that may be hindering progress towards your relationship goals.', 'Practice effective communication and conflict resolution skills to navigate any obstacles that may arise.', 'Celebrate progress towards your goals and adjust the plan as needed to maintain momentum and achieve success.'],
        });

        await this.wellnessDimensionsService.findOneAndUpdate({
            dimension_name: 'Social Dimension',
            focus_area: 'Personal Empowerment Coaching'
        }, {
            dimension_name: 'Social Dimension',
            focus_area: 'Personal Empowerment Coaching',
            description: 'Building self-awareness, enhancing self-esteem, and developing strategies to increase personal autonomy and make meaningful life changes.',
            leading_questions: ['Identify your personal values, strengths, and passions to increase self-awareness and build self-confidence.', 'Develop a growth mindset to embrace challenges, learn from failure, and build resilience.', 'Practice self-care activities to promote physical and emotional well-being.', 'Identify and challenge any limiting beliefs or self-sabotaging behaviors that may be hindering personal growth.', 'Develop an action plan to work towards personal goals with measurable and achievable steps.'],
        });

        //Mental Dimension
        await this.wellnessDimensionsService.findOneAndUpdate({
            dimension_name: 'Mental Dimension',
            focus_area: 'Increase overall life satisfaction.'
        }, {
            dimension_name: 'Mental Dimension',
            focus_area: 'Increase overall life satisfaction.',
            description: 'Discover secrets, steps and tips to increase happiness and fulfillment in life. Focus on creating a clear vision of what brings joy and meaning, setting achievable goals and building healthy habits to live a more satisfying life.',
            leading_questions: ['Identify values and set meaningful goals that align with those values', 'Develop healthy habits that support physical, emotional, and mental well-being', 'Cultivate positive relationships and social support networks', 'Practice gratitude and savor positive experiences', 'Work on improving self-esteem and self-compassion'],
        });

        await this.wellnessDimensionsService.findOneAndUpdate({
            dimension_name: 'Mental Dimension',
            focus_area: 'Manage anxiety effectively.'
        }, {
            dimension_name: 'Mental Dimension',
            focus_area: 'Manage anxiety effectively.',
            description: 'Develop simple, feel-good habits to combat anxiety. Identify triggers and learn to manage them through deep breathing, meditation, and other relaxation techniques. Focus on building self-compassion, self-care, and other healthy coping mechanisms to decrease anxiety symptoms and increase resilience.',
            leading_questions: ['Learn and practice relaxation techniques, such as deep breathing, progressive muscle relaxation, or visualization', 'Develop coping skills to manage stressful situations, such as cognitive restructuring or problem-solving', 'Identify triggers and work on desensitizing them through exposure therapy', 'Explore underlying causes of anxiety, such as past trauma or negative thought patterns', 'Work on improving sleep quality and managing other physical symptoms of anxiety'],
        });

        await this.wellnessDimensionsService.findOneAndUpdate({
            dimension_name: 'Mental Dimension',
            focus_area: 'Develop resilience and adaptability.'
        }, {
            dimension_name: 'Mental Dimension',
            focus_area: 'Develop resilience and adaptability.',
            description: 'Learn the best ways to build resilience and bounce back from adversity. Focus on cultivating positive thinking, self-confidence, and problem-solving skills to navigate difficult situations with strength and flexibility. Practice self-compassion, gratitude, and self-care to maintain a resilient mindset.',
            leading_questions: ['Identify personal strengths and use them to overcome challenges', 'Practice flexible thinking and adapt to changing situations', 'Develop problem-solving skills and seek out support when needed', 'Learn from past experiences and use them to grow and develop', 'Foster a positive attitude and optimistic outlook on life'],
        });

        await this.wellnessDimensionsService.findOneAndUpdate({
            dimension_name: 'Mental Dimension',
            focus_area: 'Manage anger appropriately.'
        }, {
            dimension_name: 'Mental Dimension',
            focus_area: 'Manage anger appropriately.',
            description: 'Explore how to stop being irritable and calm down in stressful situations. Identify triggers and learn to manage them through mindfulness, deep breathing, and other techniques. Focus on developing effective communication and conflict resolution skills, and learning healthy ways to express emotions.',
            leading_questions: ['Identify triggers and early warning signs of anger', 'Learn and practice relaxation techniques, such as deep breathing or progressive muscle relaxation', 'Develop coping skills to manage anger, such as cognitive restructuring or problem-solving', 'Practice assertiveness and effective communication to express needs and boundaries', 'Seek out support from trusted individuals or professionals if needed'],
        });

        await this.wellnessDimensionsService.findOneAndUpdate({
            dimension_name: 'Mental Dimension',
            focus_area: 'Practice mindfulness regularly.'
        }, {
            dimension_name: 'Mental Dimension',
            focus_area: 'Practice mindfulness regularly.',
            description: 'Discover how to begin practicing mindfulness to find peace in a frantic world. Learn to focus on the present moment, cultivate awareness, and practice non-judgmental acceptance. Focus on building a regular mindfulness practice through meditation, breathing exercises, and mindful movement.',
            leading_questions: ['Develop a regular mindfulness practice, such as meditation, yoga, or mindful breathing', 'Cultivate awareness of thoughts, emotions, and physical sensations without judgment', 'Learn to observe and accept experiences as they are in the present moment', 'Develop self-compassion and non-judgmental attitudes towards oneself and others'],
        });

        await this.wellnessDimensionsService.findOneAndUpdate({
            dimension_name: 'Mental Dimension',
            focus_area: 'Treat and prevent depression.'
        }, {
            dimension_name: 'Mental Dimension',
            focus_area: 'Treat and prevent depression.',
            description: 'Learn strategies for preventing and treating depression, with and without medication. Focus on identifying symptoms and triggers, building healthy habits to support mental health, and creating a support network of trusted individuals. Explore treatment options, including therapy and medication, and learn self-care strategies for managing depression symptoms.',
            leading_questions: ['Seek professional help if necessary, such as therapy or medication', 'Develop a self-care routine that supports physical, emotional, and mental well-being', 'Practice relaxation techniques, such as deep breathing or progressive muscle relaxation', 'Identify negative thought patterns and work on cognitive restructuring', 'Cultivate positive relationships and social support networks'],
        });

        await this.wellnessDimensionsService.findOneAndUpdate({
            dimension_name: 'Mental Dimension',
            focus_area: 'Achieve work-life balance.'
        }, {
            dimension_name: 'Mental Dimension',
            focus_area: 'Achieve work-life balance.',
            description: 'Learn how to balance a job and personal life effectively. Identify priorities and boundaries, create time management strategies, and establish self-care practices to maintain a healthy balance. Focus on creating a realistic and achievable plan for achieving balance, managing stress and increasing overall satisfaction with life.',
            leading_questions: ['Identify personal values and priorities in both work and personal life', 'Set boundaries and create a schedule that allows for both work and personal activities', 'Practice time management skills and prioritize tasks', 'Develop self-care routines that support physical, emotional, and mental well-being', 'Learn to delegate and ask for help when needed'],
        });

        await this.wellnessDimensionsService.findOneAndUpdate({
            dimension_name: 'Mental Dimension',
            focus_area: 'Foster positive thinking patterns.'
        }, {
            dimension_name: 'Mental Dimension',
            focus_area: 'Foster positive thinking patterns.',
            description: 'Discover how the power of positive thinking can transform your life. Learn to recognize negative thought patterns, cultivate gratitude, and develop a positive mindset to increase happiness and success. Focus on building self-awareness, self-compassion, and a growth mindset to overcome challenges and achieve goals.',
            leading_questions: ['Identify negative thought patterns and work on cognitive restructuring', 'Practice gratitude and savor positive experiences', 'Cultivate positive relationships and social support networks', 'Develop self-esteem and self-compassion', 'Practice mindfulness to observe thoughts without judgment'],
        });

        await this.wellnessDimensionsService.findOneAndUpdate({
            dimension_name: 'Mental Dimension',
            focus_area: 'Prevent burnout effectively.'
        }, {
            dimension_name: 'Mental Dimension',
            focus_area: 'Prevent burnout effectively.',
            description: 'Explore the best techniques for battling burnout. Learn to recognize signs of burnout, set healthy boundaries, and practice self-care to prevent burnout from affecting your physical and mental health. Focus on building resilience, creating healthy habits, and establishing a support network to help you maintain balance and prevent burnout.',
            leading_questions: ['Identify personal values and priorities in both work and personal life', 'Set realistic goals and expectations for oneself', 'Practice time management and prioritize self-care activities', 'Learn to say no and set boundaries when necessary', 'Develop coping skills to manage stress and work-related challenges'],
        });

        await this.wellnessDimensionsService.findOneAndUpdate({
            dimension_name: 'Mental Dimension',
            focus_area: 'Manage stress effectively.'
        }, {
            dimension_name: 'Mental Dimension',
            focus_area: 'Manage stress effectively.',
            description: 'Discover the most effective relaxation techniques to manage stress. Learn to identify sources of stress, build coping mechanisms, and develop relaxation techniques such as meditation, deep breathing, and progressive muscle relaxation. Focus on building a regular stress management routine to maintain balance, improve overall well-being, and reduce the impact of stress on physical and mental health.',
            leading_questions: ['I want to learn techniques to manage my stress in the moment when it happening.', 'I want to identify the sources of stress in my life and create a plan to minimize them.', 'I want to establish a regular self-care routine that helps me manage my stress.', 'I want to learn how to set boundaries and say "no" in a way that reduces my stress levels.', 'I want to develop a more positive mindset and learn how to reframe negative thoughts that contribute to my stress.'],
        });

        await this.wellnessDimensionsService.findOneAndUpdate({
            dimension_name: 'Mental Dimension',
            focus_area: 'Achieve challenging goals.'
        }, {
            dimension_name: 'Mental Dimension',
            focus_area: 'Achieve challenging goals.',
            description: 'Learn how to stay motivated and achieve challenging goals. Set realistic and achievable goals, create action plans, and build self-motivation to overcome obstacles and achieve success. Focus on building resilience, self-compassion, and accountability to stay on track and achieve your desired outcomes.',
            leading_questions: ['Identify long-term goals and create a plan for achieving them', 'Break down big goals into smaller, more manageable steps', 'Improve self-discipline and time management skills', 'Anticipate and overcome potential obstacles or roadblocks', 'Stay motivated and accountable throughout the goal-setting process'],
        });

        await this.wellnessDimensionsService.findOneAndUpdate({
            dimension_name: 'Mental Dimension',
            focus_area: 'Manage weight effectively.'
        }, {
            dimension_name: 'Mental Dimension',
            focus_area: 'Manage weight effectively.',
            description: 'Discover how to achieve a healthy weight fast and maintain it under stress. Learn to establish healthy habits such as regular exercise, mindful eating, and stress management techniques. Focus on building self-awareness, goal setting, and accountability to maintain a healthy weight and overall well-being. Explore strategies for managing stress and emotional eating to prevent weight gain and maintain a healthy lifestyle.',
            leading_questions: ['Develop a healthier relationship with food and practice mindful eating', 'Identify emotional or psychological factors that contribute to weight struggles', 'Create a personalized nutrition plan', 'Establish an enjoyable and effective exercise routine', 'Track progress in an objective and supportive way'],
        });

        console.log('Wellness Dimensions Seed Success');
    }
}
