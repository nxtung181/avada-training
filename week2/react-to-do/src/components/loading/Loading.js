import { Spinner } from "@shopify/polaris"
export default function Loading() {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
            <Spinner accessibilityLabel="Loading todos" size="large" />
        </div>
    )
}