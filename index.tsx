/*
 * Vencord, a Discord client mod
 * Copyright (c) 2025 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import definePlugin from "@utils/types";
import { User } from "@vencord/discord-types";
import { Flex, React } from "@webpack/common";

import { UserChatButton, UserDeafenButton, UserMuteButton } from "./components/UserChatButtons";
import { settings } from "./settings";

export default definePlugin({
    name: "VoiceUserButtons",
    description: "Quickly DM, mute, or deafen any user right from the voice-call panel.",
    authors: [{ name: "nicola02nb", id: 257900031351193600n }, { name: "omaw", id: 1155026301791514655n }],
    settings,
    patches: [
        {
            find: "\"avatarContainerClass\",\"userNameClassName\"",
            replacement: {
                match: /(\((\i),\i\){?=.{0,850}\.flipped])(:\i}\),children:\[)/,
                replace: "$1$3$self.renderButtons($2?.user),"
            }
        }
    ],
    renderButtons(user?: User) {
        if (!user) return null;
        return (
            <Flex direction={Flex.Direction.HORIZONTAL} className="voice-user-buttons">
                {settings.store.showChatButton && <UserChatButton user={user} />}
                {settings.store.showMuteButton && <UserMuteButton user={user} />}
                {settings.store.showDeafenButton && <UserDeafenButton user={user} />}
            </Flex>
        );
    }
});
