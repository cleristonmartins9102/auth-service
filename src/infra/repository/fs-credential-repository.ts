import { Firestore } from '@google-cloud/firestore'

import { CreateCredentialRepository } from "@/data/domain";
import { CreateCredentialModel, CredentialsModel } from "@/data/model";

export class FsCredentialRepository implements CreateCredentialRepository {
  async create(credentials: CreateCredentialModel): Promise<void> {
    const firestore = new Firestore()
    try {
      await firestore.collection('credentials').add({...credentials, created_at: new Date() })
    } catch (error) {
      console.log(error)
    }
  }
}