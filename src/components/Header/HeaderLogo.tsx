import { Collection, CustomizationSettings, Space } from '@gitbook/api';
import Link from 'next/link';

import { HeaderMobileMenu } from '@/components/Header/HeaderMobileMenu';
import { Image } from '@/components/utils';
import { absoluteHref } from '@/lib/links';
import { ClassValue, tcls } from '@/lib/tailwind';

interface HeaderLogoProps {
    collection: Collection | null;
    space: Space;
    customization: CustomizationSettings;
    /** Style applied when the logo is a text one */
    textStyle?: ClassValue;
}

/**
 * Render the logo for a space using the customization settings.
 */
export function HeaderLogo(props: HeaderLogoProps) {
    const { customization } = props;

    return (
        <div className={tcls('flex', 'flex-row', 'gap-3')}>
            <HeaderMobileMenu className={tcls('lg:hidden')} />
            <Link
                href={absoluteHref('')}
                className={tcls('group/headerlogo', 'flex', 'flex-row', 'items-center')}
            >
                {customization.header.logo ? (
                    <Image
                        alt="Logo"
                        src={customization.header.logo}
                        fetchPriority="high"
                        style={['max-w-50', 'h-8']}
                    />
                ) : (
                    <LogoFallback {...props} />
                )}
            </Link>
        </div>
    );
}

function LogoFallback(props: HeaderLogoProps) {
    const { collection, space, customization, textStyle } = props;
    const customIcon = 'icon' in customization.favicon ? customization.favicon.icon : null;

    return (
        <>
            <Image
                alt="Logo"
                src={
                    customIcon ?? {
                        light: absoluteHref('.gitbook/icon?size=medium&theme=light'),
                        dark: absoluteHref('.gitbook/icon?size=medium&theme=dark'),
                    }
                }
                fetchPriority="high"
                style={['w-8', 'h-8']}
            />

            <h1
                className={tcls(
                    'textwrap-balance',
                    'flex',
                    'leading-tight',
                    'tracking-tight',
                    'max-w-[13ch]',
                    'md:max-w-none',
                    'md:text-lg/tight',
                    'text-slate-800',
                    'font-semibold',
                    'ms-3',
                    textStyle,
                )}
            >
                {collection ? collection.title : space.title}
            </h1>
        </>
    );
}
