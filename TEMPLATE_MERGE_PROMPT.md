# Prompt for Merging New Templates from portfolio-style-guides

## Context
The portfolio-style-guides repo has 68 NEW templates (95 total) that were added in 2 batches.
We want to selectively merge some of these into my-portfolio/app/templates/

## Branch Info
**Source Repo:** portfolio-style-guides
**Source Branch:** claude/enhance-style-guides-013tZ6MgFsCni8cDDHvHoh9q
**Commits:**
- d97f8fb - First wave (44 templates)
- a15c30d - Second wave (24 templates)

**Target Repo:** my-portfolio
**Target Location:** /app/templates/

## Claude.ai Prompt

```
I have 68 new production templates in another repo (portfolio-style-guides) that I want to selectively merge into my main portfolio.

TASK:
Review the new templates in portfolio-style-guides and copy the BEST 10-15 templates to my-portfolio/app/templates/

CRITERIA FOR SELECTION:
1. Most useful for portfolio/showcase sites
2. Best design/completeness
3. Diverse categories (not all dashboards)
4. Production-ready with rich mock data

RECOMMENDED TEMPLATES TO COPY:
**High Priority:**
- analytics-dashboard (comprehensive charts)
- form-builder (interactive demo)
- email-campaign-builder (visual builder)
- product-launch (marketing focus)
- app-landing-page (mobile app showcase)
- agency-landing-page (service business)
- quiz-builder (interactive engagement)
- user-directory (team showcase)
- knowledge-base (documentation)
- roadmap (product planning)

**Medium Priority:**
- social-feed (engagement)
- testimonials (social proof)
- gallery (media showcase)
- activity-log (timeline)
- comparison (product comparison)

CRITICAL RULES:
1. Copy files to my-portfolio/app/templates/[name]/
2. 🎨 VERIFY all templates use CSS variables (no hardcoded colors)
3. Check that SpaceBackground imports work
4. Update any broken imports
5. Keep glassmorphism/terminal aesthetic
6. Ensure mobile responsive

STEPS:
1. List all 95 templates in portfolio-style-guides
2. Recommend top 15 based on criteria above
3. Copy selected templates to my-portfolio
4. Test that at least 3 templates render correctly
5. Create a summary of what was copied

DO NOT copy templates that are:
- Too similar to existing ones
- Incomplete or placeholder-heavy
- Dashboard-heavy (we have enough)
