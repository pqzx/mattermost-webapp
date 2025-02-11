// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
import {ActionCreatorsMapObject, bindActionCreators, Dispatch} from 'redux';
import {connect} from 'react-redux';

import {ActionFunc, ActionResult, GenericAction} from 'mattermost-redux/types/actions';
import {Channel} from 'mattermost-redux/types/channels';
import {getBool} from 'mattermost-redux/selectors/entities/preferences';
import {patchChannel} from 'mattermost-redux/actions/channels';
import {Preferences} from 'mattermost-redux/constants';

import {GlobalState} from 'types/store';

import {closeModal} from 'actions/views/modals';
import {setShowPreviewOnEditChannelHeaderModal} from 'actions/views/textbox';
import {showPreviewOnEditChannelHeaderModal} from 'selectors/views/textbox';

import {isModalOpen} from '../../selectors/views/modals';
import {ModalIdentifiers} from '../../utils/constants';

import EditChannelHeaderModal from './edit_channel_header_modal';

function mapStateToProps(state: GlobalState) {
    return {
        shouldShowPreview: showPreviewOnEditChannelHeaderModal(state),
        show: isModalOpen(state, ModalIdentifiers.EDIT_CHANNEL_HEADER),
        ctrlSend: getBool(state, Preferences.CATEGORY_ADVANCED_SETTINGS, 'send_on_ctrl_enter'),
    };
}

type Actions = {
    closeModal: (modalId: string) => {data: boolean};
    patchChannel: (channelId: string, patch: Partial<Channel>) => Promise<ActionResult>;
    setShowPreview: (showPreview: boolean) => void;
}

function mapDispatchToProps(dispatch: Dispatch<GenericAction>) {
    return {
        actions: bindActionCreators<ActionCreatorsMapObject<ActionFunc | GenericAction>, Actions>({
            closeModal,
            patchChannel,
            setShowPreview: setShowPreviewOnEditChannelHeaderModal,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditChannelHeaderModal);
