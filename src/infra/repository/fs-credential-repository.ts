import { Firestore } from '@google-cloud/firestore'

import { CreateCredentialRepository, GetCredentialsByEmail, GetCredentialsByRefreshToken, UpdateCredentialRepository } from "@/data/domain";
import { CreateCredentialModel, CredentialsModel } from "@/data/model";
import { FirestoreError } from '@/application/errors/errors';

export class FsCredentialRepository implements CreateCredentialRepository, GetCredentialsByEmail, GetCredentialsByRefreshToken, UpdateCredentialRepository {
  async create(credentials: CreateCredentialModel): Promise<void> {
    const firestore = new Firestore()
    try {
      await firestore.collection('credentials').add({...credentials, created_at: new Date() })
    } catch (error) {
      throw new FirestoreError(error as Error)
    }
  }

  async getByRefreshToken(refreshToken: string): Promise<CredentialsModel | null> {
    const firestore = new Firestore()
    const snapshot = await firestore.collection('credentials').where('refreshToken', '==', refreshToken).get()
    if (snapshot.empty) return null
    let document: any = null
    snapshot.docs.forEach(doc => {
      document = {...doc.data(), id: doc.id }
    })
    return document
  }

  async getByEmail(email: string): Promise<CredentialsModel | null> {
    const firestore = new Firestore()
    const snapshot = await firestore.collection('credentials').where('email', '==', email).get()
    if (snapshot.empty) return null
    let document: any = null
    snapshot.docs.forEach(doc => {
      document = doc.data()
    })
    return document
  }

  async update(credentialId: string, credential: UpdateCredentialRepository.Params): Promise<boolean> {
    const firestore = new Firestore()
    try {
      await firestore.collection('credentials').doc(`${credentialId}`).update({...credential, updated_at: new Date() })
    } catch (error) {
      console.log(credentialId)
    }
    return true
  }
}