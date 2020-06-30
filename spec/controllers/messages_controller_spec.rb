require 'rails_helper'

describe MessagesController do
  let(:group) { create(:group) }
  let(:user) { create(:user) }

  describe '#index' do

    context 'when user is signed in' do
      before do
        login user
        get :index, params: { group_id: group.id }
      end
      it 'assigns @message' do
        expect(assigns(:message)).to be_a_new(Message)
      end
      it 'assigns @group' do
        expect(assigns(:group)).to eq group
      end
      it 'renders index' do
        expect(response).to render_template :index
      end

    end
    context 'when user is not signed in' do
      before do
        get :index, params: { group_id: group.id }
      end
      it 'redirects to new_user_session_path' do
        expect(response).to redirect_to(new_user_session_path)
      end

    end
  end

  describe '#create' do
    let(:valid_params) { { group_id: group.id, user_id: user.id, message: attributes_for(:message) } }

    context 'signed in' do
      before do
        login user
      end

      context 'can save' do
        subject {
          post :create,
          params: valid_params
        }

        it 'count up message' do
          expect{ subject }.to change(Message, :count).by(1)
        end

        it 'redirects to group_messages_path' do
          subject
          expect(response).to redirect_to(group_messages_path(group))
        end
      end

      context 'can not save' do
        let(:invalid_params) { { group_id: group.id, user_id: user.id, message: attributes_for(:message, content: nil, image: nil) } }

        subject {
          post :create,
          params: invalid_params
        }

        it 'does not count up' do
          expect{ subject }.not_to change(Message, :count)
        end

        it 'renders index' do
          subject
          expect(response).to render_template :index
        end
      end

    end

    context 'not signed in' do
      
      it 'redirects to new_user_session_path' do
        post :create, params: valid_params
        expect(response).to redirect_to(new_user_session_path)
      end


    end
  end
end