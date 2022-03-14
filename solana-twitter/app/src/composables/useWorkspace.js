import { computed } from 'vue'
import { useAnchorWallet } from "solana-wallets-vue"
import { Connection, PublicKey } from '@solana/web3.js'
import { Provider, Program } from '@project-serum/anchor'
import idl from '../../../target/idl/solana_twitter.json'

const programID = new PublicKey(idl.metadata.address)
let workspace = null

export const useWorkspace = () => workspace

export const initWorkspace = () => {
    const wallet = useAnchorWallet()
    const connection = new Connection('http://localhost:8080'); //to know which cluster
    const provider = computed(() => new Provider(connection, wallet.value)) //computed ensures provider is recreated when the wallet property changes
    const program = computed(() => new Program(idl, programID, provider.value))
    
    workspace = {
        wallet,
        connection,
        provider,
        program
    }
}